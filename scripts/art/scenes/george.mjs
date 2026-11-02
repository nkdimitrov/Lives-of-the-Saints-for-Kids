import * as K from '../kit.mjs';
const { C } = K;
export const slug = 'george';

const george = { halo: true, armor: true, robe: C.red, cloak: C.red, hairStyle: 'curly', hairColor: '#4a2d18', beard: 'none', mouth: 'calm' };

function confession() {
  let b = K.raw.R(0, 0, 1200, 800, '#e9d9b6', 'n');
  // back wall with arches and a window to the city
  b += K.raw.R(0, 0, 1200, 560, '#e4cfa3', 'n');
  for (let i = 0; i < 4; i++) b += K.raw.P(`M${80 + i * 300},560 V200 Q${180 + i * 300},90 ${280 + i * 300},200 V560Z`, '#cdb68a', 'n');
  b += `<clipPath id="cw"><path d="M680,520 V220 Q780,120 880,220 V520Z"/></clipPath><g clip-path="url(#cw)">${K.sky('day')}${K.hills(420, '#9fbf7a', { seed: 3, amp: 20 })}${K.cityscape(780, 470, 0.5, { w: 400, seed: 5 })}${K.tree(700, 500, 0.8, { kind: 'cypress' })}</g>`;
  b += K.raw.P('M680,520 V220 Q780,120 880,220 V520Z', 'none', 'o', ' stroke-width="6" stroke="#a8916a"');
  b += K.columnHall(600, 560, 1240, 560, { n: 5 });
  // floor
  b += K.raw.R(0, 560, 1200, 240, '#c9b48a', 'n');
  for (let i = 0; i < 10; i++) b += `<path d="M${-200 + i * 160},800 L${400 + i * 50},560" stroke="#b49e74" stroke-width="2"/>`;
  b += `<path d="M0,620 H1200 M0,700 H1200" stroke="#b49e74" stroke-width="2"/>`;
  // red carpet
  b += K.raw.P('M560,800 L640,560 L760,560 L880,800Z', C.redDark);
  b += `<path d="M570,790 L645,565 M870,790 L755,565" stroke="${C.gold}" stroke-width="3"/>`;
  // purple banners
  for (const x of [150, 1050]) b += K.raw.P(`M${x - 30},60 h60 v200 l-30,-20 l-30,20Z`, C.purple) + K.chiRho(x, 140, 0.0001) + `<circle cx="${x}" cy="130" r="18" fill="none" stroke="${C.gold}" stroke-width="3"/>`;
  // throne and emperor
  b += K.raw.R(820, 520, 220, 40, '#b49e74') + K.raw.R(840, 490, 180, 30, '#c9b48a');
  b += K.throne(930, 520, 1.6, C.purple);
  b += K.person(930, 600, 1.7, { robe: C.purple, mantle: C.red, vest: 'loros', head: 'imperial', hairStyle: 'short', hairColor: '#6a6a6a', beard: 'short', beardColor: '#8a8a8a', pose: 'point', hold: 'sceptre', turn: -1, kneel: true });
  // nobles and guards
  b += K.person(1110, 640, 1.3, { robe: '#2c4a7a', mantle: '#c9913f', hairStyle: 'bald', hairColor: '#8a8a8a', beard: 'long', beardColor: '#bbb', pose: 'hold', hold: 'scroll', turn: -1 });
  b += K.person(760, 600, 1.15, { robe: '#5a3a6a', mantle: '#e2b84a', hairStyle: 'curly', hairColor: '#2a1d14', beard: 'short', pose: 'point', turn: -1 });
  b += K.person(1180, 690, 1.35, { armor: true, robe: '#7a2a20', cloak: '#5a1a14', head: 'helmet', beard: 'short', pose: 'spear', hold: 'spear', flip: true });
  b += K.person(330, 690, 1.35, { armor: true, robe: '#7a2a20', cloak: '#5a1a14', head: 'helmet', beard: 'short', pose: 'spear', hold: 'spear' });
  b += K.person(200, 660, 1.2, { robe: '#3a6a5a', mantle: '#e8dcc0', hairStyle: 'short', beard: 'long', beardColor: '#9a9a9a', hairColor: '#9a9a9a', pose: 'orans', turn: 1, mouth: 'open' });
  b += K.person(90, 670, 1.15, { robe: '#8a5a2a', mantle: '#2c5596', hairStyle: 'curly', beard: 'young', pose: 'point', turn: 1 });
  // George
  b += K.glow(540, 470, 140, 0.6);
  b += K.person(540, 760, 2.15, { ...george, pose: 'raise', hold: 'cross', turn: 1 });
  b += K.dog(1000, 760, 1.1, { flip: true, color: '#e8dcc0' });
  return K.scene({ title: 'George confesses Christ before Emperor Diocletian', body: b });
}

