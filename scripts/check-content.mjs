// Validates every saint content folder. Run: npm run check:content
import { readdirSync, readFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dir = join(root, 'content/saints');
const TIERS = ['under6.md', '6to12.md', '12plus.md'];
const LIMITS = { 'under6.md': [40, 400], '6to12.md': [300, 2200], '12plus.md': [900, 6000] };
const menaion = JSON.parse(readFileSync(join(root, 'src/data/menaion.json'), 'utf8'));
const slugsInCalendar = new Set(Object.values(menaion).flat().filter((e) => typeof e === 'string').map((e) => (e.match(/@([a-z0-9-]+)/) || [])[1]).filter(Boolean));
let errors = 0, warnings = 0;
const err = (s, m) => { errors++; console.error(`✗ ${s}: ${m}`); };
const warn = (s, m) => { warnings++; console.warn(`! ${s}: ${m}`); };

for (const slug of readdirSync(dir).filter((d) => existsSync(join(dir, d, 'saint.json')))) {
  const base = join(dir, slug);
  const saint = JSON.parse(readFileSync(join(base, 'saint.json'), 'utf8'));
  if (saint.slug !== slug) err(slug, `saint.json slug "${saint.slug}" does not match folder`);
  if (!slugsInCalendar.has(slug)) warn(slug, 'not referenced by any @slug in src/data/menaion.json');
  const ids = new Set((saint.scenes || []).map((s) => s.id));
  for (const s of saint.scenes || []) if (!existsSync(join(base, 'images', s.image))) err(slug, `missing image images/${s.image}`);
  if (saint.portrait && !existsSync(join(base, 'images', saint.portrait))) err(slug, `missing portrait images/${saint.portrait}`);
  for (const lang of readdirSync(join(base, 'i18n'))) {
    const metaPath = join(base, 'i18n', lang, 'meta.json');
    if (!existsSync(metaPath)) { err(slug, `i18n/${lang}/meta.json missing`); continue; }
    const meta = JSON.parse(readFileSync(metaPath, 'utf8'));
    for (const k of ['name', 'title', 'summary', 'sourceNote', 'feastLabel']) if (!meta[k]) err(slug, `${lang}/meta.json missing "${k}"`);
    for (const id of ids) if (!meta.scenes?.[id]?.caption || !meta.scenes?.[id]?.alt) err(slug, `${lang}/meta.json missing caption/alt for scene "${id}"`);
    for (const tier of TIERS) {
      const p = join(base, 'i18n', lang, tier);
      if (!existsSync(p)) { err(slug, `${lang}/${tier} missing`); continue; }
      const md = readFileSync(p, 'utf8');
      const used = [...md.matchAll(/^\[\[scene:([a-z0-9-]+)\]\]\s*$/gm)].map((m) => m[1]);
      for (const u of used) if (!ids.has(u)) err(slug, `${lang}/${tier} references unknown scene "${u}"`);
      for (const id of ids) if (!used.includes(id)) warn(slug, `${lang}/${tier} does not show scene "${id}"`);
      const words = md.replace(/\[\[scene:[^\]]+\]\]/g, '').split(/\s+/).filter(Boolean).length;
      const [min, max] = LIMITS[tier];
      if (words < min || words > max) warn(slug, `${lang}/${tier} has ${words} words (expected ${min}–${max})`);
    }
  }
  console.log(`✓ ${slug}`);
}
console.log(`\n${errors} error(s), ${warnings} warning(s)`);
process.exit(errors ? 1 : 0);
