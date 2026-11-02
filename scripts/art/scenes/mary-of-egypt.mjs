import * as K from '../kit.mjs';
const { C } = K;
export const slug = 'mary-of-egypt';

const maryOld = { halo: true, robe: '#6e4527', mantle: '#8a5a32', hairStyle: 'wild', hairColor: '#f2f0ea', skin: '#9a6a44', bodyScale: 0.96 };
const zosimas = { halo: true, robe: '#5a4a3a', mantle: '#3a2e2a', vest: 'monk', head: 'cowl', headColor: '#3a2e2a', beard: 'long', beardColor: '#dcdad4' };

function icon() {
  let b = K.sky('day') + K.cloud(260, 80, 0.8) + K.cloud(900, 110, 0.7);
  // church of the Resurrection
  let ch = K.raw.R(-300, -320, 600, 320, '#e8d6b0');
  ch += K.raw.P('M-200,-320 Q-200,-480 0,-490 Q200,-480 200,-320Z', '#8a8f96') + `<path d="M-160,-360 Q0,-470 160,-360" class="l" opacity=".4"/>`;
  ch += K.raw.R(-14, -560, 28, 70, '#e8d6b0') + K.raw.P('M-20,-560 Q0,-600 20,-560Z', C.gold) + K.raw.P('M-3,-600 v-26 h-10 v-6 h10 v-10 h6 v10 h10 v6 h-10 v26Z', C.gold);
  for (const x of [-220, -120, 90, 190]) ch += K.raw.P(`M${x},-170 v-70 q15,-20 30,0 v70Z`, '#36506e');
  ch += K.raw.P('M-70,0 V-180 Q0,-260 70,-180 V0Z', '#2a1d14');
  ch += K.glow(0, -100, 90, 0.8) + `<g opacity=".9">${[-30, 0, 30].map((x) => `<circle cx="${x}" cy="-120" r="4" fill="#ffd765"/>`).join('')}</g>`;
  b += K.g(700, 600, 1, ch);
  b += K.tree(260, 600, 1.6, { kind: 'cypress' }) + K.tree(1140, 600, 1.5, { kind: 'cypress' }) + K.tree(1080, 610, 1.3, { kind: 'olive' });
  b += K.ground(600, '#d8c7a6');
  for (let i = 0; i < 9; i++) b += `<path d="M0,${620 + i * 22} H1200" stroke="#c6b38e" stroke-width="1.2"/>`;
  // icon of the Theotokos on the wall/porch pillar
  b += K.raw.R(380, 300, 110, 150, C.gold) + K.raw.R(392, 312, 86, 126, '#7a2a20');
  b += K.raw.Ci(435, 360, 22, '#f0cf62', 'n') + K.raw.P('M410,438 Q435,345 460,438Z', '#7a2a20') + K.raw.Ci(435, 362, 13, C.skin) + K.raw.P('M420,365 Q422,344 435,342 Q448,344 450,365 Q446,352 435,351 Q424,352 420,365Z', '#7a2a20');
  b += K.raw.Ci(445, 395, 9, C.skin) + K.raw.Ci(445, 395, 12, 'none', 'n', ` stroke="${C.goldLight}" stroke-width="2"`);
  b += K.raw.L(435, 450, 435, 470, C.ink, 1.5) + K.raw.P('M427,470 h16 l-4,14 h-8Z', '#c0392b') + K.glow(435, 470, 40);
  // pilgrims going in with candles
  const r = K.rng(3);
  for (const [x, y, s] of [[620, 640, 1.0], [680, 650, 0.95], [760, 640, 1.0], [820, 660, 1.05], [900, 690, 1.1], [990, 700, 1.15], [1080, 730, 1.2]]) b += K.person(x, y, s, { robe: K.pick(r, ['#2c5596', '#4f8a3c', '#a8743a', '#6b2e6e', '#e8dcc0']), mantle: K.pick(r, [null, '#c9913f', '#7a4a28']), veil: r() < 0.4 ? K.pick(r, ['#e8dcc0', '#5a6aa8']) : null, hairStyle: K.pick(r, ['short', 'curly', 'bald']), beard: K.pick(r, ['short', 'long', 'none']), pose: 'hold', hold: 'candle', turn: -1 });
  // Mary at the doorway weeping
  b += K.person(430, 760, 2.05, { robe: '#c0392b', mantle: '#e2b84a', veil: null, hairStyle: 'long', hairColor: '#3a2416', pose: 'pray', turn: -1, eyes: 'open', mouth: 'calm', skin: C.skinTan });
  b += `<path d="M424,532 q-2,8 0,12 M440,532 q2,8 0,12" stroke="#7ab8e0" stroke-width="2.4" stroke-linecap="round"/>`;
  b += K.flock(6, 200, 120, 300, 80, 5) + K.dove(1000, 220, 0.6);
  return K.scene({ title: 'Mary prays before the icon of the Theotokos in Jerusalem', body: b });
}

