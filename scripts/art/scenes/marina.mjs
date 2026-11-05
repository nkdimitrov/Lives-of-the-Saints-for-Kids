import * as K from '../kit.mjs';
const { C } = K;
export const slug = 'marina';

// St Marina: a young maiden in a cinnabar-red veil (maphorion) over a blue dress, as in her icons
const marina = { halo: true, robe: '#2c5596', mantle: C.red, veil: C.red, hairColor: '#5a3418', mouth: 'calm' };

// Her veil hides the kit's standard halo, so Marina gets a larger one drawn behind her.
function saint(x, y, s, o) {
  const hy = -94 * (o.kneel ? 0.72 : 1) - 14;
  return K.halo(x, y + hy * s, 27 * s) + K.person(x, y, s, { ...o, halo: false });
}

// A small hammer hanging from the left hand of a person in the 'raise' pose (local person coordinates)
const hammer = `<path d="M-10,-56 L-15,-24" stroke="${C.ink}" stroke-width="5.5" stroke-linecap="round"/><path d="M-10,-56 L-15,-24" stroke="#8a5a32" stroke-width="3.5" stroke-linecap="round"/>`
  + `<rect x="-25" y="-26" width="20" height="10" rx="2" fill="#c98a4a" class="o" transform="rotate(-9 -15 -21)"/>`
  + `<circle cx="-10" cy="-50" r="4" fill="${C.skin}" class="o"/>`;

// A golden crown, as carried by the dove
function crown(x, y, k = 1) {
  return K.g(x, y, k, `${K.raw.P('M-14,0 L-16,-16 L-8,-9 L0,-20 L8,-9 L16,-16 L14,0Z', C.gold)}${K.raw.R(-14, -3, 28, 5, C.goldDark)}${K.raw.Ci(0, -11, 2.4, C.red, 'n')}${K.raw.Ci(-8, -6, 1.6, '#2c8a5a', 'n')}${K.raw.Ci(8, -6, 1.6, '#2c8a5a', 'n')}${K.raw.Ci(0, -21, 2, C.goldLight)}`);
}

// Pagan Antioch of Pisidia on its hill: houses, a temple and towers behind the city wall
function antioch(x, y, s, seed = 3) {
  const r = K.rng(seed);
  let inner = '';
  for (let i = 0; i < 9; i++) {
    inner += K.house(-200 + i * 50 + r() * 10, -24 - r() * 30, 0.7, { w: 36 + r() * 20, h: 28 + r() * 20, style: r() < 0.5 ? 'flat' : 'tile', wall: K.pick(r, ['#f3e6c8', '#efd9b8', '#f6eedc', '#e9cfa6']), roof: K.pick(r, ['#c2552f', '#b0482a', '#cf6a3a']) });
  }
  inner += K.temple(70, -58, 0.5);
  inner += K.tower(-180, 0, 0.7, { flag: C.red }) + K.tower(190, 0, 0.7, { flag: C.red });
  inner += K.wall(0, 0, 420, 44, { seed });
  return K.g(x, y, s, inner);
}

