import * as K from '../kit.mjs';
const { C } = K;
export const slug = 'constantine-and-helen';

const constantine = { halo: true, robe: C.purple, mantle: C.red, vest: 'loros', head: 'imperial', hairStyle: 'short', hairColor: '#5a3a1a', beard: 'short', beardColor: '#5a3a1a' };
const helen = { halo: true, robe: '#2c5596', mantle: C.red, vest: 'loros', head: 'imperial', veil: '#f3e6c4', hairStyle: 'long', hairColor: '#9a9a9a' };

const tentShape = (x, y, s, col) => K.tent(x, y, s, col);

function vision() {
  let b = K.sky('day') + K.cloud(160, 120, 0.8) + K.cloud(1050, 140, 0.7);
  // the cross of light
  b += K.glow(600, 170, 260) + K.rays(600, 170, { n: 30, r1: 40, r2: 420, op: 0.35 });
  b += K.raw.P('M584,60 h32 v70 h70 v32 h-70 v120 h-32 v-120 h-70 v-32 h70Z', '#fff6c8', 'o', ' stroke="#e8b84a" stroke-width="3"');
  b += `<text x="600" y="330" text-anchor="middle" font-family="Georgia, serif" font-size="34" font-weight="bold" fill="#fff6c8" stroke="#b8862a" stroke-width="1" letter-spacing="6">ΕΝ ΤΟΥΤΩ ΝΙΚΑ</text>`;
  b += `<g class="vfar">${K.hills(420, '#a8c08a', { seed: 3, amp: 20 })}${K.cityscape(1000, 420, 0.5, { w: 420, seed: 7 })}</g>`;
  b += K.river('M600,440 C800,430 1000,460 1220,440', { w: 18 }) + K.bridge(860, 450, 0.4, { w: 160 });
  b += K.hills(480, '#9ab86a', { seed: 5, amp: 14 });
  // camp tents and banners
  for (let i = 0; i < 6; i++) b += tentShape(80 + i * 70, 500 + (i % 2) * 8, 0.9, i % 2 ? '#e8d4a8' : '#d9c08a');
  b += `<path d="M450,500 v-80 l40,10 l-40,12" stroke="${C.ink}" stroke-width="2" fill="${C.red}"/>`;
  // soldiers looking up
  const r = K.rng(3);
  for (const [x, y, s] of [[90, 700, 1.2], [180, 690, 1.15], [270, 710, 1.2], [880, 700, 1.2], [970, 690, 1.15], [1060, 710, 1.2], [1150, 700, 1.15], [790, 720, 1.25]]) {
    const shield = `<g transform="translate(-22 -50)">${K.raw.Ci(0, 0, 16, C.red)}${K.chiRho(0, 0, 0.32)}</g>`;
    b += K.person(x, y, s, { armor: true, robe: '#7a2a20', cloak: K.pick(r, ['#a8281f', '#7a2a20']), head: 'helmet', beard: K.pick(r, ['short', 'none', 'wide']), pose: K.pick(r, ['orans', 'point', 'spear']), hold: 'spear', mouth: 'open', turn: x < 600 ? 1 : -1, extra: shield });
  }
  // Constantine on a white horse, pointing up
  b += K.horse(520, 760, 1.6, { color: '#f7f4ee', mane: '#d9d2c4', saddle: C.purple, walk: false, rider: { spear: false, robe: C.purple, cloak: C.red, hair: 'short', hairColor: '#5a3a1a', beard: 'short', armor: true, shield: C.gold } });
  b += `<path d="M560,590 L600,520" stroke="${C.ink}" stroke-width="9" stroke-linecap="round"/><path d="M560,590 L600,520" stroke="${C.purple}" stroke-width="6.5" stroke-linecap="round"/>` + K.raw.Ci(602, 516, 5, C.skin);
  b += K.flowers(4, 0, 740, 1200, 50, 20) + K.grass(5, 0, 720, 1200, 80, 30);
  return K.scene({ title: 'Constantine sees the sign of the Cross in the sky', body: b });
}

