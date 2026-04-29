# 🛠 Projekt-Toolstack

Diese Übersicht dokumentiert das High-End-Ökosystem für eine moderne, sichere und hochperformante PHP/JS-Entwicklungsumgebung.

---

## 🟢 NPM & Frontend-Infrastruktur

### 🏗 Build & Asset-Management

- **Vite:** Next-Gen Bundler für Hot Module Replacement (HMR) und blitzschnelles Asset-Handling.
- **Sharp:** Hochleistungs-Bildverarbeitung; konvertiert Assets automatisch in optimierte WebP-Dateien (75% Qualität).
- **Sass (Embedded):** Native Dart-Sass Engine für moderne SCSS-Kompilierung.
- **Terser:** Industriestandard zur JavaScript-Minifizierung (Legacy-Support).

### 🔍 Qualitätssicherung & A11Y

- **Biome:** Der "All-in-One"-Nachfolger für ESLint und Prettier. Übernimmt Formatierung und Linting (JS/JSON/CSS).
- **Stylelint:** Spezialisierter SCSS-Linter für BEM-Konventionen und Design-Token-Integrität.
- **Markuplint:** Prüft HTML-Strukturen auf W3C-Konformität und semantische Korrektheit.
- **axe-core:** Automatisierte Barrierefreiheits-Tests (A11Y) via CLI zur Sicherstellung von WCAG-Standards.
- **CSpell & Markdownlint:** Garantieren fehlerfreie Texte und konsistente Dokumentationsstrukturen (.md).

### 🧪 Frontend Testing (Vitest)

- **Vitest:** Blazing fast Test-Runner für JavaScript/TypeScript.
  - **`vitest --ui`:** Interaktives Dashboard zur Live-Analyse und zum Debugging im Browser.
  - **SCSS-Injection:** Automatische Injektion globaler Variablen via `preprocessorOptions`.
  - **Snapshot-Testing:** Sichert UI-Strukturen gegen ungewollte Regressionen im DOM-Baum ab.

---

## 🐘 Composer & Backend-Infrastruktur

### ⚙️ Core & Lifecycle

- **Setup.php (Custom):** Zentrale Initialisierung (Umgebung, Ordner, Tool-Updates).
- **phpdotenv:** Sicherer Zugriff auf Umgebungsvariablen (.env).
- **HTMLPurifier:** Goldstandard zur XSS-Prävention; sanitisiert Nutzereingaben hochpräzise.

### 🔍 Statische Analyse & Modernisierung

- **PHPStan (Level 6+):** Deep Analysis von Logik und Typisierung inkl. Strict-Rules und PHPUnit-Erweiterung.
- **Rector:** Vollautomatisierte Code-Modernisierung (z.B. PHP 8.4 Migration) und Refactoring (Dead Code Removal).
- **Deptrac:** Erzwingt die architektonische Integrität und verhindert Schicht-Verletzungen.
- **phpcpd:** Erkennt Code-Duplikate zur konsequenten Einhaltung des DRY-Prinzips.

### 🎨 Code-Style & Standards

- **PHP-CS-Fixer:** Erzwingt den modernen PER-CS Standard und wendet Fixes aktiv an (z.B. Constructor Property Promotion).
- **PHP_CodeSniffer (PHPCS):** Überwacht PSR-12/PER Standards mittels Slevomat (Unused Code) und PHPCompatibility (Version-Check).
- **PHPMD (v3.0):** Misst Metriken wie Zyklomatische Komplexität (Limit: 12) und Methodendichte (max. 27).

### 🧪 Backend Testing (Pest & Infection)

- **Pest (v4.x):** Elegantes Testing-Framework auf PHPUnit-Basis für maximale Lesbarkeit.
  - **`covers()`-Pflicht:** Erzwingt explizite Coverage-Metadaten zur Vermeidung von "Risky Tests".
- **Infection:** Mutation Testing; validiert die Effektivität der Test-Suite durch gezielte Code-Manipulation.

---

## 🚀 Workflows & Automatisierung

### 🛠 Git-Workflow (Husky & Lint-Staged)

- **Husky:** Schaltzentrale für Git-Hooks mit interaktivem Bash-Skript (Bestätigungsabfrage bei Fehlern erlaubt "YOLO-Commits").
- **Lint-Staged:** "Smart Scanning" - prüft nur Dateien im Git-Stage für maximale Geschwindigkeit:
  - **PHP:** Sofortige Validierung via `phpcs`, `phpstan`, `phpmd` sowie Style-Check-Dry-Runs.
  - **JS:** Nutzt `vitest related`, um nur betroffene Tests der geänderten Logik auszuführen.

### 📂 Kontext-Management & Debugging

