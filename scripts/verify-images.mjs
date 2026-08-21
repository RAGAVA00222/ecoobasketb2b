import fs from 'fs';
import path from 'path';
import { glob } from 'glob';
import { fileURLToPath } from 'url';

// Get __dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Project root is one level up from /scripts
const projectRoot = path.resolve(__dirname, '..');
const publicDir = path.join(projectRoot, 'public');
// glob requires POSIX separators. On Windows path.join() produces backslashes,
// which matched nothing at all - the script then reported "0 references found"
// and exited 0, so a broken image could never fail the check.
const toPosix = (p) => p.split(path.sep).join('/');
const sourceDirs = [
    toPosix(path.join(projectRoot, 'app')) + '/**/*.{ts,tsx,js,jsx}',
    toPosix(path.join(projectRoot, 'components')) + '/**/*.{ts,tsx,js,jsx}',
    toPosix(path.join(projectRoot, 'lib')) + '/**/*.{ts,tsx,js,jsx}',
];

// Regex to find image paths like "/images/..."
const imagePathRegex = /["'](\/images\/[^"']+\.(?:png|jpg|jpeg|webp|svg|gif))["']/g;

async function verifyImageAssets() {
    console.log('🔍 Starting image asset verification...');

    const imagePaths = new Set();
    let filesWithImages = 0;

    // 1. Find all source files
    const sourceFiles = await glob(sourceDirs, { nodir: true });

    // 2. Parse files to extract image paths
    for (const file of sourceFiles) {
        const content = fs.readFileSync(file, 'utf-8');
        const matches = content.matchAll(imagePathRegex);
        let foundInFile = false;

        for (const match of matches) {
            imagePaths.add(match[1]);
            foundInFile = true;
        }
        if (foundInFile) {
            filesWithImages++;
        }
    }

    console.log(`🔎 Scanned ${sourceFiles.length} source files.`);
    console.log(`🔎 Found ${imagePaths.size} unique image references in ${filesWithImages} files.`);

    if (sourceFiles.length === 0) {
        console.error('❌ Error: no source files matched. The glob patterns are wrong; refusing to report success.');
        process.exit(1);
    }

    // 3. Check if each image exists in the public directory
    const missingImages = [];
    for (const imagePath of imagePaths) {
        const filePath = path.join(publicDir, imagePath.substring(1));
        if (!fs.existsSync(filePath)) {
            missingImages.push(imagePath);
        }
    }

    // 4. Report results
    console.log('\n--- Verification Results ---');
    if (missingImages.length === 0) {
        console.log(`✅ Success! All ${imagePaths.size} referenced images were found.`);
    } else {
        console.error(`❌ Error: Found ${missingImages.length} missing image(s):`);
        missingImages.forEach(p => console.error(`  - ${p}`));
        console.log(`\nPlease add these files to your 'public' directory or correct the paths in your code.`);
        process.exit(1); // Exit with error code to fail CI/CD pipelines
    }
}

verifyImageAssets().catch(err => {
    console.error('An unexpected error occurred during image verification:', err);
    process.exit(1);
});