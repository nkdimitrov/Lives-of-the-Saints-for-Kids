// Render SVG files to PNG for visual review: node scripts/art/preview.mjs out-dir file1.svg [file2.svg ...]
import { createRequire } from 'node:module';
import { execSync } from 'node:child_process';
import { readFileSync, mkdirSync } from 'node:fs';
import { basename, resolve } from 'node:path';

const [outDir, ...files] = process.argv.slice(2);
if (!outDir || !files.length) {
  console.error('usage: node scripts/art/preview.mjs <out-dir> <file.svg>...');
  process.exit(1);
}
const require = createRequire(import.meta.url);
let pw;
try { pw = require('playwright'); } catch { pw = require(execSync('npm root -g').toString().trim() + '/playwright'); }
const { chromium } = pw;
mkdirSync(outDir, { recursive: true });
const browser = await chromium.launch();
const page = await browser.newPage();
for (const file of files) {
  const svg = readFileSync(file, 'utf8');
  const m = svg.match(/viewBox="0 0 (\d+) (\d+)"/);
  const [w, h] = m ? [+m[1], +m[2]] : [1200, 800];
  await page.setViewportSize({ width: w, height: h });
  await page.setContent(`<html><body style="margin:0">${svg}</body></html>`);
  const out = resolve(outDir, basename(file).replace(/\.svg$/, '.png'));
  await page.screenshot({ path: out });
  console.log(out);
}
await browser.close();