function cross() {
  let b = K.sky('day') + K.sun(1080, 90, 34) + K.cloud(300, 80, 0.7);
  b += `<g class="far">${K.hills(330, '#c9b48a', { seed: 8, amp: 20 })}${K.cityscape(250, 340, 0.6, { w: 460, seed: 14, wallColor: '#e2d2ae' })}${K.tree(800, 340, 0.8, { kind: 'olive' })}${K.tree(860, 345, 0.7, { kind: 'cypress' })}</g>`;
  // ruins of the pagan temple
  b += K.raw.R(820, 330, 300, 24, '#e2d4b4') + K.raw.R(840, 260, 22, 70, '#ece0c6') + K.raw.R(940, 290, 22, 40, '#ece0c6') + K.raw.R(1060, 270, 22, 60, '#ece0c6');
  b += K.ground(400, '#c9a86a');
  // excavation pit
  b += K.raw.P('M240,560 Q260,440 600,430 Q940,440 960,560 Q600,600 240,560Z', '#8a6a42');
  b += K.raw.P('M280,550 Q300,470 600,462 Q900,470 920,550 Q600,580 280,550Z', '#6e5234');
  // three crosses lifted out
  const woodCross = (x, y, rot) => `<g transform="translate(${x} ${y}) rotate(${rot})">${K.raw.R(-9, -170, 18, 200, '#8a5a32')}${K.raw.R(-60, -130, 120, 16, '#8a5a32')}</g>`;
  b += woodCross(420, 520, -18) + woodCross(780, 520, 16);
  // basil plants
  for (let i = 0; i < 8; i++) b += K.bush(300 + i * 70, 590, 0.55, '#4f8a3c', null);
  // sick woman healed
  b += K.raw.R(700, 640, 200, 30, '#a8743a') + K.raw.R(700, 620, 200, 22, '#f3e6c4');
  b += K.person(800, 650, 1.35, { kneel: true, robe: '#e8dcc0', mantle: null, veil: '#c9b48a', pose: 'orans', mouth: 'open', turn: -1 });
  // Bishop Macarius holding up the true Cross
  b += K.glow(620, 420, 200, 0.9) + K.rays(620, 420, { n: 18, r1: 40, r2: 300, op: 0.3 });
  b += K.person(620, 720, 2.0, { halo: true, vest: 'bishop', robe: '#f6f1e4', mantle: '#d9a521', hairStyle: 'bald', hairColor: '#cfcfcf', beard: 'long', beardColor: '#cfcfcf', pose: 'carry', turn: 1 });
  b += `<g transform="translate(620 470)">${K.raw.R(-9, -140, 18, 210, '#9a6a3a')}${K.raw.R(-56, -100, 112, 16, '#9a6a3a')}${K.raw.R(-28, -126, 56, 12, '#f3e6c4')}</g>`;
  // Empress Helen kneeling
  b += K.person(380, 770, 2.05, { ...helen, kneel: true, pose: 'orans', turn: 1 });
  // workers
  b += K.person(150, 760, 1.4, { robe: '#a8743a', mantle: null, hairStyle: 'curly', beard: 'short', pose: 'raise', hold: 'axe', turn: 1 });
  b += K.person(1000, 760, 1.4, { robe: '#7a6a4a', mantle: null, hairStyle: 'short', beard: 'long', beardColor: '#8a8a8a', hairColor: '#8a8a8a', pose: 'carry', hold: 'loaves', holdColor: '#8a6a42', turn: -1 });
  b += K.person(1110, 770, 1.35, { robe: '#5a8aa8', mantle: null, hairStyle: 'bald', beard: 'short', pose: 'orans', turn: -1, mouth: 'open' });
  b += K.raw.P('M60,780 l20,-30 l8,4 l-20,30Z', '#8a5a32');
  return K.scene({ title: 'St Helen finds the Precious Cross in Jerusalem', body: b });
}

