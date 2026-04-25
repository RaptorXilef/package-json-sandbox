import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        // Ermöglicht globale Test-Funktionen wie 'describe', 'it', 'expect'
        // Ohne dass man sie in jeder Datei importieren muss
        globals: true,
        // Wir nutzen jsdom, um eine Browser-Umgebung für JS/UI-Tests zu simulieren
        environment: 'jsdom',
        include: ['**/*.{test,spec}.{js,ts}'],
        reporters: ['default', 'html'], // 'html' erstellt einen schicken Report in /html
        coverage: {
            provider: 'v8', // Nutzt die V8-Engine für schnelle Coverage-Reports
            reporter: ['text', 'json', 'html'],
            reportsDirectory: './.build/reports/vitest-coverage', // Wir halten unsere Reports zentral!
        },
    },
});
