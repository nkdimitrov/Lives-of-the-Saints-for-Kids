import * as K from '../kit.mjs';
const { C } = K;
export const slug = 'catherine-of-alexandria';

const catherine = { halo: true, robe: '#b8322a', mantle: '#6b2e6e', head: 'crown', hairStyle: 'long', hairColor: '#7a4a28', vest: 'loros', mouth: 'calm' };

// The Most Holy Theotokos holding the Christ Child (icon-like)
function theotokos(x, y, s) {
  let out = K.person(x, y, s, { halo: true, robe: '#2c5596', mantle: '#7a2a20', veil: '#7a2a20', pose: 'carry', hold: null, mouth: 'calm', turn: 1 });
  const cs = s * 0.55, cx = x + 10 * s, cy = y - 34 * s;
  out += K.person(cx, cy, cs, { child: true, halo: true, robe: C.gold, mantle: '#f4d468', hairStyle: 'short', hairColor: '#7a4a28', pose: 'give', hold: null, turn: -1, mouth: 'smile', flip: true });
  const hx = cx, hy = cy - (94 * 0.66 + 14) * cs, hr = 18.6 * cs;
  out += `<path d="M${hx - hr},${hy} h${hr * 0.35} M${hx + hr},${hy} h${-hr * 0.35} M${hx},${hy - hr} v${hr * 0.35}" stroke="${C.red}" stroke-width="${2.4 * cs}"/>`;
  return out;
}

function ring() {
  let b = K.raw.R(0, 0, 1200, 800, '#e8d2a8', 'n');
  // palace room with a patterned wall and a moonlit window
  for (let i = 0; i < 12; i++) for (let j = 0; j < 8; j++) b += `<path d="M${i * 100 + 50},${j * 80 + 20} l12,20 l-12,20 l-12,-20Z" fill="#dcc293" opacity=".6"/>`;
  b += `<clipPath id="rw"><path d="M120,520 V230 Q220,130 320,230 V520Z"/></clipPath><g clip-path="url(#rw)">${K.sky('night')}${K.stars(30, 7, 1200, 400)}${K.moon(250, 260, 26)}${K.tree(180, 520, 1.1, { kind: 'palm' })}</g>`;
  b += K.raw.P('M120,520 V230 Q220,130 320,230 V520Z', 'none', 'o', ' stroke-width="8" stroke="#b49e74"');
  // bed curtain and bookshelf
  b += K.raw.P('M900,0 Q960,300 1000,620 L1200,620 L1200,0Z', '#7a2a5a') + `<path d="M920,0 Q980,300 1015,620" stroke="${C.gold}" stroke-width="4" fill="none"/>`;
  b += K.raw.R(1010, 470, 190, 150, '#f3e6c4') + K.raw.R(1000, 450, 200, 30, '#b8322a');
  b += K.raw.R(360, 300, 150, 12, '#7a4a28') + Array.from({ length: 5 }, (_, i) => K.raw.R(372 + i * 26, 250, 20, 50, ['#2c5596', '#b8322a', '#4f8a3c', '#e2b84a', '#6b2e6e'][i])).join('');
  b += K.raw.R(360, 380, 150, 12, '#7a4a28') + Array.from({ length: 4 }, (_, i) => K.raw.E(390 + i * 32, 368, 13, 13, '#f3e6c4')).join('');
  // floor
  b += K.raw.R(0, 620, 1200, 180, '#c9a86a', 'n');
  for (let i = 0; i < 8; i++) for (let j = 0; j < 3; j++) b += `<rect x="${i * 160 + (j % 2) * 80 - 40}" y="${640 + j * 54}" width="80" height="54" fill="${(i + j) % 2 ? '#d8b878' : '#b8955a'}" opacity=".6"/>`;
  // icon on a stand with a lamp
  b += K.raw.R(300, 560, 70, 90, C.gold) + K.raw.R(308, 568, 54, 74, '#7a2a20') + K.raw.Ci(335, 596, 12, C.skin) + K.raw.P('M318,640 Q335,600 352,640Z', '#2c5596') + K.raw.R(325, 650, 20, 70, '#7a4a28');
  b += K.glow(400, 600, 50) + K.raw.P('M392,612 h16 l-4,14 h-8Z', '#c0392b');
  // vision in heavenly cloud
  b += K.glow(720, 300, 330, 0.95) + K.rays(720, 300, { n: 20, r1: 120, r2: 420, op: 0.25 });
  b += K.cloud(740, 500, 2.2, '#fff8e0', '#f0e2b8');
  b += theotokos(740, 500, 2.6);
  // ring sparkle
  b += `<circle cx="660" cy="420" r="9" fill="none" stroke="${C.goldLight}" stroke-width="4"/>` + K.rays(660, 420, { n: 8, r1: 12, r2: 34, op: 0.8, color: '#fff3a6' });
  // Catherine kneeling
  b += K.person(500, 730, 2.2, { ...catherine, halo: false, kneel: true, pose: 'reach', turn: 1, eyes: 'open', mouth: 'smile' });
  b += `<g transform="translate(120 720)">${K.raw.E(0, -12, 28, 12, '#f3f0ea')}${K.raw.Ci(24, -20, 10, '#f3f0ea')}${K.raw.P('M18,-28 l2,-9 l6,7Z M27,-29 l4,-8 l2,9Z', '#f3f0ea')}${K.face(24, -20, 8, 0, { eyes: 'closed', blush: false })}</g>`;
  return K.scene({ title: 'In a vision, the Christ Child gives Catherine a ring', body: b });
}

