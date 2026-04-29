import fs from 'node:fs';
import path from 'node:path';
import readline from 'node:readline';
import { fileURLToPath } from 'node:url';

// --- 1. Grundkonfiguration ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const basePath = path.resolve(__dirname, '..');
const debugFolder = path.join(basePath, '.debug');

let globalIncludeRootFiles = false;

// Version aus package.json lesen
let version = 'unknown';
try {
    const pkg = JSON.parse(fs.readFileSync(path.join(basePath, 'package.json'), 'utf-8'));
    version = pkg.version;
} catch (_e) {
    console.warn('⚠️ package.json nicht gefunden oder fehlerhaft.');
}

// --- 2. Filter & Ausschluss-Listen ---
const commonExclDirs = [
    'backup',
    'alt',
    'notizen',
    'notes',
    'vendor',
    'node_modules',
    '_Commits',
    'debug',
    'scripts',
    '.git',
    '.cache',
];

const configs = {
    JS: {
        name: 'JsCode',
        filter: /\.js$/,
        ext: '.js',
        exclDirs: [...commonExclDirs, 'public/assets'],
        exclFiles: [
            'svgo.config',
            'purgecss.config',
            'eslint.config',
            'commitlint.config',
            'min.js',
        ],
    },
    PHP: {
        name: 'PhpCode',
        filter: /\.php$/,
        ext: '.php',
        exclDirs: [...commonExclDirs, 'tests'],
        exclFiles: ['php-cs-fixer.dist', 'rector.php'],
    },
    PHTML: {
        name: 'PhtmlCode',
        filter: /\.phtml$/,
        ext: '.phtml',
        exclDirs: commonExclDirs,
        exclFiles: [],
    },
    SCSS: {
        name: 'ScssCode',
        filter: /\.scss$/,
        ext: '.scss',
        exclDirs: commonExclDirs,
        exclFiles: [],
    },
    PROJECT: {
        name: 'ProjektZusammenfassung',
        filter: /.*/,
        ext: '.txt',
        exclDirs: commonExclDirs,
        exclFiles: ['.lock', '-lock.json', 'cache'],
    },
};

// --- 3. Kern-Logik ---

/**
 * Durchsucht rekursiv Verzeichnisse
 */
function getFiles(dir, filter, exclDirs, exclFiles, includeRoot, currentFiles = []) {
    const files = fs.readdirSync(dir);

    for (const file of files) {
        const fullPath = path.join(dir, file);
        const relPath = path.relative(basePath, fullPath);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
            // Check ob Verzeichnis ausgeschlossen ist
            const isExcluded = exclDirs.some(
                (d) => file.toLowerCase().includes(d.toLowerCase()) || file.startsWith('.')
            );
            if (!isExcluded) {
                getFiles(fullPath, filter, exclDirs, exclFiles, includeRoot, currentFiles);
            }
        } else {
            // Datei-Validierung
            const isRootFile = path.dirname(fullPath) === basePath;
            if (!includeRoot && isRootFile) continue;

            const matchesFilter = filter.test(file);
            const isExcludedFile = exclFiles.some((f) =>
                file.toLowerCase().includes(f.toLowerCase())
            );

            if (matchesFilter && !isExcludedFile) {
                currentFiles.push({ fullPath, relPath });
            }
        }
    }
    return currentFiles;
}

function startFileCollection(configKey, silent = false) {
    const conf = configs[configKey];
    const timestamp = new Date().toISOString().replace(/[:T]/g, '-').split('.')[0];
    const outputName = `${conf.name}_v.${version}_${timestamp}${conf.ext}`;
    const outputPath = path.join(debugFolder, outputName);

    if (!fs.existsSync(debugFolder)) fs.mkdirSync(debugFolder, { recursive: true });

    if (!silent) console.log(`\n🚀 Starte Sammlung: ${conf.name}...`);

    const foundFiles = getFiles(
        basePath,
        conf.filter,
        conf.exclDirs,
        conf.exclFiles,
        globalIncludeRootFiles
    );

    if (foundFiles.length === 0) {
        if (!silent) console.log('❌ Keine Dateien gefunden.');
        return;
    }

    let combinedContent = '';
    for (const file of foundFiles) {
        try {
            const content = fs.readFileSync(file.fullPath, 'utf-8');
            combinedContent += `// ========== START FILE: [${file.relPath}] ==========\n`;
            combinedContent += `${content}\n`;
            combinedContent += `// ========== END FILE: [${file.relPath}] ==========\n\n`;
            if (!silent) console.log(` + ${file.relPath}`);
        } catch (_e) {
            if (!silent) console.log(` ! Überspringe (Binär?): ${file.relPath}`);
        }
    }

    fs.writeFileSync(outputPath, combinedContent, 'utf-8');
    console.log(`✅ Erfolg: ${outputName} erstellt (${foundFiles.length} Dateien).`);
}

// --- 4. CLI & Menü Handling ---
const args = process.argv.slice(2);

if (args.length > 0) {
    // --- STUMMER MODUS (CLI) ---
    if (args.includes('--root')) globalIncludeRootFiles = true;

    if (args.includes('--all')) {
        ['JS', 'PHP', 'PHTML', 'SCSS'].forEach((k) => {
            startFileCollection(k, true);
        });
    } else {
        if (args.includes('--js')) startFileCollection('JS', true);
        if (args.includes('--php')) startFileCollection('PHP', true);
        if (args.includes('--phtml')) startFileCollection('PHTML', true);
        if (args.includes('--scss')) startFileCollection('SCSS', true);
        if (args.includes('--project')) startFileCollection('PROJECT', true);
    }
    process.exit(0);
} else {
    // --- INTERAKTIVER MODUS ---
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    const showMenu = () => {
        console.clear();
        console.log('===============================================');
        console.log('    DATEI-ZUSAMMENFASSUNG (NodeJS Version)      ');
        console.log(`    Root: ${basePath}`);
        console.log(`    Version: ${version}`);
        console.log('===============================================');
        console.log('1) JavaScript (*.js)');
        console.log('2) PHP (*.php)');
        console.log('3) PHTML (*.phtml)');
        console.log('4) SCSS (*.scss)');
        console.log('5) PROJEKT-ZUSAMMENFASSUNG (All -> .txt)');
        console.log('-----------------------------------------------');
        console.log(`T) Toggle Root-Files: ${globalIncludeRootFiles ? 'AN' : 'AUS'}`);
        console.log('A) ALLE nacheinander (1-4)');
        console.log('Q) Beenden');
        console.log('-----------------------------------------------');

        rl.question('Wähle eine Option: ', (answer) => {
            const choice = answer.toUpperCase();

            if (choice === 'Q') process.exit();
            if (choice === 'T') {
                globalIncludeRootFiles = !globalIncludeRootFiles;
                showMenu();
                return;
            }
            if (choice === 'A') {
                ['JS', 'PHP', 'PHTML', 'SCSS'].forEach((k) => {
                    startFileCollection(k);
                });
                rl.question('\nFertig. Drücke Enter...', showMenu);
                return;
            }

            const map = { 1: 'JS', 2: 'PHP', 3: 'PHTML', 4: 'SCSS', 5: 'PROJECT' };
            if (map[choice]) {
                startFileCollection(map[choice]);
                rl.question('\nFertig. Drücke Enter...', showMenu);
            } else {
                console.log('Ungültige Auswahl!');
                setTimeout(showMenu, 1000);
            }
        });
    };
    showMenu();
}
