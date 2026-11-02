import * as K from '../kit.mjs';
const { C } = K;
export const slug = 'cyril-and-methodius';

const cyril = { halo: true, robe: '#3a3530', mantle: '#2a2423', vest: 'monk', hairStyle: 'short', hairColor: '#3a2416', beard: 'young', beardColor: '#3a2416' };
const methodius = { halo: true, vest: 'bishop', robe: '#f6f1e4', mantle: '#f6f1e4', hairStyle: 'bald', hairColor: '#9a9a9a', beard: 'wide', beardColor: '#a8a8a8' };

function alphabet() {
  let b = K.raw.R(0, 0, 1200, 800, '#d8c49e', 'n');
  for (let y = 0; y < 600; y += 50) for (let x = (y / 50) % 2 ? -40 : 0; x < 1200; x += 80) b += `<rect x="${x}" y="${y}" width="80" height="50" fill="none" stroke="#c4ae86" stroke-width="1.5"/>`;
  // arched windows
  for (const x of [220, 980]) b += `<clipPath id="w${x}"><path d="M${x - 70},420 V200 Q${x},120 ${x + 70},200 V420Z"/></clipPath><g clip-path="url(#w${x})">${K.sky('day')}${K.hills(380, '#9fbf7a', { seed: x, amp: 20 })}${K.tree(x - 30, 400, 0.6, { kind: 'cypress' })}</g>` + K.raw.P(`M${x - 70},420 V200 Q${x},120 ${x + 70},200 V420Z`, 'none', 'o', ' stroke-width="7" stroke="#a8916a"');
  // shelves
  b += K.raw.R(420, 120, 360, 14, '#7a4a28') + K.raw.R(420, 230, 360, 14, '#7a4a28');
  for (let i = 0; i < 11; i++) b += K.raw.R(430 + i * 32, 120 - 64 - (i % 3) * 8, 24, 64 + (i % 3) * 8, ['#a8281f', '#2c5596', '#4f8a3c', '#a8743a', '#6b2e6e'][i % 5]);
  for (let i = 0; i < 8; i++) b += K.raw.Ci(450 + i * 42, 210, 16, '#f3e6c4') + K.raw.Ci(450 + i * 42, 210, 5, '#e3cf9e', 'n');
  b += K.raw.L(600, 0, 600, 270, '#8a7350', 2) + K.raw.P('M586,270 h28 l-6,20 h-16Z', '#c0392b') + K.glow(600, 280, 60);
  b += K.raw.R(0, 600, 1200, 200, '#a8845c', 'n');
  // floating glowing letters
  b += K.glow(560, 400, 260, 0.9) + K.rays(560, 420, { n: 16, r1: 40, r2: 300, op: 0.25 });
  b += K.letters(340, 330, 1.2, { color: C.redDark, set: 'glagolitic', size: 26, cols: 4 });
  b += K.letters(640, 300, 1.1, { color: C.blueDark, set: 'glagolitic', size: 26, cols: 4 });
  // desk with parchment
  b += K.raw.P('M380,600 L760,580 L780,620 L400,640Z', '#7a4a28') + K.raw.R(410, 630, 18, 140, '#5a3820') + K.raw.R(740, 610, 18, 160, '#5a3820');
  b += `<g transform="translate(560 592) rotate(-3)">${K.raw.R(-110, -22, 220, 40, '#f6ecd2')}${K.letters(-96, 4, 0.55, { color: C.redDark, size: 22, cols: 8 })}</g>`;
  b += K.raw.R(700, 568, 22, 18, '#2a2221') + K.raw.R(690, 520, 12, 46, '#f6eecd') + K.glow(696, 512, 50) + K.raw.P('M696,518 q-5,-10 0,-18 q5,8 0,18Z', '#ffb52e', 'n');
  // Constantine writing and Methodius with the Gospel
  b += K.person(480, 760, 2.3, { ...cyril, pose: 'give', hold: 'pen', turn: 1, mouth: 'calm' });
  b += K.person(860, 770, 2.3, { ...methodius, pose: 'hold', hold: 'book', turn: -1, mouth: 'smile' });
  // disciples
  b += K.person(1080, 770, 1.5, { robe: '#5a4a3a', mantle: null, vest: 'monk', mantleColor: '#3a2e2a', hairStyle: 'curly', beard: 'young', pose: 'hold', hold: 'scroll', turn: -1 });
  b += K.person(150, 770, 1.5, { robe: '#5a4a3a', mantle: '#3a2e2a', hairStyle: 'short', hairColor: '#7a4a28', beard: 'none', pose: 'hold', hold: 'jar', holdColor: '#2a2221', turn: 1 });
  b += `<g transform="translate(300 780)">${K.raw.E(0, -10, 22, 10, '#8a8276')}${K.raw.Ci(18, -16, 8, '#8a8276')}${K.raw.P('M13,-22 l2,-8 l5,6Z M20,-23 l3,-7 l2,7Z', '#8a8276')}${K.face(18, -16, 7, 0, { eyes: 'closed', blush: false })}</g>`;
  return K.scene({ title: 'Constantine writes the first Slavonic letters', body: b });
}