function sheep() {
  let b = K.sky('day') + K.sun(140, 105, 34) + K.cloud(470, 90, 0.9) + K.cloud(880, 150, 0.7) + K.cloud(1110, 70, 0.6);
  b += K.flock(3, 560, 110, 300, 90, 5);
  b += `<g class="vfar">${K.mountains(350, '#a9bdd0', { seed: 4, height: 210 })}</g>`;
  b += `<g class="far">${K.hills(400, '#adc985', { seed: 5, amp: 22 })}${K.lake(250, 430, 190, 20, '#6aaad6')}${K.boat(300, 432, 0.5)}${antioch(940, 400, 0.62)}`;
  b += `${K.tree(560, 420, 0.5, { kind: 'cypress' })}${K.tree(600, 425, 0.45, { kind: 'cypress' })}${K.tree(700, 430, 0.5, { kind: 'olive' })}</g>`;
  b += K.hills(500, '#93bf5f', { seed: 7, amp: 18 });
  // the road to the city
  b += K.path('M1260,720 Q1070,660 1010,580 Q960,500 945,430', '#e6cf98', 34);
  b += K.hills(580, '#7fb04e', { seed: 9, amp: 10 });
  b += K.path('M1260,760 Q1110,700 1060,640', '#e6cf98', 40);
  // the nurse's cottage, well and garden
  b += K.tree(60, 600, 1.6, { kind: 'oak', seed: 3 }) + K.tree(340, 590, 1.4, { kind: 'cypress' });
  b += K.house(170, 600, 1.5, { style: 'tile', chimney: true, wall: '#f3e6c8' }) + K.well(285, 615, 1.15);
  b += K.fence(20, 640, 120) + K.bush(250, 650, 1.1, C.green, '#d6362c');
  b += K.person(225, 655, 0.95, { robe: '#7a5a3a', mantle: '#5a4a3a', veil: '#3a3040', pose: 'pray', mouth: 'smile', turn: 1 });
  // trees by the road
  b += K.tree(850, 600, 1.2, { kind: 'olive', seed: 2 }) + K.tree(1170, 590, 1.5, { kind: 'oak', seed: 9 });
  // the governor rides by with his soldiers
  b += K.person(1110, 690, 1.15, { armor: true, robe: '#7a2a20', cloak: '#5a1a14', head: 'helmet', beard: 'short', pose: 'spear', hold: 'spear', flip: true });
  b += K.horse(1000, 700, 1.15, { flip: true, color: '#f7f4ee', mane: '#d9d2c4', saddle: C.purple, walk: true, rider: { halo: false, armor: false, robe: C.purple, cloak: C.red, hair: 'short', hairColor: '#3a2416', beard: 'short' } });
  b += K.person(1150, 745, 1.2, { armor: true, robe: '#5a4a3a', cloak: '#3a2a1a', head: 'helmet', beard: 'wide', pose: 'point', flip: true, mouth: 'open' });
  // the flock
  const flock = [[720, 610, 0.9, true], [450, 640, 1.05, false], [640, 650, 1.0, true], [870, 690, 1.2, true], [330, 700, 1.35, false], [710, 720, 1.4, false], [250, 765, 1.5, false], [800, 775, 1.55, true], [400, 790, 1.6, true]];
  for (const [x, y, s, flip] of flock) b += K.sheep(x, y, s, { flip });
  // Marina the shepherdess
  b += K.glow(560, 560, 130, 0.45);
  b += saint(560, 765, 2.15, { ...marina, pose: 'spear', hold: 'staff', turn: 1 });
  b += K.sheep(655, 790, 0.95, { flip: true }) + K.dog(470, 785, 1.3, { color: '#c48a4a' });
  b += K.flowers(5, 0, 690, 1200, 110, 40) + K.grass(6, 0, 680, 1200, 120, 50);
  b += K.rabbit(960, 780, 1.1, { flip: true });
  return K.scene({ title: 'Young Marina tends her sheep as the governor rides by', body: b });
}

