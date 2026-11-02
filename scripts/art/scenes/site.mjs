// Site-wide art: home hero, twelve seasonal month banners and the "scribe" picture.
import * as K from '../kit.mjs';
const { C } = K;
export const slug = 'site';
export const outDir = 'public/art';

const W = 1600, H = 500;
const SEASON = {
  winter: { sky: 'winter', far: '#c9d6e2', hill1: '#dfe8ef', hill2: '#eef3f7', ground: '#f4f7fa', tree: 'winter', snow: true, grass: '#9fb0a2' },
  lateWinter: { sky: 'winter', far: '#b7c6cf', hill1: '#c9d3c4', hill2: '#e4ebe6', ground: '#e9eee8', tree: 'winter', snow: true, grass: '#8a9a7c' },
  spring: { sky: 'day', far: '#a9c0d6', hill1: '#9cc278', hill2: '#86b85a', ground: '#7fb153', tree: 'spring', snow: false, grass: '#3f7a32' },
  summer: { sky: 'day', far: '#a3bccf', hill1: '#95bb68', hill2: '#7aa94c', ground: '#76a548', tree: 'summer', snow: false, grass: '#3f7a32' },
  lateSummer: { sky: 'day', far: '#b2c2c9', hill1: '#c3bf6a', hill2: '#a9b25a', ground: '#a3ad55', tree: 'summer', snow: false, grass: '#6d7a32' },
  autumn: { sky: 'day', far: '#b7c2c9', hill1: '#c9a560', hill2: '#a8994e', ground: '#a39552', tree: 'autumn', snow: false, grass: '#7a6a32' },
  lateAutumn: { sky: 'dusk', far: '#7d7a8c', hill1: '#8a7a5a', hill2: '#7a6e4e', ground: '#7d7150', tree: 'winter', snow: false, grass: '#5e5636' },
};

function base(season, { seed = 1, skyKind, sunPos = [1400, 90], night = false, mountains = true, settlement = null, river = true } = {}) {
  const S = SEASON[season];
  let b = K.sky(skyKind || (night ? 'night' : S.sky), W, H);
  if (night) b += K.stars(110, seed, W, 260) + K.moon(sunPos[0], sunPos[1], 30);
  else if (S.sky === 'dusk' || skyKind === 'dusk') b += K.sun(sunPos[0], sunPos[1] + 120, 40, '#ffb35a');
  else b += K.sun(sunPos[0], sunPos[1], 34);
  if (!night) b += K.cloud(260 + seed * 30, 70, 0.7) + K.cloud(820, 50, 0.55) + K.cloud(1180, 110, 0.5);
  if (mountains) b += `<g class="vfar">${K.mountains(250, night ? '#4a5a7a' : S.far, { seed: seed + 2, w: W, h: H, height: 130, peaks: 8, snow: true })}</g>`;
  b += `<g class="far">${K.hills(290, night ? '#3a4a5e' : S.hill1, { seed: seed + 3, amp: 22, w: W, h: H, snow: S.snow && !night })}</g>`;
  if (settlement) b += `<g class="far">${settlement}</g>`;
  b += K.hills(360, night ? '#2f3e4e' : S.hill2, { seed: seed + 5, amp: 18, w: W, h: H, snow: S.snow && !night });
  if (river) b += K.river(`M-20,420 C300,380 520,470 820,430 S1300,380 1620,410`, { w: 30, color: S.snow ? '#b9d4e6' : C.water });
  return b;
}
const trees = (seed, n, y0, y1, kinds, season, x0 = 0, x1 = W) => {
  const r = K.rng(seed);
  let out = '';
  const items = Array.from({ length: n }, () => ({ x: x0 + r() * (x1 - x0), y: y0 + r() * (y1 - y0), k: K.pick(r, kinds) })).sort((a, b) => a.y - b.y);
  for (const it of items) out += K.tree(it.x, it.y, 0.35 + (it.y - y0) / (y1 - y0 + 1) * 0.5, { kind: it.k, season, seed: Math.floor(r() * 99) });
  return out;
};
const banner = (title, body) => K.scene({ w: W, h: H, title, body });

