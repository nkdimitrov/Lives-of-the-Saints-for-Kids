import * as K from '../kit.mjs';
const { C } = K;
export const slug = 'basil-the-great';

const basil = { halo: true, vest: 'bishop', robe: '#f6f1e4', mantle: '#f6f1e4', hairStyle: 'short', hairColor: '#2a1d14', beard: 'long', beardColor: '#2a1d14', pose: 'bless', hold: 'book', bodyScale: 1.05 };

function pot(x, y, s = 1) {
  return K.g(x, y, s, `${K.raw.R(-40, -6, 80, 10, '#7a4a28')}${K.fire(0, 4, 0.45)}${K.raw.P('M-34,-20 Q-36,-58 0,-60 Q36,-58 34,-20Z', '#3a3632')}${K.raw.E(0, -58, 34, 8, '#c9913f')}<path d="M-14,-70 q-10,-16 4,-28 q12,-12 0,-26 M10,-70 q-10,-16 4,-28" stroke="#fff" stroke-width="5" fill="none" opacity=".6" stroke-linecap="round"/>`);
}

function athens() {
  let b = K.sky('day') + K.sun(1080, 90, 36) + K.cloud(300, 90, 0.8) + K.cloud(760, 60, 0.6);
  b += `<g class="vfar">${K.mountains(330, '#a8bccb', { seed: 4, height: 150 })}</g>`;
  // acropolis hill with temple
  b += K.raw.P('M120,420 Q200,250 420,240 Q620,240 700,420Z', '#c9b48a') + K.temple(410, 260, 1.2);
  b += `<g class="far">${K.hills(420, '#a9c27a', { seed: 8, amp: 16 })}</g>`;
  b += `<g class="far">${K.cityscape(950, 430, 0.7, { w: 460, seed: 4 })}</g>`;
  b += K.ground(440, '#b9c47a');
  // portico with students
  b += K.g(240, 560, 1, `${K.raw.R(-180, -150, 360, 14, '#efe4cc')}${[0, 1, 2, 3, 4].map((i) => K.raw.R(-170 + i * 80, -136, 16, 136, '#f4ecda')).join('')}${K.raw.P('M-190,-150 L0,-190 L190,-150Z', '#e8dcc0')}`);
  b += K.crowd(3, 90, 560, 300, 5, { s: 0.85, poses: ['point', 'hold', 'orans', 'pray'] });
  // stone road to the church
  b += K.path('M450,800 C520,640 700,600 980,520', '#e3d4b0', 70);
  b += K.church(1000, 520, 1.0, { dome: '#c2552f' });
  for (const [x, k] of [[60, 'olive'], [720, 'cypress'], [800, 'olive'], [1160, 'cypress'], [1110, 'olive']]) b += K.tree(x, k === 'cypress' ? 560 : 600, 1.2, { kind: k, seed: x });
  // Basil and Gregory walking
  b += K.person(560, 730, 1.7, { halo: true, robe: '#2c5596', mantle: '#a8743a', hairStyle: 'short', hairColor: '#2a1d14', beard: 'young', pose: 'hold', hold: 'book', turn: 1 });
  b += K.person(680, 715, 1.65, { halo: true, robe: '#6b8a3a', mantle: '#f3e6c4', hairStyle: 'curly', hairColor: '#5a3a28', beard: 'young', pose: 'point', hold: 'scroll', turn: -1, mouth: 'smile' });
  b += K.goat(900, 700, 1.3) + K.goat(980, 720, 1.1, { flip: true, color: '#8a6a4a' });
  b += K.flowers(4, 0, 680, 1200, 110, 30) + K.flock(5, 500, 120, 300, 80, 5);
  return K.scene({ title: 'Basil and Gregory study together in Athens', body: b });
}

function famine() {
  let b = K.sky('day', 1200, 800).replace('skyDay', 'skyDesert') + K.sun(1060, 100, 44, '#ffcf4a');
  b += `<g class="vfar">${K.mountains(330, '#c3b8a2', { seed: 12, height: 170, snowColor: '#f2eee4' })}</g>`;
  b += `<g class="far">${K.hills(380, '#c9b78a', { seed: 14, amp: 18 })}</g>`;
  // the Basiliad: hospital and shelter
  let hosp = K.raw.R(-260, -120, 520, 120, '#efe2c4');
  for (let i = 0; i < 9; i++) hosp += K.raw.P(`M${-240 + i * 58},-30 v-50 q14,-16 28,0 v50Z`, '#36506e');
  hosp += K.raw.P('M-280,-120 L0,-170 L280,-120Z', '#c2552f') + K.raw.P('M-20,0 v-60 q20,-24 40,0 v60Z', '#7a4a28');
  b += K.g(780, 430, 0.9, hosp) + K.church(1080, 430, 0.6);
  b += K.ground(430, '#d9c79a');
  b += K.raw.R(0, 430, 1200, 18, '#c4b285', 'n');
  // dry field
  for (let i = 0; i < 12; i++) b += `<path d="M${40 + i * 30},470 l4,-16 M${46 + i * 30},470 l-3,-12" stroke="#a8915a" stroke-width="2"/>`;
  // pots
  b += pot(380, 640, 1.6) + pot(560, 650, 1.4);
  // Basil serving
  b += K.person(470, 720, 1.85, { halo: true, robe: '#3a3a4a', mantle: null, apron: '#f3e6c4', hairStyle: 'short', hairColor: '#2a1d14', beard: 'long', beardColor: '#2a1d14', pose: 'give', hold: 'jar', holdColor: '#a8743a', turn: 1, mouth: 'smile' });
  // line of hungry people
  const r = K.rng(9);
  const poor = [[650, 720, 1.25, false], [720, 735, 0.85, true], [790, 720, 1.25, false], [870, 730, 1.2, false], [940, 740, 0.8, true], [1010, 725, 1.25, false], [1090, 735, 1.2, false]];
  for (const [x, y, s, child] of poor) b += K.person(x, y, s, { child, robe: K.pick(r, ['#8a7a5a', '#7a6a5a', '#9a8a6a', '#6a6a5a', '#a8743a']), mantle: K.pick(r, ['#6a5a4a', null, '#7a6a4a']), hairStyle: K.pick(r, ['short', 'bald', 'bob', 'curly']), hairColor: K.pick(r, ['#4a2d18', '#9a9a9a', '#2a1d14']), beard: child ? 'none' : K.pick(r, ['none', 'short', 'long']), beardColor: '#9a9a9a', veil: !child && r() < 0.3 ? '#6a5a4a' : null, pose: 'reach', hold: 'jar', holdColor: '#c9913f', turn: -1, mouth: K.pick(r, ['calm', 'smile']) });
  // helpers with bread baskets
  b += K.person(200, 700, 1.3, { robe: '#4f8a3c', mantle: null, apron: '#f3e6c4', hairStyle: 'curly', beard: 'young', pose: 'carry', hold: 'loaves', mouth: 'smile' });
  b += K.person(110, 720, 1.25, { robe: '#a8281f', mantle: null, veil: '#f3e6c4', pose: 'carry', hold: 'loaves', mouth: 'smile' });
  b += K.dog(280, 770, 1.1) + K.raw.R(0, 760, 1200, 40, '#cbb88a', 'n');
  return K.scene({ title: 'Basil feeds the hungry during the famine', body: b });
}

