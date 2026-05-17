import sharp from "sharp";
import { readFileSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const svgPath = join(root, "public", "logo.svg");
const iconsDir = join(root, "src-tauri", "icons");

const svgBuffer = readFileSync(svgPath);

// Generate PNG icons at various sizes
const sizes = [
  { name: "32x32.png", size: 32 },
  { name: "128x128.png", size: 128 },
  { name: "128x128@2x.png", size: 256 },
  { name: "icon.png", size: 512 },        // for Capacitor/Android
  { name: "Square150x150Logo.png", size: 150 }, // for Windows
  { name: "Square310x310Logo.png", size: 310 }, // for Windows
  { name: "Square44x44Logo.png", size: 44 },    // for Windows
  { name: "StoreLogo.png", size: 50 },           // for Windows
];

async function generateIcons() {
  // Generate PNGs
  for (const { name, size } of sizes) {
    await sharp(svgBuffer)
      .resize(size, size)
      .png()
      .toFile(join(iconsDir, name));
    console.log(`  ✓ ${name} (${size}x${size})`);
  }

  // Generate ICO (Windows) - contains 16, 32, 48, 256 sizes
  // ICO format: we'll create a multi-size ICO manually
  const icoSizes = [16, 32, 48, 256];
  const pngBuffers = await Promise.all(
    icoSizes.map(async (s) =>
      sharp(svgBuffer).resize(s, s).png().toBuffer()
    )
  );

  // Build ICO file
  const icoBuffer = createIco(pngBuffers, icoSizes);
  writeFileSync(join(iconsDir, "icon.ico"), icoBuffer);
  console.log("  ✓ icon.ico (16,32,48,256)");

  // Generate ICNS placeholder (macOS) - just use the 512px PNG
  // Real ICNS needs a special format, but Tauri accepts PNG fallback
  const png512 = await sharp(svgBuffer).resize(512, 512).png().toBuffer();
  writeFileSync(join(iconsDir, "icon.icns"), png512);
  console.log("  ✓ icon.icns (512x512 PNG fallback)");

  console.log("\nAll icons generated!");
}

function createIco(pngBuffers, sizes) {
  // ICO header: 6 bytes
  // ICO entry: 16 bytes per image
  // Then PNG data
  const numImages = pngBuffers.length;
  const headerSize = 6;
  const entrySize = 16;
  const dataOffset = headerSize + entrySize * numImages;

  let totalSize = dataOffset;
  for (const buf of pngBuffers) totalSize += buf.length;

  const ico = Buffer.alloc(totalSize);

  // Header
  ico.writeUInt16LE(0, 0);      // reserved
  ico.writeUInt16LE(1, 2);      // type: 1 = ICO
  ico.writeUInt16LE(numImages, 4); // count

  let currentOffset = dataOffset;
  for (let i = 0; i < numImages; i++) {
    const size = sizes[i];
    const pngBuf = pngBuffers[i];
    const entryOffset = headerSize + i * entrySize;

    ico.writeUInt8(size >= 256 ? 0 : size, entryOffset);     // width (0 = 256)
    ico.writeUInt8(size >= 256 ? 0 : size, entryOffset + 1); // height
    ico.writeUInt8(0, entryOffset + 2);                       // color palette
    ico.writeUInt8(0, entryOffset + 3);                       // reserved
    ico.writeUInt16LE(1, entryOffset + 4);                    // color planes
    ico.writeUInt16LE(32, entryOffset + 6);                   // bits per pixel
    ico.writeUInt32LE(pngBuf.length, entryOffset + 8);        // data size
    ico.writeUInt32LE(currentOffset, entryOffset + 12);       // data offset

    pngBuf.copy(ico, currentOffset);
    currentOffset += pngBuf.length;
  }

  return ico;
}

generateIcons().catch(console.error);
