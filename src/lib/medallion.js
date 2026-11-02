// Decide which medallion to show for a calendar commemoration.
export function kindFor(entry) {
  const n = entry.name || '';
  if (entry.rank === 'pascha') return 'pascha';
  if (/Theotokos/.test(n)) return 'theotokos';
  if (/Archangel|Bodiless/.test(n)) return 'angel';
  if (/(our Lord|Christ\b|Theophany|Pentecost|Ascension|Palm Sunday|Precious Cross|Holy Cross|Elevation|Transfiguration|Circumcision|Great and Holy|Lord)/.test(n)) return 'lord';
  return 'saint';
}

export function medallionFor(entry, saints) {
  const s = entry.slug ? saints.get(entry.slug) : null;
  if (s && s.portraitSrc) return { src: s.portraitSrc, kind: 'saint', complete: s.complete };
  return { src: null, kind: kindFor(entry), complete: false };
}

const RANK_SCORE = { pascha: 4, great: 3, major: 2, normal: 1 };
/** The commemoration shown in the day box. */
export function principalOf(day, saints) {
  let best = null, bestScore = -1;
  day.commemorations.forEach((c, i) => {
    const s = c.slug ? saints.get(c.slug) : null;
    const score = RANK_SCORE[c.rank] * 100 + (s?.complete ? 50 : 0) + (c.movable ? 30 : 0) + (c.slug ? 10 : 0) - i * 0.01;
    if (score > bestScore) { bestScore = score; best = c; }
  });
  return best;
}
