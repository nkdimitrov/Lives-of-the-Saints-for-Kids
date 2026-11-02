import * as K from '../kit.mjs';
const { C } = K;
export const slug = 'sergius-of-radonezh';

const sergiusYoung = { halo: true, robe: '#3a3530', mantle: '#2a2423', vest: 'monk', head: 'cowl', headColor: '#2a2423', beard: 'short', beardColor: '#8a5a32', skin: C.skin };
const sergiusOld = { halo: true, robe: '#3a3530', mantle: '#2a2423', vest: 'monk', head: 'schema', headColor: '#2a2423', beard: 'long', beardColor: '#cfc8bc', skin: C.skin };

const squirrel = (x, y, s = 1, flip = false) => K.g(x, y, s, `${K.raw.P('M-6,0 Q-24,-6 -20,-26 Q-14,-36 -6,-30 Q-14,-20 -4,-10Z', '#b8642a')}${K.raw.E(4, -8, 8, 9, '#c8743a')}${K.raw.Ci(8, -18, 6, '#c8743a')}${K.raw.P('M6,-24 l1,-6 l4,5Z', '#c8743a')}${K.raw.Ci(10, -19, 1.2, C.ink, 'n')}`, { flip });
const hedgehog = (x, y, s = 1) => K.g(x, y, s, `${K.raw.P('M-18,0 Q-20,-16 -4,-18 Q14,-20 18,-6 Q20,0 16,0Z', '#6e5a42')}${Array.from({ length: 7 }, (_, i) => `<path d="M${-14 + i * 4},${-14 - (i % 2) * 2} l-2,-6" stroke="#4a3a2a" stroke-width="1.6"/>`).join('')}${K.raw.Ci(16, -4, 1.4, C.ink, 'n')}`);
const woodpecker = (x, y, s = 1) => K.g(x, y, s, `${K.raw.E(0, 0, 6, 11, '#2a2221')}${K.raw.Ci(2, -12, 5, '#2a2221')}${K.raw.P('M1,-17 q4,-3 5,2Z', '#c0392b', 'n')}${K.raw.P('M6,-12 l7,1 l-7,2Z', '#c9cdd0', 'n')}${K.raw.Ci(3, -13, 1, '#fff', 'n')}`);

function oak() {
  let b = K.sky('day') + K.sun(1080, 90, 32) + K.cloud(260, 90, 0.8) + K.cloud(700, 60, 0.6);
  b += `<g class="far">${K.hills(330, '#9fc27a', { seed: 4, amp: 16 })}</g>`;
  // wooden village with a church on the hill
  b += `<g class="far">${K.onionChurch(880, 330, 0.6, { domes: ['#2c5596', '#2c5596', '#2c5596'] })}${K.izba(760, 335, 0.5)}${K.izba(1000, 335, 0.5)}${K.izba(1100, 340, 0.45)}${K.fence(700, 345, 300, 0.6)}</g>`;
  // birch forest edge
  for (let i = 0; i < 14; i++) b += K.tree(20 + i * 30 + (i % 3) * 8, 380 + (i % 2) * 12, 1.0 + (i % 3) * 0.1, { kind: i % 3 ? 'birch' : 'fir', seed: i });
  b += K.hills(420, '#8ab85a', { seed: 6, amp: 12 });
  b += K.river('M1220,470 C1000,500 900,600 760,640 S500,760 400,820', { w: 34 });
  // the great oak
  b += K.tree(430, 640, 3.2, { kind: 'oak', seed: 21 });
  // horses grazing
  b += K.horse(930, 560, 0.8, { color: '#8a5a32', mane: '#3a2416', saddle: null, walk: false }) + K.horse(1060, 580, 0.75, { color: '#e8dcc0', mane: '#b8a888', saddle: null, flip: true, walk: false });
  b += K.horse(820, 600, 0.55, { color: '#6e4527', mane: '#2a1d14', saddle: null });
  // the elder and the boy
  b += K.person(330, 740, 2.0, { ...sergiusOld, beardColor: '#e8e6e0', pose: 'give', hold: 'bread', turn: 1, mouth: 'smile' });
  b += K.person(560, 760, 1.75, { child: true, robe: '#5a7ac4', mantle: null, sash: C.red, hairStyle: 'bob', hairColor: '#c98a3a', pose: 'reach', turn: -1, mouth: 'smile', flip: true });
  b += K.flowers(5, 0, 650, 1200, 140, 60, ['#ffffff', '#f5d33a', '#9a6ad6', '#e2483d', '#5aa3cf']);
  b += K.grass(6, 0, 650, 1200, 140, 50) + K.flock(7, 600, 120, 300, 80, 5) + K.rabbit(150, 780, 1.1);
  return K.scene({ title: 'Young Bartholomew meets the holy elder under the oak tree', body: b });
}

