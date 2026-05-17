import sharp from "sharp";
import { readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const svgPath = join(root, "public", "logo.svg");
const resDir = join(root, "android", "app", "src", "main", "res");

const svgBuffer = readFileSync(svgPath);

// Android mipmap sizes for launcher icons
const mipmaps = [
  { dir: "mipmap-mdpi", size: 48 },
  { dir: "mipmap-hdpi", size: 72 },
  { dir: "mipmap-xhdpi", size: 96 },
  { dir: "mipmap-xxhdpi", size: 144 },
  { dir: "mipmap-xxxhdpi", size: 192 },
];

// Foreground icons for adaptive icons (needs padding for safe zone)
const foregroundSize = {
  "mipmap-mdpi": 108,
  "mipmap-hdpi": 162,
  "mipmap-xhdpi": 216,
  "mipmap-xxhdpi": 324,
  "mipmap-xxxhdpi": 432,
};

async function generateAndroidIcons() {
  console.log("Generating Android launcher icons...\n");

  for (const { dir, size } of mipmaps) {
    // Standard icon
    await sharp(svgBuffer)
      .resize(size, size)
      .png()
      .toFile(join(resDir, dir, "ic_launcher.png"));
    console.log(`  ✓ ${dir}/ic_launcher.png (${size}x${size})`);

    // Round icon
    const roundSize = size;
    const circleSvg = `<svg width="${roundSize}" height="${roundSize}"><circle cx="${roundSize/2}" cy="${roundSize/2}" r="${roundSize/2}" fill="white"/></svg>`;
    await sharp(svgBuffer)
      .resize(roundSize, roundSize)
      .composite([{
        input: Buffer.from(circleSvg),
        blend: "dest-in"
      }])
      .png()
      .toFile(join(resDir, dir, "ic_launcher_round.png"));
    console.log(`  ✓ ${dir}/ic_launcher_round.png (${roundSize}x${roundSize})`);

    // Foreground for adaptive icons
    const fgSize = foregroundSize[dir];
    const iconInFg = Math.round(fgSize * 0.6); // icon takes 60% of foreground
    const padding = Math.round((fgSize - iconInFg) / 2);

    await sharp(svgBuffer)
      .resize(iconInFg, iconInFg)
      .extend({
        top: padding,
        bottom: fgSize - iconInFg - padding,
        left: padding,
        right: fgSize - iconInFg - padding,
        background: { r: 0, g: 0, b: 0, alpha: 0 }
      })
      .png()
      .toFile(join(resDir, dir, "ic_launcher_foreground.png"));
    console.log(`  ✓ ${dir}/ic_launcher_foreground.png (${fgSize}x${fgSize})`);
  }

  console.log("\nAll Android icons generated!");
}

generateAndroidIcons().catch(console.error);
