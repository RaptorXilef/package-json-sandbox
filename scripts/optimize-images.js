import fs from 'node:fs/promises';
import path from 'node:path';
import { glob } from 'glob';
import sharp from 'sharp';

const INPUT_DIR = 'src/assets/images';
const OUTPUT_DIR = 'public/assets/img';

async function optimize() {
    // Sicherstellen, dass der Output-Ordner existiert
    await fs.mkdir(OUTPUT_DIR, { recursive: true });

    // Alle gängigen Bildformate finden
    const files = await glob(`${INPUT_DIR}/**/*.{jpg,jpeg,png,tiff,webp}`);

    console.log(`🚀 Starte Optimierung von ${files.length} Bildern...`);

    const promises = files.map(async (file) => {
        const fileName = path.basename(file, path.extname(file));
        const outputPath = path.join(OUTPUT_DIR, `${fileName}.webp`);

        return sharp(file)
            .webp({
                quality: 75,
                effort: 6, // Höchste Kompressionsstufe (langsamer, aber kleiner)
                smartSubsample: true,
                // Sharp erkennt automatisch, ob ein Alpha-Kanal (Transparenz)
                // nötig ist oder nicht.
            })
            .toFile(outputPath);
    });

    await Promise.all(promises);
    console.log('✅ Alle Bilder nach WebP (75%) konvertiert und optimiert!');
}

optimize().catch(console.error);