function angel() {
  let b = K.raw.R(0, 0, 1200, 800, '#6e6458', 'n');
  for (let y = 0; y < 640; y += 54) for (let x = (y / 54) % 2 ? -50 : 0; x < 1200; x += 100) b += `<rect x="${x}" y="${y}" width="100" height="54" fill="${(x + y) % 3 ? '#7a7064' : '#706658'}" stroke="#4e463c" stroke-width="2"/>`;
  // barred window
  b += `<clipPath id="pw"><rect x="160" y="90" width="200" height="160"/></clipPath><g clip-path="url(#pw)">${K.sky('night')}${K.stars(30, 4, 1200, 300)}${K.moon(300, 140, 22)}</g>`;
  b += K.raw.R(160, 90, 200, 160, 'none', 'o', ' stroke-width="6"');
  for (let i = 1; i < 5; i++) b += `<path d="M${160 + i * 40},90 V250" stroke="#3a3632" stroke-width="7"/>`;
  // floor with straw
  b += K.raw.R(0, 640, 1200, 160, '#5a5046', 'n');
  for (let i = 0; i < 60; i++) { const r = K.rng(i); const x = r() * 1200, y = 650 + r() * 140; b += `<path d="M${x},${y} l${10 + r() * 14},${-4 + r() * 8}" stroke="#c9a85a" stroke-width="2"/>`; }
  // chains and stone
  b += `<path d="M900,200 q10,60 -10,120 q-14,40 10,80" stroke="#8a8a8a" stroke-width="6" fill="none" stroke-dasharray="10 4"/>` + K.rock(980, 700, 1.6, '#8a8276');
  // heavenly light
  b += K.rays(700, 120, { n: 14, r1: 30, r2: 700, op: 0.18, spread: Math.PI * 0.7, start: Math.PI * 0.15 });
  b += K.glow(680, 420, 340, 0.9);
  // angel
  b += K.angel(740, 720, 2.6, { pose: 'reach', hold: null, flip: true });
  // George kneeling
  b += K.person(470, 730, 2.3, { ...george, kneel: true, pose: 'pray', turn: 1, eyes: 'open' });
  // mouse
  b += `<g transform="translate(160 720)">${K.raw.E(0, 0, 14, 9, '#8a8276')}${K.raw.Ci(12, -4, 7, '#8a8276')}${K.raw.Ci(10, -10, 4, '#b8b0a4')}${K.raw.Ci(16, -5, 1.2, C.ink, 'n')}<path d="M-14,2 q-18,4 -22,-8" stroke="#8a8276" stroke-width="2" fill="none"/></g>`;
  b += K.dove(820, 220, 0.6, { glow: false });
  return K.scene({ title: 'An angel heals George in prison', body: b });
}

function dragon() {
  let b = K.sky('day') + K.sun(140, 100, 36) + K.cloud(560, 90, 0.9) + K.cloud(980, 120, 0.7);
  b += `<g class="vfar">${K.mountains(330, '#a3b9cc', { seed: 9, height: 180 })}</g>`;
  b += `<g class="far">${K.hills(380, '#9fc27a', { seed: 11, amp: 24 })}</g>`;
  // city walls with king, queen and townspeople watching
  let city = K.cityscape(0, 0, 1, { w: 620, seed: 21 });
  b += K.g(880, 420, 1, city);
  b += K.person(760, 378, 0.42, { robe: C.purple, mantle: C.red, head: 'crown', hairStyle: 'short', beard: 'short', beardColor: '#9a9a9a', pose: 'orans' }) + K.person(800, 378, 0.42, { robe: '#2c5596', mantle: C.red, veil: '#f3e6c4', head: 'crown', pose: 'pray' });
  b += K.crowd(4, 840, 380, 280, 7, { s: 0.38, poses: ['orans', 'point', 'pray'] });
  // lake
  b += K.ground(430, '#86b85a');
  b += K.lake(430, 600, 360, 110, '#4f95c7') + K.reeds(160, 560, 1) + K.reeds(700, 600, 0.9) + K.reeds(250, 690, 1.1);
  b += K.tree(1100, 560, 1.4, { kind: 'oak' }) + K.tree(1180, 600, 1.2, { kind: 'cypress' }) + K.tree(60, 520, 1.1, { kind: 'olive' });
  // princess on a rock
  b += K.rock(1000, 720, 2.4, '#b4aa96');
  b += K.person(1000, 660, 1.35, { robe: '#f3e6c4', mantle: '#c94a7a', head: 'crown', hairStyle: 'long', hairColor: '#c98a3a', pose: 'pray', turn: -1, sash: '#2c5596' });
  // dragon and George
  b += K.dragon(760, 700, 1.25, { flip: true });
  b += K.horse(470, 720, 1.75, { color: '#f7f4ee', mane: '#d9d2c4', saddle: C.red, rider: { spear: true, robe: C.red, cloak: C.red, hair: 'curly', hairColor: '#4a2d18', shield: null } });
  b += K.flowers(7, 0, 700, 600, 90, 30) + K.grass(8, 0, 700, 1200, 100, 50);
  b += K.flock(2, 200, 150, 400, 120, 6) + K.rabbit(1160, 760, 1);
  return K.scene({ title: 'St George defeats the dragon and saves the princess', body: b });
}

export const art = {
  'portrait.svg': () => K.portrait({ ...george, pose: 'hold', hold: 'cross' }, { title: 'St George the Great-martyr', bg: 'gold' }),
  'scene-confession.svg': confession,
  'scene-angel.svg': angel,
  'scene-dragon.svg': dragon,
};
