import * as K from '../kit.mjs';
const { C } = K;
export const slug = 'panteleimon';

const pant = { halo: true, robe: '#2c8a5a', mantle: '#b8322a', hairStyle: 'curly', hairColor: '#5a3a1a', beard: 'none', pose: 'hold', hold: 'box', mouth: 'calm' };
const hermolaus = { halo: true, robe: '#3a3a4a', mantle: '#5a4a3a', hairStyle: 'bald', hairColor: '#ecebe6', beard: 'long', beardColor: '#ecebe6' };

function fountain(x, y, s = 1) {
  return K.g(x, y, s, `${K.raw.E(0, 0, 60, 16, '#cdbb98')}${K.raw.E(0, -6, 52, 12, '#5aa3cf')}${K.raw.R(-8, -70, 16, 64, '#e2d4b4')}${K.raw.E(0, -70, 26, 8, '#cdbb98')}<path d="M0,-74 q-20,-20 -30,10 M0,-74 q20,-20 30,10" stroke="#9fd0ef" stroke-width="3" fill="none"/>`);
}

function hermolausScene() {
  let b = K.sky('day') + K.sun(1080, 80, 32) + K.cloud(400, 80, 0.7);
  b += `<g class="far">${K.hills(320, '#a9c27a', { seed: 3, amp: 18 })}${K.palace(900, 330, 0.45)}${K.temple(250, 330, 0.5)}</g>`;
  b += K.house(140, 520, 2.0, { w: 90, h: 80, wall: '#efe0c4', roof: '#c2552f', chimney: true });
  b += K.house(1080, 520, 2.1, { w: 90, h: 76, wall: '#e8d4b0', roof: '#b0482a', style: 'flat' });
  // Hermolaus' humble house
  let h = K.raw.R(-160, -230, 320, 230, '#d8c49e') + K.raw.P('M-180,-230 L0,-310 L180,-230Z', '#9a5a3a');
  h += K.raw.P('M-40,0 V-140 Q0,-180 40,-140 V0Z', '#3a2a1e') + K.glow(0, -60, 60, 0.6);
  h += K.raw.R(-130, -180, 50, 50, '#36506e') + K.raw.R(80, -180, 50, 50, '#36506e') + `<path d="M-105,-180 v50 M105,-180 v50" class="l"/>`;
  h += K.raw.R(-60, 0, 120, 10, '#b8a47e') + K.raw.R(-70, 10, 140, 10, '#c4b08a');
  b += K.g(600, 560, 1, h);
  b += K.tree(380, 560, 1.5, { kind: 'apple', fruit: '#6a3a6a', seed: 9 });
  b += K.ground(560, '#d9c79e');
  for (let i = 0; i < 9; i++) b += `<path d="M0,${580 + i * 24} H1200" stroke="#c9b68a" stroke-width="1.2"/>`;
  b += fountain(950, 640, 1.2);
  // the cat on the steps
  b += `<g transform="translate(680 575)">${K.raw.E(0, -8, 20, 9, '#c98a3a')}${K.raw.Ci(18, -14, 7, '#c98a3a')}${K.raw.P('M13,-19 l2,-7 l4,5Z M20,-20 l3,-6 l2,7Z', '#c98a3a')}${K.face(18, -14, 6, 0, { eyes: 'closed', blush: false })}</g>`;
  // Hermolaus at the door and Pantoleon
  b += K.person(590, 610, 1.8, { ...hermolaus, pose: 'reach', turn: -1, mouth: 'smile', flip: true });
  b += K.person(420, 720, 1.9, { ...pant, halo: false, pose: 'hold', hold: 'box', turn: 1 });
  b += K.raw.R(340, 640, 30, 20, '#f3e6c4');
  // passers-by
  b += K.person(820, 730, 1.3, { robe: '#a8743a', mantle: '#4f8a3c', veil: '#e8dcc0', pose: 'carry', hold: 'jar', holdColor: '#c9913f', turn: -1 });
  b += K.person(1080, 740, 1.35, { robe: '#2c5596', mantle: null, hairStyle: 'short', beard: 'short', pose: 'stand', turn: -1 });
  b += K.donkey(200, 760, 1.2) + K.flock(3, 300, 100, 400, 80, 5);
  return K.scene({ title: 'Pantoleon meets the priest Hermolaus', body: b });
}

