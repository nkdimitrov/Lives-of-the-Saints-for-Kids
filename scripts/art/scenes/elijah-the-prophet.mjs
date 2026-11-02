import * as K from '../kit.mjs';
const { C } = K;
export const slug = 'elijah-the-prophet';

const elijah = { halo: true, robe: '#b8322a', mantle: null, vest: 'sheepskin', hairStyle: 'wild', hairColor: '#f2f0ea', beard: 'long', beardColor: '#f2f0ea' };

function ravens() {
  let b = K.sky('dawn') + K.cloud(900, 90, 0.7, '#fff4e8', '#f0d6c0');
  b += `<g class="far">${K.mountains(420, '#c9b8a0', { seed: 3, height: 160, snow: false })}</g>`;
  b += K.hills(450, '#c9b48a', { seed: 5, amp: 14 });
  // ravine walls
  b += K.raw.P('M0,0 H300 Q360,200 300,380 Q250,560 300,800 H0Z', '#b8936a') + K.raw.P('M1200,0 H900 Q840,220 910,400 Q970,580 900,800 H1200Z', '#a8845c');
  for (const [x, y] of [[80, 120], [180, 300], [60, 500], [1080, 160], [980, 420], [1100, 600]]) b += `<path d="M${x},${y} q30,-10 60,4 M${x + 10},${y + 30} q40,-6 70,8" class="l" opacity=".45"/>`;
  // brook
  b += K.river('M600,420 C560,520 700,600 620,800', { w: 40 });
  b += K.reeds(520, 600, 0.9) + K.reeds(720, 560, 0.8);
  for (let i = 0; i < 6; i++) b += K.raw.P(`M${360 + i * 20},${700 - i * 10} q-10,-30 6,-50 q-2,26 8,40Z`, '#5f8a3a');
  b += K.tree(820, 520, 1.3, { kind: 'olive', seed: 4 }) + K.bush(400, 560, 1.2, '#6a8a3a');
  // Elijah sitting on a rock
  b += K.rock(420, 740, 2.6, '#a49a88');
  b += K.person(430, 700, 2.1, { ...elijah, kneel: true, pose: 'reach', hold: null, turn: 1, mouth: 'smile', eyes: 'open' });
  // ravens bringing food
  b += K.raven(600, 300, 1.6, { flip: true, bread: true }) + K.raven(760, 200, 1.3, { flip: true, bread: true });
  b += K.raw.E(540, 760, 30, 10, '#7a6a4a') + K.raw.E(540, 752, 16, 7, '#d9a25a');
  // hiding animals
  b += K.fox(960, 720, 1.3, { flip: true }) + K.rabbit(250, 760, 1.4);
  b += K.flowers(3, 300, 740, 500, 50, 14, ['#f5d33a', '#ffffff']);
  return K.scene({ title: 'Ravens feed Elijah by the brook Cherith', body: b });
}

