# Contributing to PHP (OOP/DTO) & JS Dev-Env Blueprint

Vielen Dank, dass du helfen möchtest, diesen PHP (OOP/DTO) & JS Dev-Env Blueprint noch besser und stabiler zu machen!
Um die extrem hohe Code-Qualität ("Perfection") der Architektur zu erhalten, befolge bitte diesen Workflow:

## 🛠️ Development Setup

1. Clone das Repository lokal.
2. Führe `composer install` und `composer setup` aus (installiert PHP-Tools & Git-Hooks).
3. Führe `npm install` und `npm run setup` aus (Frontend-Assets, falls vorhanden).

## 📏 Coding Standards

Wir nutzen strikte Standards. Dein Code wird bei einem Pull Request via CI/CD geprüft und nur akzeptiert, wenn alle Checks grün sind:

* **PHP:** PER-CS via `composer analyze:cs`
* **Static Analysis:** PHPStan (Level 6+) via `composer analyze:phpstan`
* **Architektur:** Beachte die Vorgaben in der `deptrac.yaml` (Clean Architecture).

## 🧪 Testing

Jeder neue Code benötigt entsprechende Tests:

* **Unit-Tests:** `vendor/bin/phpunit --testsuite Unit`
* **Mutation Testing:** `vendor/bin/infection` (Ziel ist eine durchgehend hohe MSI-Rate).

## 📝 Commits

Wir nutzen **Conventional Commits**.
*Beispiel:* `feat(core): add new abstract DTO validation layer`

## ⚖️ Lizenzvereinbarung für Mitwirkende

Mit dem Einreichen eines Pull Requests (Beitrag zum Code dieses Blueprints) erklärst du dich damit einverstanden, dass dein beigesteuerter Code unter den Bedingungen der **CC-BY-NC-SA-4.0** (inklusive der in der `LICENSE.md` definierten Nutzungsausnahme) lizenziert wird.

**Pflicht:** Um deinen Code einzureichen, musst du zwingend den Satz **"I accept the license terms (CC-BY-NC-SA-4.0)"** in die Beschreibung deines Pull Requests schreiben.