function moravia() {
  let b = K.sky('day') + K.sun(1080, 90, 32) + K.cloud(300, 80, 0.8) + K.cloud(700, 110, 0.6);
  b += `<g class="vfar">${K.mountains(320, '#a3b9cc', { seed: 12, height: 130 })}</g>`;
  b += `<g class="far">${K.hills(360, '#9fc27a', { seed: 13, amp: 20 })}${K.fortress(980, 360, 0.5, { w: 300, flag: '#c0392b' })}</g>`;
  for (let i = 0; i < 12; i++) b += `<g class="far">${K.tree(40 + i * 60, 380 + (i % 2) * 8, 0.6, { kind: i % 2 ? 'fir' : 'oak', seed: i })}</g>`;
  b += K.hills(440, '#8ab85a', { seed: 15, amp: 10 });
  b += K.woodenChurch(820, 500, 1.4) + K.house(1000, 510, 1.1, { style: 'thatch', w: 90, h: 50, wall: '#f3e6c4', chimney: true }) + K.house(640, 500, 0.9, { style: 'thatch', w: 80, h: 46, wall: '#efe0c4' });
  b += K.fence(560, 520, 160, 0.9);
  // the linden tree
  b += K.tree(330, 620, 3.2, { kind: 'linden', seed: 31 });
  // Methodius reading
  b += K.person(320, 740, 2.0, { ...methodius, pose: 'hold', hold: 'book', mouth: 'open' });
  // Constantine teaching children with a wax tablet
  const tablet = `<g transform="translate(46 -86)">${K.raw.R(-16, -12, 32, 24, '#8a5a32')}${K.raw.R(-13, -9, 26, 18, '#e8c86a')}${K.letters(-10, -2, 0.25, { color: C.ink, size: 18, cols: 4 })}</g>`;
  b += K.person(560, 750, 1.9, { ...cyril, pose: 'give', hold: null, turn: 1, mouth: 'smile', extra: tablet });
  const r = K.rng(4);
  const kids = [[660, 770], [720, 780], [780, 765]];
  for (const [x, y] of kids) b += K.person(x, y, 0.95, { child: true, robe: K.pick(r, ['#f3e6c4', '#e8dcc0']), sash: K.pick(r, ['#c0392b', '#2c5596']), apron: null, mantle: null, hairStyle: K.pick(r, ['bob', 'curly', 'short']), hairColor: K.pick(r, ['#c98a3a', '#7a4a28', '#e8c070']), head: r() < 0.4 ? 'kerchief' : null, headColor: '#c0392b', pose: K.pick(r, ['pray', 'orans', 'point']), turn: -1, mouth: 'smile' });
  // villagers in embroidered clothes
  for (const [x, y] of [[90, 740], [160, 760], [860, 720], [930, 740], [1000, 730]]) b += K.person(x, y, 1.3, { robe: '#f3ead8', sash: '#c0392b', mantle: K.pick(r, [null, '#7a4a28', '#4f6a2a']), apron: K.pick(r, [null, '#c0392b']), veil: r() < 0.4 ? '#f3ead8' : null, head: r() < 0.3 ? 'kerchief' : null, headColor: '#c0392b', hairStyle: K.pick(r, ['short', 'curly', 'bald']), hairColor: K.pick(r, ['#c98a3a', '#7a4a28', '#4a2d18']), beard: K.pick(r, ['none', 'short', 'long']), pose: K.pick(r, ['pray', 'orans', 'stand']), turn: x < 600 ? 1 : -1, mouth: 'smile' });
  // Prince Rastislav on horseback
  b += K.horse(1110, 760, 1.15, { color: '#e8dcc0', mane: '#b8a888', saddle: C.red, flip: true, walk: false, rider: { spear: false, robe: '#2c5596', cloak: C.red, hair: 'short', hairColor: '#4a2d18', armor: false } });
  b += K.flowers(5, 0, 720, 1200, 80, 40) + K.goat(470, 790, 1.0) + K.flock(6, 500, 100, 400, 80, 6);
  return K.scene({ title: 'The Moravians hear the Gospel in their own language', body: b });
}

