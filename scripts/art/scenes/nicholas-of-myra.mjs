import * as K from '../kit.mjs';
const { C } = K;
export const slug = 'nicholas-of-myra';

const nicholasOld = { halo: true, vest: 'bishop', robe: '#f6f1e4', mantle: C.red, hairStyle: 'bald', hairColor: '#e9e6df', beard: 'short', beardColor: '#efede7', pose: 'bless', hold: 'book' };

function goldScene() {
  let b = K.sky('night');
  b += K.stars(90, 11, 1200, 380) + K.moon(1010, 110, 38);
  // distant sea and town on the hills
  b += `<g class="vfar">${K.hills(400, '#2a3d5e', { seed: 21, amp: 30 })}</g>`;
  b += `<rect x="0" y="388" width="1200" height="40" fill="#2d4f80"/><path d="M960,392 L1060,392 L1040,428 L980,428Z" fill="#fbf0c2" opacity=".25"/>`;
  b += `<g class="far" opacity=".9">${K.cityscape(260, 400, 0.8, { w: 460, seed: 31, lit: true, wallColor: '#6f7690' })}${K.church(760, 392, 0.55, { wall: '#9aa0b8', dome: '#6a4a6a' })}</g>`;
  b += K.ship(1100, 420, 0.25, { sail: '#c8c3b0' });
  b += K.hills(520, '#334a3c', { seed: 5, amp: 14 });
  // street
  b += K.ground(560, '#5d5a52');
  for (let i = 0; i < 70; i++) { const r = K.rng(i + 3); b += `<ellipse cx="${(i * 37) % 1200 + r() * 20}" cy="${590 + ((i * 53) % 200)}" rx="${14 + r() * 8}" ry="${6 + r() * 3}" fill="#6c695f" stroke="#4a473f" stroke-width="1"/>`; }
  // houses row
  b += K.house(90, 570, 1.6, { w: 70, h: 60, wall: '#b8b2a2', roof: '#7a4a3a', lit: true, chimney: true });
  b += K.tree(230, 575, 1.4, { kind: 'cypress' });
  b += K.house(1120, 575, 1.7, { w: 70, h: 56, wall: '#b8ae9c', roof: '#6e3e30', lit: false, windows: 1 });
  // the poor man's house (custom, big lit window)
  let h = '';
  h += K.raw.R(-150, -190, 300, 190, '#c9bfa8');
  h += K.raw.P('M-170,-190 L0,-290 L170,-190Z', '#7a4a3a');
  for (let i = 1; i < 5; i++) h += `<path d="M${-170 + i * 34},${-190 - i * 20} L${170 - i * 34},${-190 - i * 20}" class="l" opacity=".35"/>`;
  h += K.raw.R(-120, -150, 110, 90, '#ffd765') + `<circle cx="-65" cy="-105" r="110" fill="url(#gLamp)" opacity=".8"/>`;
  // three sleeping sisters seen through the window
  h += K.raw.R(-116, -88, 102, 24, '#a8743a') + K.raw.R(-116, -96, 102, 12, '#f6ecd2');
  for (const [i, col] of [['0', '#7a4a28'], ['1', '#c98a3a'], ['2', '#4a2d18']]) {
    const cx = -98 + i * 32;
    h += K.raw.Ci(cx, -100, 10, C.skin) + K.hair(cx, -100, 10, 'bob', col) + K.face(cx, -100, 10, 0, { eyes: 'closed', mouth: 'calm' });
  }
  h += K.raw.R(-116, -88, 102, 28, '#d9c8a8', 'o', ' opacity=".95"');
  h += `<path d="M-65,-150 v90 M-120,-105 h110" class="l" stroke-width="3"/>`;
  h += K.raw.R(-126, -156, 122, 102, 'none', 'o', ' stroke-width="4"');
  h += K.raw.P('M40,0 L40,-110 Q75,-140 110,-110 L110,0Z', '#5a3a20');
  h += K.raw.Ci(98, -55, 3, C.gold);
  // cat on the roof ridge
  h += `<g transform="translate(40 -268)">${K.raw.E(0, 0, 16, 9, '#2a2221')}${K.raw.Ci(14, -10, 8, '#2a2221')}${K.raw.P('M9,-16 l2,-8 l4,6Z M17,-16 l3,-7 l2,7Z', '#2a2221')}${K.raw.Ci(16, -11, 1.6, '#ffd84a', 'n')}${K.raw.Ci(20, -11, 1.6, '#ffd84a', 'n')}<path d="M-16,0 q-14,-6 -10,-22" fill="none" stroke="#2a2221" stroke-width="4" stroke-linecap="round"/></g>`;
  // flower pots
  h += K.raw.R(-140, -10, 24, 10, '#b0482a') + K.raw.R(-140, -18, 24, 8, '#b0482a') + K.flowers(4, -140, -24, 24, 6, 6, ['#e2483d', '#f08fb3']);
  b += K.g(760, 600, 1, h);
  // lantern on wall
  b += `<circle cx="600" cy="430" r="40" fill="url(#gLamp)"/>` + K.raw.R(592, 420, 16, 22, '#ffd765') + K.raw.P('M590,420 L600,408 L610,420Z', '#3a2616');
  b += K.tree(520, 610, 1.3, { kind: 'olive', seed: 3 });
  // owl in the olive tree
  b += `<g transform="translate(545 515)">${K.raw.E(0, 0, 10, 13, '#8a6a42')}${K.raw.Ci(-4, -4, 3.6, '#fff')}${K.raw.Ci(4, -4, 3.6, '#fff')}${K.raw.Ci(-4, -4, 1.6, C.ink, 'n')}${K.raw.Ci(4, -4, 1.6, C.ink, 'n')}${K.raw.P('M-2,1 l2,3 l2,-3Z', '#e19b3a', 'n')}</g>`;
  // Nicholas tossing the gold
  b += K.person(470, 740, 2.0, { halo: true, robe: '#2c3f6a', mantle: '#5a3a2a', hairStyle: 'bald', hairColor: '#6e4527', beard: 'short', beardColor: '#6e4527', pose: 'give', turn: 1 });
  // flying bag of gold with sparkles
  b += `<path d="M570,598 Q610,500 650,500" fill="none" stroke="#ffe27a" stroke-width="3" stroke-dasharray="6 10" opacity=".8"/>`;
  b += `<g transform="translate(660 505) rotate(18)">${K.raw.P('M-14,-4 Q-18,16 0,18 Q18,16 14,-4 Q7,-10 10,-16 L-10,-16 Q-7,-10 -14,-4Z', '#b48a3a')}${K.raw.L(-10, -13, 10, -13, C.redDark, 3)}${K.raw.Ci(0, 6, 4, C.goldLight, 'n')}</g>`;
  for (const [x, y] of [[640, 470], [690, 480], [672, 535], [628, 530], [700, 520]]) b += `<path d="M${x},${y - 7} L${x + 2},${y - 2} L${x + 7},${y} L${x + 2},${y + 2} L${x},${y + 7} L${x - 2},${y + 2} L${x - 7},${y} L${x - 2},${y - 2}Z" fill="#fff3a6"/>`;
  // sleeping dog by the door and a well
  b += K.dog(900, 660, 1.2, { color: '#a8743a' }) + K.well(1040, 690, 1.4);
  b += K.bush(300, 700, 1.4, '#2f4a32') + K.bush(1170, 720, 1.5, '#2f4a32');
  b += K.flowers(9, 0, 720, 300, 60, 18, ['#c7a0d8', '#e2a0a8', '#f5f0f0']);
  return K.scene({ title: 'Nicholas secretly gives gold to the poor man at night', body: b });
}

