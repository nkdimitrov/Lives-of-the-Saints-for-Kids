// Orthodox calendar engine (New / Revised Julian calendar for fixed feasts,
// Julian Paschalion for the movable cycle — the practice of the Greek Orthodox
// Archdiocese of America and most New Calendar churches).
import menaion from '../data/menaion.json' with { type: 'json' };

export const YEAR = 2027;

const MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const WEEKDAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
export { MONTH_NAMES, WEEKDAYS };

const RANK_ORDER = { pascha: 4, great: 3, major: 2, normal: 1 };

// ---------- dates ----------
const DAY = 86400000;
export const utc = (y, m, d) => new Date(Date.UTC(y, m - 1, d));
export const iso = (date) => date.toISOString().slice(0, 10);
export const addDays = (date, n) => new Date(date.getTime() + n * DAY);
export const mmdd = (date) => iso(date).slice(5);

/** Orthodox Pascha (Julian computation, converted to the civil Gregorian date). */
export function orthodoxPascha(year) {
  const a = year % 4, b = year % 7, c = year % 19;
  const d = (19 * c + 15) % 30;
  const e = (2 * a + 4 * b - d + 34) % 7;
  const month = Math.floor((d + e + 114) / 31);
  const day = ((d + e + 114) % 31) + 1;
  // Julian → Gregorian offset (13 days for 1900–2099)
  const offset = Math.floor(year / 100) - Math.floor(year / 400) - 2;
  return addDays(utc(year, month, day), offset);
}

/** Sunday that falls between two dates (inclusive), same year. */
function sundayBetween(year, m1, d1, m2, d2) {
  for (let t = utc(year, m1, d1); t <= utc(year, m2, d2); t = addDays(t, 1)) if (t.getUTCDay() === 0) return t;
  return null;
}

// ---------- parsing ----------
const NON_SAINT = /^(Forefeast|Leave-taking|Eve of|Veneration|Placing|Procession|Dedication|Consecration|Commemoration|The Sign|Return of|Translation of|Finding of|Uncovering of|Repose of|The Holy Image|The Miracle|Beginning of)/;

