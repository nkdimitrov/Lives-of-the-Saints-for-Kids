// Writes prompts.md for every saint and, if an API key is configured, generates
// raster versions of every scene.
//
//   node scripts/generate-images.mjs                 -> (re)write content/saints/*/prompts.md
//   OPENAI_API_KEY=... node scripts/generate-images.mjs --generate [slug]
//
// Generated images are saved as images/<scene>.png next to the SVGs and the saint's
// saint.json is updated to point at them. Review every picture before publishing.
import { readdirSync, readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const saintsDir = join(root, 'content/saints');
const STYLE = 'A detailed children\'s storybook illustration in an illuminated-manuscript style, flat warm colors with clean dark-brown outlines, gold halos, Byzantine iconographic clothing, rich background detail (trees, flowers, animals, buildings), gentle and reverent, suitable for a 10-year-old, no text, no gore. 3:2 landscape.';
const args = process.argv.slice(2);
const generate = args.includes('--generate');
const only = args.find((a) => !a.startsWith('--'));

for (const slug of readdirSync(saintsDir).filter((d) => existsSync(join(saintsDir, d, 'saint.json')))) {
  if (only && slug !== only) continue;
  const saint = JSON.parse(readFileSync(join(saintsDir, slug, 'saint.json'), 'utf8'));
  const meta = JSON.parse(readFileSync(join(saintsDir, slug, 'i18n/en/meta.json'), 'utf8'));
  let md = `# Image prompts — ${meta.name}\n\nStyle: see ../../STYLE-GUIDE.md\n\n`;
  const prompts = [];
  for (const s of saint.scenes) {
    const text = meta.scenes[s.id];
    const prompt = `${STYLE}\nScene: ${text.alt}`;
    prompts.push({ scene: s, prompt });
    md += `## ${s.id}\n\n**Caption:** ${text.caption}\n\n\`\`\`\n${prompt}\n\`\`\`\n\n`;
  }
  md += `## portrait\n\n\`\`\`\n${STYLE.replace('3:2 landscape.', 'Square bust portrait on a gold background, like a small round icon medallion.')}\nSubject: ${meta.name}, ${meta.title}.\n\`\`\`\n`;
  writeFileSync(join(saintsDir, slug, 'prompts.md'), md);
  console.log(`prompts.md  ${slug}`);

  if (!generate) continue;
  const key = process.env.OPENAI_API_KEY;
  if (!key) { console.error('Set OPENAI_API_KEY to generate images (or adapt this script to your provider).'); process.exit(1); }
  for (const { scene, prompt } of prompts) {
    const res = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${key}` },
      body: JSON.stringify({ model: process.env.IMAGE_MODEL || 'gpt-image-1', prompt, size: '1536x1024', n: 1 }),
    });
    if (!res.ok) { console.error(`  ${scene.id}: ${res.status} ${await res.text()}`); continue; }
    const json = await res.json();
    const file = scene.image.replace(/\.svg$/, '.png');
    writeFileSync(join(saintsDir, slug, 'images', file), Buffer.from(json.data[0].b64_json, 'base64'));
    scene.image = file;
    console.log(`  generated ${slug}/images/${file}`);
  }
  writeFileSync(join(saintsDir, slug, 'saint.json'), JSON.stringify(saint, null, 2) + '\n');
}