function stormScene() {
  let b = K.sky('storm');
  b += K.stormCloud(160, 110, 2.2) + K.stormCloud(520, 80, 2.6) + K.stormCloud(980, 120, 2.3) + K.stormCloud(800, 200, 1.6);
  b += K.lightning(130, 150, 1.4) + K.lightning(1060, 170, 1.1);
  // break in the clouds with heavenly light on the ship
  b += K.heaven(640, 0, 150, { rayTo: [610, 520] });
  b += K.glow(610, 420, 220, 0.7);
  b += K.rain(7, 0, 120, 1200, 380, 140);
  // distant coast with lighthouse and town
  b += `<g class="vfar">${K.hills(440, '#58697a', { seed: 8, amp: 40, w: 1200 })}</g>`;
  b += `<g class="far">${K.tower(120, 400, 0.8, { color: '#a8a698', roof: '#7a4a3a', flag: C.red })}${K.cityscape(250, 420, 0.45, { w: 300, seed: 12, wallColor: '#8f8d80' })}</g>`;
  b += K.sea(430, { kind: 'storm', seed: 3, waves: 60 });
  b += K.bigWave(170, 640, 1.6, '#2d5568') + K.bigWave(1100, 600, 1.4, '#2d5568');
  // the ship, tilted, with Nicholas and the sailors
  let sh = K.ship(0, 0, 1.6, { sail: '#efe0b8', stripe: C.red, tilt: 0 });
  sh += K.person(-120, -40, 0.95, { robe: '#6a7a3a', mantle: null, hairStyle: 'curly', hairColor: '#2a1d14', beard: 'young', pose: 'reach', turn: -1, head: 'cap', headColor: '#c94a3a' });
  sh += K.person(-60, -40, 0.95, { robe: '#a8643a', mantle: null, hairStyle: 'short', hairColor: '#4a2d18', beard: 'short', pose: 'pray', turn: 1 });
  sh += K.person(90, -40, 0.95, { robe: '#3a5a8a', mantle: null, hairStyle: 'bald', hairColor: '#6a6a6a', beard: 'long', beardColor: '#c8c8c8', pose: 'orans', turn: -1 });
  sh += K.person(150, -40, 0.9, { robe: '#8a3a3a', mantle: null, hairStyle: 'curly', hairColor: '#7a4a28', pose: 'reach', turn: -1 });
  sh += K.person(10, -40, 1.25, { halo: true, robe: '#2c3f6a', mantle: '#7a2a20', hairStyle: 'bald', hairColor: '#6e4527', beard: 'short', beardColor: '#6e4527', pose: 'orans', eyes: 'open' });
  b += K.g(610, 610, 1.15, sh, { rot: -6 });
  // ropes
  b += `<path d="M470,560 L560,350 M760,550 L660,360" stroke="#6e4527" stroke-width="2"/>`;
  b += K.sea(690, { kind: 'storm', seed: 9, waves: 30 }).replace('<rect', '<rect opacity=".85"');
  b += K.bigWave(420, 800, 1.2, '#1f4352') + K.bigWave(900, 800, 1.3, '#1f4352');
  // gulls and a dolphin
  b += K.flock(4, 820, 260, 260, 120, 5, '#f4f4f4');
  b += `<g transform="translate(1000 700) rotate(-25)">${K.raw.P('M-40,0 Q0,-30 40,-6 L52,-14 L48,2 Q0,14 -40,0Z', '#6f8ea8')}${K.raw.P('M0,-18 l6,-12 l6,10Z', '#6f8ea8')}${K.raw.Ci(30, -8, 1.6, C.ink, 'n')}</g>`;
  return K.scene({ title: 'Nicholas calms the storm at sea', body: b });
}

