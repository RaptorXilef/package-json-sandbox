<?php
// 1. FEHLERANZEIGE AKTIVIEREN (Nur für Debugging!)
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// 2. PFAD-CHECK: Wo liegt das Script?
// Wenn die Datei in /public/index.php liegt:
require_once __DIR__ . '/../vendor/autoload.php';

// 3. DOTENV LADEN
// Zeigt auf das Root-Verzeichnis (eine Ebene über /public)
try {
    $dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . '/..');
    $dotenv->safeLoad();
} catch (Exception $e) {
    echo "Fehler beim Laden der .env: " . $e->getMessage();
}

// 4. LOGIK
$isDev = ($_ENV['APP_ENV'] ?? 'production') === 'development';
$viteHost = $_ENV['VITE_HOST'] ?? 'http://localhost:5173';

function vite_assets($entry) {
    global $isDev, $viteHost;

    if ($isDev) {
        // Im Dev-Modus laden wir direkt vom Vite-Server
        // Wir brauchen das Vite-Client-Script für Hot Module Replacement (HMR)
        return '
            <script type="module" src="' . $viteHost . '/@vite/client"></script>
            <script type="module" src="' . $viteHost . '/src/js/main.js"></script>
            <link rel="stylesheet" href="' . $viteHost . '/src/scss/main.scss">
        ';
    }

    // Produktions-Modus (Manifest laden)
    // Pfad: public/dist/.vite/manifest.json
    $manifestPath = __DIR__ . '/dist/.vite/manifest.json';

    if (!file_exists($manifestPath)) {
        return '';
    }

    $manifest = json_decode(file_get_contents($manifestPath), true);

    // Wir holen uns die Pfade aus dem Manifest (Vite generiert Hash-Namen)
    $jsFile = $manifest['src/js/main.js']['file'] ?? '';
    $cssFile = $manifest['src/scss/main.scss']['file'] ?? null;

    $html = '<script type="module" src="dist/' . $jsFile . '"></script>';
    if ($cssFile) {
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
    <?= vite_assets('main') ?>
</head>
<body>
    <div class="hero">
        <h1 class="hero__title">Vite + PHP = ❤️</h1>
        <p>Status: <strong><?= $isDev ? 'Development' : 'Production' ?></strong></p>
        <p>Wenn du das hier siehst, klappt die PHP-Ausgabe!</p>
    </div>
</body>
</html>
