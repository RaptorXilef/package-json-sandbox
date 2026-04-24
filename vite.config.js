import path from 'node:path';
import { defineConfig } from 'vite';

export default defineConfig({
    // Damit Vite weiß, wo die Quelldateien liegen
    root: './',

    build: {
        // Hier landen die fertigen Dateien für die Website
        outDir: 'public/dist',
        emptyOutDir: true,
        manifest: true, // Erzeugt eine manifest.json für PHP
        rollupOptions: {
            // Unsere Einstiegspunkte für JS und SCSS
            input: {
                main: path.resolve(__dirname, 'src/js/main.js'),
                styles: path.resolve(__dirname, 'src/scss/main.scss'),
            },
        },
    },

    server: {
        // Wichtig für den Dev-Modus (Hot Module Replacement)
        origin: 'http://localhost:5173',
        strictPort: true,
        port: 5173,
    },
});
