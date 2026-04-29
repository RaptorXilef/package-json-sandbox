# ⚙️ Setup & Installation

Diese Anleitung führt dich durch die initiale Einrichtung deiner Entwicklungsumgebung.

## 📋 Anforderungen

Stelle sicher, dass die folgenden Komponenten auf deinem System installiert sind:

- **PHP:** >= 8.3 (Empfohlen: 8.4 für volle Feature-Unterstützung).
- **Extensions:** `mbstring`, `intl`, `xdebug` (für Testing/Coverage).
- **Composer:** Aktuelle Version (v2.x).
- **Node.js:** >= 20.x (LTS) & **npm**.
- **Webserver:** Apache (XAMPP), Nginx oder PHP Built-in Server.

## 🛠 Erstmalige Einrichtung

### 1. Projekt initialisieren

Führe den Master-Setup-Befehl aus. Dieser übernimmt die Erstellung der `.env`, installiert alle Abhängigkeiten und prüft die Ordnerrechte:

```bash
composer setup
```

### 2. Umgebung konfigurieren

Passe die Werte in deiner neu erstellten `.env` Datei an:

- `APP_ENV`: `local` oder `production`.
- `BASE_URL`: Deine lokale Entwicklungs-URL (z.B. `http://localhost/projekt/public`).

### 3. Frontend Assets

Installiere die Node-Module und starte den ersten Build:

```bash
npm install
npm run dev
```

## 🔍 Problemlösung

- **Berechtigungen:** Das Verzeichnis `.cache/` und `public/assets/` müssen für den Webserver beschreibbar sein.
- **Intelephense:** Solltest du in VS Code "Undefined Type" Fehler sehen, führe `Intelephense: Index workspace` über die Befehlspalette aus.
