# 🏛 Architektur & Struktur

Das Projekt folgt einer strengen Schichtentrennung, um Wartbarkeit und Testbarkeit zu garantieren.

## 📂 Verzeichnisstruktur

- **`src/`**: Der Kern der Anwendung.
  - **`Bootstrap/`**: App-Initialisierung & Container-Logik.
  - **`Services/`**: Geschäftslogik & Domänen-Operationen.
- **`public/`**: Einziger öffentlich erreichbarer Ordner (Webroot).
- **`config/`**: Zentrale Konfigurationsdateien.
- **`tests/`**: Unit- und Feature-Tests (Pest).

## 🛡 Schichtenschutz (Deptrac)

Wir nutzen **Deptrac**, um ungewollte Abhängigkeiten zu verhindern. Die Regeln sind in `deptrac.yaml.dist` definiert:

- `Services` dürfen keine `Controller`-Logik kennen.
- `Bootstrap` ist die einzige Schicht, die alles initialisieren darf.

## 🧩 Konfigurations-Pattern

Tools wie **Biome** und **Stylelint** nutzen ein `*.template.*` Pattern. Dies erlaubt es, den Blueprint-Kern zu aktualisieren, während projektspezifische Anpassungen in der lokalen `biome.json` erhalten bleiben.