function carmel() {
  let b = K.sky('storm').replace('skyStorm', 'skyDusk');
  b += K.sea(330, { kind: 'day', seed: 2, waves: 20 });
  b += K.raw.P('M0,800 V420 Q300,360 600,350 Q900,360 1200,430 V800Z', '#8a9a5a');
  // heaven opening and fire falling
  b += K.heaven(560, 0, 200, { rays: false });
  b += `<path d="M470,60 L650,60 L640,500 L480,500Z" fill="url(#gFire)" opacity=".9"/>`;
  b += K.glow(560, 470, 220, 0.9);
  // Elijah's altar of twelve stones
  b += K.altar(560, 540, 1.8);
  b += K.fire(560, 460, 1.8) + K.fire(520, 470, 1.1) + K.fire(610, 470, 1.2);
  b += `<path d="M430,560 Q560,590 690,560" stroke="#7ab8e0" stroke-width="10" fill="none" opacity=".6"/>`;
  // Baal's altar (cold) with its prophets
  b += K.altar(1030, 470, 1.1, { wood: true });
  b += K.crowd(5, 900, 520, 280, 6, { s: 0.85, palette: ['#c9913f', '#a8743a', '#e2b84a', '#7a4a28'], poses: ['orans', 'point'] });
  // King Ahab with his chariot
  b += K.horse(140, 560, 0.9, { color: '#e8dcc0', saddle: null, flip: false }) + K.raw.P('M210,540 h60 v-30 h-60Z', '#a8743a') + K.raw.Ci(240, 552, 14, 'none', 'o', ' stroke-width="4"');
  b += K.person(250, 520, 0.8, { robe: C.purple, mantle: C.red, head: 'crown', hairStyle: 'short', beard: 'short', pose: 'orans', mouth: 'open', turn: 1 });
  // kneeling Israelites
  const r = K.rng(4);
  for (const [x, y] of [[90, 700], [200, 720], [310, 700], [420, 740], [700, 740], [800, 720], [900, 740], [1010, 710], [1110, 730]]) b += K.person(x, y, 1.15, { kneel: true, robe: K.pick(r, ['#2c5596', '#4f8a3c', '#a8743a', '#e8dcc0', '#6b2e6e']), mantle: K.pick(r, [null, '#c9913f']), veil: r() < 0.3 ? '#e8dcc0' : null, hairStyle: K.pick(r, ['short', 'curly', 'bald']), beard: K.pick(r, ['short', 'long', 'none']), pose: 'orans', turn: x < 560 ? 1 : -1, mouth: 'open' });
  // Elijah
  b += K.person(560, 770, 2.0, { ...elijah, pose: 'orans', mouth: 'calm' });
  return K.scene({ title: 'Fire falls from heaven on Elijah’s altar on Mount Carmel', body: b });
}

function chariot() {
  let b = K.sky('dawn') + K.cloud(200, 120, 0.8, '#fff4e8', '#f0d6c0') + K.cloud(1050, 160, 0.7, '#fff4e8', '#f0d6c0');
  b += `<g class="vfar">${K.hills(470, '#b89a8a', { seed: 3, amp: 34 })}</g>`;
  // whirlwind of light
  b += K.rays(720, 280, { n: 26, r1: 60, r2: 700, op: 0.25 });
  b += `<path d="M600,520 C540,420 700,380 640,300 C580,220 760,180 720,90" stroke="#fff3a6" stroke-width="20" fill="none" opacity=".45" stroke-linecap="round"/>`;
  b += K.glow(740, 260, 260, 0.95);
  // fiery horses and chariot
  b += K.fireHorse(900, 300, 1.5, { flip: false }) + K.fireHorse(960, 270, 1.4, { flip: false });
  b += K.chariot(700, 320, 1.6);
  b += K.person(690, 230, 1.4, { ...elijah, pose: 'orans', mouth: 'smile' });
  // falling mantle
  b += `<g transform="translate(560 430) rotate(-20)">${K.raw.P('M-40,0 Q-10,-20 30,-6 Q46,20 20,40 Q-20,30 -40,0Z', '#b9946a')}<path d="M-30,6 q8,-4 14,2 M-10,-2 q8,-4 14,2 M6,10 q8,-4 14,2" class="l" opacity=".5"/></g>`;
  // the Jordan and Elisha
  b += `<rect x="0" y="560" width="1200" height="90" fill="url(#sea)"/>`;
  b += K.raw.P('M0,640 Q600,620 1200,650 V800 H0Z', '#9aa060');
  b += K.reeds(80, 650, 1.2) + K.reeds(1120, 660, 1.2) + K.tree(160, 660, 1.4, { kind: 'palm' }) + K.tree(1050, 670, 1.3, { kind: 'palm' });
  b += K.person(480, 770, 1.9, { halo: true, robe: '#4f8a3c', mantle: '#c9913f', hairStyle: 'bald', hairColor: '#4a2d18', beard: 'short', beardColor: '#4a2d18', pose: 'orans', turn: 1, mouth: 'open' });
  b += K.grass(3, 0, 680, 1200, 100, 40, '#5f7a32') + K.flowers(4, 0, 720, 1200, 60, 18);
  return K.scene({ title: 'Elijah is taken up to heaven in a chariot of fire', body: b });
}

export const art = {
  'portrait.svg': () => K.portrait({ ...elijah, pose: 'hold', hold: 'openscroll' }, { title: 'The Holy Prophet Elijah' }),
  'scene-ravens.svg': ravens,
  'scene-carmel.svg': carmel,
  'scene-chariot.svg': chariot,
};