function threeMenScene() {
  let b = K.sky('day') + K.sun(1080, 90, 36) + K.cloud(300, 110, 0.9) + K.cloud(760, 80, 0.7);
  b += `<g class="vfar">${K.mountains(360, '#9db3c4', { seed: 6, height: 150, peaks: 5 })}</g>`;
  b += `<g class="far">${K.hills(400, '#9fbf7a', { seed: 14, amp: 20 })}${K.fortress(860, 400, 0.9, { w: 420, h: 80, flag: C.red })}${K.tree(1150, 410, 0.8, { kind: 'cypress' })}${K.tree(1180, 410, 0.7, { kind: 'cypress' })}</g>`;
  b += K.temple(230, 450, 0.85);
  b += K.ground(450, '#d9c9a2');
  // paving
  for (let i = 0; i < 14; i++) b += `<path d="M0,${470 + i * 26} H1200" stroke="#c4b285" stroke-width="1.2"/>`;
  for (let i = 0; i < 40; i++) b += `<path d="M${(i * 61) % 1200},${470 + (i % 13) * 26} v26" stroke="#c4b285" stroke-width="1.2"/>`;
  // market stall
  b += `<g transform="translate(70 560)">${K.raw.R(0, -60, 130, 60, '#a8743a')}${K.raw.P('M-10,-60 L140,-60 L130,-100 L0,-100Z', '#c94a3a')}${[0, 1, 2, 3, 4].map((i) => K.raw.P(`M${i * 30},-100 L${i * 30 + 15},-100 L${i * 30 + 12},-60 L${i * 30 - 3},-60Z`, '#f3e6c4', 'n')).join('')}${[0, 1, 2, 3, 4, 5, 6, 7].map((i) => K.raw.Ci(10 + i * 15, -66, 6, i % 2 ? '#e2862a' : '#c0392b')).join('')}</g>`;
  b += K.tree(1060, 520, 1.1, { kind: 'palm' });
  b += K.donkey(1130, 600, 1.1, { flip: true });
  // crowd of townspeople (left)
  b += K.crowd(3, 20, 600, 300, 7, { s: 0.95, poses: ['pray', 'orans', 'point', 'stand'] });
  // three generals (right)
  const gen = (x, robe, cloak, hairColor, beard) => K.person(x, 640, 1.2, { armor: true, robe, cloak, head: 'helmet', hairColor, beard, pose: 'spear', hold: 'spear', turn: -1, flip: true });
  b += gen(1000, '#7a2a20', '#a8281f', '#4a2d18', 'short') + gen(900, '#2c4a7a', '#3a5a9a', '#2a1d14', 'young') + gen(1080, '#4a6a2a', '#7a2a20', '#7a4a28', 'none');
  // three kneeling men
  const kneel = (x, robe, hair, beard, turn) => K.person(x, 720, 1.25, { kneel: true, robe, mantle: null, hairStyle: hair, hairColor: '#3a2616', beard, pose: 'pray', turn, eyes: 'open' });
  b += kneel(360, '#e8dcc0', 'short', 'short', 1) + kneel(450, '#d9c8a0', 'curly', 'young', 1) + kneel(780, '#e0d4b8', 'bald', 'long', -1);
  // executioner with raised sword
  b += K.person(690, 720, 1.8, { robe: '#5a2a2a', mantle: null, hairStyle: 'short', hairColor: '#2a1d14', beard: 'short', pose: 'raise', hold: 'sword', turn: -1, flip: true, sash: '#2a2221', mouth: 'open' });
  // Nicholas grabbing the sword
  b += K.person(590, 730, 1.9, { ...nicholasOld, pose: 'raise', hold: null, turn: 1, mouth: 'calm' });
  b += `<circle cx="640" cy="478" r="40" fill="url(#gGlow)" opacity=".8"/>`;
  b += K.dove(560, 300, 0.8, { flip: true }) + K.bird(420, 250, 0.8) + K.bird(470, 230, 0.6);
  b += K.dog(250, 760, 1.2, { flip: false, color: '#c9a07a' });
  b += K.flowers(5, 0, 760, 1200, 40, 14);
  return K.scene({ title: 'Nicholas saves three innocent men from the sword', body: b });
}

export const art = {
  'portrait.svg': () => K.portrait({ ...nicholasOld, pose: 'bless', hold: 'book' }, { title: 'St Nicholas the Wonderworker' }),
  'scene-gold.svg': goldScene,
  'scene-storm.svg': stormScene,
  'scene-three-men.svg': threeMenScene,
};
