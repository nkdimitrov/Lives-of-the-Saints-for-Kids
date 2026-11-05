import * as K from '../kit.mjs';
const { C } = K;
export const slug = 'conon-of-isauria';

// Conon as a grown man and in old age (portrait, rescue); as a boy in the baptism scene.
const conon = { halo: true, robe: '#5a3a2a', mantle: C.red, hairStyle: 'short', hairColor: '#d4d0c6', beard: 'long', beardColor: '#e4e0d6' };
const youngConon = { halo: true, robe: '#2c5596', mantle: C.red, hairStyle: 'short', hairColor: '#4a2d18', beard: 'short', beardColor: '#4a2d18' };
const michael = { robe: '#2c5596', mantle: C.red, hairStyle: 'bob', hairColor: '#c98a3a' };

// Clay pot (local coordinates: y = 0 is its rim, the pot hangs below or sits above).
function claypot(x, y, s = 1, { upside = false } = {}) {
  const body = K.raw.P('M-26,0 Q-40,-30 -22,-58 L22,-58 Q40,-30 26,0Z', '#b5653a') + K.raw.R(-24, -64, 48, 8, '#9a5230');
  const stripes = `<path d="M-33,-24 Q0,-16 33,-24 M-31,-36 Q0,-28 31,-36" class="l" stroke="#e8c49a" stroke-width="2.4"/>`;
  return K.g(x, y, s, body + stripes, { rot: upside ? 180 : 0 });
}

function candle(x, y, s = 1) {
  return K.g(x, y, s, `${K.raw.E(0, 0, 18, 5, '#c9a24a')}${K.raw.R(-6, -44, 12, 44, '#f6ecd2')}${K.raw.P('M0,-46 Q-8,-58 0,-74 Q8,-58 0,-46Z', '#ffcf3a')}${K.raw.P('M0,-50 Q-3,-56 0,-63 Q3,-56 0,-50Z', '#fff6c8', 'n')}`);
}

function archangelScene() {
  let b = K.sky('day') + K.sun(1090, 90, 34) + K.cloud(260, 110, 0.7) + K.cloud(820, 70, 0.55);
  b += `<g class="vfar">${K.mountains(330, '#9db2c8', { seed: 4, peaks: 7, height: 210 })}</g>`;
  b += `<g class="far">${K.hills(380, '#9fbf7a', { seed: 6, amp: 34 })}`;
  // stone village on the hillside
  b += K.house(820, 360, 0.7, { w: 60, h: 40, wall: '#e4d4b4', roof: '#b0482a', style: 'flat' });
  b += K.house(880, 350, 0.6, { w: 56, h: 40, wall: '#d8c49e', roof: '#c2552f' });
  b += K.house(950, 362, 0.72, { w: 64, h: 42, wall: '#ecdcbc', roof: '#b0482a', chimney: true });
  b += K.house(1020, 352, 0.6, { w: 56, h: 38, wall: '#d8c49e', roof: '#c2552f', style: 'flat' });
  b += K.tree(770, 362, 0.7, { kind: 'cypress' }) + K.tree(1080, 360, 0.7, { kind: 'cypress' }) + K.tree(990, 345, 0.5, { kind: 'olive', seed: 3 });
  b += `</g>`;
  b += K.hills(470, '#8dbb57', { seed: 9, amp: 22 });
  // the mountain stream
  b += K.river('M700,430 C640,500 760,540 660,600 C580,650 640,700 600,740 C570,770 520,790 470,820', { w: 120 });
  b += `<path d="M680,470 q20,6 40,0 M650,600 q24,8 48,0 M520,770 q24,8 48,0 M470,800 q20,6 40,0" class="l" stroke="#d9eef8" stroke-width="2.4"/>`;
  // rocks and goats
  b += K.rock(140, 520, 1.8, '#b8a888') + K.rock(230, 540, 1.2) + K.rock(1080, 560, 2.0, '#b0a088') + K.rock(980, 600, 1.1);
  b += K.goat(150, 470, 0.95) + K.goat(1090, 505, 0.9, { flip: true, color: '#8a6a4a' }) + K.goat(1150, 640, 0.8, { flip: true });
  b += K.tree(60, 620, 1.9, { kind: 'oak', seed: 5 }) + K.tree(300, 520, 1.3, { kind: 'cypress' }) + K.tree(1170, 760, 2.0, { kind: 'oak', seed: 2 });
  b += K.tree(880, 520, 1.1, { kind: 'cypress' });
  // heavenly light
  b += K.heaven(560, 0, 140, { rayTo: [560, 600] }) + K.glow(560, 560, 220, 0.75);
  // the Archangel Michael on the bank, pouring water over the boy
  b += K.angel(760, 700, 2.15, { ...michael, pose: 'reach', hold: null, flip: true });
  // the boy Conon standing in the stream
  b += K.person(590, 730, 1.6, { halo: true, child: true, robe: '#fbf7ee', mantle: null, hairStyle: 'short', hairColor: '#4a2d18', pose: 'pray', turn: 1, eyes: 'closed' });
  b += K.raw.E(592, 728, 74, 16, C.water, 'n', ' opacity=".8"') + `<path d="M532,728 q14,6 28,0 M590,732 q14,6 28,0 M620,722 q12,5 24,0" class="l" stroke="#d9eef8" stroke-width="2"/>`;
  // water poured from the Archangel's hand over the boy's head
  b += `<path d="M652,526 C640,548 622,560 606,586" stroke="#bfe6fb" stroke-width="6" fill="none" stroke-linecap="round" opacity=".95"/>`;
  for (let i = 0; i < 6; i++) b += K.raw.E(578 + (i % 3) * 22, 602 + Math.floor(i / 3) * 16 + (i % 2) * 6, 3, 5, '#d9f1fc', 'n');
  b += K.flowers(7, 0, 690, 380, 110, 26) + K.flowers(8, 820, 700, 380, 100, 22) + K.grass(3, 760, 720, 440, 80, 30);
  b += K.flock(5, 180, 150, 300, 80, 5);
  return K.scene({ title: 'The Archangel Michael baptizes the boy Conon', body: b });
}