function dragon() {
  let b = K.raw.R(0, 0, 1200, 800, '#5e554b', 'n');
  for (let y = 0; y < 640; y += 54) for (let x = (y / 54) % 2 ? -50 : 0; x < 1200; x += 100) b += `<rect x="${x}" y="${y}" width="100" height="54" fill="${(x + y) % 3 ? '#6a6156' : '#625a50'}" stroke="#463f37" stroke-width="2"/>`;
  // barred window with the night sky
  b += `<clipPath id="mw"><rect x="900" y="90" width="180" height="150"/></clipPath><g clip-path="url(#mw)">${K.sky('night')}${K.stars(30, 8, 1200, 300)}${K.moon(1030, 140, 20)}</g>`;
  b += K.raw.R(900, 90, 180, 150, 'none', 'o', ' stroke-width="6"');
  for (let i = 1; i < 5; i++) b += `<path d="M${900 + i * 36},90 V240" stroke="#3a3632" stroke-width="7"/>`;
  // floor with straw
  b += K.raw.R(0, 640, 1200, 160, '#4e463d', 'n');
  const r = K.rng(12);
  for (let i = 0; i < 70; i++) { const x = r() * 1200, y = 650 + r() * 140; b += `<path d="M${K.f(x)},${K.f(y)} l${K.f(10 + r() * 14)},${K.f(-4 + r() * 8)}" stroke="#c9a85a" stroke-width="2"/>`; }
  // chains on the wall
  b += `<path d="M120,180 q14,60 -8,120 q-14,40 10,80" stroke="#8a8a8a" stroke-width="6" fill="none" stroke-dasharray="10 4"/><path d="M1130,300 q-10,50 6,100" stroke="#8a8a8a" stroke-width="6" fill="none" stroke-dasharray="10 4"/>`;
  // the devil as a shadowy dragon, shrinking away into the dark corner
  const shadow = K.dragon(340, 700, 1.45, { flip: true, color: '#2e2438', belly: '#3d3050' })
    .replace(/#6aa45a/g, '#3a2e4a').replace(/#2f5e2a/g, '#241c30').replace(/#b8322a/g, '#4a3050').replace(/#ffd23f/g, '#6a5a7a');
  b += `<g opacity=".5">${shadow}</g>`;
  // the shining Cross with the dove
  b += K.rays(780, 240, { n: 20, r1: 60, r2: 760, op: 0.2 }) + K.glow(740, 380, 380, 0.9) + K.glow(780, 240, 170);
  b += K.raw.R(766, 110, 28, 290, 'url(#gGold)', 'o', ' rx="4"') + K.raw.R(690, 170, 180, 28, 'url(#gGold)', 'o', ' rx="4"');
  b += K.raw.R(774, 120, 6, 270, '#fff6c8', 'n', ' opacity=".7"') + K.raw.R(700, 178, 160, 6, '#fff6c8', 'n', ' opacity=".7"');
  b += K.dove(778, 112, 0.95, { glow: true });
  // Marina holds up the cross; in her other hand, the hammer of her icons
  b += saint(720, 750, 2.3, { ...marina, pose: 'raise', hold: 'cross', flip: true, eyes: 'open', extra: hammer });
  // bread and water brought to her in prison
  b += K.raw.P('M960,740 Q948,712 958,690 L956,676 L984,676 L982,690 Q992,712 980,740Z', '#b8643a') + K.raw.E(970, 676, 15, 4, '#9a4f2a');
  b += K.raw.E(1030, 736, 26, 12, '#d9a25a') + `<path d="M1014,732 q16,-8 32,0" class="l" opacity=".6"/>`;
  b += K.raw.R(820, 760, 260, 18, '#8a6a3a', 'o', ' rx="6"');
  // a mouse comes for the crumbs, and a sparrow perches on the window bars
  b += `<g transform="translate(1100 735)">${K.raw.E(0, 0, 14, 9, '#8a8276')}${K.raw.Ci(-12, -4, 7, '#8a8276')}${K.raw.Ci(-10, -10, 4, '#b8b0a4')}${K.raw.Ci(-16, -5, 1.2, C.ink, 'n')}<path d="M14,2 q18,4 22,-8" stroke="#8a8276" stroke-width="2" fill="none"/></g>`;
  b += K.g(990, 242, 1, `${K.raw.E(0, -10, 13, 8, '#a8743a')}${K.raw.Ci(11, -16, 6, '#a8743a')}${K.raw.P('M-12,-10 l-12,-4 l2,8Z', '#6e4527')}${K.raw.Ci(13, -17, 1.2, C.ink, 'n')}${K.raw.P('M17,-16 l5,1 l-5,2Z', '#e19b3a', 'n')}${K.raw.E(2, -8, 8, 4, '#e8dcc0', 'n')}${K.raw.L(-2, -2, -2, 2, '#6e4527', 1.4)}${K.raw.L(3, -2, 3, 2, '#6e4527', 1.4)}`);
  return K.scene({ title: 'Marina drives away the devil with the sign of the Cross', body: b });
}

function dove() {
  let b = K.sky('day') + K.cloud(180, 110, 0.8) + K.cloud(1020, 90, 0.8);
  b += `<g class="vfar">${K.mountains(340, '#aabdd0', { seed: 8, height: 170 })}</g>`;
  // buildings around the city square: a pagan temple and a colonnade
  b += `<g class="far">${K.hills(400, '#a9c682', { seed: 3, amp: 16 })}${K.house(420, 470, 1.1, { style: 'flat', w: 90, h: 70 })}${K.house(800, 470, 1.1, { style: 'tile', w: 80, h: 64 })}${K.tree(360, 470, 1, { kind: 'cypress' })}${K.tree(880, 470, 1.1, { kind: 'cypress' })}</g>`;
  b += K.temple(190, 480, 1.25);
  b += K.columnHall(1000, 480, 420, 170, { n: 5 });
  b += K.ground(470, '#ddc89c');
  for (let i = 0; i < 9; i++) b += `<path d="M0,${490 + i * 36} H1200" stroke="#cdb684" stroke-width="1.5"/>`;
  for (let i = 0; i < 16; i++) b += `<path d="M${i * 90 - 120},800 L${300 + i * 40},470" stroke="#cdb684" stroke-width="1.5"/>`;
  // people of the city at the back
  b += K.crowd(12, 250, 540, 240, 5, { s: 0.75, poses: ['orans', 'pray', 'point', 'orans'] }) + K.crowd(13, 730, 540, 200, 4, { s: 0.75, poses: ['orans', 'pray', 'point'] });
  // the governor on his judgment seat, with guards
  b += K.raw.R(940, 545, 230, 30, '#c9b48a') + K.raw.R(960, 525, 190, 22, '#d8c7a6');
  b += K.throne(1060, 530, 1.25, C.purple);
  b += K.person(1060, 590, 1.3, { robe: C.purple, mantle: C.red, vest: 'loros', hairStyle: 'short', hairColor: '#3a2416', beard: 'short', beardColor: '#3a2416', pose: 'point', turn: -1, kneel: true, mouth: 'open' });
  b += K.person(950, 660, 1.3, { armor: true, robe: '#7a2a20', cloak: '#5a1a14', head: 'helmet', beard: 'short', pose: 'spear', hold: 'spear', flip: true });
  b += K.person(1165, 680, 1.3, { armor: true, robe: '#5a4a3a', cloak: '#3a2a1a', head: 'helmet', beard: 'wide', pose: 'spear', hold: 'spear', flip: true });
  // light from the opened heavens
  b += `<path d="M540,40 L660,40 L790,780 L410,780Z" fill="url(#gGlow)" opacity=".8"/>`;
  b += K.heaven(600, 0, 110, { rays: false });
  b += K.cloud(470, 40, 1.1, '#ffffff', '#e8eef4') + K.cloud(740, 36, 1.2, '#ffffff', '#e8eef4') + K.cloud(600, -10, 0.9, '#ffffff', '#e8eef4');
  // the great basin of water
  b += K.raw.E(600, 620, 185, 38, '#c9bca6') + K.raw.E(600, 620, 168, 29, C.water);
  b += K.raw.E(560, 612, 80, 8, '#bfe3f4', 'n', ' opacity=".6"');
  b += K.glow(600, 520, 200, 0.85);
  b += saint(600, 745, 2.05, { ...marina, pose: 'orans', eyes: 'open', mouth: 'smile' });
  b += `<path d="M432,620 A168,29 0 0 0 768,620Z" fill="${C.water}" opacity=".75"/>`;
  b += `<path d="M440,632 q20,-8 40,0 q20,8 40,0 M660,640 q20,-8 40,0 q20,8 40,0" fill="none" stroke="#e4f3fb" stroke-width="2" opacity=".8"/>`;
  // ropes floating loose
  b += `<path d="M480,628 q12,-10 22,0 q10,10 22,0 q8,-6 14,2" fill="none" stroke="#8a6a3a" stroke-width="3.5" stroke-linecap="round"/><path d="M670,630 q10,-8 20,0 q10,8 20,-2" fill="none" stroke="#8a6a3a" stroke-width="3.5" stroke-linecap="round"/>`;
  b += K.raw.P('M415,620 A185,38 0 0 0 785,620 L770,770 Q600,800 430,770Z', '#c9bca6');
  b += `<path d="M415,620 A185,38 0 0 0 785,620" fill="none" stroke="#e2d8c4" stroke-width="5"/>`;
  for (let i = 0; i < 6; i++) b += `<path d="M${450 + i * 60},${690 + (i % 2) * 20} h40" class="l" opacity=".3"/>`;
  // the dove comes down with a golden crown
  b += K.glow(600, 360, 100);
  b += crown(600, 374, 1.2) + K.dove(596, 340, 1.15);
  // believers in the front
  b += K.crowd(21, 20, 700, 330, 6, { s: 1.15, poses: ['orans', 'pray', 'orans', 'point'] });
  b += K.person(850, 785, 1.45, { robe: '#4f8a3c', mantle: '#c9913f', hairStyle: 'curly', hairColor: '#2a1d14', beard: 'short', kneel: true, pose: 'orans', turn: -1, mouth: 'open' });
  b += K.person(950, 790, 1.35, { robe: '#5a8aa8', mantle: null, veil: '#e8dcc0', kneel: true, pose: 'pray', turn: -1 });
  b += K.person(1060, 795, 0.95, { child: true, robe: '#c94a3a', hairStyle: 'curly', hairColor: '#4a2d18', pose: 'orans', turn: -1, mouth: 'smile' });
  b += K.dog(1150, 790, 1.1, { flip: true, color: '#e8dcc0' });
  b += K.flock(7, 820, 120, 260, 80, 4);
  return K.scene({ title: 'A dove brings a golden crown to Marina in the water', body: b });
}

export const art = {
  'portrait.svg': () => K.portrait({ ...marina, halo: false, pose: 'hold', hold: 'cross' }, { title: 'St Marina the Great-martyr', extra: K.halo(200, 735 - 108 * 5.1, 27 * 5.1) }),
  'scene-sheep.svg': sheep,
  'scene-dragon.svg': dragon,
  'scene-dove.svg': dove,
};
