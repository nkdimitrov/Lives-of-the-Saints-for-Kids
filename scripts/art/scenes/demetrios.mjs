import * as K from '../kit.mjs';
const { C } = K;
export const slug = 'demetrios';

const demetrios = { halo: true, robe: '#f3e6c4', mantle: C.red, hairStyle: 'curly', hairColor: '#3a2416', beard: 'none' };
const demetriosArmor = { halo: true, armor: true, robe: C.red, cloak: C.red, hairStyle: 'curly', hairColor: '#3a2416', beard: 'none' };

function teaching() {
  let b = K.sky('day') + K.sun(1080, 90, 34) + K.cloud(260, 90, 0.8) + K.cloud(700, 70, 0.6);
  b += K.sea(360, { seed: 4, waves: 50 });
  b += `<g class="far">${K.hills(330, '#9fb989', { seed: 6, amp: 20, w: 520 })}</g>`;
  b += `<g class="far">${K.tower(120, 360, 0.7, { color: '#e8dcc0', roof: '#c2552f', flag: C.red })}</g>`;
  b += K.ship(380, 400, 0.45, { sail: '#f1e2bd', stripe: '#2c5596' }) + K.ship(620, 380, 0.3, { sail: '#e2b84a', stripe: C.red }) + K.ship(900, 420, 0.5);
  // harbor quay and city
  b += K.raw.R(0, 440, 1200, 30, '#d8c7a6');
  b += K.g(980, 470, 1, K.cityscape(0, 0, 1, { w: 460, seed: 33, wallColor: '#e2d2ae' }));
  b += K.church(1140, 470, 0.7, { dome: '#c2552f' });
  b += K.ground(470, '#e6d8b8');
  for (let i = 0; i < 12; i++) b += `<path d="M0,${490 + i * 26} H1200" stroke="#d6c59e" stroke-width="1.2"/>`;
  // marble steps
  b += K.raw.R(300, 560, 360, 26, '#f4efe4') + K.raw.R(330, 534, 300, 26, '#f7f3ea') + K.raw.R(360, 508, 240, 26, '#fbf8f2');
  b += K.tree(250, 520, 1.3, { kind: 'cypress' }) + K.tree(700, 520, 1.2, { kind: 'cypress' });
  b += K.person(480, 512, 1.9, { ...demetrios, pose: 'bless', hold: 'book', mouth: 'smile' });
  // listeners
  b += K.crowd(11, 40, 690, 360, 6, { s: 1.15, poses: ['pray', 'orans', 'stand', 'pray'] });
  b += K.crowd(12, 640, 700, 420, 6, { s: 1.15, poses: ['pray', 'stand', 'orans', 'point'] });
  b += K.person(560, 760, 0.9, { child: true, robe: '#2c5596', mantle: null, hairStyle: 'curly', pose: 'orans', mouth: 'smile', turn: -1 });
  b += K.person(420, 760, 0.9, { child: true, robe: '#e2b84a', mantle: null, hairStyle: 'bob', hairColor: '#c98a3a', pose: 'pray', mouth: 'smile', turn: 1 });
  b += K.flock(3, 300, 120, 600, 120, 7, '#fff') + K.dog(1120, 770, 1.1, { flip: true });
  return K.scene({ title: 'Demetrios teaches the people of Thessaloniki about Christ', body: b });
}