function candleScene() {
  let b = K.raw.R(0, 0, 1200, 800, '#e6d6b4', 'n');
  // window onto the starry mountains and the sleeping village
  b += `<clipPath id="cwin"><rect x="760" y="140" width="300" height="230" rx="6"/></clipPath><g clip-path="url(#cwin)">${K.sky('night')}${K.stars(60, 13, 1200, 380)}${K.moon(1010, 190, 22)}`;
  b += `<g class="vfar">${K.mountains(330, '#3a4d74', { seed: 12, peaks: 5, height: 140, snowColor: '#c9d6ea' })}</g>`;
  b += `<g class="far">${K.hills(350, '#2e4636', { seed: 3, amp: 10 })}${K.house(830, 360, 0.5, { wall: '#9a9888', roof: '#5a3a30', lit: true })}${K.house(900, 352, 0.45, { wall: '#8e8c7e', roof: '#5a3a30' })}${K.house(990, 362, 0.55, { wall: '#9a9888', roof: '#5a3a30', lit: true })}${K.tree(1040, 360, 0.5, { kind: 'cypress' })}</g></g>`;
  b += K.raw.R(760, 140, 300, 230, 'none', 'o', ' stroke-width="10" stroke="#8a6a44" rx="6"') + `<path d="M910,140 V370 M760,255 H1060" stroke="#8a6a44" stroke-width="7"/>` + K.raw.R(744, 368, 332, 16, '#a8845a');
  // beams, hanging herbs and garlic
  b += K.raw.R(0, 40, 1200, 26, '#7a5432') + `<path d="M0,66 H1200" class="l"/>`;
  for (const x of [120, 170, 220]) b += `<path d="M${x},66 v40" class="l"/>` + K.raw.P(`M${x - 12},106 Q${x},140 ${x + 12},106Z`, '#6f8a3a');
  for (const x of [470, 500]) b += `<path d="M${x},66 v30" class="l"/>` + K.raw.Ci(x, 108, 12, '#f1ead6');
  // shelf with jars, loom, chest and amphorae
  b += K.raw.R(60, 250, 240, 12, '#8a6a44');
  for (let i = 0; i < 4; i++) b += K.raw.P(`M${80 + i * 58},250 q-10,-30 6,-50 h20 q16,20 6,50Z`, ['#b5653a', '#2c5596', '#c9913f', '#7f9452'][i]);
  b += `<path d="M340,600 V200 M470,600 V200 M330,214 H480 M330,420 H480" stroke="#7a5432" stroke-width="10" stroke-linecap="round"/>`;
  for (let i = 0; i < 12; i++) b += `<path d="M${352 + i * 10},214 V420" stroke="${['#b8322a', '#2c5596', '#d9a521'][i % 3]}" stroke-width="3"/>`;
  b += K.raw.R(345, 300, 120, 90, '#b8322a', 'o', ' opacity=".55"');
  b += K.raw.R(1000, 560, 170, 90, '#8a5a32') + `<path d="M1000,585 H1170" class="l"/>` + K.raw.R(1074, 590, 22, 14, C.gold);
  b += K.raw.P('M120,640 q-30,-60 0,-120 h30 q30,60 0,120Z', '#b5653a') + K.raw.P('M190,650 q-26,-50 0,-100 h24 q26,50 0,100Z', '#c9913f');
  // the cat dozing on the chest
  b += `<g transform="translate(1085 560)">${K.raw.E(0, -8, 24, 10, '#7a7068')}${K.raw.Ci(20, -14, 8, '#7a7068')}${K.raw.P('M14,-20 l2,-8 l5,6Z M22,-21 l4,-7 l2,8Z', '#7a7068')}${K.face(20, -14, 7, 0, { eyes: 'closed', blush: false })}<path d="M-22,-4 q-16,4 -10,-12" class="l" stroke-width="3"/></g>`;
  // floor
  b += K.raw.R(0, 600, 1200, 200, '#b89a6c', 'n') + `<path d="M0,600 H1200" class="l"/>`;
  for (let i = 0; i < 8; i++) b += `<path d="M0,${630 + i * 24} H1200" stroke="#a88a5c" stroke-width="1.2"/>`;
  b += K.raw.P('M380,800 L460,640 L820,640 L900,800Z', '#8e2a22') + `<path d="M400,790 L466,650 M880,790 L814,650" stroke="${C.gold}" stroke-width="3"/>`;
  // night: dim everything, then let the candle light the middle of the room
  b += K.raw.R(0, 0, 1200, 800, '#141c40', 'n', ' opacity=".55"');
  b += `<circle cx="600" cy="500" r="400" fill="url(#gLamp)" opacity=".9"/>`;
  // table with the wedding food (the table top is at y = 586)
  b += K.table(600, 640, 340, 1, { cloth: '#f3e6c4' });
  b += K.raw.E(680, 582, 40, 9, '#c9a24a') + K.raw.E(680, 572, 30, 12, '#d9a35a') + `<path d="M662,568 q18,-8 36,0" class="l"/>`;
  for (let i = 0; i < 9; i++) b += K.raw.Ci(722 + (i % 3) * 10 + Math.floor(i / 3) * 5, 556 + Math.floor(i / 3) * 10, 6, '#6b2e6e');
  b += K.raw.Ci(500, 574, 12, '#b8322a') + K.raw.Ci(524, 576, 11, '#c2402e') + K.raw.P('M496,563 l4,-6 l4,6Z M520,566 l4,-6 l4,6Z', '#7f1d18');
  b += candle(600, 586, 1.1) + K.glow(600, 520, 100, 0.95);
  // Conon has just lifted the pot off the candle; Anna is amazed
  b += K.person(440, 760, 2.0, { ...youngConon, pose: 'raise', hold: null, turn: 1, mouth: 'smile' });
  b += claypot(510, 466, 0.95, { upside: true });
  b += K.person(800, 760, 1.9, { robe: '#b8322a', mantle: '#d9a521', veil: '#fbf7ee', hairStyle: 'long', hairColor: '#5a3a1a', pose: 'orans', turn: -1, mouth: 'open' });
  return K.scene({ title: 'Conon shows his bride Anna the candle hidden under a pot', body: b });
}