function city() {
  let b = K.sky('day') + K.sun(1080, 90, 34) + K.cloud(260, 80, 0.8) + K.cloud(700, 60, 0.6);
  b += K.sea(330, { seed: 5, waves: 50 });
  b += `<g class="vfar">${K.hills(330, '#9fb3a0', { seed: 2, amp: 16, w: 400 })}</g>`;
  b += K.ship(150, 360, 0.4) + K.ship(420, 390, 0.35, { sail: '#e2b84a' }) + K.ship(1050, 380, 0.45, { stripe: C.purple });
  // hills of the new city
  b += K.raw.P('M380,800 V460 Q520,380 700,400 Q900,390 1200,420 V800Z', '#c9b88a');
  // rising domed church with scaffolding
  b += K.church(780, 470, 1.6, { dome: '#d9a521', wall: '#efe0c4' });
  for (let i = 0; i < 5; i++) b += `<path d="M${650 + i * 60},470 V250" stroke="#8a5a32" stroke-width="4"/>`;
  for (let i = 0; i < 4; i++) b += `<path d="M640,${430 - i * 50} H900" stroke="#8a5a32" stroke-width="3"/>`;
  // crane
  b += `<path d="M1000,470 L1000,220 L1140,250 M1000,240 L960,260 M1120,250 V350" stroke="#6e4527" stroke-width="6" fill="none"/>` + K.raw.R(1100, 350, 40, 26, '#d8c7a6');
  b += K.wall(560, 520, 360, 70, { color: '#d8c39a', gate: true, seed: 5 }) + K.tower(380, 520, 1, { color: '#d8c39a', flag: C.purple }) + K.tower(740, 520, 1, { color: '#d8c39a', flag: C.purple });
  b += K.raw.R(1060, 300, 26, 170, '#ece0c6') + K.raw.Ci(1073, 296, 18, C.gold);
  b += K.ground(560, '#d9c79a');
  // workers and oxcart
  b += K.cow(900, 680, 1.1, { color: '#b9945a' }) + K.cow(960, 690, 1.1, { color: '#a07a4a' });
  b += K.raw.R(1020, 640, 120, 40, '#8a5a32') + K.raw.Ci(1040, 690, 18, 'none', 'o', ' stroke-width="5"') + K.raw.Ci(1120, 690, 18, 'none', 'o', ' stroke-width="5"') + K.raw.R(1030, 610, 100, 30, '#d8c7a6');
  b += K.person(160, 720, 1.3, { robe: '#a8743a', mantle: null, hairStyle: 'curly', beard: 'short', pose: 'raise', hold: 'axe', turn: 1 });
  b += K.person(260, 730, 1.3, { robe: '#e8dcc0', mantle: null, apron: '#8a6a42', hairStyle: 'bald', beard: 'long', beardColor: '#9a9a9a', pose: 'carry', hold: 'loaves', holdColor: '#d8c7a6' });
  // Constantine with the labarum, pointing
  b += K.person(560, 770, 2.15, { ...constantine, pose: 'point', hold: 'labarum', turn: 1 });
  b += K.person(720, 770, 1.5, { robe: '#2c4a7a', mantle: '#e8dcc0', hairStyle: 'bald', beard: 'short', pose: 'hold', hold: 'openscroll', turn: -1 });
  b += K.flock(6, 300, 150, 500, 120, 8, '#fff') + K.dog(400, 780, 1.1);
  return K.scene({ title: 'Constantine builds the new city of Constantinople', body: b });
}

export const art = {
  'portrait.svg': () => K.scene({ w: 400, h: 400, title: 'Sts Constantine and Helen', body: `<rect width="400" height="400" fill="url(#gGold)"/>${K.rays(200, 180, { n: 28, r1: 40, r2: 320, color: '#fff6c8', op: 0.35 })}<g transform="translate(200 210)">${K.raw.R(-8, -150, 16, 360, '#c9961a')}${K.raw.R(-60, -110, 120, 14, '#c9961a')}</g>${K.person(110, 610, 3.6, { ...constantine, pose: 'reach', hold: null, flip: true })}${K.person(292, 610, 3.6, { ...helen, pose: 'reach', hold: null })}` }),
  'scene-vision.svg': vision,
  'scene-cross.svg': cross,
  'scene-city.svg': city,
};