- **collect-all.js (The Code-Collector):** Ein hochperformantes Aggregations-Tool, das Projekt-Dateien nach Typen (JS, PHP, SCSS, etc.) bündelt.
  - **Dual-Mode:** Bietet ein interaktives, farbiges Terminal-Menü für die manuelle Nutzung und einen stummen CLI-Modus für die Automatisierung.
  - **CI/CD-Ready:** Unterstützt Argumente wie `--all`, `--root` oder `--php`, um in Pipelines automatisch Code-Snapshots als Artefakte zu erzeugen.
  - **Smart Filtering:** Beachtet automatisch Projekt-Ausschlüsse (Vendor, Cache, Git) und schützt vor dem versehentlichen Einlesen von Binärdaten.
  - **Befehl:** `npm run collect` (interaktiv) oder `npm run collect -- --all` (CLI).

### 📦 Release & Wartung

- **release-it:** Automatisiert Versionierung (SemVer) und Git-Tags.
- **conventional-changelog:** Erzeugt die `CHANGELOG.md` automatisch aus standardisierten Commit-Nachrichten.
- **util:pkg-up:** Synchronisiertes Update-Skript für NPM, Composer und PHAR-Tools.
- **fmt:** Kombinierter Master-Befehl für Rector und Code-Style-Fixes.

---

## ⚙️ Ausführungsphasen & Master-Commands

Um eine intuitive Bedienung zu gewährleisten, folgen sowohl Backend (Composer) als auch Frontend (NPM) einer identischen Phasen-Logik. Dies schafft Symmetrie und verhindert Fehlbedienungen beim Wechsel der Code-Basis.

### 🔄 Phasen-Übersicht

| Phase | Backend (PHP / Composer) | Frontend (JS/CSS / NPM) | Zielsetzung |
| :--- | :--- | :--- | :--- |
| **0: Setup** | `setup`, `clear` | `prepare`, `collect` | Initialisierung & Umgebung |
| **1: Dev** | (Autoloading / Core) | `dev` (Sass-Watch), `legacy:*` | Täglicher Workflow / Watcher |
| **2: Testing** | `test`, `test:full`, `test:mutation` | `test`, `test:watch`, `test:ui` | Validierung der Logik |
| **3: Quality** | `chk:stan`, `chk:md`, `chk:arch` | `chk:biome`, `chk:css`, `chk:html` | Statische Analyse (Read-Only) |
| **4: Fixing** | `fix:cs`, `fix:style`, `fix:modern` | `fix:biome`, `fix:css` | Automatische Code-Korrektur |
| **5: CI/Release** | `ci:*`, `util:pkg-up` | `release`, `changelog:rebuild` | Automatisierung & Deployment |

### 🛠 Die Master-Commands (Dein täglicher Einstieg)

Diese Befehle sind in beiden Welten identisch benannt und bündeln die wichtigsten Einzelwerkzeuge zu mächtigen Workflows:

- **`npm run chk` / `composer chk`**
  - *Modus:* Read-Only.
  - *Zweck:* Führt die gesamte `qa`-Suite aus, um den aktuellen Status zu prüfen, ohne den Code zu verändern.
- **`npm run fix` / `composer fix`**
  - *Modus:* Schreibend.
  - *Zweck:* Wendet alle verfügbaren Auto-Fixer an (Formatting, Linting-Fixes, Modernisierung). Der schnellste Weg zu sauberem Code.
- **`npm run qa` / `composer qa`**
  - *Modus:* Umfassend.
  - *Zweck:* Das ultimative Qualitätssiegel. Kombiniert Stil-Checks, statische Analysen und alle automatisierten Tests.

---

## 📂 Hilfsskripte (Workflows)

- **optimize-images.js:** Steuert die Sharp-Pipeline.
- **legacy-minify-js.js:** Die Node-basierte Brücke für traditionelle JavaScript-Minifizierung ohne Vite.
- **collect-all.js:** Plattformunabhängiges Node.js-Tool zur Aggregation von Quellcode (Kontext-Bundler) für Dokumentation und KI-Analyse.

---

## 💻 IDE-Integration (VS Code)

Um das volle Potenzial der Toolchain auszuschöpfen, ist das Projekt für **Visual Studio Code** vorkonfiguriert:

- **Standardisierte Settings:** Die `settings.json` erzwingt Unix-Zeilenenden (LF), 120er-Ruler und schaltet konfliktbehaftete integrierte Formatierer zugunsten der Projekt-CLI-Tools aus.
- **Extension-Profile:**
  - **Full:** Maximale Unterstützung inkl. GitLens, ErrorLens und UI-Helfern.
  - **Min:** Fokus auf Kern-Infrastruktur (Biome, PHP-Intelephense, Stylelint).
- **PHP Snippets:** Der Shortcut `header` erzeugt automatisch einen standardisierten Datei-Header inkl. Lizenz (CC BY-NC-SA 4.0), SOLID-Dokumentationsblock und strikten Typen (`declare(strict_types=1)`).
- **Format on Save:** Biome (JS/JSON/CSS), Stylelint (SCSS) und Markuplint (HTML) korrigieren Fehler automatisch beim Speichern.

---

### 💡 Power-User Tipp: Der Qualitäts-Check

Nutze **`composer qa`** als All-in-One-Sicherheitscheck vor jedem Commit. Ein "grüner" Durchlauf bündelt alle Analysen, Architekturprüfungen und Tests und fungiert als dein persönliches **Qualitätssiegel**.