function jan() {
  let b = base('winter', { seed: 1, settlement: K.onionChurch(1180, 300, 0.7, { snow: true }) + K.izba(1040, 300, 0.45, { snow: true }) + K.izba(1300, 305, 0.45, { snow: true }) });
  b += K.snowfall(3, W, H, 120);
  b += trees(4, 16, 300, 360, ['fir', 'fir', 'birch'], 'winter', 0, 700);
  // Theophany: blessing of the waters at the frozen river
  b += K.raw.P('M560,430 l30,-10 l30,10 l-30,10Z', '#7fb6d9') + `<path d="M590,410 v40 M572,430 h36" stroke="#2c6a9c" stroke-width="5"/>`;
  b += K.person(650, 440, 0.75, { halo: false, vest: 'bishop', robe: '#f6f1e4', mantle: '#d9a521', hairStyle: 'long', hairColor: '#7a7a7a', beard: 'long', beardColor: '#9a9a9a', pose: 'raise', hold: 'cross' });
  b += K.crowd(5, 690, 445, 240, 7, { s: 0.6, kerchief: true, palette: ['#a8281f', '#2c5596', '#6b2e6e', '#4f8a3c', '#c9913f'] });
  b += K.dove(600, 330, 0.6, { glow: true });
  // children sledding
  b += K.raw.P('M80,470 L170,470 L176,462', 'none', 'l', ' stroke-width="3"') + K.person(120, 466, 0.5, { child: true, robe: '#a8281f', mantle: null, head: 'cap', headColor: '#2c5596', pose: 'orans', mouth: 'smile' });
  b += K.person(220, 480, 0.55, { child: true, robe: '#2c5596', mantle: null, head: 'kerchief', headColor: '#e2483d', pose: 'point', mouth: 'smile' });
  b += K.izba(330, 440, 0.8, { snow: true, lit: true }) + K.izba(1420, 445, 0.8, { snow: true, lit: true });
  b += K.tree(1520, 480, 0.9, { kind: 'fir', season: 'winter' }) + K.tree(40, 490, 0.9, { kind: 'fir', season: 'winter' });
  b += K.rabbit(1000, 470, 0.9) + K.fox(1200, 480, 0.8, { flip: true });
  return banner('January: the blessing of the waters on Theophany in a snowy village', b);
}
function feb() {
  let b = base('lateWinter', { seed: 7, skyKind: 'dawn', settlement: K.monastery(1150, 300, 0.45, { slavic: true }) });
  b += trees(8, 18, 300, 370, ['oak', 'birch', 'fir'], 'winter');
  b += K.onionChurch(760, 430, 0.9);
  // candle procession for the Meeting of the Lord
  const r = K.rng(4);
  for (let i = 0; i < 9; i++) {
    const x = 260 + i * 50, y = 470 - i * 3;
    b += K.person(x, y, 0.55, { robe: K.pick(r, ['#a8281f', '#2c5596', '#6b2e6e', '#4f8a3c']), mantle: null, veil: i % 2 ? '#8a5a3a' : null, hairStyle: 'short', hairColor: '#4a2d18', beard: i % 3 === 0 ? 'short' : 'none', pose: 'hold', hold: 'candle', turn: 1 });
  }
  b += K.fence(1050, 470, 200, 1) + K.sheep(1100, 480, 0.8) + K.sheep(1160, 486, 0.7, { flip: true }) + K.sheep(1220, 478, 0.75);
  b += K.house(140, 470, 1, { style: 'thatch', w: 80, h: 50, wall: '#e8dcc0', lit: true, chimney: true, snow: true });
  b += K.fox(1450, 470, 0.8);
  return banner('February: a candle procession for the Meeting of the Lord in late winter', b);
}
function mar() {
  let b = base('spring', { seed: 11, settlement: K.monastery(400, 300, 0.4) });
  b += trees(12, 20, 300, 370, ['oak', 'apple', 'birch'], 'spring');
  // plowing with oxen
  b += K.cow(900, 470, 0.9, { color: '#b9945a', spots: '#e9d7b4' }) + K.cow(960, 476, 0.9, { color: '#a07a4a', spots: '#e9d7b4' });
  b += K.person(1060, 480, 0.75, { robe: '#e8dcc0', mantle: '#7a4a28', hairStyle: 'short', beard: 'short', pose: 'hold', hold: 'staff', turn: -1 });
  for (let i = 0; i < 8; i++) b += `<path d="M${800 - i * 60},${490 - i * 4} Q${830 - i * 60},${470 - i * 4} ${860 - i * 60},${490 - i * 4}" stroke="#7a5a3a" stroke-width="3" fill="none"/>`;
  // storks on a nest, swallows
  b += K.house(260, 470, 1.1, { style: 'tile', w: 80, h: 56, chimney: true });
  b += `<g transform="translate(278 380)">${K.raw.E(0, 0, 22, 7, '#8a6a42')}${K.raw.E(0, -14, 12, 8, '#fff')}<path d="M8,-16 L12,-40 M12,-40 l14,4" stroke="#f0f0f0" stroke-width="5" stroke-linecap="round"/><path d="M10,-38 l18,4" stroke="#e2483d" stroke-width="3"/></g>`;
  b += K.flock(5, 500, 100, 400, 100, 7) + K.flowers(6, 0, 440, W, 60, 40, ['#ffffff', '#f5d33a', '#9a6ad6']);
  b += K.tree(1500, 480, 1, { kind: 'apple', season: 'spring' }) + K.tree(80, 480, 0.9, { kind: 'oak', season: 'spring' });
  b += K.rabbit(1300, 480, 0.9);
  return banner('March: storks return, the fields are plowed and the trees begin to blossom', b);
}
function apr() {
  let b = base('spring', { seed: 14, settlement: K.cityscape(1150, 310, 0.55, { w: 600, seed: 14 }) });
  b += trees(15, 16, 300, 370, ['olive', 'cypress', 'apple', 'palm'], 'spring');
  for (const x of [120, 300, 1460]) b += K.tree(x, 480, 1, { kind: 'apple', season: 'spring', seed: x });
  // Palm Sunday procession with branches and a donkey
  b += K.donkey(820, 470, 1);
  const r = K.rng(8);
  for (let i = 0; i < 8; i++) {
    const x = 480 + i * 40;
    b += K.person(x, 470 + (i % 2) * 6, 0.6, { child: i % 3 === 0, robe: K.pick(r, ['#a8281f', '#2c5596', '#e2b84a', '#4f8a3c', '#f3e6c4']), mantle: null, hairStyle: K.pick(r, ['short', 'curly', 'bob']), pose: 'raise', hold: 'flower', holdColor: '#7cbf5a', turn: 1, mouth: 'smile' });
  }
  b += K.sheep(1050, 478, 0.8) + K.sheep(1110, 486, 0.6, { flip: true }) + K.sheep(1180, 480, 0.7) + K.goat(1250, 482, 0.9);
  b += K.flowers(9, 0, 430, W, 70, 70);
  return banner('April: blossoming orchards, newborn lambs and a Palm Sunday procession', b);
}
function may() {
  let b = base('spring', { seed: 19, settlement: K.fortress(260, 300, 0.4, { w: 300 }) });
  b += trees(20, 18, 300, 370, ['oak', 'birch', 'apple'], 'spring');
  b += K.church(800, 440, 1.1, { dome: '#c2552f' });
  // bells ringing
  b += `<path d="M760,250 q-20,-14 -36,0 M840,250 q20,-14 36,0" stroke="${C.gold}" stroke-width="3" fill="none"/>`;
  // Paschal procession with banners and red eggs
  b += K.person(620, 470, 0.7, { vest: 'bishop', robe: '#fbf6ea', mantle: '#fbf6ea', hairStyle: 'long', hairColor: '#7a4a28', beard: 'long', pose: 'raise', hold: 'candle' });
  for (let i = 0; i < 6; i++) b += K.person(520 - i * 50, 474 + (i % 2) * 4, 0.6, { robe: ['#a8281f', '#2c5596', '#f3e6c4', '#4f8a3c', '#e2b84a', '#6b2e6e'][i], mantle: null, veil: i % 2 ? '#c94a3a' : null, pose: 'hold', hold: i === 1 ? 'icon' : 'candle', turn: 1, mouth: 'smile' });
  b += `<g transform="translate(1000 480)">${K.raw.P('M-30,-10 Q0,20 30,-10Z', '#a8743a')}${[-18, -6, 6, 18, -12, 0, 12].map((x, i) => K.raw.E(x, -14 - (i > 3 ? 8 : 0), 7, 9, '#c0392b')).join('')}</g>`;
  b += K.person(1080, 486, 0.55, { child: true, robe: '#2c5596', mantle: null, hairStyle: 'curly', pose: 'hold', hold: 'egg', mouth: 'smile' }) + K.person(1130, 486, 0.55, { child: true, robe: '#e2b84a', mantle: null, hairStyle: 'bob', hairColor: '#c98a3a', pose: 'hold', hold: 'egg', mouth: 'smile' });
  b += K.sheep(1350, 470, 0.8) + K.sheep(1420, 480, 0.8, { flip: true }) + K.person(1480, 480, 0.7, { robe: '#a8743a', mantle: '#4f8a3c', hairStyle: 'curly', beard: 'young', pose: 'spear', hold: 'staff' });
  b += K.flowers(10, 0, 440, W, 60, 60) + K.flock(3, 300, 80, 600, 120, 8);
  return banner('May: Christ is risen! Bells, red eggs and a Paschal procession', b);
}
function jun() {
  let b = base('summer', { seed: 23, settlement: K.church(1250, 300, 0.4) });
  b += trees(24, 18, 300, 370, ['birch', 'oak', 'linden'], 'summer');
  // fishermen on the river (feast of the Apostles)
  b += K.boat(700, 432, 1.6) + K.person(680, 425, 0.5, { robe: '#e8dcc0', mantle: '#2c5596', hairStyle: 'curly', beard: 'short', pose: 'reach' }) + K.person(730, 425, 0.5, { robe: '#a8743a', mantle: null, hairStyle: 'short', beard: 'long', beardColor: '#9a9a9a', hairColor: '#9a9a9a', pose: 'reach', turn: -1 });
  b += `<path d="M640,420 q30,30 120,10" stroke="#e8dcc0" stroke-width="1.4" fill="none" stroke-dasharray="3 4"/>`;
  b += K.fish(860, 445, 0.8) + K.fish(560, 450, 0.7, { flip: true });
  // haymaking
  for (let i = 0; i < 5; i++) b += K.raw.P(`M${150 + i * 80},480 Q${170 + i * 80},430 ${190 + i * 80},480Z`, '#c9b15a');
  b += K.person(560, 488, 0.7, { robe: '#f3e6c4', mantle: null, hairStyle: 'short', beard: 'short', pose: 'raise', hold: 'sickle', turn: -1 }) + K.person(110, 492, 0.65, { robe: '#e2483d', mantle: null, head: 'kerchief', headColor: '#f5d33a', pose: 'hold', hold: 'flower', mouth: 'smile' });
  b += K.dove(980, 140, 0.7, { glow: true }) + K.flowers(11, 0, 450, W, 50, 50) + K.reeds(900, 450, 0.8) + K.reeds(480, 448, 0.7);
  b += K.cow(1300, 470, 0.8) + K.cow(1380, 478, 0.75, { flip: true, color: '#7a5a3a' });
  return banner('June: haymaking, fishermen on the river and the green days of Pentecost', b);
}
function jul() {
  let b = base('lateSummer', { seed: 29, settlement: K.palace(300, 300, 0.35) });
  // Elijah's thunder clouds over the mountains
  b += K.stormCloud(1200, 120, 1.1) + K.lightning(1180, 150, 0.6) + K.rain(5, 1100, 150, 200, 100, 40);
  b += trees(30, 14, 300, 370, ['oak', 'linden', 'cypress'], 'summer');
  b += K.wheat(31, 0, 400, 1000, 90, 220);
  for (const x of [200, 300, 420, 560]) b += K.sheaf(x, 480, 0.9);
  b += K.person(680, 488, 0.75, { robe: '#f3e6c4', mantle: null, head: 'kerchief', headColor: '#c94a3a', pose: 'raise', hold: 'sickle' }) + K.person(760, 490, 0.75, { robe: '#e8dcc0', mantle: '#a8743a', hairStyle: 'short', beard: 'short', pose: 'carry', hold: 'loaves' });
  b += K.person(840, 494, 0.5, { child: true, robe: '#2c5596', mantle: null, hairStyle: 'curly', pose: 'hold', hold: 'jar', mouth: 'smile' });
  b += K.tree(1050, 480, 1.1, { kind: 'oak' }) + K.house(1250, 470, 1, { w: 80, h: 54, chimney: true }) + K.well(1380, 480, 0.9);
  b += K.dog(960, 486, 0.8) + K.flock(7, 400, 60, 400, 100, 6);
  return banner('July: the wheat harvest under summer thunderclouds', b);
}
function aug() {
  let b = base('lateSummer', { seed: 33, mountains: false });
  // Mount Tabor shining
  b += K.raw.P('M900,320 Q1060,110 1220,320Z', '#9aa888') + K.glow(1060, 150, 160) + K.rays(1060, 150, { n: 18, r1: 20, r2: 200, op: 0.5 });
  b += `<g class="far">${K.hills(320, '#b8b66a', { seed: 34, amp: 16, w: W, h: H })}</g>`;
  b += trees(35, 12, 320, 380, ['apple', 'olive', 'cypress'], 'summer');
  // orchard harvest
  for (const x of [120, 260, 400]) b += K.tree(x, 470, 1, { kind: 'apple', seed: x });
  b += K.person(320, 486, 0.7, { robe: '#a8281f', mantle: null, veil: '#f3e6c4', pose: 'carry', hold: 'loaves', holdColor: '#c0392b' });
  b += `<g transform="translate(470 488)">${K.raw.P('M-26,-20 L26,-20 L20,0 L-20,0Z', '#a8743a')}${[-14, -4, 6, 16, -8, 2, 12].map((x, i) => K.raw.Ci(x, -24 - (i > 3 ? 8 : 0), 6, i % 2 ? '#d6362c' : '#e8b63a')).join('')}</g>`;
  // vineyard and grapes being blessed
  for (let i = 0; i < 6; i++) b += K.vine(640 + i * 60, 470, 0.9);
  b += K.church(1250, 450, 0.9) + K.person(1100, 486, 0.7, { vest: 'bishop', robe: '#fbf6ea', mantle: '#fbf6ea', hairStyle: 'long', hairColor: '#4a2d18', beard: 'long', pose: 'bless', hold: 'cross' });
  b += `<g transform="translate(1160 488)">${K.raw.P('M-22,-14 L22,-14 L18,0 L-18,0Z', '#a8743a')}${Array.from({ length: 9 }, (_, i) => K.raw.Ci(-12 + (i % 3) * 8, -20 - Math.floor(i / 3) * 6, 4, '#6a2e6e', 'n')).join('')}</g>`;
  b += K.flowers(12, 0, 450, W, 50, 40, ['#f5d33a', '#e2483d', '#ffffff']) + K.flock(9, 300, 80, 400, 80, 6);
  return banner('August: the light of the Transfiguration and the blessing of grapes and fruit', b);
}
function sep() {
  let b = base('lateSummer', { seed: 37, skyKind: 'dawn', settlement: K.cityscape(1200, 310, 0.5, { w: 520, seed: 37 }) });
  b += trees(38, 14, 300, 370, ['olive', 'cypress', 'oak'], 'summer');
  // Elevation of the Cross in the distance
  b += K.raw.P('M1200,175 v60 M1182,195 h36', 'none', 'l', ` stroke="${C.gold}" stroke-width="6"`) + K.glow(1200, 200, 70);
  // grape harvest
  for (let i = 0; i < 7; i++) b += K.vine(120 + i * 70, 470, 1);
  b += K.person(330, 494, 0.7, { robe: '#6b2e6e', mantle: null, head: 'kerchief', headColor: '#e8c25a', pose: 'carry', hold: 'loaves', holdColor: '#6a2e6e' });
  // children going to school with books and scrolls (church new year)
  b += K.house(820, 470, 1, { w: 90, h: 60, wall: '#efd9b8' });
  for (let i = 0; i < 4; i++) b += K.person(920 + i * 45, 488, 0.5, { child: true, robe: ['#2c5596', '#a8281f', '#4f8a3c', '#e2b84a'][i], mantle: null, hairStyle: ['curly', 'bob', 'short', 'bob'][i], hairColor: ['#4a2d18', '#c98a3a', '#2a1d14', '#7a4a28'][i], pose: 'hold', hold: i % 2 ? 'book' : 'scroll', turn: -1, mouth: 'smile' });
  b += K.person(1120, 488, 0.7, { robe: '#3a2e2a', mantle: '#2a2423', head: 'cowl', beard: 'long', beardColor: '#9a9a9a', pose: 'bless', hold: 'book', turn: -1 });
  b += K.donkey(1350, 480, 0.9, { flip: true }) + K.flowers(13, 0, 450, W, 50, 30) + K.flock(10, 500, 60, 400, 80, 6);
  return banner('September: the Church New Year, the grape harvest and children going back to school', b);
}
function oct() {
  let b = base('autumn', { seed: 41, river: false });
  // walled city by the sea (Thessaloniki)
  b += K.sea(330, { w: W, h: H, seed: 41, waves: 40 });
  b += K.cityscape(1150, 360, 0.75, { w: 620, seed: 42, wallColor: '#d8c39a' }) + K.ship(1500, 380, 0.3) + K.ship(820, 360, 0.22, { sail: '#e8dcc0' });
  b += K.hills(400, '#b39a52', { seed: 43, amp: 20, w: 900, h: H });
  b += trees(44, 22, 380, 440, ['oak', 'birch', 'apple'], 'autumn', 0, 850);
  b += K.deer(500, 470, 0.9) + K.deer(580, 476, 0.8, { flip: true });
  // mushrooms and pumpkins
  for (let i = 0; i < 6; i++) b += `<g transform="translate(${120 + i * 55} ${488 - (i % 2) * 6})">${K.raw.P('M-10,0 v-8 h20 v8Z', '#f3e6c4')}${K.raw.P('M-16,-8 Q0,-26 16,-8Z', i % 2 ? '#b8322a' : '#a86b3c')}</g>`;
  b += K.person(760, 486, 0.7, { robe: '#a8743a', mantle: '#4f8a3c', hairStyle: 'short', beard: 'short', pose: 'carry', hold: 'loaves', holdColor: '#e8701c' });
  b += K.flock(12, 300, 60, 500, 120, 9, '#3a2616');
  return banner('October: golden forests and the walled city of Thessaloniki by the sea', b);
}
function nov() {
  let b = base('lateAutumn', { seed: 47, skyKind: 'dusk', sunPos: [1300, 60], settlement: K.monastery(1180, 300, 0.45) });
  b += `<rect x="0" y="260" width="${W}" height="120" fill="#f2e8f0" opacity=".18"/>`;
  b += trees(48, 22, 300, 380, ['oak', 'birch', 'fir'], 'winter');
  b += trees(49, 8, 300, 380, ['oak'], 'autumn');
  // monks gathering firewood, lit monastery windows
  b += K.person(600, 480, 0.75, { robe: '#3a2e2a', mantle: '#2a2423', head: 'cowl', beard: 'long', beardColor: '#6a5a4a', pose: 'carry', hold: 'loaves', holdColor: '#7a4a28' });
  b += K.person(680, 484, 0.75, { robe: '#3a2e2a', mantle: '#2a2423', head: 'cowl', beard: 'short', pose: 'raise', hold: 'axe' });
  for (let i = 0; i < 5; i++) b += K.raw.L(740 + i * 6, 480, 770 + i * 6, 470, '#7a4a28', 6);
  b += K.house(300, 470, 1.1, { style: 'thatch', w: 90, h: 54, lit: true, chimney: true }) + K.house(1450, 475, 1, { w: 80, h: 50, lit: true, chimney: true });
  b += K.flock(14, 400, 70, 500, 80, 10, '#3a2616');
  b += K.bear(1000, 480, 0.6) + K.fox(1150, 488, 0.7, { flip: true });
  return banner('November: misty evenings, falling leaves and monks preparing for winter', b);
}
function dec() {
  let b = base('winter', { seed: 53, night: true, sunPos: [200, 70], river: false });
  // star of Bethlehem
  b += K.glow(1050, 80, 120) + K.rays(1050, 80, { n: 8, r1: 8, r2: 120, op: 0.7, color: '#fff6c8' }) + `<path d="M1050,40 L1058,72 L1090,80 L1058,88 L1050,120 L1042,88 L1010,80 L1042,72Z" fill="#fff6c8"/>`;
  b += `<path d="M1050,120 L1000,330" stroke="#fff6c8" stroke-width="2" opacity=".5"/>`;
  b += K.snowfall(9, W, H, 90);
  b += `<g opacity=".98">${K.hills(400, '#e8eef5', { seed: 54, amp: 16, w: W, h: H })}</g>`;
  // cave of the Nativity with shepherds and sheep
  b += K.cave(1000, 430, 0.9, { rock: '#b9b2a6', dark: '#4a3a2a' }) + K.glow(1000, 400, 70);
  b += K.raw.R(985, 404, 30, 14, '#a8743a') + K.raw.E(1000, 404, 10, 5, '#f3e6c4');
  b += K.person(900, 470, 0.7, { robe: '#a8743a', mantle: '#6e4527', hairStyle: 'curly', beard: 'short', pose: 'orans', turn: 1, vest: 'sheepskin' }) + K.sheep(840, 474, 0.7) + K.sheep(1120, 470, 0.7, { flip: true });
  // snowy village with lit windows and carolers
  b += K.izba(250, 450, 0.9, { snow: true, lit: true }) + K.izba(420, 460, 0.8, { snow: true, lit: true }) + K.onionChurch(620, 440, 0.8, { snow: true });
  for (let i = 0; i < 4; i++) b += K.person(330 + i * 40, 490, 0.5, { child: true, robe: ['#a8281f', '#2c5596', '#4f8a3c', '#e2b84a'][i], mantle: null, head: i % 2 ? 'kerchief' : 'cap', headColor: ['#fff', '#e2483d', '#2c5596', '#fff'][i], pose: i === 0 ? 'raise' : 'hold', hold: i === 0 ? 'lamp' : 'candle', mouth: 'smile' });
  b += K.tree(80, 490, 1, { kind: 'fir', season: 'winter' }) + K.tree(1500, 490, 1.1, { kind: 'fir', season: 'winter' }) + K.tree(1380, 470, 0.8, { kind: 'fir', season: 'winter' });
  return banner('December: snow, carolers and the star shining over the cave of Bethlehem', b);
}

