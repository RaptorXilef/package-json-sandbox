# 🔄 Workflows & Automatisierung

## 🛡 Git-Hooks (Husky)

Vor jedem Commit prüft **Husky**, ob der Code den Standards entspricht:

- **Pre-commit:** Führt `lint-staged` aus (prüft nur geänderte Dateien).
- **Commit-msg:** Erzwingt **Conventional Commits** (z.B. `feat:`, `fix:`, `chore:`).

## 📦 Release-Prozess

Wir nutzen `release-it` für ein automatisiertes Versionierungssystem:

1. Entwickle Features in Branches.
2. Merge in den `main`.
3. Führe `npm run release` aus.
   - Erstellt ein SemVer-Tag.
   - Generiert automatisch die `CHANGELOG.md`.

<!--
## 🤖 GitHub Actions

In der Cloud werden bei jedem Push folgende Prüfungen durchgeführt:

- Statische Analyse (PHPStan).
- Unit Tests (Pest).
- Kontext-Export via `collect-all.js` (als Artefakt für Debugging-Zwecke).
-->