function philosophers() {
  let b = K.raw.R(0, 0, 1200, 800, '#efe2c4', 'n');
  // window with the Pharos lighthouse
  b += `<clipPath id="pw2"><path d="M760,460 V200 Q860,100 960,200 V460Z"/></clipPath><g clip-path="url(#pw2)">${K.sky('day')}${K.sea(360, { seed: 2, waves: 12 })}${K.tower(860, 380, 0.9, { w: 40, h: 160, color: '#f3ead8', roof: '#d9a521' })}${K.glow(860, 210, 40)}${K.tree(790, 400, 0.8, { kind: 'palm' })}${K.tree(940, 410, 0.7, { kind: 'palm' })}</g>`;
  b += K.raw.P('M760,460 V200 Q860,100 960,200 V460Z', 'none', 'o', ' stroke-width="8" stroke="#b49e74"');
  b += K.columnHall(600, 520, 1240, 520, { n: 5, color: '#f4ecda' });
  // library shelves full of scrolls
  b += K.raw.R(40, 180, 260, 300, '#8a5a32');
  for (let r = 0; r < 5; r++) { b += K.raw.R(40, 180 + r * 60 + 56, 260, 6, '#5a3820'); for (let i = 0; i < 9; i++) b += K.raw.Ci(62 + i * 28, 210 + r * 60, 12, '#f3e6c4') + K.raw.Ci(62 + i * 28, 210 + r * 60, 4, '#d9c08a', 'n'); }
  b += K.raw.R(0, 520, 1200, 280, '#d9c49a', 'n');
  for (let i = 0; i < 12; i++) b += `<path d="M${i * 110},520 L${i * 110 - 200},800" stroke="#c4ae82" stroke-width="2"/>`;
  // emperor on throne (right back)
  b += K.throne(1080, 560, 1.3, C.purple) + K.person(1080, 620, 1.35, { robe: C.purple, mantle: C.red, vest: 'loros', head: 'imperial', hairStyle: 'short', hairColor: '#6a6a6a', beard: 'short', beardColor: '#8a8a8a', pose: 'stand', turn: -1, kneel: true, mouth: 'calm' });
  // philosophers listening
  const r = K.rng(5);
  const phil = [[120, 700], [210, 720], [300, 700], [380, 730], [770, 720], [860, 700], [950, 730], [1040, 740]];
  for (const [x, y] of phil) b += K.person(x, y, 1.25, { robe: K.pick(r, ['#2c5596', '#4f8a3c', '#a8743a', '#6b2e6e', '#3a6a7a', '#8a3a3a']), mantle: K.pick(r, ['#e8dcc0', '#c9913f', '#f3e6c4', '#7a4a28']), hairStyle: K.pick(r, ['bald', 'short', 'long']), hairColor: K.pick(r, ['#9a9a9a', '#e8e6e0', '#4a2d18', '#6a6a6a']), beard: K.pick(r, ['long', 'wide', 'short']), beardColor: K.pick(r, ['#bdbdbd', '#e8e6e0', '#4a2d18']), pose: K.pick(r, ['hold', 'pray', 'point', 'orans']), hold: K.pick(r, ['scroll', 'book', null]), turn: x < 600 ? 1 : -1, mouth: K.pick(r, ['open', 'calm']) });
  // Catherine
  b += K.glow(580, 500, 160, 0.7);
  b += K.person(580, 760, 2.15, { ...catherine, pose: 'hold', hold: 'openscroll', mouth: 'open' });
  b += K.raw.R(440, 740, 60, 40, '#a8743a') + K.raw.R(445, 726, 50, 16, '#f3e6c4');
  b += `<g transform="translate(700 770)">${K.raw.E(0, -10, 20, 10, '#c98a3a')}${K.raw.Ci(18, -16, 8, '#c98a3a')}${K.raw.P('M13,-22 l2,-8 l5,6Z M20,-23 l3,-7 l2,7Z', '#c98a3a')}${K.face(18, -16, 7, 0, { eyes: 'open', blush: false })}</g>`;
  return K.scene({ title: 'Catherine answers the fifty philosophers', body: b });
}

