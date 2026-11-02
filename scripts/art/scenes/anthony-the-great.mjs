import * as K from '../kit.mjs';
const { C } = K;
export const slug = 'anthony-the-great';

const anthonyOld = { halo: true, robe: '#8a5a32', mantle: '#3a2e2a', vest: 'monk', head: 'cowl', headColor: '#4a3a30', beard: 'long', beardColor: '#e9e6df', hairColor: '#e9e6df', pose: 'bless', hold: 'scroll' };
const paulOld = { halo: true, robe: '#a8945a', mantle: null, vest: 'sheepskin', hairStyle: 'wild', hairColor: '#ecebe6', beard: 'long', beardColor: '#ecebe6' };

const ibis = (x, y, s = 1) => K.g(x, y, s, `${K.raw.L(-2, 0, -2, -24, '#3a2616', 2)}${K.raw.L(4, 0, 3, -24, '#3a2616', 2)}${K.raw.E(0, -32, 16, 10, '#f4f1ea')}${K.raw.P('M12,-36 Q20,-52 18,-60', 'none', 'l', ' stroke-width="3"')}${K.raw.Ci(18, -60, 4, '#2a2221')}${K.raw.P('M20,-60 Q34,-54 36,-42', 'none', 'l', ' stroke="#2a2221" stroke-width="2.4"')}${K.raw.P('M-14,-32 l-8,4 l8,2Z', '#2a2221')}`);
const felucca = (x, y, s = 1) => K.g(x, y, s, `${K.raw.P('M-60,-10 Q-50,10 -30,12 L40,12 Q56,8 64,-12Z', '#8a5a32')}${K.raw.L(0, -10, 0, -110, C.brownDark, 3)}${K.raw.P('M-4,-108 L-56,-14 L50,-14Z', '#f3ead8')}${K.raw.L(-60, -20, 40, -120, C.brownDark, 2.4)}`);
const lizard = (x, y, s = 1) => K.g(x, y, s, `${K.raw.E(0, 0, 12, 4, '#8a9a5a')}${K.raw.Ci(12, -1, 3.4, '#8a9a5a')}<path d="M-12,0 q-12,2 -18,-4 M-6,2 l-4,5 M6,2 l4,5 M-6,-2 l-4,-5 M6,-2 l4,-5" stroke="#8a9a5a" stroke-width="2" fill="none"/>`);

function gospel() {
  let b = K.sky('desert') + K.sun(1080, 100, 40, '#ffd24a') + K.cloud(300, 80, 0.6);
  b += `<g class="vfar">${K.hills(330, '#d9c08a', { seed: 3, amp: 30 })}</g>`;
  // the Nile
  b += K.raw.R(0, 360, 1200, 90, '#4f95c7', 'n') + `<path d="M0,370 H1200" stroke="#cbe6f3" stroke-width="2" stroke-dasharray="20 30"/>`;
  b += felucca(800, 400, 0.9) + felucca(300, 390, 0.5);
  b += K.reeds(80, 450, 1) + K.reeds(1150, 450, 1) + ibis(1040, 452, 1.1) + K.raw.R(0, 440, 1200, 12, '#c9b071', 'n');
  b += K.ground(450, '#e0c88e');
  // village of mud-brick houses and a little church
  b += K.house(180, 560, 1.4, { style: 'flat', wall: '#d9b98a', w: 80, h: 60, door: '#6e4527' }) + K.house(1040, 560, 1.3, { style: 'flat', wall: '#e2c49a', w: 90, h: 56 });
  b += K.church(880, 540, 0.85, { wall: '#efe0c4', dome: '#c2552f' });
  for (const [x, s] of [[60, 1.4], [330, 1.2], [700, 1.0], [1160, 1.3]]) b += K.tree(x, 560, s, { kind: 'palm', seed: x });
  // Anthony giving
  b += K.person(520, 740, 1.95, { halo: true, robe: '#f3e6c4', mantle: '#a8743a', hairStyle: 'short', hairColor: '#3a2416', beard: 'young', pose: 'give', hold: 'bag', turn: 1, mouth: 'smile' });
  b += `<g transform="translate(380 740)">${K.raw.P('M-34,-30 L34,-30 L28,0 L-28,0Z', '#b8955a')}${[-20, -6, 8, 22].map((x) => K.raw.E(x, -34, 9, 6, '#d9a25a')).join('')}</g>`;
  b += K.raw.R(270, 700, 70, 40, '#c94a3a') + K.raw.R(276, 690, 58, 14, '#2c5596');
  // villagers receiving
  const r = K.rng(5);
  for (const [x, y, s, child] of [[650, 740, 1.3, false], [740, 760, 0.85, true], [810, 735, 1.3, false], [900, 750, 1.25, false], [980, 760, 0.85, true], [1060, 745, 1.25, false]]) b += K.person(x, y, s, { child, robe: K.pick(r, ['#f3e6c4', '#e8dcc0', '#c9913f', '#7a9a5a', '#5a8aa8']), mantle: K.pick(r, [null, '#a8743a', '#6a5a4a']), hairStyle: K.pick(r, ['curly', 'short', 'bob']), hairColor: '#2a1d14', skin: K.pick(r, [C.skinTan, C.skinDark]), beard: child ? 'none' : K.pick(r, ['none', 'short']), veil: !child && r() < 0.35 ? '#2c4a7a' : null, pose: K.pick(r, ['reach', 'pray', 'orans']), hold: K.pick(r, ['bread', 'jar', null]), turn: -1, mouth: 'smile' });
  // his sister waving goodbye
  b += K.person(240, 760, 1.2, { robe: '#5a8aa8', mantle: null, veil: '#e8dcc0', pose: 'raise', turn: 1, mouth: 'smile' });
  b += K.donkey(1140, 770, 1.0, { flip: true }) + K.goat(100, 770, 1.1);
  return K.scene({ title: 'Young Anthony gives everything to the poor', body: b });
}