function hero() {
  const w = 1600, h = 700;
  let b = K.sky('day', w, h) + K.sun(1440, 100, 46) + K.cloud(300, 100, 1) + K.cloud(820, 70, 0.8) + K.cloud(1150, 150, 0.6);
  b += `<g class="vfar">${K.mountains(330, '#a6bdd0', { seed: 61, w, h, height: 200, peaks: 9 })}</g>`;
  // far hills with a city by the sea on the right
  b += `<g class="far">${K.hills(380, '#9fc27a', { seed: 62, amp: 30, w, h })}</g>`;
  b += `<rect x="1180" y="370" width="420" height="60" fill="url(#sea)"/>` + K.ship(1480, 400, 0.3) + K.ship(1300, 392, 0.2, { sail: '#e8dcc0' });
  b += `<g class="far">${K.cityscape(1350, 380, 0.6, { w: 380, seed: 63 })}${K.palace(260, 360, 0.45)}${K.fortress(820, 350, 0.5, { w: 300 })}</g>`;
  b += `<g class="far">${trees(64, 30, 380, 440, ['oak', 'cypress', 'olive', 'fir'], 'summer', 0, 1200)}</g>`;
  b += K.hills(470, '#86b85a', { seed: 65, amp: 26, w, h });
  b += K.river('M-20,560 C260,500 520,610 820,560 S1300,500 1620,540', { w: 44 });
  b += K.bridge(700, 575, 0.8, { w: 200 });
  b += K.monastery(560, 470, 0.7) + K.onionChurch(1100, 480, 0.8);
  b += trees(66, 24, 470, 540, ['oak', 'birch', 'fir', 'apple'], 'summer');
  // village
  b += K.house(180, 560, 1.1, { w: 80, h: 56, chimney: true }) + K.house(290, 570, 0.9, { w: 70, h: 50, style: 'flat', wall: '#f6eedc' }) + K.izba(1250, 570, 1, {}) + K.izba(1380, 575, 0.9, {}) + K.well(400, 590, 0.9);
  b += K.wheat(67, 880, 590, 300, 60, 90) + K.sheaf(920, 650, 0.9) + K.sheaf(980, 655, 0.8);
  b += K.fence(1150, 640, 200, 1);
  // animals
  b += K.sheep(480, 650, 1) + K.sheep(540, 660, 0.9, { flip: true }) + K.sheep(600, 645, 0.85) + K.deer(140, 640, 1) + K.cow(1220, 660, 0.9) + K.horse(1460, 670, 0.6, { color: '#a0522d', mane: '#4a2d18', saddle: null }) + K.dog(660, 670, 0.9);
  b += K.boat(820, 552, 1.2) + K.person(820, 546, 0.45, { robe: '#e8dcc0', mantle: '#2c5596', hairStyle: 'curly', beard: 'short', pose: 'reach' });
  // people: a pilgrim family, a shepherd, children, a monk
  b += K.person(320, 680, 0.95, { robe: '#a8743a', mantle: '#4f8a3c', hairStyle: 'curly', beard: 'young', pose: 'spear', hold: 'staff' });
  b += K.person(720, 690, 0.95, { robe: '#3a2e2a', mantle: '#2a2423', head: 'cowl', beard: 'long', beardColor: '#9a9a9a', pose: 'bless', hold: 'book' });
  b += K.person(790, 696, 0.65, { child: true, robe: '#2c5596', mantle: null, hairStyle: 'curly', pose: 'orans', mouth: 'smile', turn: -1 }) + K.person(840, 696, 0.62, { child: true, robe: '#a8281f', mantle: null, hairStyle: 'bob', hairColor: '#c98a3a', pose: 'hold', hold: 'flower', mouth: 'smile', turn: -1 });
  b += K.person(1060, 690, 0.9, { robe: '#6b2e6e', mantle: null, veil: '#2c5596', pose: 'carry', hold: 'loaves' });
  b += K.flowers(68, 0, 620, w, 80, 80) + K.grass(69, 0, 620, w, 80, 60) + K.flock(70, 600, 120, 600, 120, 9);
  b += K.tree(40, 700, 1.4, { kind: 'oak' }) + K.tree(1560, 700, 1.3, { kind: 'cypress' }) + K.tree(1500, 700, 1.1, { kind: 'olive' });
  return K.scene({ w, h, title: 'An Orthodox countryside with a monastery, fortress, palace, village, river and animals', body: b });
}

