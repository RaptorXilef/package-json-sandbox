import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        // Ermöglicht globale Test-Funktionen wie 'describe', 'it', 'expect'
        // Ohne dass man sie in jeder Datei importieren muss
        globals: true,
        environment: 'node', // Später 'jsdom' für Browser-Tests
        include: ['**/*.{test,spec}.{js,ts}'],
        reporters: ['default'],
        coverage: {
            reporter: ['text', 'json', 'html'],
        },
    },
});
