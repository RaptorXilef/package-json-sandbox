### 1. VSCode: Einstellungen, Extensions & Keybindings

VSCode bietet hierfür zwei einfache Möglichkeiten. Die modernste Methode ist die **Settings Sync** Funktion.

- **Der Weg über Settings Sync (Empfohlen):**

    1. Öffne VSCode auf deinem Hauptrechner.
    2. Klicke unten links auf das Zahnrad (Einstellungen) -&gt; **"Turn on Settings Sync..."**.
    3. Melde dich mit deinem Microsoft- oder GitHub-Konto an.
    4. Wähle aus, was synchronisiert werden soll (Einstellungen, Tastaturkürzel, Extensions, etc.).
    5. Auf dem Laptop: Öffne VSCode, klicke wieder auf das Zahnrad und wähle **"Turn on Settings Sync..."** mit demselben Konto. Alles wird automatisch übernommen.
- **Der manuelle Weg (Dateibasiert):**Wenn du keine Cloud-Synchronisation möchtest, kannst du die Ordner kopieren:

  - **Windows:** `%APPDATA%\Code\User`
  - **macOS/Linux:** `~/.config/Code/User`
  - Kopiere den gesamten Inhalt (`settings.json`, `keybindings.json`, `snippets/` und den Ordner `extensions/`) auf den Laptop an die identische Stelle.

### 2. Node.js & NPM

Node.js ist eine installierte Anwendung, kein einfacher Ordner. Die beste Strategie ist hier der Einsatz eines **Version Managers**. Dies stellt sicher, dass die gleiche Version auf beiden Geräten läuft.

1. **Installiere nvm (Node Version Manager):**

    - Nutze [nvm-windows](https://github.com/coreybutler/nvm-windows) für Windows oder [nvm](https://github.com/nvm-sh/nvm) für macOS/Linux.
2. **Identische Version setzen:**

    - Prüfe auf dem Hauptrechner die Version: `node -v`
    - Installiere die gleiche Version auf dem Laptop via: `nvm install <version>`
3. **Globale Pakete:**

    - Listet auf dem Rechner deine globalen Pakete auf: `npm list -g --depth=0`
    - Installiere diese auf dem Laptop manuell nach.

### 3. Composer (PHP)

Composer ist ein Paketmanager, der global installiert wird.

1. **Installation:** Installiere Composer auf dem Laptop über <https://getcomposer.org/>
2. **Globale Pakete:**

    - Deine global installierten Composer-Pakete liegen meist unter `%APPDATA%\Composer` (Windows) oder `~/.composer/` (macOS/Linux).
    - Kopiere den Ordner `vendor` und die `composer.json` aus diesem Verzeichnis auf den Laptop, um die gleichen globalen Tools (z.B. PHPUnit, Laravel Installer) zur Verfügung zu haben.

### Zusammenfassung: Der "Profi-Check"

Damit die Entwicklung auf dem Laptop reibungslos funktioniert, beachte diese zwei zusätzlichen Punkte:

- **Projekt-Abhängigkeiten:** Deine lokalen `node_modules` oder `vendor`-Ordner solltest du **nicht** kopieren. Diese sind plattformabhängig (OS/Architektur). Navigiere stattdessen auf dem Laptop in deine Projektordner und führe einfach `npm install` und `composer install` aus. Die `package-lock.json` bzw. `composer.lock` sorgen dafür, dass exakt die gleichen Versionen wie auf dem Hauptrechner installiert werden.
- **Umgebungsvariablen:** Prüfe, ob du in deiner `Systemsteuerung` (Windows) oder `.zshrc`/`.bashrc` (macOS/Linux) Pfad-Variablen für PHP, Node oder andere Tools gesetzt hast, und übertrage diese manuell.