function fortress() {
  let b = K.sky('night') + K.stars(80, 9, 1200, 400) + K.moon(1060, 110, 26);
  b += `<g class="vfar">${K.hills(420, '#4a4258', { seed: 6, amp: 40 })}</g>`;
  // ruined fort walls (cut-away)
  b += K.raw.P('M80,800 V300 L140,280 L160,320 L230,300 V800Z', '#7a6a58') + K.raw.P('M970,800 V280 L1030,300 L1060,260 L1120,290 V800Z', '#7a6a58');
  b += K.raw.R(0, 600, 1200, 200, '#5e5246', 'n');
  b += K.raw.R(230, 360, 740, 240, '#6e6052', 'n');
  for (let y = 360; y < 600; y += 40) for (let x = 230 + ((y / 40) % 2) * 30; x < 970; x += 60) b += `<rect x="${x}" y="${y}" width="60" height="40" fill="none" stroke="#5a4e42" stroke-width="2"/>`;
  b += K.raw.P('M560,360 l40,-60 l40,60Z', '#6e6052', 'n');
  // shadow beasts melting away
  const shade = (svg) => `<g opacity=".45">${svg}</g>`;
  b += shade(K.lion(300, 660, 1.6, { color: '#3a2a4a', mane: '#2a1a3a' })) + shade(K.bear(960, 650, 1.4, { color: '#2e2438', flip: true }));
  b += shade(K.fox(240, 760, 2.0, { flip: false }).replace(/#d26a2a/g, '#3a2a4a')) + shade(K.snake(980, 760, 1.8, { color: '#3a2a4a', flip: true }));
  b += shade(K.raw.P('M150,500 q30,-40 60,0 q-30,-10 -60,0Z', '#2a1a3a') + K.raw.P('M1000,480 q30,-40 60,0 q-30,-10 -60,0Z', '#2a1a3a'));
  // heavenly light
  b += K.rays(600, -20, { n: 9, r1: 10, r2: 820, op: 0.25, spread: 0.7, start: Math.PI / 2 - 0.35, color: '#fff3a6' });
  b += `<path d="M520,0 L680,0 L760,800 L440,800Z" fill="url(#gGlow)" opacity=".7"/>`;
  b += K.heaven(600, 0, 110, { rays: false });
  b += K.glow(600, 560, 240, 0.85);
  b += K.person(600, 740, 2.3, { halo: true, robe: '#8a5a32', mantle: '#4a3a30', kneel: true, hairStyle: 'short', hairColor: '#3a2416', beard: 'short', beardColor: '#3a2416', pose: 'orans', eyes: 'open', mouth: 'calm' });
  b += K.raw.E(760, 760, 30, 10, '#7a4a28') + K.raw.E(760, 750, 16, 8, '#d9a25a') + K.raw.R(820, 720, 20, 40, '#a8743a');
  return K.scene({ title: 'The light of Christ drives the demons away from Anthony', body: b });
}

function raven() {
  let b = K.sky('desert') + K.sun(160, 110, 40, '#ffd24a');
  b += `<g class="vfar">${K.mountains(360, '#d4a978', { seed: 7, height: 200, snow: false })}</g>`;
  b += `<g class="far">${K.hills(420, '#e2c08e', { seed: 9, amp: 24 })}</g>`;
  b += K.cave(820, 600, 2.2, { rock: '#c49a6a', dark: '#4a3424' });
  b += K.ground(600, '#e8cf9c');
  b += K.lake(330, 640, 120, 26, '#5aa3cf') + K.reeds(220, 640, 0.8) + K.reeds(440, 645, 0.7);
  b += K.tree(470, 620, 1.9, { kind: 'palm' }) + K.tree(1130, 640, 1.3, { kind: 'palm' });
  b += K.rock(110, 700, 1.8, '#c9a87a') + K.rock(1060, 740, 1.4, '#c9a87a');
  // the two hermits
  b += K.person(640, 750, 1.95, { ...anthonyOld, kneel: true, pose: 'orans', hold: null, turn: 1, mouth: 'smile' });
  b += K.person(900, 750, 1.95, { ...paulOld, kneel: true, pose: 'reach', turn: -1, mouth: 'smile' });
  // raven with a loaf
  b += K.glow(770, 380, 100, 0.7) + K.raven(760, 380, 1.6, { bread: true, flip: false });
  // lions resting and lizards
  b += K.lion(220, 780, 1.1, { lying: true }) + K.lion(1080, 790, 1.1, { lying: true, flip: true });
  b += lizard(130, 690, 1.2) + lizard(1050, 730, 1) + lizard(560, 790, 1.1);
  b += K.flock(4, 900, 140, 200, 80, 3);
  return K.scene({ title: 'A raven brings bread to St Anthony and St Paul of Thebes', body: b });
}

export const art = {
  'portrait.svg': () => K.portrait({ ...anthonyOld, pose: 'hold', hold: 'scroll' }, { title: 'St Anthony the Great' }),
  'scene-gospel.svg': gospel,
  'scene-fortress.svg': fortress,
  'scene-raven.svg': raven,
};
