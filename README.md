# Lives of the Saints for Kids

An illustrated **Orthodox Christian calendar for 2027**, with the lives of the saints
retold for three ages of readers.

- **Calendar.** Every day of 2027 lists the saints and feasts of the day (New / Revised Julian
  calendar, as used by the Greek Orthodox Archdiocese of America), feast ranks and a fasting
  guide. Tap a day to see all its commemorations; tap a saint to read their life.
- **Three versions of every life**, chosen with tabs at the top of the page; the reader's
  choice is remembered:
  - **Little Ones (under 6):** a few read-aloud sentences.
  - **Young Readers (6–12):** a storybook retelling.
  - **Older Readers (12+):** the full traditional account, following *St Dimitri of Rostov's
    Lives of the Saints*.
- **Illustrations:** the most famous moments of each life, shared by all three versions and
  drawn for about ten-year-olds, with lots of trees, animals, villages, fortresses and palaces
  to discover. Every month also has its own seasonal landscape.

> **Status: first draft.** Twelve saints have full illustrated lives: Basil the Great,
> Anthony the Great, Mary of Egypt, George, Cyril & Methodius, Constantine & Helen, Elijah,
> Panteleimon, Sergius of Radonezh, Demetrios, Catherine and Nicholas. Every other saint in the
> calendar has a "coming soon" page. The texts are our own retellings and **have not yet been
> reviewed by clergy**. Check the daily listings against the
> [GOARCH calendar](https://www.goarch.org/chapel/calendar) before relying on them.

## Running it

```bash
npm install
```

```bash
npm run dev
```

```bash
npm run build && npm run preview
```

Requires Node 22.23 or newer. The site builds to `dist/` as plain static files.

Deployment: `.github/workflows/deploy.yml` publishes to GitHub Pages on every push to `main`.
Enable it in **Settings → Pages → Source: GitHub Actions**. To host somewhere else, set
`SITE_URL` and `BASE_PATH` (for example `BASE_PATH=/` for a custom domain) before building.

## How the project is organised

```
content/saints/<slug>/          one self-contained "data object" per saint
  saint.json                    language-neutral data: feasts, scenes, portrait, source
  i18n/en/meta.json             name, title, summary, source note, scene captions & alt text
  i18n/en/under6.md             Little Ones version
  i18n/en/6to12.md              Young Readers version
  i18n/en/12plus.md             Older Readers version (after St Dimitri of Rostov)
  images/portrait.svg           medallion portrait
  images/scene-*.svg            illustrated scenes (shared by every version)
  prompts.md                    image-generation prompts for each picture
content/STYLE-GUIDE.md          the illustration style shared by all pictures

src/data/menaion.json           the fixed-date calendar (saints for every day of the year)
src/lib/calendar.js             Pascha, movable feasts, transfers, feast ranks and fasting
src/lib/content.js              loads the saint data objects
src/pages/                      home, calendar months, saint pages, saints index, about
scripts/art/                    the SVG art kit and one module per saint / site picture
```

### Story files

The story files are Markdown. A picture is placed with a marker on its own line:

```markdown
Nicholas prayed to God, and the wind and the waves grew still.

[[scene:storm]]
```

The scene ids come from `saint.json`. Captions and alt text live in `i18n/<lang>/meta.json`,
so pictures never contain text that would need translating.

### Adding a saint

1. Create `content/saints/<slug>/` with the files listed above. Copy an existing saint as a
   template. The `<slug>` must match the `@slug` used in `src/data/menaion.json`.
2. Write the three versions. Use `[[scene:<id>]]` markers to place the pictures.
3. Draw the pictures. Add `scripts/art/scenes/<slug>.mjs`, using the kit in
   `scripts/art/kit.mjs`, then run:

   ```bash
   npm run art -- <slug>
   ```

   Or drop in painted or AI-generated images (see below).
4. Check that everything is complete:

   ```bash
   npm run check:content
   ```

### Adding a language

Add `i18n/<lang>/` beside `i18n/en/` in each saint folder, and a UI string file
`src/i18n/<lang>.json`. Missing files fall back to English.

### Pictures

The current pictures are SVG illustrations built in code (`npm run art` rebuilds them all).
To preview them as PNGs:

```bash
npm run art:preview -- <out-dir> content/saints/<slug>/images/*.svg
```

To replace them with painted or AI-generated art:

1. Regenerate the prompt files:

   ```bash
   npm run images:generate
   ```

2. Optionally generate the images themselves with an OpenAI key. This writes `images/*.png` and
   points `saint.json` at the new files. Review every picture before publishing.

   ```bash
   OPENAI_API_KEY=... npm run images:generate -- --generate <slug>
   ```

### The calendar

`src/data/menaion.json` holds the fixed feasts, one line per commemoration:

```
"Name — subtitle #rank @slug"
```

- `#great` marks one of the Twelve Great Feasts and `#major` a red-letter day.
- `@slug` links the line to a saint page, and the same slug can appear on several dates.

Movable feasts are computed from Pascha in `src/lib/calendar.js`, so the calendar can be
generated for other years too.

## Sources and thanks

- St Dimitri of Rostov, *Lives of the Saints* (Chet'i-Minei). The Russian original is in the
  public domain; the English texts here are our own retellings.
- The Synaxarion of the Orthodox Church, and the Greek Orthodox Archdiocese of America's online
  calendar, for the daily listings.
- Holy Scripture, for the Prophet Elijah.