function modestus() {
  let b = K.raw.R(0, 0, 1200, 800, '#d8c7a6', 'n');
  for (let y = 0; y < 560; y += 56) for (let x = (y / 56) % 2 ? -60 : 0; x < 1200; x += 120) b += `<rect x="${x}" y="${y}" width="120" height="56" fill="none" stroke="#bda886" stroke-width="2"/>`;
  b += K.raw.P('M500,560 V240 Q600,140 700,240 V560Z', '#bda886', 'n');
  b += `<clipPath id="mw"><path d="M530,520 V250 Q600,180 670,250 V520Z"/></clipPath><g clip-path="url(#mw)">${K.sky('day')}${K.mountains(430, '#a3b9cc', { seed: 3, height: 140 })}${K.hills(470, '#a9c27a', { seed: 2, amp: 10 })}</g>`;
  b += K.raw.P('M530,520 V250 Q600,180 670,250 V520Z', 'none', 'o', ' stroke-width="6"');
  // banners
  for (const x of [200, 1000]) b += K.raw.P(`M${x - 34},40 h68 v220 l-34,-24 l-34,24Z`, C.purple) + `<circle cx="${x}" cy="120" r="20" fill="none" stroke="${C.gold}" stroke-width="3"/><path d="M${x},100 v40 M${x - 14},120 h28" stroke="${C.gold}" stroke-width="3"/>`;
  b += K.raw.R(0, 560, 1200, 240, '#b9a47a', 'n');
  for (let i = 0; i < 8; i++) b += `<path d="M${i * 170 - 40},800 L${i * 120 + 120},560" stroke="#a8916a" stroke-width="2"/>`;
  // soldiers
  b += K.person(1120, 700, 1.45, { armor: true, robe: '#7a2a20', cloak: '#5a1a14', head: 'helmet', beard: 'short', pose: 'spear', hold: 'spear', flip: true });
  b += K.person(1010, 690, 1.4, { armor: true, robe: '#2c4a7a', cloak: '#1c3765', head: 'helmet', beard: 'wide', pose: 'spear', hold: 'spear', flip: true });
  b += K.person(150, 700, 1.45, { armor: true, robe: '#7a2a20', cloak: '#5a1a14', head: 'helmet', beard: 'short', pose: 'spear', hold: 'spear' });
  // scribe writing
  b += K.raw.R(820, 680, 100, 50, '#7a4a28') + K.person(870, 690, 1.0, { robe: '#e8dcc0', mantle: null, hairStyle: 'bald', beard: 'short', beardColor: '#9a9a9a', kneel: true, pose: 'hold', hold: 'pen', turn: -1 });
  // Modestus
  b += K.person(780, 760, 2.15, { robe: '#3a5a8a', mantle: C.purple, hairStyle: 'short', hairColor: '#6a4a2a', beard: 'short', beardColor: '#6a4a2a', pose: 'point', turn: -1, flip: true, mouth: 'open', sash: C.gold });
  // Basil, calm
  b += K.glow(400, 470, 150, 0.6);
  b += K.person(400, 770, 2.15, { ...basil, mouth: 'calm', turn: 1 });
  b += `<g transform="translate(250 760)">${K.raw.E(0, -10, 22, 10, '#8a8276')}${K.raw.Ci(18, -16, 8, '#8a8276')}${K.raw.P('M13,-22 l2,-8 l5,6Z M20,-23 l3,-7 l2,7Z', '#8a8276')}${K.face(18, -16, 7, 0, { eyes: 'open', blush: false })}</g>`;
  return K.scene({ title: 'Basil stands calmly before the prefect Modestus', body: b });
}

export const art = {
  'portrait.svg': () => K.portrait({ ...basil }, { title: 'St Basil the Great' }),
  'scene-athens.svg': athens,
  'scene-famine.svg': famine,
  'scene-modestus.svg': modestus,
};