function jordan() {
  let b = K.sky('dusk') + K.sun(600, 300, 46, '#ffb35a');
  b += `<g class="vfar">${K.hills(360, '#7a6a7a', { seed: 5, amp: 34 })}</g>`;
  b += K.hills(420, '#8a8460', { seed: 7, amp: 14 });
  b += K.tree(150, 430, 1.1, { kind: 'palm' }) + K.tree(1050, 430, 1.2, { kind: 'palm' }) + K.tree(920, 430, 0.9, { kind: 'palm' });
  // river
  b += `<rect x="0" y="440" width="1200" height="220" fill="url(#sea)"/>`;
  b += `<path d="M560,440 L640,440 L700,660 L500,660Z" fill="#ffcf8a" opacity=".35"/>`;
  for (let i = 0; i < 30; i++) { const r = K.rng(i); const x = r() * 1200, y = 450 + r() * 200; b += `<path d="M${x - 14},${y} q7,-4 14,0 q7,-4 14,0" stroke="#e4f3fb" stroke-width="1.6" fill="none" opacity=".7"/>`; }
  b += K.reeds(40, 450, 1.1) + K.reeds(1160, 450, 1.1);
  // near bank
  b += K.raw.P('M0,660 Q300,640 600,660 T1200,650 V800 H0Z', '#9a8a5a');
  b += K.reeds(120, 680, 1.3) + K.reeds(1080, 690, 1.2) + K.grass(4, 0, 680, 1200, 100, 30, '#5f6a32');
  // Mary walking on the water
  b += K.glow(560, 470, 150, 0.8);
  b += `<ellipse cx="560" cy="602" rx="60" ry="10" fill="#e4f3fb" opacity=".6"/>`;
  b += K.person(560, 600, 1.7, { ...maryOld, mantle: '#6a4a2e', pose: 'bless', hold: null, mouth: 'calm' });
  // Zosimas with the chalice
  const chalice = `<g>${K.raw.P('M-12,-8 Q-12,8 0,10 Q12,8 12,-8Z', C.gold)}${K.raw.R(-2, 10, 4, 10, C.gold)}${K.raw.E(0, 22, 8, 3, C.gold)}</g>`;
  b += K.person(820, 760, 1.95, { ...zosimas, pose: 'hold', hold: null, turn: -1, mouth: 'open', extra: `<g transform="translate(0 -60)">${chalice}</g>` });
  b += K.flock(2, 200, 120, 400, 100, 6) + K.raw.E(300, 720, 30, 10, '#7a6a4a');
  return K.scene({ title: 'Mary walks across the Jordan to receive Holy Communion', body: b });
}

function lion() {
  let b = K.sky('dawn') + K.sun(980, 330, 44, '#ffcf6a');
  b += `<g class="vfar">${K.mountains(380, '#c9a0a0', { seed: 8, height: 160, snow: false })}</g>`;
  b += `<g class="far">${K.hills(430, '#d9b48a', { seed: 10, amp: 20 })}</g>`;
  b += K.ground(500, '#e2c79a');
  b += K.tree(1080, 520, 1.5, { kind: 'palm' }) + K.rock(160, 560, 2, '#c9a87a') + K.rock(980, 600, 1.4, '#c9a87a');
  // dry streambed
  b += K.path('M-20,640 C300,600 600,700 1220,620', '#d4b582', 50);
  // grave mound with cross and flowers
  b += K.raw.P('M440,700 Q560,630 680,700Z', '#b8955a') + K.raw.R(552, 580, 8, 62, '#6e4527') + K.raw.R(538, 596, 36, 8, '#6e4527');
  b += K.flowers(3, 450, 690, 220, 20, 14, ['#ffffff', '#f5d33a', '#e98fa4']);
  b += `<text x="560" y="760" text-anchor="middle" font-family="Georgia, serif" font-size="18" fill="#8a6a42" opacity=".75">bury the body of humble Mary</text>`;
  // the lion digging
  b += K.lion(820, 700, 1.7, { flip: true });
  for (let i = 0; i < 6; i++) b += K.raw.Ci(720 + i * 14, 690 - (i % 3) * 10, 4, '#c9a46a', 'n');
  // Zosimas praying
  b += K.person(330, 740, 1.95, { ...zosimas, pose: 'orans', turn: 1 });
  b += K.flock(5, 300, 120, 400, 100, 6) + K.raw.P('M120,780 q30,-20 60,0', 'none', 'l');
  return K.scene({ title: 'A lion helps Abba Zosimas bury St Mary', body: b });
}

export const art = {
  'portrait.svg': () => K.portrait({ ...maryOld, pose: 'orans' }, { title: 'St Mary of Egypt' }),
  'scene-icon.svg': icon,
  'scene-jordan.svg': jordan,
  'scene-lion.svg': lion,
};