function nestor() {
  let b = K.sky('day') + K.cloud(200, 80, 0.7) + K.cloud(1000, 60, 0.6);
  // stadium tiers with spectators
  for (let row = 0; row < 6; row++) {
    const y = 140 + row * 52;
    b += K.raw.R(0, y, 1200, 52, row % 2 ? '#d8c39a' : '#e2d0aa', 'n') + `<path d="M0,${y} H1200" stroke="#b49e74" stroke-width="2"/>`;
    const r = K.rng(row + 5);
    for (let x = 12; x < 1200; x += 24 + r() * 6) {
      const col = K.pick(r, ['#a8281f', '#2c5596', '#4f8a3c', '#e2b84a', '#6b2e6e', '#f3e6c4', '#c9913f']);
      b += K.raw.R(x - 8, y + 26, 16, 26, col, 'n') + K.raw.Ci(x, y + 20, 7, K.pick(r, [C.skin, C.skinTan, C.skinDark]), 'n') + K.raw.Ci(x, y + 16, 5, K.pick(r, ['#2a1d14', '#4a2d18', '#7a4a28', '#9a9a9a']), 'n');
    }
  }
  // awnings
  for (let i = 0; i < 8; i++) b += K.raw.P(`M${i * 150},100 L${i * 150 + 150},100 L${i * 150 + 140},140 L${i * 150 + 10},140Z`, i % 2 ? '#a8281f' : '#f3e6c4');
  // royal box
  b += K.raw.R(880, 200, 260, 150, '#7a2a20') + K.raw.R(880, 190, 260, 14, C.gold);
  b += K.person(1010, 345, 1.1, { robe: C.purple, mantle: C.red, vest: 'loros', head: 'imperial', hairStyle: 'short', hairColor: '#6a6a6a', beard: 'short', beardColor: '#8a8a8a', pose: 'point', turn: -1, mouth: 'open' });
  b += K.person(930, 345, 0.95, { robe: '#2c4a7a', mantle: C.gold, hairStyle: 'bald', beard: 'long', pose: 'orans', turn: -1, mouth: 'open' });
  // arena floor
  b += K.raw.R(0, 452, 1200, 348, '#d9b97a', 'n');
  b += K.raw.R(0, 452, 1200, 10, '#a8916a', 'n');
  // platform with spears beneath
  for (let i = 0; i < 20; i++) b += K.raw.P(`M${250 + i * 34},700 l6,-46 l6,46Z`, '#c9cdd0');
  b += K.raw.R(240, 590, 700, 20, '#8a5a32') + K.raw.R(260, 610, 18, 110, '#6e4527') + K.raw.R(900, 610, 18, 110, '#6e4527');
  // Nestor
  b += K.glow(470, 470, 160, 0.9);
  b += K.person(470, 590, 1.55, { robe: '#f3e6c4', mantle: '#2c5596', hairStyle: 'curly', hairColor: '#4a2d18', pose: 'orans', turn: 1, mouth: 'open' });
  // the giant Lyaeus toppling
  b += K.g(760, 590, 1, K.person(0, 0, 2.6, { armor: true, robe: '#5a2a2a', cloak: '#3a1a14', hairStyle: 'wild', hairColor: '#2a1d14', beard: 'wide', beardColor: '#2a1d14', pose: 'orans', turn: -1, mouth: 'open', skin: C.skinTan }), { rot: 28 });
  b += `<path d="M640,320 q20,-20 40,0 M650,300 q16,-18 30,-4" stroke="#fff" stroke-width="3" fill="none"/>`;
  b += K.raw.R(0, 740, 1200, 60, '#c9a86a', 'n');
  b += K.dog(120, 780, 1, { color: '#8a6a42' });
  return K.scene({ title: 'Nestor defeats the giant Lyaeus with the prayers of St Demetrios', body: b });
}

function protector() {
  let b = K.sky('dawn') + K.cloud(260, 90, 0.8, '#fff4e8', '#f0d6c0') + K.cloud(900, 120, 0.9, '#fff4e8', '#f0d6c0');
  b += K.sea(240, { seed: 8, waves: 30 }) + K.ship(1000, 262, 0.3) + K.ship(820, 255, 0.22, { sail: '#e2b84a' });
  b += K.hills(300, '#b9b08a', { seed: 3, amp: 10 });
  b += K.g(600, 400, 1, K.cityscape(0, 0, 1, { w: 1300, seed: 19, wallColor: '#d8c39a' }));
  b += K.church(400, 380, 0.8, { dome: '#c2552f' }) + K.church(860, 380, 0.6);
  // the great wall in front
  b += K.wall(600, 560, 1300, 150, { color: '#c9b088', gate: false, seed: 7 });
  b += K.tower(120, 560, 1.4, { w: 60, h: 190, color: '#c9b088', flag: C.red }) + K.tower(1080, 560, 1.4, { w: 60, h: 190, color: '#c9b088', flag: C.red });
  // townspeople on the walls
  b += K.crowd(6, 260, 410, 700, 12, { s: 0.6, poses: ['orans', 'orans', 'pray', 'point'] });
  b += K.ground(560, '#9fae6a');
  // heavenly light and the saint on horseback
  b += K.rays(560, 300, { n: 18, r1: 40, r2: 600, op: 0.2 }) + K.glow(560, 560, 260, 0.85);
  b += K.horse(560, 760, 1.8, { color: '#b5482a', mane: '#5a1a10', saddle: C.gold, rider: { spear: true, robe: C.red, cloak: C.red, hair: 'curly', hairColor: '#3a2416', shield: C.gold } });
  // enemies fleeing
  for (const [x, s] of [[960, 1.1], [1060, 1.15], [1150, 1.05]]) b += K.person(x, 770, s, { armor: true, robe: '#4a4a5a', cloak: '#2a2a3a', head: 'helmet', headColor: '#8a8a8a', beard: 'short', pose: 'orans', flip: false, turn: 1, mouth: 'open' });
  b += K.person(900, 780, 1.0, { armor: true, robe: '#5a4a3a', cloak: null, head: 'helmet', beard: 'wide', pose: 'reach', mouth: 'open', turn: 1 });
  b += K.grass(4, 0, 700, 1200, 100, 40, '#5f7a32') + K.flowers(5, 0, 720, 400, 70, 16);
  b += K.flock(9, 300, 80, 500, 100, 7);
  return K.scene({ title: 'St Demetrios protects Thessaloniki', body: b });
}

export const art = {
  'portrait.svg': () => K.portrait({ ...demetriosArmor, pose: 'hold', hold: 'cross' }, { title: 'St Demetrios the Great-martyr' }),
  'scene-teaching.svg': teaching,
  'scene-nestor.svg': nestor,
  'scene-protector.svg': protector,
};
