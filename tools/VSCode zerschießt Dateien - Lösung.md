# VSCode Zerschießt Datei

Dass VS Code bei großen, dateiübergreifenden Änderungen (egal ob per F2 oder "Alle ersetzen") manchmal Dateien zerschießt, abschneidet oder mit dem Inhalt anderer Dateien überschreibt, ist ein bekanntes und extrem nerviges Problem.

Das passiert meistens, wenn sich verschiedene Prozesse in der IDE "verschlucken" (Race Conditions beim Schreiben auf die Festplatte). Hier sind die häufigsten Auslöser und wie du das in Zukunft verhinderst:

## 1. Der Haupttäter: "Format on Save" (Auto-Formatierung)

Wenn du 80 Dateien gleichzeitig änderst, speichert VS Code diese ab. Wenn du in deinen Einstellungen aktiviert hast, dass Dateien beim Speichern automatisch formatiert werden sollen (z. B. durch Prettier oder PHP-CS-Fixer), starten plötzlich 80 Formatierungs-Prozesse gleichzeitig. Der Extension Host von VS Code crasht dabei oft wegen Speichermangel (Out of Memory) und bricht den Schreibvorgang mitten in der Datei ab.

- **Die Lösung:** Wenn du ein massives Refactoring planst, deaktiviere kurz `editor.formatOnSave` in den VS Code Einstellungen, mach dein Refactoring, speichere alles und schalte es danach wieder an.

## 2. Ungespeicherte Änderungen (Dirty Files)

Wenn du viele Dateien im Editor geöffnet hast, die noch ungespeicherte Änderungen enthalten, und dann ein globales Refactoring anstößt, gerät der interne Puffer von VS Code durcheinander. Er versucht, die Änderungen auf der Festplatte und die im Arbeitsspeicher zu mergen.

- **Die Lösung:** Bevor du F2 oder "Alle ersetzen" drückst: **Speichere alle Dateien und schließe am besten alle Tabs.** (Shortcut: `Strg + K`, dann `W`). Ein sauberer Arbeitsspeicher verhindert Dateikorruption.

## 3. Datei-Überwacher (File Watcher) Konflikte

Tools wie XAMPP, Virenscanner oder Node.js (Webpack/Vite) überwachen Dateien auf Änderungen. Wenn VS Code 80 Dateien in einer Millisekunde ändert, sperren diese externen Programme manchmal kurz die Datei zum Lesen. VS Code darf nicht schreiben, stürzt ab und hinterlässt eine kaputte Datei.

- **Die Lösung:** Schließe Suchvorgänge auf das Nötigste ein. Wenn du "Alle ersetzen" nutzt, trage unter "Auszuschließende Dateien" unbedingt `vendor, storage, .git` ein. Das reduziert die Last massiv.