function scribe() {
  let b = K.raw.R(0, 0, 1200, 800, '#cbb58c', 'n');
  // stone wall blocks
  for (let y = 0; y < 800; y += 50) for (let x = (y / 50) % 2 ? -40 : 0; x < 1200; x += 80) b += `<rect x="${x}" y="${y}" width="80" height="50" fill="none" stroke="#a8916a" stroke-width="1.5"/>`;
  // arched window with landscape
  b += `<clipPath id="win"><path d="M760,520 V230 Q880,110 1000,230 V520Z"/></clipPath>`;
  b += `<g clip-path="url(#win)">${K.sky('night', 1200, 800)}${K.stars(40, 5, 1200, 400)}${K.moon(930, 200, 22)}${K.hills(420, '#3a4a6e', { seed: 2, amp: 20 })}${K.monastery(880, 430, 0.35)}${K.hills(480, '#2f3e5a', { seed: 4, amp: 12 })}</g>`;
  b += K.raw.P('M760,520 V230 Q880,110 1000,230 V520Z', 'none', 'o', ' stroke-width="8" stroke="#8a7350"');
  b += `<path d="M880,140 V520 M760,330 H1000" stroke="#6e5a3a" stroke-width="4"/>`;
  // shelves with scrolls and books
  b += K.raw.R(40, 120, 300, 16, '#7a4a28') + K.raw.R(40, 260, 300, 16, '#7a4a28');
  for (let i = 0; i < 8; i++) b += K.raw.R(56 + i * 34, 120 - 70 - (i % 3) * 8, 26, 70 + (i % 3) * 8, ['#a8281f', '#2c5596', '#4f8a3c', '#a8743a', '#6b2e6e'][i % 5]);
  for (let i = 0; i < 6; i++) b += K.raw.E(80 + i * 44, 240, 18, 18, '#f3e6c4') + K.raw.Ci(80 + i * 44, 240, 6, '#e3cf9e');
  // icon with a hanging lampada
  b += K.raw.R(470, 120, 120, 160, C.gold) + K.raw.R(482, 132, 96, 136, '#7a2a20');
  b += K.raw.Ci(530, 185, 32, '#f0cf62', 'n') + K.raw.Ci(530, 190, 18, C.skin) + K.hair(530, 190, 18, 'long', '#7a4a28', 'short') + K.face(530, 190, 18);
  b += K.raw.P('M500,268 Q530,214 560,268Z', '#2c5596');
  b += `<path d="M530,0 V300" stroke="#8a7350" stroke-width="2"/>` + K.raw.P('M516,300 h28 l-6,20 h-16Z', '#c0392b') + K.glow(530, 300, 50) + K.raw.P('M530,296 q-4,-8 0,-14 q4,6 0,14Z', '#ffcf3d', 'n');
  // desk and monk scribe
  b += K.raw.R(-10, 640, 1220, 170, '#8a6a42', 'n');
  b += K.raw.P('M300,600 L760,560 L780,600 L320,640Z', '#7a4a28');
  b += K.raw.R(330, 600, 20, 160, '#5a3820') + K.raw.R(720, 580, 20, 180, '#5a3820');
  b += `<g transform="translate(520 582) rotate(-5)">${K.raw.R(-90, -20, 180, 34, '#f6ecd2')}<path d="M0,-20 v34" stroke="#c9b58a" stroke-width="2"/>${Array.from({ length: 5 }, (_, i) => `<path d="M-80,${-12 + i * 6} h${60 - (i % 2) * 10} M10,${-12 + i * 6} h${66 - (i % 3) * 8}" stroke="#7a2a20" stroke-width="1.2"/>`).join('')}${K.raw.R(-78, -16, 12, 14, '#c0392b', 'n')}</g>`;
  b += K.person(470, 740, 2.6, { robe: '#3a2e2a', mantle: '#2a2423', head: 'cowl', beard: 'long', beardColor: '#8a8a8a', pose: 'give', hold: 'pen', turn: 1, eyes: 'open' });
  // candle and inkpot
  b += K.raw.R(690, 520, 14, 50, '#f6eecd') + K.glow(697, 510, 90) + K.raw.P('M697,516 q-6,-12 0,-22 q6,10 0,22Z', '#ffb52e', 'n') + K.raw.R(640, 556, 22, 20, '#2a2221');
  // cat sleeping on a stool
  b += K.raw.R(880, 690, 120, 20, '#7a4a28') + K.raw.R(890, 710, 10, 60, '#5a3820') + K.raw.R(980, 710, 10, 60, '#5a3820');
  b += `<g transform="translate(940 690)">${K.raw.E(0, -12, 34, 14, '#c98a3a')}${K.raw.Ci(30, -18, 11, '#c98a3a')}${K.raw.P('M24,-26 l2,-10 l6,8Z M33,-27 l4,-9 l3,10Z', '#c98a3a')}${K.face(30, -18, 9, 0, { eyes: 'closed', blush: false })}<path d="M-34,-10 q-20,8 -6,18" stroke="#c98a3a" stroke-width="6" fill="none" stroke-linecap="round"/></g>`;
  return K.scene({ title: 'A monk scribe copying the lives of the saints by lamplight', body: b });
}

export const art = {
  'hero.svg': hero,
  'scribe.svg': scribe,
  'months/01.svg': jan, 'months/02.svg': feb, 'months/03.svg': mar, 'months/04.svg': apr,
  'months/05.svg': may, 'months/06.svg': jun, 'months/07.svg': jul, 'months/08.svg': aug,
  'months/09.svg': sep, 'months/10.svg': oct, 'months/11.svg': nov, 'months/12.svg': dec,
};