function childScene() {
  let b = K.sky('day') + K.cloud(300, 90, 0.8) + K.cloud(900, 70, 0.6);
  b += `<g class="far">${K.hills(340, '#9fbf7a', { seed: 5, amp: 22 })}${K.cityscape(950, 340, 0.55, { w: 420, seed: 8 })}</g>`;
  b += K.hills(430, '#b9c47a', { seed: 7, amp: 12 });
  for (let i = 0; i < 7; i++) b += K.tree(80 + i * 90, 440 + (i % 2) * 10, 0.9, { kind: 'olive', seed: i });
  b += K.wheat(4, 760, 430, 440, 80, 90);
  b += K.ground(520, '#c9b67a');
  b += K.path('M-20,800 C300,620 700,620 1220,560', '#e3d2a4', 120);
  // heavenly light
  b += K.heaven(560, 0, 140, { rayTo: [560, 600] }) + K.glow(560, 560, 200, 0.8);
  // the child sitting up
  b += K.person(660, 720, 1.25, { child: true, kneel: true, robe: '#e8dcc0', mantle: null, hairStyle: 'curly', hairColor: '#7a4a28', pose: 'reach', turn: -1, mouth: 'open', eyes: 'open' });
  // dead viper
  b += K.snake(860, 740, 1.4, { color: '#6f6a3a' }) + `<path d="M928,716 l8,-8 m0,8 l-8,-8" stroke="${C.ink}" stroke-width="2"/>`;
  // Pantoleon kneeling in prayer
  b += K.person(470, 740, 2.0, { ...pant, kneel: true, pose: 'orans', hold: null, turn: 1 });
  b += K.raw.R(340, 715, 34, 24, '#8a5a32');
  // shepherd's dog and sheep
  b += K.dog(1060, 740, 1.3, { flip: true }) + K.sheep(1100, 640, 0.9) + K.sheep(1160, 650, 0.8, { flip: true });
  b += K.flowers(5, 0, 700, 400, 90, 24) + K.flock(4, 800, 140, 300, 80, 5);
  return K.scene({ title: 'Pantoleon prays and the child bitten by a viper comes back to life', body: b });
}

function beastsScene() {
  let b = K.sky('day');
  // arena tiers
  for (let row = 0; row < 5; row++) {
    const y = 110 + row * 60;
    b += K.raw.R(0, y, 1200, 60, row % 2 ? '#cdb68a' : '#d9c49a', 'n') + `<path d="M0,${y} H1200" stroke="#a8916a" stroke-width="2"/>`;
    const r = K.rng(row + 11);
    for (let x = 14; x < 1200; x += 26 + r() * 8) b += K.raw.R(x - 9, y + 30, 18, 30, K.pick(r, ['#a8281f', '#2c5596', '#4f8a3c', '#e2b84a', '#6b2e6e', '#f3e6c4']), 'n') + K.raw.Ci(x, y + 22, 8, K.pick(r, [C.skin, C.skinTan]), 'n') + K.raw.Ci(x, y + 17, 6, K.pick(r, ['#2a1d14', '#7a4a28', '#9a9a9a']), 'n');
  }
  // cheering arms
  for (let i = 0; i < 16; i++) { const x = 40 + i * 74; b += `<path d="M${x},${300} l-6,-24 M${x + 14},300 l6,-24" stroke="${C.skin}" stroke-width="5" stroke-linecap="round"/>`; }
  // emperor's box
  b += K.raw.R(900, 150, 220, 130, '#7a2a20') + K.raw.R(900, 140, 220, 12, C.gold);
  b += K.person(1010, 275, 0.95, { robe: C.purple, mantle: C.red, head: 'imperial', hairStyle: 'short', hairColor: '#6a6a6a', beard: 'short', beardColor: '#8a8a8a', pose: 'point', mouth: 'open', turn: -1 });
  // arena wall and sand
  b += K.raw.R(0, 410, 1200, 40, '#a8916a') + K.raw.R(0, 450, 1200, 350, '#e2c792', 'n');
  for (let i = 0; i < 24; i++) b += K.raw.E((i * 97) % 1200, 470 + (i * 53) % 320, 20, 4, '#d4b67e', 'n');
  b += K.raw.P('M80,450 V360 Q130,320 180,360 V450Z', '#3a2a1e') + K.raw.P('M1020,450 V360 Q1070,320 1120,360 V450Z', '#3a2a1e');
  // Panteleimon and the gentle beasts
  b += K.glow(600, 520, 230, 0.85);
  b += K.person(600, 720, 2.15, { ...pant, pose: 'bless', hold: 'box' });
  b += K.lion(380, 760, 1.4, { lying: true });
  b += K.lion(820, 760, 1.3, { lying: true, flip: true, color: '#e8c06a', mane: '#e8c06a' });
  for (let i = 0; i < 10; i++) b += K.raw.Ci(760 + (i % 5) * 18, 740 + Math.floor(i / 5) * 10, 3.4, '#5a3a1a', 'n');
  b += K.bear(960, 760, 1.0, { sitting: true, flip: true });
  b += K.bear(230, 760, 0.95, { sitting: true });
  return K.scene({ title: 'The wild beasts lie down gently at Panteleimon’s feet', body: b });
}

export const art = {
  'portrait.svg': () => K.portrait({ ...pant }, { title: 'St Panteleimon the Healer' }),
  'scene-hermolaus.svg': hermolausScene,
  'scene-child.svg': childScene,
  'scene-beasts.svg': beastsScene,
};
