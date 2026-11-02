// Builds every SVG illustration from its source module.
//   node scripts/art/build-art.mjs            -> all art
//   node scripts/art/build-art.mjs nicholas   -> only modules whose name contains "nicholas"
// Saint art goes into content/saints/<slug>/images/, site art into public/art/.
import { readdirSync, mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const filter = process.argv[2] || '';
const written = [];

const sceneDir = join(root, 'scripts/art/scenes');
for (const file of readdirSync(sceneDir).filter((f) => f.endsWith('.mjs')).sort()) {
  if (filter && !file.includes(filter)) continue;
  const mod = await import(pathToFileURL(join(sceneDir, file)).href);
  const outDir = mod.outDir ? join(root, mod.outDir) : join(root, 'content/saints', mod.slug, 'images');
  mkdirSync(outDir, { recursive: true });
  for (const [name, draw] of Object.entries(mod.art)) {
    const out = join(outDir, name);
    mkdirSync(dirname(out), { recursive: true });
    writeFileSync(out, draw());
    written.push(out.replace(root + '/', ''));
  }
}
console.log(`Wrote ${written.length} files`);
for (const w of written) console.log('  ' + w);
