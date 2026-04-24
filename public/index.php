<?php
// Konfiguration: Läuft die Sandbox im Dev-Modus?
// Später kannst du das über eine .env Datei steuern.
$isDev = true;
$viteHost = 'http://127.0.0.1:5173'; // Wir nutzen die IP statt localhost

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

    // Im Produktions-Modus lesen wir die manifest.json
    $manifestPath = __DIR__ . '/dist/.vite/manifest.json';
    if (!file_exists($manifestPath)) return '';

    $manifest = json_decode(file_get_contents($manifestPath), true);

    // Wir holen uns die Pfade aus dem Manifest (Vite generiert Hash-Namen)
    $jsFile = $manifest['src/js/main.js']['file'];
    $cssFile = $manifest['src/scss/main.scss']['file'];

    return '
        <link rel="stylesheet" href="dist/' . $cssFile . '">
        <script type="module" src="dist/' . $jsFile . '"></script>
    ';
}
?>

<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <title>Vite PHP Sandbox</title>
    <?= vite_assets('main') ?>
</head>
<body>
    <div class="hero">
        <h1 class="hero__title">Vite + PHP = ❤️</h1>
        <p>Schau in die Konsole und ändere mal die <code>main.scss</code>!</p>
    </div>
</body>
</html>
