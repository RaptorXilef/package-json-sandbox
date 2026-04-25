<?php
/**
 * @file index.php
 * @description Haupteinstiegspunkt mit dynamischer Vite-Asset-Ladung und .env-Support.
 */

// 1. FEHLERANZEIGE (Immer oben lassen, solange wir in der Sandbox basteln)
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// 2. COMPOSER AUTOLOAD
// Wir gehen davon aus, dass diese Datei in /public/index.php liegt
require_once __DIR__ . '/../vendor/autoload.php';

// 3. UMGEBUNGSVARIABLEN (.env) LADEN
try {
    $dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . '/..');
    $dotenv->safeLoad();
} catch (Exception) {
    // Falls die .env fehlt, nutzen wir Fallbacks (siehe unten)
}

// 4. GLOBALE KONFIGURATION
$isDev = ($_ENV['APP_ENV'] ?? 'production') === 'development';
$viteHost = $_ENV['VITE_HOST'] ?? 'http://127.0.0.1:5173';

/**
 * Hilfsfunktion für Bilder und statische Assets
 */
function asset(string $path): string { // TYP HINZUGEFÜGT
    global $isDev, $viteHost;

// Im Dev-Modus: Direkt vom Vite-Server (src-Ordner)
    if ((bool)$isDev) { // CAST ZU BOOL FÜR PHPSTAN
        return $viteHost . '/src/' . ltrim($path, '/');
    }

    // Im Produktions-Modus: Aus dem Manifest lesen
    $manifestPath = __DIR__ . '/dist/.vite/manifest.json';
    if (file_exists($manifestPath)) {
        $manifest = (array)json_decode((string)file_get_contents($manifestPath), true);
        $sourcePath = 'src/' . ltrim($path, '/');

        if (isset($manifest[$sourcePath])) {
            return 'dist/' . $manifest[$sourcePath]['file'];
        }
    }

    // Fallback falls Manifest fehlt oder Datei nicht gefunden wurde
    return 'dist/' . ltrim($path, '/');
}

/**
 * Hauptfunktion zum Laden der JS/SCSS Einstiegspunkte
 */
function vite_assets(string $entry = 'main'): string {
    global $isDev, $viteHost;

    if ((bool)$isDev) { // CAST ZU BOOL
        return '
            <script type="module" src="' . $viteHost . '/@vite/client"></script>
            <script type="module" src="' . $viteHost . '/src/js/main.js"></script>
            <link rel="stylesheet" href="' . $viteHost . '/src/scss/main.scss">
        ';
    }

    $manifestPath = __DIR__ . '/dist/.vite/manifest.json';
    if (!file_exists($manifestPath)) {
        return '';
    }

    // CAST ZU ARRAY: Damit PHPStan weiß, was $manifest ist
    $manifest = (array)json_decode((string)file_get_contents($manifestPath), true);

    // Wir nutzen hier die Keys, die wir in der vite.config.js definiert haben
    $jsFile = (string)($manifest['src/js/main.js']['file'] ?? '');
    $cssFile = $manifest['src/scss/main.scss']['file'] ?? null;

    $html = '<script type="module" src="dist/' . $jsFile . '"></script>';

    // PRÄZISE ABFRAGE: Nicht nur if($cssFile), sondern Vergleich auf null
    if ($cssFile !== null) {
        $html .= '<link rel="stylesheet" href="dist/' . $cssFile . '">';
    }

    return $html;
}
?>

<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Vite PHP Sandbox</title>

    <?= vite_assets() ?>
</head>
<body>
    <div class="hero">
        <h1 class="hero__title">Vite + PHP = ❤️</h1>
        <p>Umgebung: <strong><?= $isDev ? 'Development (Vite Server)' : 'Production (Dist Bundle)' ?></strong></p>

        <div class="test-area">
            <p>Ein Bild über den Asset-Helper:</p>
            <img src="<?= asset('assets/images/logo.png') ?>" alt="Sandbox Logo" style="max-width: 100px;">
        </div>

        <p>Ändere die <code>src/scss/main.scss</code> um das HMR zu testen!</p>
    </div>
</body>
</html>