function rome() {
  let b = K.raw.R(0, 0, 1200, 800, '#e8d9b8', 'n');
  b += K.columnHall(600, 600, 1240, 600, { n: 6, color: '#f4efe4' });
  // apse with golden mosaic
  b += K.raw.P('M380,560 V260 Q600,60 820,260 V560Z', C.gold) + K.rays(600, 260, { n: 16, r1: 30, r2: 300, op: 0.3, color: '#fff3a6' });
  b += K.raw.Ci(600, 250, 60, '#2c5596') + K.raw.P('M600,205 l8,30 l30,8 l-30,8 l-8,30 l-8,-30 l-30,-8 l30,-8Z', C.goldLight);
  for (let i = 0; i < 9; i++) b += K.raw.P(`M${420 + i * 45},540 l10,-30 l10,30Z`, '#4f8a3c', 'n');
  b += K.raw.R(0, 600, 1200, 200, '#b9a47e', 'n');
  for (let i = 0; i < 6; i++) for (let j = 0; j < 3; j++) b += `<rect x="${i * 200 + (j % 2) * 100 - 50}" y="${610 + j * 64}" width="100" height="64" fill="${(i + j) % 2 ? '#c9b48a' : '#a8916a'}" opacity=".5"/>`;
  // altar
  b += K.raw.R(500, 470, 200, 120, '#f6eedb') + K.raw.R(490, 460, 220, 16, C.gold) + K.raw.R(560, 500, 80, 60, '#c0392b');
  b += K.raw.R(520, 410, 20, 50, '#f6eecd') + K.raw.R(660, 410, 20, 50, '#f6eecd') + K.glow(530, 400, 40) + K.glow(670, 400, 40);
  // the Slavonic book on the altar
  b += `<g transform="translate(600 452)">${K.raw.R(-26, -10, 52, 14, '#c0392b')}${K.raw.R(-24, -14, 48, 6, '#f6ecd2')}</g>`;
  // Pope Adrian
  b += K.person(700, 650, 1.9, { halo: false, vest: 'bishop', robe: '#fbf6ea', mantle: '#f4d468', hairStyle: 'bald', hairColor: '#cfcfcf', beard: 'short', beardColor: '#cfcfcf', pose: 'give', hold: 'book', holdColor: '#c0392b', turn: -1, flip: true });
  // Cyril and Methodius kneeling
  b += K.person(360, 740, 2.0, { ...methodius, kneel: true, pose: 'pray' });
  b += K.person(470, 760, 1.95, { ...cyril, kneel: true, pose: 'orans', turn: 1 });
  // relics of St Clement in a golden casket carried by deacons
  b += K.raw.R(870, 600, 110, 50, C.gold) + K.raw.P('M870,600 L925,570 L980,600Z', C.gold) + K.raw.P('M917,560 v-14 M910,552 h14', 'none', 'l');
  b += K.person(860, 740, 1.4, { robe: '#fbf6ea', mantle: null, vest: 'deacon', hairStyle: 'curly', beard: 'young', pose: 'carry', turn: -1 }) + K.person(990, 740, 1.4, { robe: '#fbf6ea', mantle: null, vest: 'deacon', hairStyle: 'short', beard: 'short', pose: 'carry', turn: -1 });
  // people with candles
  const r = K.rng(8);
  for (const [x, y] of [[80, 760], [170, 780], [1090, 770], [1160, 790]]) b += K.person(x, y, 1.3, { robe: K.pick(r, ['#2c5596', '#6b2e6e', '#4f8a3c', '#a8743a']), mantle: K.pick(r, [null, '#c9913f']), veil: r() < 0.5 ? '#e8dcc0' : null, hairStyle: K.pick(r, ['short', 'bald', 'curly']), beard: K.pick(r, ['short', 'long']), pose: 'hold', hold: 'candle', turn: x < 600 ? 1 : -1 });
  return K.scene({ title: 'In Rome the Pope blesses the Slavonic books', body: b });
}

export const art = {
  'portrait.svg': () => K.scene({ w: 400, h: 400, title: 'Sts Cyril and Methodius', body: `<rect width="400" height="400" fill="url(#gGold)"/>${K.rays(200, 180, { n: 28, r1: 40, r2: 320, color: '#fff6c8', op: 0.35 })}${K.person(125, 600, 3.7, { ...methodius, pose: 'hold', hold: 'book' })}${K.person(282, 610, 3.7, { ...cyril, pose: 'hold', hold: 'openscroll' })}` }),
  'scene-alphabet.svg': alphabet,
  'scene-moravia.svg': moravia,
  'scene-rome.svg': rome,
};