export function slugify(s) {
  return s
    .normalize('NFKD').replace(/[̀-ͯ]/g, '')
    .toLowerCase().replace(/\(.*?\)/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
    .split('-').slice(0, 7).join('-');
}

export function parseEntry(str) {
  let rest = str;
  let rank = 'normal', slug = null;
  rest = rest.replace(/\s#(great|major|pascha)\b/, (_, r) => { rank = r; return ''; });
  rest = rest.replace(/\s@([a-z0-9-]+)/, (_, s) => { slug = s; return ''; });
  const [name, subtitle] = rest.split(' — ').map((x) => x && x.trim());
  if (!slug && !NON_SAINT.test(name)) slug = slugify(name.split(/\s+/).length < 2 && subtitle ? `${name} ${subtitle}` : name);
  return { name, subtitle: subtitle || null, rank, slug };
}

// ---------- movable cycle ----------
function movableFeasts(year) {
  const P = orthodoxPascha(year);
  const at = (n) => iso(addDays(P, n));
  const list = [
    [-77, 'Sunday of Zacchaeus'],
    [-70, 'Sunday of the Publican and the Pharisee — the Triodion begins'],
    [-63, 'Sunday of the Prodigal Son'],
    [-57, 'Saturday of Souls'],
    [-56, 'Sunday of the Last Judgment (Meatfare Sunday)'],
    [-50, 'Saturday of the Holy Ascetics'],
    [-49, 'Forgiveness Sunday (Cheesefare Sunday)'],
    [-48, 'Clean Monday — Great Lent begins'],
    [-44, 'First Salutations to the Theotokos'],
    [-43, 'Saturday of St Theodore the Recruit — the miracle of the kollyva @theodore-tyro'],
    [-42, 'Sunday of Orthodoxy — the triumph of the holy icons #major'],
    [-37, 'Second Salutations to the Theotokos'],
    [-35, 'Sunday of St Gregory Palamas @gregory-palamas'],
    [-30, 'Third Salutations to the Theotokos'],
    [-28, 'Sunday of the Holy Cross — veneration of the Cross'],
    [-23, 'Fourth Salutations to the Theotokos'],
    [-21, 'Sunday of St John Climacus @john-climacus'],
    [-16, 'The Akathist Hymn to the Theotokos'],
    [-14, 'Sunday of St Mary of Egypt @mary-of-egypt'],
    [-8, 'Saturday of Lazarus — the raising of Lazarus #major @lazarus'],
    [-7, 'Palm Sunday — the Entry of our Lord into Jerusalem #great @palm-sunday'],
    [-6, 'Great and Holy Monday'],
    [-5, 'Great and Holy Tuesday'],
    [-4, 'Great and Holy Wednesday'],
    [-3, 'Great and Holy Thursday — the Mystical Supper #major'],
    [-2, 'Great and Holy Friday — the Crucifixion of our Lord #major'],
    [-1, 'Great and Holy Saturday — the Descent into Hades #major'],
    [0, 'HOLY PASCHA — the Bright Resurrection of our Lord and Savior Jesus Christ #pascha @pascha'],
    [1, 'Bright Monday'],
    [2, 'Bright Tuesday'],
    [3, 'Bright Wednesday'],
    [4, 'Bright Thursday'],
    [5, 'Bright Friday — the Theotokos, the Life-giving Spring'],
    [6, 'Bright Saturday'],
    [7, 'Thomas Sunday @thomas-the-apostle'],
    [14, 'Sunday of the Myrrhbearing Women @myrrhbearing-women'],
    [21, 'Sunday of the Paralytic'],
    [24, 'Mid-Pentecost'],
    [28, 'Sunday of the Samaritan Woman @photini'],
    [35, 'Sunday of the Blind Man'],
    [38, 'Leave-taking of Pascha'],
    [39, 'The Ascension of our Lord and Savior Jesus Christ #great @ascension'],
    [42, 'Sunday of the Holy Fathers of the First Ecumenical Council'],
    [48, 'Saturday of Souls'],
    [49, 'Holy Pentecost — the Descent of the Holy Spirit #great @pentecost'],
    [50, 'Monday of the Holy Spirit'],
    [56, 'Sunday of All Saints @all-saints'],
  ];
  const out = {};
  const push = (date, entry) => {
    const p = parseEntry(entry);
    if (!entry.includes('@')) p.slug = null; // movable days link only when a page is named explicitly
    (out[date] ||= []).push({ ...p, movable: true });
  };
  for (const [n, e] of list) push(at(n), e);

  const fixedSundays = [
    [sundayBetween(year, 1, 1, 1, 5), 'Sunday before Theophany'],
    [sundayBetween(year, 1, 7, 1, 13), 'Sunday after Theophany'],
    [sundayBetween(year, 7, 13, 7, 19), 'Sunday of the Holy Fathers of the Fourth Ecumenical Council'],
    [sundayBetween(year, 9, 7, 9, 13), 'Sunday before the Elevation of the Cross'],
    [sundayBetween(year, 9, 15, 9, 21), 'Sunday after the Elevation of the Cross'],
    [sundayBetween(year, 10, 11, 10, 17), 'Sunday of the Holy Fathers of the Seventh Ecumenical Council'],
    [sundayBetween(year, 12, 11, 12, 17), 'Sunday of the Holy Forefathers'],
    [sundayBetween(year, 12, 18, 12, 24), 'Sunday before the Nativity — the Genealogy of Christ'],
    [sundayBetween(year, 12, 26, 12, 31), 'Sunday after the Nativity — Joseph the Betrothed, David the King and James the Brother of the Lord'],
  ];
  for (const [d, e] of fixedSundays) if (d) push(iso(d), e);
  return { pascha: P, byDate: out };
}

// ---------- fasting ----------
export const FAST_LABELS = {
  free: 'Fast-free',
  strict: 'Strict fast',
  'wine-oil': 'Wine and oil allowed',
  fish: 'Fish, wine and oil allowed',
  dairy: 'Dairy, eggs and fish allowed',
  none: 'No fast',
};

function fastFor(date, P, ranks, names) {
  const t = date.getTime();
  const wd = date.getUTCDay();
  const y = date.getUTCFullYear();
  const rel = Math.round((t - P.getTime()) / DAY);
  const md = mmdd(date);
  const inRange = (m1, d1, m2, d2) => t >= utc(y, m1, d1).getTime() && t <= utc(y, m2, d2).getTime();
  const weekend = wd === 0 || wd === 6;
  const great = ranks.includes('great') || ranks.includes('pascha');
  const major = ranks.includes('major');

  // Fast-free periods
  if (inRange(1, 1, 1, 4) || inRange(12, 25, 12, 31) || md === '01-06') return 'free';
  if (rel >= -69 && rel <= -64) return 'free'; // week after the Publican and Pharisee
  if (rel >= 0 && rel <= 6) return 'free'; // Bright Week
  if (rel >= 50 && rel <= 55) return 'free'; // week after Pentecost
  // Cheesefare week
  if (rel >= -55 && rel <= -50) return 'dairy';
  // Great Lent and Holy Week
  if (rel >= -48 && rel <= -1) {
    if (md === '03-25' || rel === -7) return 'fish'; // Annunciation, Palm Sunday
    if (rel === -2 || rel === -1) return 'strict';
    if (rel === -3) return 'wine-oil';
    if (rel === -8) return 'wine-oil';
    return weekend ? 'wine-oil' : 'strict';
  }
  // Strict single days
  if (md === '01-05' || md === '08-29' || md === '09-14') return weekend ? 'wine-oil' : 'strict';
  // Apostles' Fast: Monday after All Saints until June 28
  const apostlesStart = addDays(P, 57).getTime();
  if (t >= apostlesStart && t <= utc(y, 6, 28).getTime()) {
    if (wd === 3 || wd === 5) return major ? 'fish' : 'strict';
    if (wd === 1) return 'wine-oil';
    return 'fish';
  }
  // Dormition Fast
  if (inRange(8, 1, 8, 14)) {
    if (md === '08-06') return 'fish';
    return weekend ? 'wine-oil' : 'strict';
  }
  // Nativity Fast
  if (inRange(11, 15, 12, 24)) {
    if (md === '12-24') return weekend ? 'wine-oil' : 'strict';
    if (md === '11-21') return 'fish';
    if (inRange(12, 18, 12, 23)) return weekend ? 'fish' : 'wine-oil';
    return wd === 3 || wd === 5 ? 'wine-oil' : 'fish';
  }
  // Wednesdays and Fridays
  if (wd === 3 || wd === 5) {
    if (rel === 24 || rel === 38) return 'fish'; // Mid-Pentecost, Leave-taking of Pascha
    if (great || major) return 'fish';
    return 'strict';
  }
  return 'none';
}

// ---------- year builder ----------
let cache = null;
export function buildYear(year = YEAR) {
  if (cache && cache.year === year) return cache;
  const { pascha, byDate } = movableFeasts(year);
  const days = [];
  const fixedByDate = {};
  for (let t = utc(year, 1, 1); t.getUTCFullYear() === year; t = addDays(t, 1)) {
    const key = mmdd(t);
    fixedByDate[iso(t)] = (menaion[key] || []).map((e) => ({ ...parseEntry(e), movable: false }));
  }
  // Transfer rule: St George (Apr 23) falling before Pascha is kept on Bright Monday.
  const george = utc(year, 4, 23);
  if (george < pascha) {
    const from = iso(george), to = iso(addDays(pascha, 1));
    const i = fixedByDate[from].findIndex((e) => e.slug === 'george');
    if (i >= 0) {
      const [g] = fixedByDate[from].splice(i, 1);
      fixedByDate[from].push({ ...g, rank: 'normal', transferredTo: to, note: `Celebrated this year on Bright Monday (${MONTH_NAMES[addDays(pascha, 1).getUTCMonth()]} ${addDays(pascha, 1).getUTCDate()})` });
      fixedByDate[to].unshift({ ...g, note: 'Transferred from April 23 because it fell in Great Lent' });
    }
  }
  for (let t = utc(year, 1, 1); t.getUTCFullYear() === year; t = addDays(t, 1)) {
    const date = iso(t);
    const movable = byDate[date] || [];
    const fixed = fixedByDate[date];
    const all = [...movable, ...fixed].map((e, i) => ({ ...e, _i: i }));
    all.sort((a, b) => (RANK_ORDER[b.rank] - RANK_ORDER[a.rank]) || (a._i - b._i));
    const ranks = all.map((e) => e.rank);
    const fast = fastFor(t, pascha, ranks, all.map((e) => e.name));
    const top = all.length ? all[0].rank : 'normal';
    days.push({
      date, year, month: t.getUTCMonth() + 1, day: t.getUTCDate(), weekday: t.getUTCDay(),
      weekdayName: WEEKDAYS[t.getUTCDay()], monthName: MONTH_NAMES[t.getUTCMonth()],
      commemorations: all.map(({ _i, ...e }) => e),
      rank: top, fast, fastLabel: FAST_LABELS[fast],
    });
  }
  cache = { year, pascha: iso(pascha), days };
  return cache;
}

export function monthDays(month, year = YEAR) {
  return buildYear(year).days.filter((d) => d.month === month);
}

/** All saint/feast pages referenced by the calendar: slug → { name, subtitle, dates[] } */
export function allSaints(year = YEAR) {
  const map = new Map();
  for (const day of buildYear(year).days) {
    for (const c of day.commemorations) {
      if (!c.slug) continue;
      if (!map.has(c.slug)) map.set(c.slug, { slug: c.slug, name: cleanName(c.name), subtitle: c.subtitle, rank: c.rank, dates: [], movable: c.movable });
      const s = map.get(c.slug);
      if (!s.dates.some((d) => d.date === day.date)) s.dates.push({ date: day.date, label: c.name, note: c.note || null, transferredTo: c.transferredTo || null });
      if (RANK_ORDER[c.rank] > RANK_ORDER[s.rank]) s.rank = c.rank;
    }
  }
  return map;
}

function cleanName(name) {
  return name.replace(/^(Repose of St |Translation of the relics of (St )?|Finding of the relics of St |Uncovering of the relics of St )/, '').replace(/\s*\(.*?\)\s*/g, ' ').trim();
}

export function formatDate(isoDate, { weekday = false } = {}) {
  const [y, m, d] = isoDate.split('-').map(Number);
  const t = utc(y, m, d);
  return `${weekday ? WEEKDAYS[t.getUTCDay()] + ', ' : ''}${MONTH_NAMES[m - 1]} ${d}${weekday ? ', ' + y : ''}`;
}
