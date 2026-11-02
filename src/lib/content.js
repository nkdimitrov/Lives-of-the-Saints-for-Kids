// Loads the per-saint content data objects from /content/saints/<slug>/.
// Each saint folder is self-contained:
//   saint.json                 language-neutral metadata (feasts, scenes, sources)
//   i18n/<lang>/meta.json      name, title, summary, scene captions & alt text
//   i18n/<lang>/under6.md      super-short version for little ones
//   i18n/<lang>/6to12.md       storybook retelling
//   i18n/<lang>/12plus.md      full traditional account (after St Dimitri of Rostov)
//   images/*.svg               portrait + illustrated scenes (shared by all ages)
//   prompts.md                 image-generation prompts for each picture
import { marked } from 'marked';
import { DEFAULT_LANG } from './i18n.js';

const metaFiles = import.meta.glob('/content/saints/*/saint.json', { eager: true, import: 'default' });
const i18nFiles = import.meta.glob('/content/saints/*/i18n/*/meta.json', { eager: true, import: 'default' });
const textFiles = import.meta.glob('/content/saints/*/i18n/*/*.md', { eager: true, query: '?raw', import: 'default' });
const imageFiles = import.meta.glob('/content/saints/*/images/*.{svg,png,webp,jpg}', { eager: true, query: '?url', import: 'default' });

export const AGE_TIERS = [
  { id: 'under6', file: 'under6.md', icon: 'lamb' },
  { id: '6to12', file: '6to12.md', icon: 'lantern' },
  { id: '12plus', file: '12plus.md', icon: 'scroll' },
];
export const DEFAULT_TIER = '6to12';

const slugOf = (path) => path.split('/')[3];

function image(slug, file) {
  return imageFiles[`/content/saints/${slug}/images/${file}`] || null;
}

const SCENE_RE = /^\[\[scene:([a-z0-9-]+)\]\]\s*$/m;

/** Split markdown into a list of { type: 'html', html } and { type: 'scene', id } blocks. */
export function renderStory(md) {
  const parts = md.split(/^\[\[scene:([a-z0-9-]+)\]\]\s*$/m);
  const blocks = [];
  parts.forEach((part, i) => {
    if (i % 2 === 1) blocks.push({ type: 'scene', id: part });
    else if (part.trim()) blocks.push({ type: 'html', html: marked.parse(part.trim()) });
  });
  return blocks;
}

let cache = null;
export function loadSaints(lang = DEFAULT_LANG) {
  if (cache && cache.lang === lang) return cache.map;
  const map = new Map();
  for (const [path, meta] of Object.entries(metaFiles)) {
    const slug = slugOf(path);
    const text = i18nFiles[`/content/saints/${slug}/i18n/${lang}/meta.json`] || i18nFiles[`/content/saints/${slug}/i18n/${DEFAULT_LANG}/meta.json`];
    if (!text) continue;
    const versions = {};
    for (const tier of AGE_TIERS) {
      const md = textFiles[`/content/saints/${slug}/i18n/${lang}/${tier.file}`] ?? textFiles[`/content/saints/${slug}/i18n/${DEFAULT_LANG}/${tier.file}`];
      if (md) versions[tier.id] = { md, blocks: renderStory(md), words: md.split(/\s+/).filter(Boolean).length };
    }
    const scenes = Object.fromEntries((meta.scenes || []).map((s) => [s.id, {
      ...s,
      src: image(slug, s.image),
      caption: text.scenes?.[s.id]?.caption || '',
      alt: text.scenes?.[s.id]?.alt || text.scenes?.[s.id]?.caption || '',
    }]));
    map.set(slug, {
      slug, ...meta, ...text,
      portraitSrc: meta.portrait ? image(slug, meta.portrait) : null,
      scenes, sceneOrder: (meta.scenes || []).map((s) => s.id), versions,
      complete: AGE_TIERS.every((tier) => versions[tier.id]),
    });
  }
  cache = { lang, map };
  return map;
}

export function sceneMarkers(md) {
  const ids = [];
  const re = new RegExp(SCENE_RE.source, 'gm');
  let m;
  while ((m = re.exec(md))) ids.push(m[1]);
  return ids;
}