function rescueScene() {
  let b = K.sky('day') + K.cloud(200, 90, 0.75) + K.cloud(700, 60, 0.6) + K.sun(1100, 80, 30);
  b += `<g class="vfar">${K.mountains(310, '#a7b8cc', { seed: 21, peaks: 6, height: 200 })}</g>`;
  b += `<g class="far">${K.hills(360, '#a9c27a', { seed: 14, amp: 28 })}${K.tree(620, 360, 0.6, { kind: 'cypress' })}${K.tree(700, 352, 0.6, { kind: 'olive', seed: 4 })}${K.goat(780, 352, 0.4)}${K.goat(820, 348, 0.36, { flip: true })}</g>`;
  // the walled mountain town with its gate on the left
  b += K.cityscape(250, 420, 0.75, { w: 460, seed: 17 });
  b += K.wall(250, 520, 460, 110, { color: '#d2bd94', seed: 6 });
  b += K.tower(30, 520, 1.1, { w: 50, h: 160, color: '#d2bd94' }) + K.tower(470, 520, 1.1, { w: 50, h: 150, color: '#d2bd94' });
  b += K.hills(540, '#8dbb57', { seed: 3, amp: 14 });
  b += K.path('M250,540 C420,620 620,640 1240,620', '#e3c98e', 90);
  b += K.tree(560, 520, 1.3, { kind: 'cypress' }) + K.tree(1150, 560, 1.6, { kind: 'oak', seed: 9 });
  // townspeople pouring out of the gate with staves, spears and tools
  b += K.crowd(31, 140, 600, 260, 7, { s: 0.85, poses: ['point', 'stand', 'raise'] });
  b += K.person(250, 690, 1.25, { robe: '#a8743a', mantle: '#4f8a3c', hairStyle: 'short', hairColor: '#2a1d14', beard: 'short', pose: 'spear', hold: 'spear', turn: 1, mouth: 'open' });
  b += K.person(150, 720, 1.3, { robe: '#5a8aa8', mantle: null, hairStyle: 'curly', hairColor: '#4a2d18', beard: 'short', pose: 'hold', hold: 'staff', turn: 1 });
  b += K.person(330, 740, 1.3, { robe: '#7a4a8a', mantle: '#d9c07a', hairStyle: 'short', hairColor: '#6a6a6a', beard: 'long', beardColor: '#9a9a9a', pose: 'hold', hold: 'axe', turn: 1, mouth: 'open' });
  b += K.person(60, 770, 1.35, { robe: '#c9913f', mantle: '#b8322a', veil: '#e8dcc0', pose: 'point', turn: 1, mouth: 'open' });
  // the governor and his soldiers running away down the road
  const dust = (x, y, s) => K.g(x, y, s, `${K.raw.E(0, 0, 26, 12, '#eadcb4', 'n', ' opacity=".8"')}${K.raw.E(-22, -6, 18, 10, '#eadcb4', 'n', ' opacity=".7"')}${K.raw.E(-40, 2, 12, 7, '#eadcb4', 'n', ' opacity=".6"')}`);
  b += dust(930, 636, 1.2) + dust(880, 690, 1) + dust(1050, 700, 1);
  b += K.horse(1040, 640, 1.15, { color: '#8a5a32', mane: '#3a2416', saddle: C.purple, rider: { halo: false, spear: false, robe: C.purple, cloak: C.red, hair: 'short', hairColor: '#6a6a6a', beard: 'short', armor: false } });
  b += K.g(930, 690, 1, K.person(0, 0, 1.1, { armor: true, robe: '#7a2a20', cloak: '#5a1a14', head: 'helmet', beard: 'short', pose: 'carry', hold: 'spear', turn: 1, mouth: 'open' }), { rot: 8 });
  b += K.g(1110, 705, 1, K.person(0, 0, 1.05, { armor: true, robe: '#7a2a20', cloak: '#5a1a14', head: 'helmet', pose: 'point', turn: 1, mouth: 'open' }), { rot: 10 });
  b += K.dog(1120, 770, 1.0, { color: '#b07a40' });
  // Conon standing free in the light, with the loosened ropes at his feet
  b += K.glow(620, 600, 220, 0.85);
  b += K.person(620, 760, 2.05, { ...conon, pose: 'orans' });
  for (const [cx, cy] of [[548, 772], [690, 776]]) {
    for (let i = 0; i < 3; i++) b += `<ellipse cx="${cx + i * 3}" cy="${cy - i * 3}" rx="${30 - i * 7}" ry="${9 - i * 2}" fill="none" stroke="${C.ink}" stroke-width="7"/><ellipse cx="${cx + i * 3}" cy="${cy - i * 3}" rx="${30 - i * 7}" ry="${9 - i * 2}" fill="none" stroke="#d2b07a" stroke-width="4.5"/>`;
  }
  b += `<path d="M576,770 q14,4 22,-4 M660,778 q-10,-4 -18,2" fill="none" stroke="#d2b07a" stroke-width="4.5" stroke-linecap="round"/>`;
  // a sick woman kneeling beside him, healed
  b += K.person(770, 770, 1.35, { kneel: true, robe: '#6f7a5a', mantle: '#a8916a', veil: '#d8ccb4', pose: 'pray', turn: -1, mouth: 'smile' });
  b += K.goat(470, 610, 0.8, { flip: true }) + K.goat(840, 600, 0.75, { color: '#7a5a3a' });
  b += K.flowers(11, 400, 720, 500, 70, 22) + K.flock(9, 650, 120, 300, 80, 6);
  return K.scene({ title: 'The people of Isauria come out to defend Conon and the torturers flee', body: b });
}

export const art = {
  'portrait.svg': () => K.portrait({ ...conon, pose: 'hold', hold: 'cross' }, { title: 'St Conon of Isauria' }),
  'scene-archangel.svg': archangelScene,
  'scene-candle.svg': candleScene,
  'scene-rescue.svg': rescueScene,
};
