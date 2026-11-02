# Illustration style guide

All pictures on the site share one look, aimed at **readers around ten years old**. The same
picture is used for every age version of a life.

## Look and feel

- **Illuminated storybook.** Flat, warm colors with clean dark-brown outlines, like a
  hand-painted children's picture book crossed with a Byzantine manuscript.
- **Palette:** cinnabar red `#b8322a`, lapis blue `#2c5596`, gold `#d9a521`, olive and
  leaf greens, ochre, parchment cream `#f6ecd2`. Skies are soft gradients.
- **Saints** wear golden halos and traditional clothing that matches their icons (bishops in
  white phelonions with black crosses and an omophorion, martyrs in armor with red cloaks,
  monks in dark robes and hoods, empresses with crowns and veils).
- **Lots of detail to discover:** trees (oaks, cypresses, olives, palms, birches, firs), flowers,
  animals (sheep, birds, deer, dogs, cats, horses, lions, bears), houses, villages, fortresses,
  palaces, churches, ships and people going about their day.
- **Gentle, never gory.** Martyrdom is shown through courage, light and angels, never through
  wounds or blood. Demons are shadowy shapes fleeing from light, not monsters.
- **No text inside the picture**, except short inscriptions that belong to the scene
  (for example ΕΝ ΤΟΥΤΩ ΝΙΚΑ). Captions are added by the website so they can be translated.
- **Format:** 3:2 landscape (1200×800) for scenes; square bust portrait on gold for medallions.

## Prompt template (for AI image generation)

```
A detailed children's storybook illustration in an illuminated-manuscript style,
flat warm colors with clean dark-brown outlines, gold halos, Byzantine iconographic
clothing, rich background detail (trees, flowers, animals, buildings), gentle and
reverent, suitable for a 10-year-old, no text, no gore. 3:2 landscape.
Scene: <scene description from i18n/en/meta.json "alt">
```

The current pictures are hand-built SVG art (see `scripts/art/`). Each saint's `prompts.md`
contains ready-to-use prompts for every scene if you want to replace them with painted or
AI-generated art; run `npm run images:generate` (see README).