function wheel() {
  let b = K.sky('day') + K.cloud(200, 90, 0.8) + K.cloud(1000, 70, 0.7);
  b += `<g class="far">${K.palace(820, 420, 0.9)}${K.tree(500, 420, 1, { kind: 'palm' })}${K.tree(1150, 430, 1, { kind: 'palm' })}${K.tower(80, 420, 0.8, { flag: C.red })}</g>`;
  b += K.ground(420, '#e2cfa0');
  for (let i = 0; i < 14; i++) b += `<path d="M0,${440 + i * 26} H1200" stroke="#d2bd8c" stroke-width="1.2"/>`;
  // crowd behind a rope
  b += K.crowd(8, 0, 520, 360, 7, { s: 0.85, poses: ['orans', 'point', 'pray'] }) + K.crowd(9, 860, 520, 340, 6, { s: 0.85, poses: ['orans', 'point', 'pray'] });
  // emperor on balcony
  b += K.raw.R(760, 300, 140, 20, C.gold) + K.person(830, 300, 0.75, { robe: C.purple, mantle: C.red, head: 'imperial', hairStyle: 'short', beard: 'short', pose: 'point', mouth: 'open', turn: -1 });
  // the angel and the shattering wheel
  b += K.rays(700, 380, { n: 22, r1: 40, r2: 600, op: 0.3 }) + K.glow(700, 440, 260, 0.95);
  b += K.wheel(720, 520, 2.6, { broken: true });
  b += K.angel(860, 470, 1.9, { pose: 'raise', hold: 'sword', flip: true, mouth: 'calm' });
  // soldiers falling back
  b += K.g(1000, 760, 1, K.person(0, 0, 1.4, { armor: true, robe: '#5a4a3a', cloak: '#3a2a1a', head: 'helmet', beard: 'short', pose: 'orans', mouth: 'open', turn: -1 }), { rot: 14 });
  b += K.g(1120, 770, 1, K.person(0, 0, 1.35, { armor: true, robe: '#4a4a5a', cloak: null, head: 'helmet', beard: 'wide', pose: 'reach', mouth: 'open' }), { rot: 18 });
  b += K.g(240, 760, 1, K.person(0, 0, 1.35, { armor: true, robe: '#5a4a3a', cloak: '#3a2a1a', head: 'helmet', beard: 'short', pose: 'orans', mouth: 'open', flip: true }), { rot: -14 });
  // Catherine in prayer
  b += K.person(470, 770, 2.1, { ...catherine, pose: 'orans', eyes: 'open' });
  b += K.dove(560, 160, 0.9);
  b += K.flowers(3, 0, 760, 1200, 30, 14);
  return K.scene({ title: 'An angel shatters the wheel and Catherine is unharmed', body: b });
}

export const art = {
  'portrait.svg': () => K.portrait({ ...catherine, pose: 'hold', hold: 'cross' }, { title: 'St Catherine the Great-martyr' }),
  'scene-ring.svg': ring,
  'scene-philosophers.svg': philosophers,
  'scene-wheel.svg': wheel,
};