function bear() {
  let b = K.sky('day') + K.cloud(600, 70, 0.7);
  // deep forest background
  for (let row = 0; row < 3; row++) for (let i = 0; i < 16; i++) b += K.tree(i * 80 + (row * 30) % 80, 360 + row * 40, 0.9 + row * 0.2, { kind: (i + row) % 3 ? 'fir' : 'birch', seed: i + row * 20 });
  b += K.ground(470, '#6f9a4a');
  // clearing
  b += K.raw.E(600, 640, 560, 160, '#8ab85a', 'n');
  b += K.woodenChurch(760, 520, 1.7) + K.izba(380, 520, 1.1, { w: 70, h: 46 });
  b += K.fence(880, 540, 260, 1);
  // stump with bread
  b += K.raw.P('M560,720 v-40 q30,-10 60,0 v40Z', '#8a5a32') + K.raw.E(590, 680, 30, 8, '#c9a46a') + K.raw.E(590, 674, 14, 6, '#d9a25a');
  // Sergius and the bear
  b += K.person(440, 760, 2.05, { ...sergiusYoung, pose: 'give', hold: 'bread', turn: 1, mouth: 'smile' });
  b += K.bear(730, 760, 1.55, { flip: true });
  // forest friends
  b += squirrel(1060, 470, 1.5) + squirrel(180, 600, 1.4, true) + hedgehog(1000, 770, 1.6) + woodpecker(118, 380, 1.6);
  b += K.deer(1110, 620, 1.1, { flip: true });
  b += K.tree(70, 780, 1.8, { kind: 'birch' }) + K.tree(1170, 790, 1.9, { kind: 'fir' });
  b += K.flowers(7, 200, 700, 800, 90, 24, ['#ffffff', '#f5d33a', '#e2483d']);
  b += `<g transform="translate(300 780)">${[0, 1, 2].map((i) => `<circle cx="${i * 14}" cy="${-6 - (i % 2) * 6}" r="6" fill="#c0392b" stroke="${C.ink}" stroke-width="1"/>`).join('')}</g>`;
  return K.scene({ title: 'St Sergius shares his bread with the bear', body: b });
}

function blessing() {
  let b = K.sky('day') + K.sun(1100, 80, 30) + K.cloud(300, 90, 0.8) + K.cloud(800, 60, 0.6);
  // the monastery
  b += K.g(600, 420, 1, `${K.wall(0, 0, 1100, 90, { color: '#f4efe4', gate: true, seed: 3 })}${K.tower(-550, 0, 1.2, { color: '#f4efe4', roof: '#2f6a4a', flag: null })}${K.tower(550, 0, 1.2, { color: '#f4efe4', roof: '#2f6a4a' })}`);
  b += K.onionChurch(420, 330, 1.2, { domes: ['#d9a521', '#2c5596', '#2c5596'] }) + K.onionChurch(800, 330, 0.9, { domes: ['#2c5596', '#2c5596', '#2c5596'] });
  b += K.ground(420, '#8ab85a');
  b += K.path('M560,800 C580,620 700,520 1220,480', '#d9c89a', 90);
  // army waiting on the road
  for (let i = 0; i < 6; i++) {
    const x = 860 + i * 70, y = 560 - i * 10, s = 0.75 - i * 0.05;
    b += K.horse(x, y, s, { color: ['#8a5a32', '#e8dcc0', '#3a2a1e', '#a0522d', '#6e4527', '#e8dcc0'][i], mane: '#2a1d14', saddle: C.red, rider: { spear: false, robe: '#2c5596', cloak: C.red, hair: 'short', hairColor: '#4a2d18', armor: true } , flip: true});
    b += `<path d="M${x - 10},${y - 120 * s} v-${70 * s} l${30 * s},${10 * s} l-${30 * s},${12 * s}" stroke="${C.ink}" stroke-width="1.6" fill="${i % 2 ? '#c0392b' : '#d9a521'}"/>`;
  }
  for (let i = 0; i < 6; i++) b += K.tree(60 + i * 40, 520 + (i % 2) * 20, 1.1, { kind: 'birch', seed: i });
  // two monk-warriors
  b += K.person(760, 730, 1.6, { robe: '#2a2423', mantle: '#2a2423', vest: 'monk', head: 'schema', beard: 'wide', beardColor: '#4a2d18', pose: 'spear', hold: 'spear', turn: -1, flip: true });
  b += K.person(860, 740, 1.6, { robe: '#2a2423', mantle: '#2a2423', vest: 'monk', head: 'schema', beard: 'long', beardColor: '#6a4a2a', pose: 'hold', hold: 'cross', turn: -1, flip: true });
  // Prince Dmitry kneeling
  b += K.person(560, 760, 1.95, { armor: true, kneel: true, robe: '#2c5596', cloak: C.red, head: 'helmet', headColor: '#d9a521', beard: 'short', beardColor: '#4a2d18', pose: 'pray', turn: -1, flip: true });
  // St Sergius blessing
  b += K.person(330, 760, 2.1, { ...sergiusOld, pose: 'raise', hold: 'cross', turn: 1 });
  b += K.flowers(5, 0, 720, 500, 80, 24) + K.grass(6, 0, 700, 1200, 100, 40) + K.flock(4, 300, 100, 400, 80, 6);
  return K.scene({ title: 'St Sergius blesses Prince Dmitry before the battle of Kulikovo', body: b });
}

export const art = {
  'portrait.svg': () => K.portrait({ ...sergiusOld, pose: 'bless', hold: 'scroll' }, { title: 'St Sergius of Radonezh' }),
  'scene-oak.svg': oak,
  'scene-bear.svg': bear,
  'scene-blessing.svg': blessing,
};
