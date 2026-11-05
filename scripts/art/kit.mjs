// Illuminated-storybook SVG art kit.
// Every drawing function returns an SVG string. Objects that stand on the ground
// take (x, y) as their bottom-centre point and a scale `s`; local drawings use a
// coordinate system where y = 0 is the ground and negative y goes up.

export const C = {
  ink: '#3a2616',
  gold: '#d9a521',
  goldLight: '#f4d468',
  goldDark: '#a77a10',
  red: '#b8322a',
  redDark: '#7f1d18',
  blue: '#2c5596',
  blueDark: '#1c3765',
  sky: '#9fd0ef',
  green: '#4f8a3c',
  greenDark: '#2f5e2a',
  greenLight: '#8dbb57',
  olive: '#7f9452',
  ochre: '#c9913f',
  earth: '#a86b3c',
  brown: '#6e4527',
  brownDark: '#4a2d18',
  cream: '#f6ecd2',
  white: '#fbf7ee',
  stone: '#d8c7a6',
  stoneDark: '#b19c78',
  purple: '#6b2e6e',
  pink: '#e98fa4',
  skin: '#eab88f',
  skinTan: '#cf9467',
  skinDark: '#a8714a',
  water: '#4f95c7',
  waterDark: '#2d6a9c',
  snow: '#f4f8fb',
  black: '#2a2221',
};

// ---------- utilities ----------
export function rng(seed = 1) {
  let a = seed >>> 0;
  return function () {
    a |= 0; a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
export const f = (n) => (Math.round(n * 10) / 10).toString();
export const pick = (r, arr) => arr[Math.floor(r() * arr.length)];
export const range = (n) => Array.from({ length: n }, (_, i) => i);

export function g(x, y, s, inner, { flip = false, rot = 0, cls = '', op } = {}) {
  const sx = flip ? -s : s;
  return `<g${cls ? ` class="${cls}"` : ''}${op !== undefined ? ` opacity="${op}"` : ''} transform="translate(${f(x)} ${f(y)})${rot ? ` rotate(${f(rot)})` : ''} scale(${f(sx * 100) / 100} ${f(s * 100) / 100})">${inner}</g>`;
}
const P = (d, fill, cls = 'o', extra = '') => `<path d="${d}" fill="${fill}" class="${cls}"${extra}/>`;
const Ci = (cx, cy, r, fill, cls = 'o', extra = '') => `<circle cx="${f(cx)}" cy="${f(cy)}" r="${f(r)}" fill="${fill}" class="${cls}"${extra}/>`;
const E = (cx, cy, rx, ry, fill, cls = 'o', extra = '') => `<ellipse cx="${f(cx)}" cy="${f(cy)}" rx="${f(rx)}" ry="${f(ry)}" fill="${fill}" class="${cls}"${extra}/>`;
const R = (x, y, w, h, fill, cls = 'o', extra = '') => `<rect x="${f(x)}" y="${f(y)}" width="${f(w)}" height="${f(h)}" fill="${fill}" class="${cls}"${extra}/>`;
const L = (x1, y1, x2, y2, stroke = C.ink, w = 1.5, extra = '') => `<line x1="${f(x1)}" y1="${f(y1)}" x2="${f(x2)}" y2="${f(y2)}" stroke="${stroke}" stroke-width="${w}" stroke-linecap="round"${extra}/>`;
export const raw = { P, Ci, E, R, L };

// ---------- scene wrapper ----------
const STYLE = `.o{stroke:${C.ink};stroke-width:1.7;stroke-linejoin:round;stroke-linecap:round;vector-effect:non-scaling-stroke}
.n{stroke:none}
.far .o{stroke-width:1;stroke:#5a4632}
.vfar .o{stroke-width:.6;stroke:#7a6a58}
.l{fill:none;stroke:${C.ink};stroke-width:1.3;stroke-linecap:round;stroke-linejoin:round;vector-effect:non-scaling-stroke}
.far .l{stroke-width:.8}
.cap{font-family:Georgia,'Times New Roman',serif;font-weight:bold}`;

export function defs() {
  return `<defs>
<radialGradient id="gHalo" cx="45%" cy="40%" r="65%"><stop offset="0" stop-color="#fff2b0"/><stop offset=".55" stop-color="${C.goldLight}"/><stop offset="1" stop-color="${C.gold}"/></radialGradient>
<linearGradient id="gGold" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${C.goldLight}"/><stop offset="1" stop-color="${C.gold}"/></linearGradient>
<linearGradient id="skyDay" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5fa6dc"/><stop offset=".7" stop-color="#bfe2f3"/><stop offset="1" stop-color="#f3ecd0"/></linearGradient>
<linearGradient id="skyDawn" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6c8fc7"/><stop offset=".55" stop-color="#f2b98c"/><stop offset="1" stop-color="#fbe3a6"/></linearGradient>
<linearGradient id="skyDusk" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#34407a"/><stop offset=".55" stop-color="#c46d73"/><stop offset="1" stop-color="#f3b46d"/></linearGradient>
<linearGradient id="skyNight" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0e1838"/><stop offset=".7" stop-color="#22366a"/><stop offset="1" stop-color="#3d5288"/></linearGradient>
<linearGradient id="skyStorm" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2e3a4f"/><stop offset=".7" stop-color="#5c6b80"/><stop offset="1" stop-color="#8d98a6"/></linearGradient>
<linearGradient id="skyWinter" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8fb3d6"/><stop offset=".7" stop-color="#dce9f2"/><stop offset="1" stop-color="#f4f4ee"/></linearGradient>
<linearGradient id="skyDesert" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6fb0dc"/><stop offset=".65" stop-color="#e8e2c0"/><stop offset="1" stop-color="#f6d9a0"/></linearGradient>
<linearGradient id="sea" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5aa3cf"/><stop offset="1" stop-color="#2a6896"/></linearGradient>
<linearGradient id="seaNight" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2d4f80"/><stop offset="1" stop-color="#16294d"/></linearGradient>
<linearGradient id="seaStorm" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3e6577"/><stop offset="1" stop-color="#1d3542"/></linearGradient>
<radialGradient id="gGlow" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="#fff6c8" stop-opacity=".95"/><stop offset=".5" stop-color="#ffe27a" stop-opacity=".45"/><stop offset="1" stop-color="#ffe27a" stop-opacity="0"/></radialGradient>
<radialGradient id="gHeaven" cx="50%" cy="0%" r="100%"><stop offset="0" stop-color="#e9f3ff"/><stop offset=".5" stop-color="#6d97d6"/><stop offset="1" stop-color="#2c4f92"/></radialGradient>
<linearGradient id="gFire" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#c8281c"/><stop offset=".5" stop-color="#f08a1c"/><stop offset="1" stop-color="#ffe066"/></linearGradient>
<radialGradient id="gLamp" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="#fff3b0" stop-opacity=".9"/><stop offset="1" stop-color="#ffcf55" stop-opacity="0"/></radialGradient>
</defs>`;
}

export function scene({ w = 1200, h = 800, title = '', body = '' }) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" role="img" aria-label="${esc(title)}"><title>${esc(title)}</title><style>${STYLE}</style>${defs()}${body}</svg>\n`;
}
export const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// ---------- sky & weather ----------
export function sky(kind = 'day', w = 1200, h = 800) {
  const id = { day: 'skyDay', dawn: 'skyDawn', dusk: 'skyDusk', night: 'skyNight', storm: 'skyStorm', winter: 'skyWinter', desert: 'skyDesert' }[kind] || 'skyDay';
  return `<rect x="0" y="0" width="${w}" height="${h}" fill="url(#${id})"/>`;
}
export function sun(x, y, r = 40, color = '#ffd84a') {
  let rays = '';
  for (let i = 0; i < 16; i++) {
    const a = (i / 16) * Math.PI * 2;
    const r1 = r * 1.2, r2 = r * (i % 2 ? 1.55 : 1.8);
    rays += `<path d="M${f(x + Math.cos(a - 0.08) * r1)},${f(y + Math.sin(a - 0.08) * r1)} L${f(x + Math.cos(a) * r2)},${f(y + Math.sin(a) * r2)} L${f(x + Math.cos(a + 0.08) * r1)},${f(y + Math.sin(a + 0.08) * r1)}Z" fill="${C.goldLight}" opacity=".85"/>`;
  }
  return `<circle cx="${x}" cy="${y}" r="${r * 2.3}" fill="url(#gGlow)"/>${rays}${Ci(x, y, r, color)}${Ci(x - r * 0.3, y - r * 0.3, r * 0.35, '#fff3a6', 'n', ' opacity=".7"')}`;
}
export function moon(x, y, r = 30) {
  return `<circle cx="${x}" cy="${y}" r="${r * 2.6}" fill="url(#gGlow)" opacity=".6"/>${Ci(x, y, r, '#fbf0c2')}${Ci(x - r * 0.3, y - r * 0.2, r * 0.2, '#ece0ae', 'n')}${Ci(x + r * 0.35, y + r * 0.25, r * 0.14, '#ece0ae', 'n')}${Ci(x + r * 0.1, y - r * 0.45, r * 0.1, '#ece0ae', 'n')}`;
}
export function stars(n, seed, w = 1200, h = 400) {
  const r = rng(seed);
  let out = '';
  for (let i = 0; i < n; i++) {
    const x = r() * w, y = r() * h, s = 1 + r() * 2.2;
    out += r() < 0.25
      ? `<path d="M${f(x)},${f(y - s * 2.4)} L${f(x + s * 0.6)},${f(y - s * 0.6)} L${f(x + s * 2.4)},${f(y)} L${f(x + s * 0.6)},${f(y + s * 0.6)} L${f(x)},${f(y + s * 2.4)} L${f(x - s * 0.6)},${f(y + s * 0.6)} L${f(x - s * 2.4)},${f(y)} L${f(x - s * 0.6)},${f(y - s * 0.6)}Z" fill="#fff4c4"/>`
      : `<circle cx="${f(x)}" cy="${f(y)}" r="${f(s * 0.6)}" fill="#fff8dc" opacity="${f(0.5 + r() * 0.5)}"/>`;
  }
  return out;
}
export function cloud(x, y, s = 1, color = '#ffffff', shade = '#dfe9f1') {
  const inner = `${E(0, 0, 70, 22, shade, 'o', ' opacity=".95"')}${Ci(-38, -10, 24, color, 'n')}${Ci(-8, -24, 32, color, 'n')}${Ci(28, -14, 26, color, 'n')}${Ci(52, -2, 18, color, 'n')}${E(0, 2, 66, 16, color, 'n')}
<path d="M-62,6 Q-66,-14 -44,-28 Q-34,-46 -10,-56 Q20,-56 34,-36 Q60,-36 66,-10 Q72,6 60,12" fill="none" class="l" opacity=".35"/>`;
  return g(x, y, s, inner);
}
export function stormCloud(x, y, s = 1) {
  return cloud(x, y, s, '#6f7c8c', '#535f70');
}
export function lightning(x, y, s = 1) {
  return g(x, y, s, P('M0,0 L-14,40 L-2,40 L-18,90 L22,30 L8,30 L20,0Z', '#fff36b', 'o'));
}
export function rain(seed, x0, y0, w, h, n = 120) {
  const r = rng(seed);
  let out = '';
  for (let i = 0; i < n; i++) {
    const x = x0 + r() * w, y = y0 + r() * h;
    out += L(x, y, x - 6, y + 18, '#cfe0ec', 1.4, ' opacity=".7"');
  }
  return out;
}
export function snowfall(seed, w = 1200, h = 800, n = 160) {
  const r = rng(seed);
  let out = '';
  for (let i = 0; i < n; i++) out += `<circle cx="${f(r() * w)}" cy="${f(r() * h)}" r="${f(1.2 + r() * 2.6)}" fill="#fff" opacity="${f(0.6 + r() * 0.4)}"/>`;
  return out;
}

// ---------- terrain ----------
// A rolling ridge across the canvas from y (baseline). Returns filled path down to bottom.
export function hills(y, color, { amp = 40, seed = 1, w = 1200, h = 800, freq = 1, cls = 'o', snow = false } = {}) {
  const r = rng(seed);
  const ph = [r() * 6, r() * 6, r() * 6];
  const pts = [];
  for (let x = -20; x <= w + 20; x += 20) {
    const t = x / w;
    const yy = y - amp * (0.55 * Math.sin(t * 6.28 * freq + ph[0]) + 0.3 * Math.sin(t * 15 * freq + ph[1]) + 0.15 * Math.sin(t * 31 * freq + ph[2]));
    pts.push([x, yy]);
  }
  let d = `M${pts[0][0]},${f(pts[0][1])}`;
  for (let i = 1; i < pts.length; i++) {
    const [x0, y0] = pts[i - 1], [x1, y1] = pts[i];
    d += ` Q${f(x0)},${f(y0)} ${f((x0 + x1) / 2)},${f((y0 + y1) / 2)}`;
  }
  d += ` L${w + 20},${h + 20} L-20,${h + 20}Z`;
  let out = P(d, color, cls);
  if (snow) out += P(d, '#ffffff', 'n', ' opacity=".55"');
  return out;
}
export function ridgeY(y, { amp = 40, seed = 1, w = 1200, freq = 1 } = {}, x) {
  const r = rng(seed);
  const ph = [r() * 6, r() * 6, r() * 6];
  const t = x / w;
  return y - amp * (0.55 * Math.sin(t * 6.28 * freq + ph[0]) + 0.3 * Math.sin(t * 15 * freq + ph[1]) + 0.15 * Math.sin(t * 31 * freq + ph[2]));
}
export function mountains(y, color, { seed = 3, w = 1200, h = 800, peaks = 6, height = 220, snow = true, snowColor = '#f7f9fb' } = {}) {
  const r = rng(seed);
  let d = `M-20,${y}`;
  const caps = [];
  const step = (w + 40) / peaks;
  for (let i = 0; i < peaks; i++) {
    const x0 = -20 + i * step;
    const px = x0 + step * (0.35 + r() * 0.3);
    const py = y - height * (0.55 + r() * 0.45);
    d += ` L${f(px - step * 0.12)},${f(py + height * 0.12)} L${f(px)},${f(py)} L${f(px + step * 0.15)},${f(py + height * 0.18)} L${f(x0 + step)},${f(y - height * 0.1 * r())}`;
    caps.push([px, py]);
  }
  d += ` L${w + 20},${h + 20} L-20,${h + 20}Z`;
  let out = P(d, color);
  if (snow) for (const [px, py] of caps) {
    const k = height * 0.16;
    out += P(`M${f(px)},${f(py)} L${f(px - k * 0.75)},${f(py + k)} L${f(px - k * 0.3)},${f(py + k * 0.8)} L${f(px)},${f(py + k * 1.1)} L${f(px + k * 0.35)},${f(py + k * 0.8)} L${f(px + k * 0.8)},${f(py + k * 1.05)}Z`, snowColor, 'o');
  }
  return out;
}
export function sea(y, { w = 1200, h = 800, kind = 'day', seed = 5, waves = 40 } = {}) {
  const id = kind === 'night' ? 'seaNight' : kind === 'storm' ? 'seaStorm' : 'sea';
  const r = rng(seed);
  let out = `<rect x="0" y="${y}" width="${w}" height="${h - y}" fill="url(#${id})"/>`;
  for (let i = 0; i < waves; i++) {
    const wx = r() * w, wy = y + 10 + r() * (h - y - 10);
    const ww = 14 + (wy - y) * 0.12;
    out += `<path d="M${f(wx - ww)},${f(wy)} Q${f(wx - ww / 2)},${f(wy - ww * 0.35)} ${f(wx)},${f(wy)} Q${f(wx + ww / 2)},${f(wy - ww * 0.35)} ${f(wx + ww)},${f(wy)}" fill="none" stroke="#e4f3fb" stroke-width="${f(1 + (wy - y) * 0.006)}" stroke-linecap="round" opacity=".75"/>`;
  }
  return out;
}
export function bigWave(x, y, s = 1, color = '#2f6f93') {
  return g(x, y, s, `${P('M-120,0 C-100,-60 -40,-110 20,-100 C60,-94 80,-60 60,-40 C48,-56 30,-60 18,-50 C40,-30 30,0 0,0Z', color)}
${P('M18,-50 C30,-60 48,-56 60,-40 C66,-48 64,-62 56,-70 C70,-64 76,-50 68,-36', '#e8f6fb', 'l')}
${P('M-100,-10 C-80,-50 -40,-80 0,-84', 'none', 'l', ' stroke="#cfeaf6"')}`);
}
export function river(d, { w = 34, color = C.water } = {}) {
  return `<path d="${d}" fill="none" stroke="${C.ink}" stroke-width="${w + 4}" stroke-linecap="round" opacity=".55"/><path d="${d}" fill="none" stroke="${color}" stroke-width="${w}" stroke-linecap="round"/><path d="${d}" fill="none" stroke="#d6eefa" stroke-width="2" stroke-dasharray="14 22" stroke-linecap="round" opacity=".8"/>`;
}
export function lake(cx, cy, rx, ry, color = C.water) {
  return `${E(cx, cy, rx, ry, color)}${E(cx - rx * 0.2, cy - ry * 0.25, rx * 0.5, ry * 0.18, '#bfe3f4', 'n', ' opacity=".55"')}`;
}
export function ground(y, color, w = 1200, h = 800) {
  return R(-10, y, w + 20, h - y + 10, color, 'n');
}
export function path(d, color = '#e3c98e', width = 26) {
  return `<path d="${d}" fill="none" stroke="${C.ink}" stroke-width="${width + 3}" stroke-linecap="round" opacity=".45"/><path d="${d}" fill="none" stroke="${color}" stroke-width="${width}" stroke-linecap="round"/>`;
}

// ---------- vegetation ----------
const SEASON_LEAVES = {
  summer: [C.green, C.greenDark, C.greenLight],
  spring: ['#6fae4a', '#4f8a3c', '#a5cf6a'],
  autumn: ['#d9822b', '#b8462a', '#e8b63a'],
  winter: ['#9fb0a2', '#7e8e82', '#c4d0c6'],
};
export function tree(x, y, s = 1, { kind = 'oak', season = 'summer', seed = 7, fruit } = {}) {
  const r = rng(seed);
  const [c1, c2, c3] = SEASON_LEAVES[season] || SEASON_LEAVES.summer;
  let inner = '';
  if (kind === 'oak' || kind === 'apple' || kind === 'linden') {
    inner += P('M-7,0 Q-5,-30 -9,-52 L-3,-54 Q0,-40 2,-56 L8,-54 Q5,-30 7,0Z', C.brown);
    if (season === 'winter') {
      inner += `<path d="M-2,-50 L-26,-82 M-20,-74 L-34,-78 M2,-52 L4,-96 M4,-80 L18,-92 M6,-56 L28,-84 M20,-74 L34,-76" class="l" stroke-width="2"/>`;
      inner += P('M-30,-82 Q-20,-88 -16,-80 M0,-98 Q8,-102 10,-94 M24,-88 Q32,-92 34,-84', 'none', 'l', ' stroke="#fff" stroke-width="3"');
    } else {
      const blobs = [[-22, -62, 22], [22, -64, 22], [0, -84, 28], [-14, -96, 18], [16, -96, 18], [0, -62, 22]];
      inner += blobs.map(([bx, by, br]) => Ci(bx, by, br, c1)).join('');
      inner += blobs.map(([bx, by, br]) => Ci(bx + 3, by + 4, br * 0.78, c1, 'n')).join('');
      inner += Ci(-10, -74, 12, c2, 'n', ' opacity=".55"') + Ci(14, -80, 10, c2, 'n', ' opacity=".5"') + Ci(-4, -98, 9, c3, 'n', ' opacity=".7"') + Ci(-24, -66, 7, c3, 'n', ' opacity=".6"');
      for (let i = 0; i < 9; i++) {
        const a = r() * Math.PI * 2, d = r() * 32;
        const col = fruit || (season === 'spring' ? (r() < 0.5 ? '#fbe3ea' : '#f7c3d0') : kind === 'apple' ? '#d6362c' : null);
        if (col) inner += Ci(Math.cos(a) * d, -78 + Math.sin(a) * d * 0.8, kind === 'apple' ? 3.6 : 3, col, kind === 'apple' ? 'o' : 'n');
        else inner += `<path d="M${f(Math.cos(a) * d - 3)},${f(-78 + Math.sin(a) * d * 0.8)} q3,-3 6,0" class="l" opacity=".5"/>`;
      }
    }
  } else if (kind === 'fir') {
    inner += R(-4, -14, 8, 14, C.brown);
    const col = season === 'winter' ? '#2f5a3e' : C.greenDark;
    for (let i = 0; i < 4; i++) {
      const by = -10 - i * 24, bw = 34 - i * 7;
      inner += P(`M${-bw},${by} Q0,${by - 8} ${bw},${by} L0,${by - 40}Z`, col);
      inner += P(`M${-bw * 0.6},${by - 4} L0,${by - 34}`, 'none', 'l', ' opacity=".35"');
      if (season === 'winter') inner += P(`M${-bw + 3},${by - 2} Q${-bw * 0.4},${by - 10} 0,${by - 8} Q${bw * 0.4},${by - 10} ${bw - 3},${by - 2} L${bw * 0.35},${by - 16} L0,${by - 12} L${-bw * 0.35},${by - 16}Z`, '#ffffff', 'n', ' opacity=".9"');
    }
  } else if (kind === 'cypress') {
    inner += R(-3, -10, 6, 10, C.brown);
    inner += P('M0,-130 C14,-104 18,-60 14,-26 Q10,-6 0,-6 Q-10,-6 -14,-26 C-18,-60 -14,-104 0,-130Z', '#2e5a33');
    inner += P('M2,-120 C10,-96 12,-60 8,-24', 'none', 'l', ' stroke="#4e8048" stroke-width="3"');
  } else if (kind === 'olive') {
    inner += P('M-8,0 Q-2,-14 -10,-30 Q-14,-40 -4,-46 L2,-44 Q-6,-36 0,-28 Q8,-16 8,0Z', '#7a5a3a');
    const blobs = [[-26, -54, 18], [0, -62, 22], [24, -54, 18], [-12, -72, 16], [14, -72, 15]];
    inner += blobs.map(([bx, by, br]) => E(bx, by, br * 1.15, br * 0.8, '#8c9a63')).join('');
    inner += blobs.map(([bx, by, br]) => E(bx + 2, by + 3, br * 0.9, br * 0.6, '#8c9a63', 'n')).join('');
    for (let i = 0; i < 12; i++) inner += E(-30 + r() * 60, -78 + r() * 34, 2.4, 1.6, r() < 0.5 ? '#3d3a2c' : '#b8c48a', 'n');
  } else if (kind === 'palm') {
    inner += P('M-5,0 Q-2,-60 8,-118 L14,-118 Q6,-60 5,0Z', '#9a6a3a');
    for (let i = 0; i < 9; i++) inner += L(-4 + i * 1.3, -12 - i * 12, 6 + i * 1.3, -14 - i * 12, C.brownDark, 1.2);
    const fr = [[-60, -100], [-50, -136], [-12, -150], [30, -146], [60, -118], [52, -92], [-30, -88]];
    for (const [fx, fy] of fr) {
      const mx = (11 + fx) / 2, my = (-120 + fy) / 2 - 16;
      inner += P(`M11,-120 Q${f(mx)},${f(my - 10)} ${fx},${fy} Q${f(mx)},${f(my + 6)} 11,-118Z`, '#4a8a3a');
      inner += `<path d="M11,-120 Q${f(mx)},${f(my - 4)} ${fx},${fy}" class="l" stroke="#2f5e2a" opacity=".6"/>`;
    }
    inner += Ci(6, -114, 4, '#b5602a') + Ci(14, -112, 4, '#b5602a') + Ci(10, -108, 4, '#c97a33');
  } else if (kind === 'birch') {
    inner += P('M-4,0 L-3,-110 L3,-110 L4,0Z', '#f4f1ea');
    for (let i = 0; i < 7; i++) inner += R(-4, -12 - i * 14, 3 + r() * 4, 2, C.black, 'n');
    const col = season === 'autumn' ? '#e6b93a' : season === 'winter' ? null : '#9cc964';
    if (col) for (let i = 0; i < 14; i++) inner += E(-18 + r() * 36, -60 - r() * 60, 9, 6, col, i % 3 ? 'n' : 'o');
    else inner += `<path d="M0,-80 L-18,-100 M0,-70 L16,-92 M0,-96 L-8,-112" class="l"/>`;
  }
  return g(x, y, s, inner);
}
export function bush(x, y, s = 1, color = C.green, berries) {
  let inner = `${Ci(-14, -10, 13, color)}${Ci(14, -10, 13, color)}${Ci(0, -18, 15, color)}${E(0, -7, 24, 8, color, 'n')}`;
  if (berries) inner += Ci(-8, -14, 2.6, berries, 'n') + Ci(6, -20, 2.6, berries, 'n') + Ci(14, -10, 2.6, berries, 'n') + Ci(-16, -6, 2.6, berries, 'n');
  return g(x, y, s, inner);
}
export function flowers(seed, x0, y0, w, h, n = 30, colors = ['#e2483d', '#f5d33a', '#ffffff', '#9a6ad6', '#f08fb3']) {
  const r = rng(seed);
  let out = '';
  for (let i = 0; i < n; i++) {
    const x = x0 + r() * w, y = y0 + r() * h, s = 0.6 + (y - y0) / Math.max(h, 1) * 0.6;
    const col = pick(r, colors);
    out += `<path d="M${f(x)},${f(y)} l0,${f(-8 * s)}" stroke="#3f7a32" stroke-width="${f(1.2 * s)}"/>`;
    for (let k = 0; k < 5; k++) {
      const a = (k / 5) * Math.PI * 2;
      out += `<circle cx="${f(x + Math.cos(a) * 2.6 * s)}" cy="${f(y - 8 * s + Math.sin(a) * 2.6 * s)}" r="${f(2 * s)}" fill="${col}"/>`;
    }
    out += `<circle cx="${f(x)}" cy="${f(y - 8 * s)}" r="${f(1.3 * s)}" fill="#f6b833"/>`;
  }
  return out;
}
export function grass(seed, x0, y0, w, h, n = 40, color = '#3f7a32') {
  const r = rng(seed);
  let out = '';
  for (let i = 0; i < n; i++) {
    const x = x0 + r() * w, y = y0 + r() * h, s = 0.6 + (y - y0) / Math.max(h, 1) * 0.8;
    out += `<path d="M${f(x - 5 * s)},${f(y)} q${f(1 * s)},${f(-8 * s)} ${f(-2 * s)},${f(-13 * s)} M${f(x)},${f(y)} q0,${f(-10 * s)} ${f(1 * s)},${f(-16 * s)} M${f(x + 5 * s)},${f(y)} q${f(-1 * s)},${f(-8 * s)} ${f(3 * s)},${f(-12 * s)}" fill="none" stroke="${color}" stroke-width="${f(1.5 * s)}" stroke-linecap="round"/>`;
  }
  return out;
}
export function rock(x, y, s = 1, color = '#a49a88') {
  return g(x, y, s, `${P('M-26,0 Q-30,-16 -16,-26 Q-2,-36 14,-28 Q30,-20 28,0Z', color)}${P('M-14,-22 Q-4,-28 8,-24', 'none', 'l', ' stroke="#f0ead9" opacity=".7"')}`);
}
export function reeds(x, y, s = 1) {
  let inner = '';
  for (let i = -3; i <= 3; i++) {
    inner += `<path d="M${i * 4},0 Q${i * 6},-30 ${i * 9},-56" fill="none" stroke="#5f7d38" stroke-width="2"/>`;
    if (i % 2 === 0) inner += E(i * 9, -58, 2.4, 8, '#7a4f2a', 'n');
  }
  return g(x, y, s, inner);
}
export function wheat(seed, x0, y0, w, h, n = 80) {
  const r = rng(seed);
  let out = '';
  for (let i = 0; i < n; i++) {
    const x = x0 + r() * w, y = y0 + r() * h, s = 0.5 + (y - y0) / Math.max(h, 1) * 0.9;
    out += `<path d="M${f(x)},${f(y)} q${f(2 * s)},${f(-14 * s)} ${f(1 * s)},${f(-26 * s)}" fill="none" stroke="#b88d2c" stroke-width="${f(1.2 * s)}"/><ellipse cx="${f(x + 1 * s)}" cy="${f(y - 29 * s)}" rx="${f(2.2 * s)}" ry="${f(6 * s)}" fill="#e7bb4a"/>`;
  }
  return out;
}
export function sheaf(x, y, s = 1) {
  let inner = '';
  for (let i = -5; i <= 5; i++) inner += `<path d="M${i * 1.5},0 L${i * 5},-44" stroke="#c99a35" stroke-width="2.4"/>${E(i * 5.4, -48, 3, 8, '#e7bb4a', 'n')}`;
  inner += R(-9, -22, 18, 5, '#9a6a2a');
  return g(x, y, s, inner);
}
export function vine(x, y, s = 1) {
  let inner = P('M-3,0 Q-6,-30 0,-60 L4,-60 Q-1,-30 3,0Z', '#6b4a2b');
  inner += E(0, -72, 26, 18, '#5d8e3a');
  for (let i = 0; i < 3; i++) {
    const gx = -12 + i * 12;
    for (let k = 0; k < 6; k++) inner += Ci(gx + (k % 2) * 3 - 1.5, -62 + Math.floor(k / 2) * 5, 3, '#6a2e6e', 'n');
  }
  return g(x, y, s, inner);
}

// ---------- buildings ----------
export function house(x, y, s = 1, { w = 60, h = 46, wall = '#f3e6c8', roof = '#c2552f', door = '#7a4a28', style = 'tile', windows = 2, lit = false, chimney = false, snow = false } = {}) {
  let inner = R(-w / 2, -h, w, h, wall);
  if (style === 'tile') {
    inner += P(`M${-w / 2 - 6},${-h} L0,${-h - w * 0.42} L${w / 2 + 6},${-h}Z`, roof);
    for (let i = 1; i < 4; i++) inner += `<path d="M${f(-w / 2 - 6 + i * (w / 2 + 6) / 4)},${f(-h - i * w * 0.42 / 4)} L${f(w / 2 + 6 - i * (w / 2 + 6) / 4)},${f(-h - i * w * 0.42 / 4)}" class="l" opacity=".35"/>`;
    if (snow) inner += P(`M${-w / 2 - 6},${-h} L0,${-h - w * 0.42} L${w / 2 + 6},${-h} L${w / 2},${-h + 4} L${w * 0.2},${-h - 4} L0,${-h} L${-w * 0.25},${-h - 5} L${-w / 2},${-h + 4}Z`, '#ffffff', 'o');
  } else if (style === 'flat') {
    inner += R(-w / 2 - 3, -h - 5, w + 6, 6, '#e3d2ad');
  } else if (style === 'thatch') {
    inner += P(`M${-w / 2 - 10},${-h + 4} Q${-w / 4},${-h - w * 0.55} 0,${-h - w * 0.62} Q${w / 4},${-h - w * 0.55} ${w / 2 + 10},${-h + 4}Z`, snow ? '#ffffff' : '#c9a253');
    for (let i = 0; i < 6; i++) inner += `<path d="M${f(-w / 2 + i * w / 5)},${f(-h + 2)} l${f(4)},${f(-14)}" class="l" opacity=".4"/>`;
  }
  if (chimney) inner += R(w * 0.18, -h - w * 0.4, 9, 20, '#a4553a') + (snow ? '' : `<path d="M${f(w * 0.22)},${f(-h - w * 0.42)} q-8,-14 4,-22 q12,-10 0,-24" fill="none" stroke="#d8dde2" stroke-width="5" opacity=".6" stroke-linecap="round"/>`);
  inner += P(`M${-w * 0.1},0 L${-w * 0.1},${-h * 0.5} Q0,${-h * 0.66} ${w * 0.1},${-h * 0.5} L${w * 0.1},0Z`, door);
  const wc = lit ? '#ffd765' : '#3d5a7a';
  for (let i = 0; i < windows; i++) {
    const wx = windows === 1 ? w * 0.28 : (i === 0 ? -w * 0.32 : w * 0.24);
    inner += R(wx, -h * 0.72, w * 0.12, h * 0.22, wc) + `<path d="M${f(wx + w * 0.06)},${f(-h * 0.72)} v${f(h * 0.22)}" class="l"/>`;
  }
  if (lit) inner += `<circle cx="${f(-w * 0.26)}" cy="${f(-h * 0.6)}" r="${f(w * 0.3)}" fill="url(#gLamp)" opacity=".7"/>`;
  return g(x, y, s, inner);
}
export function izba(x, y, s = 1, { w = 70, h = 44, snow = false, lit = false } = {}) {
  let inner = R(-w / 2, -h, w, h, '#b07a45');
  for (let i = 1; i < 6; i++) inner += `<path d="M${-w / 2},${f(-h + i * h / 6)} h${w}" class="l" opacity=".55"/>`;
  for (let i = 0; i < 6; i++) { inner += Ci(-w / 2, -h + i * h / 6 + h / 12, 3, '#c99060') + Ci(w / 2, -h + i * h / 6 + h / 12, 3, '#c99060'); }
  inner += P(`M${-w / 2 - 8},${-h + 2} L0,${-h - w * 0.55} L${w / 2 + 8},${-h + 2}Z`, snow ? '#ffffff' : '#7b5a3a');
  if (!snow) for (let i = 1; i < 5; i++) inner += `<path d="M${f(-w / 2 - 8 + i * (w / 2 + 8) / 5)},${f(-h + 2 - i * w * 0.55 / 5)} L${f(w / 2 + 8 - i * (w / 2 + 8) / 5)},${f(-h + 2 - i * w * 0.55 / 5)}" class="l" opacity=".35"/>`;
  inner += P(`M-8,${-h - 4} L0,${-h - 16} L8,${-h - 4}Z`, '#e8d4a8');
  inner += R(-w * 0.32, -h * 0.72, 14, 14, lit ? '#ffd765' : '#35506e') + `<path d="M${f(-w * 0.32 - 3)},${f(-h * 0.72 - 3)} h20 M${f(-w * 0.32 - 3)},${f(-h * 0.72 + 17)} h20" stroke="#f0e2c0" stroke-width="3"/>`;
  inner += R(w * 0.12, -h * 0.72, 14, 14, lit ? '#ffd765' : '#35506e') + `<path d="M${f(w * 0.12 - 3)},${f(-h * 0.72 - 3)} h20 M${f(w * 0.12 - 3)},${f(-h * 0.72 + 17)} h20" stroke="#f0e2c0" stroke-width="3"/>`;
  inner += R(-6, -h * 0.6, 12, h * 0.6, '#6e4527');
  return g(x, y, s, inner);
}
function crossTop(x, y, k = 1, color = C.gold) {
  return P(`M${x - 1.5 * k},${y} v${-8 * k} h${-4 * k} v${-3 * k} h${4 * k} v${-4 * k} h${3 * k} v${4 * k} h${4 * k} v${3 * k} h${-4 * k} v${8 * k}Z`, color);
}
export function church(x, y, s = 1, { wall = '#efdcb4', band = '#c2643a', dome = '#c2552f', w = 120, h = 70, snow = false } = {}) {
  let inner = '';
  // side wings
  inner += R(-w / 2, -h, w, h, wall);
  for (let i = 1; i < 4; i++) inner += `<path d="M${-w / 2},${f(-h + i * h / 4)} h${w}" stroke="${band}" stroke-width="3" opacity=".55"/>`;
  inner += P(`M${-w / 2 - 4},${-h} L${-w / 4},${-h - 16} L0,${-h} M0,${-h} L${w / 4},${-h - 16} L${w / 2 + 4},${-h}Z`, snow ? '#fff' : dome);
  inner += P(`M${-w / 2 - 4},${-h} L${-w / 4},${-h - 16} L${w / 4},${-h - 16} L${w / 2 + 4},${-h}Z`, snow ? '#fff' : dome);
  // drum + dome
  const dw = w * 0.32, dh = h * 0.45;
  inner += R(-dw / 2, -h - 16 - dh, dw, dh + 2, wall);
  for (let i = 0; i < 3; i++) inner += P(`M${f(-dw / 2 + 6 + i * (dw - 12) / 3)},${f(-h - 20)} v${f(-dh * 0.5)} q${f((dw - 12) / 6 - 2)},-8 ${f((dw - 12) / 3 - 4)},0 v${f(dh * 0.5)}Z`, '#36506e', 'n');
  inner += P(`M${-dw / 2 - 3},${-h - 16 - dh} Q${-dw / 2},${-h - 16 - dh - dw * 0.75} 0,${-h - 16 - dh - dw * 0.78} Q${dw / 2},${-h - 16 - dh - dw * 0.75} ${dw / 2 + 3},${-h - 16 - dh}Z`, snow ? '#fff' : dome);
  inner += crossTop(0, -h - 16 - dh - dw * 0.78, 1.4);
  // door and windows
  inner += P(`M-12,0 L-12,${-h * 0.5} Q0,${-h * 0.72} 12,${-h * 0.5} L12,0Z`, '#6e3e22');
  inner += `<path d="M-16,0 L-16,${f(-h * 0.5)} Q0,${f(-h * 0.78)} 16,${f(-h * 0.5)} L16,0" class="l" stroke="${C.gold}" stroke-width="2"/>`;
  for (const wx of [-w * 0.36, w * 0.28]) inner += P(`M${f(wx)},${f(-h * 0.35)} v${f(-h * 0.25)} q4,-7 8,0 v${f(h * 0.25)}Z`, '#36506e');
  inner += Ci(0, -h * 0.82, 5, '#36506e');
  return g(x, y, s, inner);
}
export function onionChurch(x, y, s = 1, { wall = '#f4efe4', domes = ['#d9a521', '#2c5596', '#2c5596'], w = 110, h = 74, snow = false } = {}) {
  let inner = R(-w / 2, -h, w, h, wall);
  for (let i = 0; i < 3; i++) inner += P(`M${f(-w / 2 + i * w / 3)},${-h} Q${f(-w / 2 + i * w / 3 + w / 6)},${-h - 24} ${f(-w / 2 + (i + 1) * w / 3)},${-h}Z`, wall);
  inner += P(`M-10,0 v${-h * 0.45} q10,-12 20,0 v${h * 0.45}Z`, '#7a3e2a');
  for (const wx of [-w * 0.34, w * 0.26]) inner += P(`M${f(wx)},${f(-h * 0.4)} v-16 q4,-6 8,0 v16Z`, '#36506e');
  const onion = (cx, by, rr, col) => {
    let o = R(cx - rr * 0.55, by - rr * 1.2, rr * 1.1, rr * 1.2, wall);
    o += P(`M${f(cx - rr * 0.6)},${f(by - rr * 1.2)} C${f(cx - rr * 1.25)},${f(by - rr * 1.9)} ${f(cx - rr * 0.2)},${f(by - rr * 2.5)} ${f(cx)},${f(by - rr * 3.1)} C${f(cx + rr * 0.2)},${f(by - rr * 2.5)} ${f(cx + rr * 1.25)},${f(by - rr * 1.9)} ${f(cx + rr * 0.6)},${f(by - rr * 1.2)}Z`, snow ? '#fff' : col);
    if (col === C.blue && !snow) for (let k = 0; k < 4; k++) o += Ci(cx - rr * 0.45 + (k % 2) * rr * 0.6, by - rr * 1.6 - Math.floor(k / 2) * rr * 0.45, rr * 0.08, C.goldLight, 'n');
    o += crossTop(cx, by - rr * 3.1, rr / 12);
    return o;
  };
  inner += onion(0, -h - 14, 20, domes[0]);
  inner += onion(-w * 0.3, -h - 8, 12, domes[1] || domes[0]);
  inner += onion(w * 0.3, -h - 8, 12, domes[2] || domes[0]);
  return g(x, y, s, inner);
}
export function woodenChurch(x, y, s = 1, { snow = false } = {}) {
  let inner = R(-34, -50, 68, 50, '#a7713f');
  for (let i = 1; i < 7; i++) inner += `<path d="M-34,${f(-50 + i * 50 / 7)} h68" class="l" opacity=".5"/>`;
  inner += P('M-42,-48 L0,-84 L42,-48Z', snow ? '#fff' : '#6d4a2c');
  inner += R(-8, -104, 16, 24, '#a7713f');
  inner += P('M-12,-104 C-18,-116 -4,-124 0,-134 C4,-124 18,-116 12,-104Z', snow ? '#fff' : '#8a8f96');
  inner += crossTop(0, -134, 1.1, '#e7c766');
  inner += R(-7, -30, 14, 30, '#5a3820');
  inner += R(-26, -38, 10, 10, '#35506e') + R(16, -38, 10, 10, '#35506e');
  return g(x, y, s, inner);
}
export function tower(x, y, s = 1, { w = 40, h = 120, color = '#cdb98f', roof = '#c2552f', round = true, flag } = {}) {
  let inner = R(-w / 2, -h, w, h, color);
  for (let i = 1; i < 6; i++) inner += `<path d="M${-w / 2},${f(-h + i * h / 6)} h${w}" class="l" opacity=".3"/>`;
  if (round) {
    inner += P(`M${-w / 2 - 5},${-h} L0,${-h - w * 1.1} L${w / 2 + 5},${-h}Z`, roof);
    if (flag) inner += L(0, -h - w * 1.1, 0, -h - w * 1.1 - 26, C.ink, 1.6) + P(`M0,${f(-h - w * 1.1 - 26)} l22,6 l-22,7Z`, flag);
  } else {
    for (let i = 0; i < 4; i++) inner += R(-w / 2 + i * (w / 4) + 1, -h - 9, w / 8, 9, color);
  }
  inner += P(`M-4,${-h * 0.7} v-12 q4,-5 8,0 v12Z`, '#2f3d4f');
  return g(x, y, s, inner);
}
export function wall(x, y, w, h, { color = '#cdb98f', s = 1, gate = true, seed = 2 } = {}) {
  let inner = R(-w / 2, -h, w, h, color);
  const n = Math.floor(w / 18);
  for (let i = 0; i < n; i++) inner += R(-w / 2 + i * 18 + 2, -h - 9, 10, 9, color);
  const r = rng(seed);
  for (let i = 0; i < w / 12; i++) inner += `<path d="M${f(-w / 2 + r() * w)},${f(-h + 6 + r() * (h - 10))} h${f(10 + r() * 10)}" class="l" opacity=".25"/>`;
  if (gate) inner += P(`M-18,0 v${-h * 0.55} q18,-22 36,0 v${h * 0.55}Z`, '#5a3a20') + `<path d="M-18,${f(-h * 0.3)} h36 M-6,0 v${f(-h * 0.68)} M6,0 v${f(-h * 0.68)}" class="l" opacity=".6"/>`;
  return g(x, y, s, inner);
}
export function fortress(x, y, s = 1, { color = '#cdb98f', roof = '#c2552f', w = 260, h = 70, flag = C.red, seed = 4 } = {}) {
  let inner = wall(0, 0, w, h, { color, seed });
  inner += tower(-w / 2, 0, 1, { w: 46, h: h + 50, color, roof, flag });
  inner += tower(w / 2, 0, 1, { w: 46, h: h + 50, color, roof, flag });
  inner += tower(-w / 6, -h + 8, 0.7, { w: 40, h: 50, color, roof, round: false });
  inner += tower(w / 6 + 10, -h + 8, 0.8, { w: 44, h: 60, color, roof });
  return g(x, y, s, inner);
}
export function palace(x, y, s = 1, { wall = '#f1e3c4', roof = '#b8322a', dome = '#d9a521', w = 280, h = 110, banners = '#6b2e6e' } = {}) {
  let inner = R(-w / 2, -h, w, h, wall);
  inner += R(-w / 2 - 6, -h - 8, w + 12, 10, '#e2cfa4');
  const cols = 8;
  for (let i = 0; i <= cols; i++) {
    const cx = -w * 0.4 + i * (w * 0.8) / cols;
    inner += R(cx - 4, -h + 18, 8, h - 26, '#fbf3df') + R(cx - 6, -h + 12, 12, 6, '#e2cfa4') + R(cx - 6, -10, 12, 6, '#e2cfa4');
  }
  inner += R(-w / 2, -8, w, 8, '#e2cfa4');
  inner += P(`M${-w * 0.28},${-h - 8} L0,${-h - 50} L${w * 0.28},${-h - 8}Z`, '#efe0bd');
  inner += P(`M${-w * 0.2},${-h - 12} L0,${-h - 40} L${w * 0.2},${-h - 12}Z`, roof, 'o', ' opacity=".35"');
  inner += P(`M-46,${-h - 46} Q-46,${-h - 120} 0,${-h - 124} Q46,${-h - 120} 46,${-h - 46}Z`, dome);
  inner += `<path d="M-30,${-h - 60} Q0,${-h - 130} 30,${-h - 60}" class="l" opacity=".35"/>`;
  inner += crossTop(0, -h - 124, 1.6);
  for (const bx of [-w * 0.45, w * 0.45]) inner += L(bx, -h - 8, bx, -h - 60, C.ink, 2) + P(`M${f(bx)},${f(-h - 60)} h18 v26 l-9,-6 l-9,6Z`, banners);
  inner += P(`M-26,0 v${-h * 0.55} q26,-26 52,0 v${h * 0.55}Z`, '#6e3e22');
  return g(x, y, s, inner);
}
export function temple(x, y, s = 1, { w = 200, h = 100, color = '#ece0c6' } = {}) {
  let inner = R(-w / 2 - 10, -12, w + 20, 12, '#ddd0b0') + R(-w / 2 - 4, -20, w + 8, 8, '#e6d9bb');
  const n = 6;
  for (let i = 0; i < n; i++) {
    const cx = -w / 2 + 12 + i * (w - 24) / (n - 1);
    inner += R(cx - 7, -h, 14, h - 20, color);
    for (let k = -1; k <= 1; k++) inner += `<path d="M${f(cx + k * 3.5)},${f(-h + 4)} v${f(h - 28)}" class="l" opacity=".25"/>`;
  }
  inner += R(-w / 2 - 6, -h - 14, w + 12, 14, '#e6d9bb');
  inner += P(`M${-w / 2 - 8},${-h - 14} L0,${-h - 50} L${w / 2 + 8},${-h - 14}Z`, color);
  return g(x, y, s, inner);
}
export function columnHall(x, y, w, h, { color = '#ecdcb9', s = 1, n = 6, floor = '#c9b48a' } = {}) {
  let inner = R(-w / 2, -h, w, h, '#e5d3ac', 'n');
  for (let i = 0; i < n; i++) {
    const cx = -w / 2 + w / (n * 2) + i * w / n;
    inner += R(cx - 12, -h, 24, h, color) + R(cx - 16, -h, 32, 12, '#e0cda4') + R(cx - 16, -12, 32, 12, '#e0cda4');
  }
  for (let i = 0; i < n - 1; i++) {
    const cx = -w / 2 + w / n + i * w / n;
    inner += P(`M${f(cx - w / n / 2 + 14)},${-h + 12} Q${f(cx)},${-h + 70} ${f(cx + w / n / 2 - 14)},${-h + 12}`, 'none', 'l');
  }
  return g(x, y, s, inner);
}
export function cityscape(x, y, s = 1, { w = 500, seed = 9, style = 'byzantine', snow = false, wallColor = '#cdb98f', lit = false } = {}) {
  const r = rng(seed);
  let inner = '';
  const n = Math.floor(w / 46);
  for (let i = 0; i < n; i++) {
    const hx = -w / 2 + 20 + i * (w - 40) / n + r() * 10;
    const hy = -30 - r() * 40;
    const hw = 34 + r() * 26;
    if (style === 'slavic') inner += izba(hx, hy + 40, 0.6, { w: hw, h: 30 + r() * 10, snow, lit: lit && r() < 0.6 });
    else inner += house(hx, hy + 40, 0.75, { w: hw, h: 30 + r() * 26, style: r() < 0.5 ? 'flat' : 'tile', wall: pick(r, ['#f3e6c8', '#efd9b8', '#f6eedc', '#e9cfa6']), roof: pick(r, ['#c2552f', '#b0482a', '#cf6a3a']), snow, lit: lit && r() < 0.6 });
  }
  if (style === 'slavic') inner += onionChurch(w * 0.12, -20, 0.8, { snow });
  else inner += church(w * 0.12, -20, 0.7, { snow });
  inner += tower(-w * 0.3, -18, 0.6, { flag: C.red });
  inner += wall(0, 0, w, 44, { color: wallColor, seed });
  return g(x, y, s, inner);
}
export function monastery(x, y, s = 1, { snow = false, slavic = false } = {}) {
  let inner = wall(0, 0, 300, 50, { color: slavic ? '#f2ede2' : '#e8d9b5', seed: 12 });
  inner += slavic ? onionChurch(0, -40, 0.9, { snow }) : church(0, -40, 0.9, { snow });
  inner += tower(-150, 0, 0.9, { color: slavic ? '#f2ede2' : '#e8d9b5', roof: slavic ? '#2f6a4a' : '#c2552f' });
  inner += tower(150, 0, 0.9, { color: slavic ? '#f2ede2' : '#e8d9b5', roof: slavic ? '#2f6a4a' : '#c2552f' });
  return g(x, y, s, inner);
}
export function cave(x, y, s = 1, { rock = '#b49a74', dark = '#3b2a1e' } = {}) {
  return g(x, y, s, `${P('M-120,0 Q-130,-80 -70,-130 Q-10,-170 60,-140 Q130,-110 125,0Z', rock)}${P('M-46,0 Q-50,-70 0,-82 Q50,-70 46,0Z', dark)}${P('M-90,-80 Q-70,-100 -50,-96 M40,-120 Q70,-118 90,-90 M-20,-140 Q10,-150 30,-138', 'none', 'l', ' opacity=".5"')}`);
}
export function tent(x, y, s = 1, color = '#d9c08a') {
  return g(x, y, s, `${P('M-50,0 L0,-60 L50,0Z', color)}${P('M-12,0 L0,-46 L12,0Z', '#5a3a20')}${L(0, -60, 0, -72, C.ink, 2)}`);
}
export function well(x, y, s = 1) {
  return g(x, y, s, `${R(-22, -26, 44, 26, '#bfae8c')}${P('M-22,-26 h44', 'none', 'l')}${L(-18, -26, -18, -66, C.brown, 4)}${L(18, -26, 18, -66, C.brown, 4)}${P('M-28,-62 L0,-80 L28,-62Z', '#b0482a')}${R(-4, -54, 8, 14, '#8a6a42')}`);
}
export function bridge(x, y, s = 1, { w = 200, color = '#c9b48a' } = {}) {
  return g(x, y, s, `${P(`M${-w / 2},0 L${-w / 2},-40 L${w / 2},-40 L${w / 2},0 L${w * 0.3},0 Q0,-60 ${-w * 0.3},0Z`, color)}${R(-w / 2, -48, w, 8, '#bca57a')}`);
}
export function fence(x, y, w, s = 1) {
  let inner = `<path d="M0,-14 h${w} M0,-6 h${w}" stroke="${C.brown}" stroke-width="3"/>`;
  for (let i = 0; i <= w; i += 14) inner += R(i - 2, -20, 4, 20, '#8a5a32', 'n');
  return g(x, y, s, inner);
}
export function ship(x, y, s = 1, { sail = '#f1e2bd', stripe = C.red, hull = '#7a4a28', tilt = 0, oars = true, sailCross = false } = {}) {
  let inner = P('M-120,-30 Q-110,10 -70,14 L80,14 Q118,6 130,-36 L100,-24 L-100,-24Z', hull);
  inner += `<path d="M-104,-12 h200" class="l" opacity=".5"/>`;
  for (let i = 0; i < 8; i++) inner += Ci(-80 + i * 22, -10, 3.6, '#3a2616', 'n');
  if (oars) for (let i = 0; i < 6; i++) inner += L(-70 + i * 26, -8, -84 + i * 26, 30, '#5a3820', 3);
  inner += L(0, -24, 0, -190, C.brownDark, 5) + L(-56, -170, 56, -170, C.brownDark, 4);
  inner += P('M-54,-168 Q-62,-110 -50,-56 L50,-56 Q62,-110 54,-168Z', sail);
  inner += P('M-12,-167 Q-14,-110 -11,-57 L11,-57 Q14,-110 12,-167Z', stripe, 'n');
  if (sailCross) inner += P('M-5,-140 h10 v18 h16 v10 h-16 v28 h-10 v-28 h-16 v-10 h16Z', C.red, 'o');
  inner += P('M0,-190 l26,6 l-26,8Z', stripe);
  inner += P('M120,-36 Q140,-60 128,-70', 'none', 'l');
  return g(x, y, s, inner, { rot: tilt });
}
export function boat(x, y, s = 1, color = '#8a5a32') {
  return g(x, y, s, `${P('M-40,-10 Q-34,6 -20,8 L22,8 Q36,4 42,-12Z', color)}${L(-30, -6, 34, -6, C.ink, 1.2)}`);
}

// ---------- animals ----------
export function sheep(x, y, s = 1, { flip = false, color = '#f7f2e6', face = '#2e2620' } = {}) {
  let inner = `${L(-12, -14, -13, 0, face, 3)}${L(-4, -14, -4, 0, face, 3)}${L(8, -14, 8, 0, face, 3)}${L(15, -14, 16, 0, face, 3)}`;
  inner += Ci(-14, -22, 10, color) + Ci(0, -27, 12, color) + Ci(13, -22, 10, color) + Ci(-4, -16, 10, color) + Ci(9, -15, 9, color) + E(0, -20, 20, 10, color, 'n');
  inner += E(25, -26, 7, 9, face, 'o', ' transform="rotate(-20 25 -26)"') + E(22, -32, 4, 2.5, face, 'n') + Ci(27, -28, 1.2, '#fff', 'n');
  return g(x, y, s, inner, { flip });
}
export function bird(x, y, s = 1, color = C.ink) {
  return g(x, y, s, `<path d="M-14,0 Q-7,-8 0,0 Q7,-8 14,0" fill="none" stroke="${color}" stroke-width="2.2" stroke-linecap="round"/>`);
}
export function flock(seed, x0, y0, w, h, n = 7, color = C.ink) {
  const r = rng(seed);
  let out = '';
  for (let i = 0; i < n; i++) out += bird(x0 + r() * w, y0 + r() * h, 0.5 + r() * 0.7, color);
  return out;
}
export function dove(x, y, s = 1, { flip = false, color = '#ffffff', glow = false } = {}) {
  let inner = glow ? `<circle cx="0" cy="-10" r="60" fill="url(#gGlow)"/>` : '';
  inner += P('M-30,-8 Q-10,-20 14,-14 Q24,-12 30,-18 Q30,-8 22,-4 Q6,6 -20,2 Q-34,6 -40,0 Q-34,-2 -30,-8Z', color);
  inner += P('M-6,-14 Q-20,-46 -2,-56 Q4,-36 10,-16Z', color) + P('M2,-14 Q14,-48 32,-50 Q24,-30 14,-12Z', color);
  inner += Ci(24, -15, 1.4, C.ink, 'n') + P('M29,-17 l6,1 l-6,2Z', '#e19b3a', 'n');
  return g(x, y, s, inner, { flip });
}
export function raven(x, y, s = 1, { flip = false, bread = false, flying = true } = {}) {
  let inner = P('M-30,-6 Q-10,-18 14,-14 Q22,-14 28,-20 Q34,-16 30,-8 Q8,6 -20,2 Q-36,6 -44,-2 Q-36,-2 -30,-6Z', '#26232a');
  if (flying) inner += P('M-6,-12 Q-28,-50 -8,-62 Q0,-40 10,-14Z', '#26232a') + P('M2,-12 Q18,-50 40,-48 Q28,-28 14,-10Z', '#26232a');
  else inner += P('M-14,-10 Q4,-20 16,-8 Q2,-2 -14,-10Z', '#3a3640', 'n') + L(0, 0, -2, 10, '#c98a2c', 2) + L(6, 0, 6, 10, '#c98a2c', 2);
  inner += Ci(26, -15, 1.6, '#fff', 'n') + P('M31,-17 l9,3 l-9,3Z', '#3a3a3a');
  if (bread) inner += E(46, -12, 9, 6, '#d9a25a') + `<path d="M40,-13 q6,-3 12,0" class="l" opacity=".6"/>`;
  return g(x, y, s, inner, { flip });
}
export function deer(x, y, s = 1, { flip = false } = {}) {
  let inner = `${L(-18, -30, -20, 0, '#8a5a32', 3.4)}${L(-10, -30, -9, 0, '#8a5a32', 3.4)}${L(14, -30, 15, 0, '#8a5a32', 3.4)}${L(20, -30, 23, 0, '#8a5a32', 3.4)}`;
  inner += E(0, -36, 26, 12, '#b9773d') + P('M18,-42 Q24,-60 30,-70 L38,-64 Q30,-52 26,-36Z', '#b9773d');
  inner += E(36, -70, 9, 6, '#b9773d') + Ci(38, -72, 1.3, C.ink, 'n');
  inner += `<path d="M30,-76 q-6,-14 -2,-24 M30,-90 q-6,-4 -10,-2 M36,-76 q4,-14 12,-20 M44,-92 q4,-2 8,0" class="l" stroke="#6e4527" stroke-width="2.2"/>`;
  for (let i = 0; i < 5; i++) inner += Ci(-12 + i * 6, -40 + (i % 2) * 4, 1.6, '#f3dfbf', 'n');
  inner += E(-26, -40, 4, 3, '#f3dfbf', 'n');
  return g(x, y, s, inner, { flip });
}
export function rabbit(x, y, s = 1, { flip = false } = {}) {
  return g(x, y, s, `${E(0, -10, 14, 10, '#b49a7c')}${Ci(12, -18, 7, '#b49a7c')}${E(10, -32, 3, 9, '#b49a7c', 'o', ' transform="rotate(-10 10 -32)"')}${E(15, -31, 3, 9, '#b49a7c', 'o', ' transform="rotate(12 15 -31)"')}${Ci(15, -19, 1.2, C.ink, 'n')}${Ci(-14, -12, 4, '#fff')}`, { flip });
}
export function fox(x, y, s = 1, { flip = false } = {}) {
  return g(x, y, s, `${P('M-24,-14 Q-46,-20 -52,-4 Q-40,0 -24,-6Z', '#d26a2a')}${Ci(-50, -6, 3.4, '#fff', 'n')}${E(0, -14, 22, 9, '#d26a2a')}${L(-14, -8, -14, 0, '#3a2616', 2.4)}${L(14, -8, 15, 0, '#3a2616', 2.4)}${P('M18,-18 L36,-14 L22,-6Z', '#d26a2a')}${P('M18,-20 l4,-10 l4,8Z', '#d26a2a')}${Ci(28, -15, 1.2, C.ink, 'n')}`, { flip });
}
export function cow(x, y, s = 1, { flip = false, color = '#c9a07a', spots = '#fff' } = {}) {
  let inner = `${L(-20, -20, -20, 0, '#4a3628', 4)}${L(-12, -20, -12, 0, '#4a3628', 4)}${L(14, -20, 14, 0, '#4a3628', 4)}${L(22, -20, 22, 0, '#4a3628', 4)}`;
  inner += R(-28, -44, 56, 26, color, 'o', ' rx="12"') + E(-6, -34, 8, 6, spots, 'n') + E(12, -38, 6, 4, spots, 'n');
  inner += E(34, -38, 9, 12, color) + E(36, -30, 7, 5, '#e9c7a8') + P('M28,-48 l-6,-6 M40,-48 l6,-6', 'none', 'l');
  inner += Ci(36, -40, 1.3, C.ink, 'n') + P('M-28,-38 q-8,6 -6,18', 'none', 'l');
  return g(x, y, s, inner, { flip });
}
export function goat(x, y, s = 1, { flip = false, color = '#e8dcc4' } = {}) {
  return g(x, y, s, `${L(-10, -14, -10, 0, '#4a3628', 2.6)}${L(-4, -14, -4, 0, '#4a3628', 2.6)}${L(8, -14, 8, 0, '#4a3628', 2.6)}${L(13, -14, 14, 0, '#4a3628', 2.6)}${E(0, -20, 16, 8, color)}${P('M12,-24 L22,-36 L28,-30 L20,-20Z', color)}${P('M22,-36 q-4,-8 -10,-8', 'none', 'l')}${P('M26,-30 l2,10', 'none', 'l')}${Ci(23, -32, 1.1, C.ink, 'n')}`, { flip });
}
export function dog(x, y, s = 1, { flip = false, color = '#c48a4a' } = {}) {
  return g(x, y, s, `${L(-12, -12, -12, 0, '#4a3628', 3)}${L(-6, -12, -6, 0, '#4a3628', 3)}${L(8, -12, 8, 0, '#4a3628', 3)}${L(13, -12, 14, 0, '#4a3628', 3)}${E(0, -18, 18, 8, color)}${Ci(20, -26, 8, color)}${E(28, -24, 6, 4, color)}${P('M16,-32 q-6,6 -2,12', color)}${Ci(22, -28, 1.2, C.ink, 'n')}${P('M-18,-20 q-10,-10 -6,-16', 'none', 'l')}`, { flip });
}
export function donkey(x, y, s = 1, { flip = false, color = '#8f8579' } = {}) {
  return g(x, y, s, `${L(-18, -24, -18, 0, '#3a3028', 4)}${L(-10, -24, -10, 0, '#3a3028', 4)}${L(14, -24, 14, 0, '#3a3028', 4)}${L(20, -24, 21, 0, '#3a3028', 4)}${E(0, -32, 26, 13, color)}${P('M18,-36 L30,-58 L40,-54 L28,-30Z', color)}${E(40, -56, 10, 6, color)}${E(28, -70, 3, 10, color, 'o', ' transform="rotate(-20 28 -70)"')}${E(33, -71, 3, 10, color, 'o', ' transform="rotate(10 33 -71)"')}${Ci(38, -58, 1.3, C.ink, 'n')}${E(46, -54, 4, 3, '#d9cfc1', 'n')}`, { flip });
}
export function camel(x, y, s = 1, { flip = false, color = '#d0a36a' } = {}) {
  return g(x, y, s, `${L(-22, -40, -22, 0, '#8a6a42', 4)}${L(-14, -40, -13, 0, '#8a6a42', 4)}${L(16, -40, 16, 0, '#8a6a42', 4)}${L(24, -40, 25, 0, '#8a6a42', 4)}${P('M-36,-38 Q-40,-58 -22,-60 Q-6,-94 14,-62 Q30,-60 36,-48 Q38,-38 30,-36Z', color)}${P('M32,-50 Q46,-60 46,-80 L56,-82 Q62,-78 58,-72 L54,-72 Q52,-56 38,-42Z', color)}${Ci(54, -78, 1.3, C.ink, 'n')}${P('M-18,-62 Q-4,-70 10,-62 L8,-50 L-16,-50Z', C.red)}<path d="M-16,-52 h24" stroke="${C.gold}" stroke-width="2"/>`, { flip });
}
export function lion(x, y, s = 1, { flip = false, lying = false, color = '#d9a25a', mane = '#a8642a' } = {}) {
  let inner = '';
  if (lying) {
    inner += E(-4, -14, 34, 13, color) + P('M28,-6 h18 M26,-2 h22', 'none', 'l', ' stroke-width="2"');
    inner += P('M-38,-14 Q-56,-18 -58,-4 Q-56,0 -52,-2', 'none', 'l', ' stroke-width="2.6"') + Ci(-53, -2, 4, mane);
  } else {
    inner += `${L(-24, -22, -25, 0, color, 7)}${L(-14, -22, -13, 0, color, 7)}${L(16, -22, 17, 0, color, 7)}${L(26, -22, 28, 0, color, 7)}`;
    inner += E(0, -32, 34, 15, color) + P('M-34,-34 Q-52,-44 -54,-26 Q-56,-18 -50,-16', 'none', 'l', ' stroke-width="2.6"') + Ci(-49, -16, 4.5, mane);
  }
  const hy = lying ? -24 : -42;
  for (let i = 0; i < 14; i++) {
    const a = (i / 14) * Math.PI * 2;
    inner += Ci(30 + Math.cos(a) * 14, hy + Math.sin(a) * 14, 8, mane);
  }
  inner += Ci(30, hy, 14, color) + E(37, hy + 5, 6, 4.5, '#f0d6a8') + Ci(36, hy - 4, 1.6, C.ink, 'n') + Ci(26, hy - 4, 1.6, C.ink, 'n') + P(`M35,${hy + 3} l4,0 l-2,3Z`, '#5a3a2a', 'n');
  return g(x, y, s, inner, { flip });
}
export function bear(x, y, s = 1, { flip = false, sitting = false, color = '#6e4527' } = {}) {
  let inner = '';
  if (sitting) {
    inner += E(0, -34, 26, 32, color) + E(0, -28, 16, 20, '#8a5a32', 'n') + E(-16, -4, 12, 7, color) + E(16, -4, 12, 7, color);
    inner += Ci(0, -76, 18, color) + Ci(-14, -90, 6, color) + Ci(14, -90, 6, color) + E(0, -70, 9, 7, '#b88a5a') + Ci(0, -74, 2.6, C.ink, 'n');
    inner += Ci(-7, -80, 1.8, C.ink, 'n') + Ci(7, -80, 1.8, C.ink, 'n');
    inner += E(-20, -40, 8, 14, color, 'o', ' transform="rotate(30 -20 -40)"') + E(20, -40, 8, 14, color, 'o', ' transform="rotate(-30 20 -40)"');
  } else {
    inner += `${L(-22, -24, -22, 0, color, 12)}${L(-8, -24, -8, 0, color, 12)}${L(14, -24, 14, 0, color, 12)}${L(26, -24, 26, 0, color, 12)}`;
    inner += E(0, -38, 38, 22, color) + Ci(38, -44, 15, color) + Ci(34, -58, 5, color) + E(48, -40, 8, 6, '#b88a5a') + Ci(53, -42, 2.4, C.ink, 'n') + Ci(40, -48, 1.8, C.ink, 'n');
  }
  return g(x, y, s, inner, { flip });
}
export function horse(x, y, s = 1, { flip = false, color = '#f4f1ea', mane = '#c9c2b4', rearing = false, saddle = C.red, rider = null, walk = true } = {}) {
  let inner = '';
  const leg = (x1, y1, x2, y2, x3, y3) => `<path d="M${x1},${y1} Q${x2},${y2} ${x3},${y3}" fill="none" stroke="${C.ink}" stroke-width="9.5" stroke-linecap="round"/><path d="M${x1},${y1} Q${x2},${y2} ${x3},${y3}" fill="none" stroke="${color}" stroke-width="7" stroke-linecap="round"/>${E(x3 + 1, y3 + 1, 5, 3, '#3a2a20', 'n')}`;
  if (rearing) {
    inner += leg(-26, -50, -30, -24, -28, 0) + leg(-16, -50, -14, -24, -12, -1);
    inner += leg(26, -66, 46, -66, 50, -82) + leg(30, -62, 52, -56, 58, -66);
  } else {
    inner += leg(-28, -48, -32, -24, -34, 0) + leg(-18, -48, -16, -24, -18, 0);
    inner += walk ? leg(24, -48, 36, -30, 34, -14) : leg(24, -48, 26, -24, 26, 0);
    inner += leg(32, -48, 34, -24, 36, 0);
  }
  inner += P('M-38,-60 Q-58,-56 -62,-30 Q-56,-36 -52,-26 Q-50,-44 -38,-52Z', mane);
  const by = rearing ? -60 : -58;
  inner += `<g transform="rotate(${rearing ? -18 : 0} 0 ${by})">`;
  inner += E(0, by, 42, 19, color);
  inner += P(`M22,${by - 10} Q28,${by - 38} 42,${by - 52} L58,${by - 46} Q48,${by - 28} 40,${by + 6}Z`, color);
  inner += P(`M40,${by - 50} C44,${by - 64} 58,${by - 64} 64,${by - 54} L80,${by - 34} C84,${by - 28} 80,${by - 22} 74,${by - 22} L68,${by - 24} C62,${by - 26} 56,${by - 32} 50,${by - 36} C44,${by - 38} 40,${by - 42} 40,${by - 50}Z`, color);
  inner += P(`M46,${by - 58} l-1,-13 l9,9Z`, color);
  inner += P(`M42,${by - 54} Q26,${by - 42} 20,${by - 10} Q32,${by - 26} 36,${by - 34} Q34,${by - 20} 28,${by - 6} Q42,${by - 28} 44,${by - 42}Z`, mane);
  inner += Ci(56, by - 50, 2, C.ink, 'n') + E(76, by - 28, 1.6, 1.2, C.ink, 'n');
  inner += `<path d="M74,${by - 28} L56,${by - 42} M58,${by - 40} L30,${by - 22}" class="l" stroke="#6e3e22"/>`;
  if (saddle) inner += P(`M-14,${by - 18} Q0,${by - 24} 14,${by - 18} L12,${by + 4} L-12,${by + 4}Z`, saddle) + `<path d="M-12,${by + 2} h24" stroke="${C.gold}" stroke-width="2"/>`;
  if (rider) inner += riderFigure(0, by - 16, rider);
  inner += `</g>`;
  return g(x, y, s, inner, { flip });
}
function riderFigure(x, y, o) {
  // seated saint on horseback (local coords, facing right)
  const robe = o.robe || C.red, cloak = o.cloak || C.red, armor = o.armor !== false;
  let out = '';
  // flying cloak
  out += P(`M${x - 4},${y - 62} Q${x - 46},${y - 66} ${x - 66},${y - 40} Q${x - 48},${y - 44} ${x - 40},${y - 30} Q${x - 22},${y - 40} ${x - 2},${y - 36}Z`, cloak);
  // leg
  out += `<path d="M${x - 2},${y - 6} Q${x + 14},${y - 2} ${x + 14},${y + 22}" fill="none" stroke="${C.ink}" stroke-width="11" stroke-linecap="round"/><path d="M${x - 2},${y - 6} Q${x + 14},${y - 2} ${x + 14},${y + 22}" fill="none" stroke="${armor ? '#8a5a32' : robe}" stroke-width="8.5" stroke-linecap="round"/>`;
  out += E(x + 17, y + 24, 6, 3.4, '#4a2d18');
  // torso
  out += P(`M${x - 12},${y} Q${x - 14},${y - 30} ${x - 10},${y - 54} Q${x},${y - 60} ${x + 12},${y - 54} Q${x + 14},${y - 28} ${x + 12},${y}Z`, armor ? '#c7c9cc' : robe);
  if (armor) {
    for (let i = 0; i < 4; i++) out += `<path d="M${x - 10},${y - 44 + i * 10} q11,6 22,0" class="l" opacity=".5"/>`;
    out += P(`M${x - 12},${y} L${x - 14},${y + 8} L${x + 14},${y + 8} L${x + 12},${y}Z`, robe);
  }
  // halo (saints only; pass halo: false for other riders) + head
  if (o.halo !== false) out += halo(x + 2, y - 72, 17);
  out += Ci(x + 2, y - 70, 11, o.skin || C.skin);
  out += hair(x + 2, y - 70, 11, o.hair || 'curly', o.hairColor || '#4a2d18', o.beard || 'none', o.hairColor || '#4a2d18');
  out += face(x + 2, y - 70, 11, 1);
  // arm with spear
  if (o.spear) {
    out += `<line x1="${x - 40}" y1="${y - 70}" x2="${x + 96}" y2="${y + 58}" stroke="${C.ink}" stroke-width="5.4" stroke-linecap="round"/><line x1="${x - 40}" y1="${y - 70}" x2="${x + 96}" y2="${y + 58}" stroke="#8a5a32" stroke-width="3.4" stroke-linecap="round"/>`;
    out += P(`M${x + 92},${y + 52} L${x + 112},${y + 74} L${x + 98},${y + 48}Z`, '#d8dde2');
    out += P(`M${x - 40},${y - 70} l-4,-12 l10,8Z`, C.red);
  }
  out += `<path d="M${x + 8},${y - 48} Q${x + 24},${y - 30} ${x + 30},${y - 18}" fill="none" stroke="${C.ink}" stroke-width="10" stroke-linecap="round"/><path d="M${x + 8},${y - 48} Q${x + 24},${y - 30} ${x + 30},${y - 18}" fill="none" stroke="${robe}" stroke-width="7.5" stroke-linecap="round"/>`;
  out += Ci(x + 31, y - 17, 4, o.skin || C.skin);
  if (o.shield) out += Ci(x - 12, y - 26, 15, o.shield) + P(`M${x - 12},${y - 38} v24 M${x - 22},${y - 26} h20`, 'none', 'l', ` stroke="${C.gold}" stroke-width="3"`);
  return out;
}
export function dragon(x, y, s = 1, { flip = false, color = '#4f8a3c', belly = '#c9c26a' } = {}) {
  let inner = '';
  inner += P('M-140,-10 C-120,-50 -80,-30 -60,-40 C-30,-56 -20,-10 10,-20 C30,-26 34,-60 50,-70 C60,-76 70,-74 74,-68 C68,-60 62,-56 58,-46 C54,-30 40,-6 10,0 C-20,6 -40,-14 -64,-14 C-90,-14 -110,6 -140,-10Z', color);
  inner += P('M-130,-14 C-110,-34 -80,-22 -62,-30 C-36,-42 -24,-4 6,-12', 'none', 'l', ` stroke="${belly}" stroke-width="5"`);
  for (let i = 0; i < 9; i++) inner += P(`M${-120 + i * 18},${-26 - (i > 3 ? 10 : 0) - (i > 5 ? 6 : 0)} l6,-12 l6,10Z`, '#2f5e2a');
  inner += P('M-40,-44 C-60,-110 -10,-120 10,-96 C-4,-96 -10,-86 -6,-76 C-18,-82 -24,-70 -20,-58Z', '#6aa45a');
  inner += `<path d="M-40,-44 L-6,-76 M-30,-50 L-8,-92" class="l" opacity=".6"/>`;
  inner += P('M58,-70 C72,-90 98,-86 104,-74 L84,-70 L104,-62 C96,-52 76,-50 62,-54Z', color);
  inner += P('M84,-70 L104,-74 L104,-62Z', '#b8322a');
  inner += Ci(76, -76, 3, '#ffd23f') + Ci(76, -76, 1.3, C.ink, 'n');
  inner += P('M66,-84 l-4,-14 l10,10Z', '#2f5e2a') + P('M76,-86 l2,-14 l6,12Z', '#2f5e2a');
  return g(x, y, s, inner, { flip });
}
export function snake(x, y, s = 1, { flip = false, color = '#6f7a3a' } = {}) {
  return g(x, y, s, `<path d="M-40,0 C-30,-14 -14,10 0,-4 C12,-16 22,4 34,-8 C40,-14 44,-16 50,-14" fill="none" stroke="${C.ink}" stroke-width="9" stroke-linecap="round"/><path d="M-40,0 C-30,-14 -14,10 0,-4 C12,-16 22,4 34,-8 C40,-14 44,-16 50,-14" fill="none" stroke="${color}" stroke-width="6.5" stroke-linecap="round"/>${E(52, -14, 7, 5, color)}${Ci(54, -16, 1.2, C.ink, 'n')}<path d="M58,-13 l6,-1 m-6,1 l6,2" stroke="#c0392b" stroke-width="1.2"/>`, { flip });
}
export function fish(x, y, s = 1, { flip = false, color = '#c9a24a' } = {}) {
  return g(x, y, s, `${P('M-16,0 Q0,-12 16,0 Q0,12 -16,0Z', color)}${P('M-16,0 l-10,-8 l0,16Z', color)}${Ci(9, -2, 1.4, C.ink, 'n')}`, { flip });
}
export function scorpion(x, y, s = 1) {
  return g(x, y, s, `${E(0, -4, 10, 5, '#3a2a20')}<path d="M-10,-4 Q-24,-6 -26,-18 Q-24,-28 -16,-26" fill="none" stroke="#3a2a20" stroke-width="3.5" stroke-linecap="round"/><path d="M8,-6 l10,-6 M8,-2 l10,4" stroke="#3a2a20" stroke-width="2.5"/>`);
}

// ---------- people ----------
export function halo(x, y, r = 18) {
  return `<circle cx="${f(x)}" cy="${f(y)}" r="${f(r)}" fill="url(#gHalo)" class="o"/><circle cx="${f(x)}" cy="${f(y)}" r="${f(r - 3)}" fill="none" stroke="${C.goldDark}" stroke-width="1" opacity=".6"/>`;
}
export function face(cx, cy, r, turn = 0, { eyes = 'open', mouth = 'calm', blush = true } = {}) {
  const k = r / 12, dx = turn * 2.4 * k;
  let out = '';
  if (eyes === 'closed') out += `<path d="M${f(cx - 6 * k + dx)},${f(cy - 1 * k)} q${f(2.5 * k)},${f(2 * k)} ${f(5 * k)},0 M${f(cx + 1.5 * k + dx)},${f(cy - 1 * k)} q${f(2.5 * k)},${f(2 * k)} ${f(5 * k)},0" fill="none" stroke="${C.ink}" stroke-width="${f(1.2 * k)}" stroke-linecap="round"/>`;
  else out += Ci(cx - 4.2 * k + dx, cy - 1 * k, 1.5 * k, C.ink, 'n') + Ci(cx + 4.2 * k + dx, cy - 1 * k, 1.5 * k, C.ink, 'n');
  out += `<path d="M${f(cx - 6.5 * k + dx)},${f(cy - 4.6 * k)} q${f(2.3 * k)},${f(-1.6 * k)} ${f(4.4 * k)},${f(-0.3 * k)} M${f(cx + 2.1 * k + dx)},${f(cy - 4.9 * k)} q${f(2.3 * k)},${f(-1.3 * k)} ${f(4.4 * k)},${f(0.3 * k)}" fill="none" stroke="${C.ink}" stroke-width="${f(0.9 * k)}" stroke-linecap="round" opacity=".8"/>`;
  out += `<path d="M${f(cx + dx * 1.2)},${f(cy - 1 * k)} q${f(-1 * k)},${f(3.4 * k)} ${f(-0.3 * k)},${f(4 * k)} q${f(1 * k)},${f(0.4 * k)} ${f(1.4 * k)},0" fill="none" stroke="${C.ink}" stroke-width="${f(0.8 * k)}" stroke-linecap="round" opacity=".55"/>`;
  if (mouth === 'smile') out += `<path d="M${f(cx - 2.6 * k + dx)},${f(cy + 5.6 * k)} q${f(2.6 * k)},${f(2.2 * k)} ${f(5.2 * k)},0" fill="none" stroke="#9a3b2a" stroke-width="${f(1 * k)}" stroke-linecap="round"/>`;
  else if (mouth === 'open') out += E(cx + dx, cy + 6.2 * k, 1.8 * k, 1.4 * k, '#7a2a20', 'n');
  else out += `<path d="M${f(cx - 1.8 * k + dx)},${f(cy + 6 * k)} h${f(3.6 * k)}" stroke="#9a3b2a" stroke-width="${f(1 * k)}" stroke-linecap="round"/>`;
  if (blush) out += Ci(cx - 6.4 * k + dx, cy + 3 * k, 2.2 * k, '#e7837a', 'n', ' opacity=".35"') + Ci(cx + 6.4 * k + dx, cy + 3 * k, 2.2 * k, '#e7837a', 'n', ' opacity=".35"');
  return out;
}
export function hair(cx, cy, r, style, color, beard = 'none', beardColor = color) {
  const k = r / 12;
  const T = (d) => d.replace(/(-?\d+\.?\d*),(-?\d+\.?\d*)/g, (_, a, b) => `${f(cx + parseFloat(a) * k)},${f(cy + parseFloat(b) * k)}`);
  let out = '';
  if (beard === 'short') out += P(T('M-11.5,1 Q-12,12 -6,15 Q0,18 6,15 Q12,12 11.5,1 Q9,5 5,4.5 Q0,7 -5,4.5 Q-9,5 -11.5,1Z'), beardColor);
  else if (beard === 'long') out += P(T('M-12,0 Q-13,16 -7,24 Q-2,32 0,34 Q2,32 7,24 Q13,16 12,0 Q9,5 5,4.5 Q0,7 -5,4.5 Q-9,5 -12,0Z'), beardColor);
  else if (beard === 'wide') out += P(T('M-12.5,-1 Q-16,14 -8,22 Q0,27 8,22 Q16,14 12.5,-1 Q9,5 5,4.5 Q0,7 -5,4.5 Q-9,5 -12.5,-1Z'), beardColor);
  else if (beard === 'young') out += P(T('M-11.5,2 Q-10,11 0,13 Q10,11 11.5,2 Q9,6 5,6 Q0,8 -5,6 Q-9,6 -11.5,2Z'), beardColor, 'o', ' opacity=".9"');
  if (beard !== 'none') out += `<path d="${T('M-4.5,6.2 Q0,4.8 4.5,6.2')}" fill="none" stroke="${C.ink}" stroke-width="${f(0.9 * k)}" opacity=".6"/>`;
  if (style === 'short') out += P(T('M-12.4,-1 Q-14,-15 0,-15 Q14,-15 12.4,-1 Q11,-8 6,-9 Q0,-11 -6,-9 Q-11,-8 -12.4,-1Z'), color);
  else if (style === 'curly') {
    out += P(T('M-12.6,0 Q-15,-16 0,-15.5 Q15,-16 12.6,0 Q11,-7 6,-9 Q0,-11 -6,-9 Q-11,-7 -12.6,0Z'), color);
    for (let i = 0; i < 7; i++) out += Ci(cx + (-11 + i * 3.7) * k, cy + (-12 - Math.sin(i / 6 * Math.PI) * 3.5) * k, 3.2 * k, color, 'n');
  } else if (style === 'bald') {
    out += P(T('M-12.6,0 Q-13.5,-8 -10.5,-9.5 Q-8,-5 -8.6,1Z'), color) + P(T('M12.6,0 Q13.5,-8 10.5,-9.5 Q8,-5 8.6,1Z'), color) + P(T('M-2.6,-11.6 Q0,-14.5 2.6,-11.6 Q0,-12.4 -2.6,-11.6Z'), color);
  } else if (style === 'long') {
    out += P(T('M-12.6,0 Q-16,-16 0,-16 Q16,-16 12.6,0 Q15,10 13,22 L9,18 Q11,6 10,-4 Q6,-10 0,-10 Q-6,-10 -10,-4 Q-11,6 -9,18 L-13,22 Q-15,10 -12.6,0Z'), color);
  } else if (style === 'wild') {
    out += P(T('M-12.6,0 Q-18,-14 -8,-18 Q0,-22 8,-18 Q18,-14 12.6,0 Q17,10 15,24 L10,16 Q11,6 10,-4 Q6,-10 0,-10 Q-6,-10 -10,-4 Q-11,6 -10,16 L-15,24 Q-17,10 -12.6,0Z'), color);
  } else if (style === 'bob') {
    out += P(T('M-12.6,2 Q-15,-16 0,-15.5 Q15,-16 12.6,2 L13,9 L9,8 Q10,-2 7,-8 Q0,-11 -7,-8 Q-10,-2 -9,8 L-13,9Z'), color);
  }
  return out;
}
function headwear(cx, cy, r, kind, color) {
  const k = r / 12;
  const T = (d) => d.replace(/(-?\d+\.?\d*),(-?\d+\.?\d*)/g, (_, a, b) => `${f(cx + parseFloat(a) * k)},${f(cy + parseFloat(b) * k)}`);
  if (kind === 'crown') return P(T('M-10,-10 L-11,-20 L-6,-15 L-3,-23 L0,-16 L3,-23 L6,-15 L11,-20 L10,-10Z'), C.gold) + Ci(cx, cy - 14 * k, 1.8 * k, C.red, 'n') + Ci(cx - 6 * k, cy - 13 * k, 1.4 * k, C.blue, 'n') + Ci(cx + 6 * k, cy - 13 * k, 1.4 * k, C.blue, 'n') + `<path d="${T('M-10,-10 Q0,-12 10,-10')}" fill="none" stroke="${C.goldDark}" stroke-width="${f(1.4 * k)}"/>`;
  if (kind === 'imperial') return P(T('M-11.5,-7 Q-12,-19 0,-20 Q12,-19 11.5,-7Z'), C.gold) + P(T('M-11.5,-7 L-12.5,6 L-10.5,6 L-10,-6Z M11.5,-7 L12.5,6 L10.5,6 L10,-6Z'), C.gold) + Ci(cx, cy - 15 * k, 2.2 * k, C.red, 'n') + Ci(cx - 6 * k, cy - 12 * k, 1.5 * k, '#ffffff', 'n') + Ci(cx + 6 * k, cy - 12 * k, 1.5 * k, '#ffffff', 'n') + crossTop(cx, cy - 20 * k, k * 0.6);
  if (kind === 'helmet') return P(T('M-12.5,-1 Q-14,-17 0,-17 Q14,-17 12.5,-1 L9,-2 Q8,-9 0,-10 Q-8,-9 -9,-2Z'), color || '#b9bec4') + P(T('M-3,-17 Q0,-26 6,-27 Q4,-20 3,-17Z'), C.red);
  if (kind === 'cowlBack' || kind === 'schemaBack') return P(T('M-16,10 Q-19,-20 0,-20 Q19,-20 16,10 Q16,22 20,32 L-20,32 Q-16,22 -16,10Z'), color || (kind === 'schemaBack' ? '#2a2423' : '#3a2e2a'));
  if (kind === 'cowl' || kind === 'schema') return P(T('M-13.5,0 Q-14,-17.5 0,-18 Q14,-17.5 13.5,0 Q11,-10 0,-10.5 Q-11,-10 -13.5,0Z'), color || (kind === 'schema' ? '#2a2423' : '#3a2e2a')) + (kind === 'schema' ? `<path d="${T('M-2,-14.5 h4 M0,-16.5 v5')}" stroke="${C.goldLight}" stroke-width="${f(1.2 * k)}"/>` : '');
  if (kind === 'turban') return P(T('M-12.5,-2 Q-15,-18 0,-19 Q15,-18 12.5,-2 Q6,-6 0,-6 Q-6,-6 -12.5,-2Z'), color || '#e9e2cf') + `<path d="${T('M-11,-8 Q0,-16 11,-8 M-12,-4 Q0,-12 12,-4')}" fill="none" stroke="${C.ink}" stroke-width="${f(0.8 * k)}" opacity=".4"/>`;
  if (kind === 'cap') return P(T('M-12,-4 Q-12,-17 0,-18 Q12,-17 12,-4Z'), color || '#7a3e2a');
  if (kind === 'kerchief') return P(T('M-13,2 Q-16,-18 0,-17 Q16,-18 13,2 Q10,-6 0,-7 Q-10,-6 -13,2Z'), color || '#c94a3a');
  return '';
}
function veil(cx, cy, r, color, trim = C.gold) {
  const k = r / 12;
  const T = (d) => d.replace(/(-?\d+\.?\d*),(-?\d+\.?\d*)/g, (_, a, b) => `${f(cx + parseFloat(a) * k)},${f(cy + parseFloat(b) * k)}`);
  return P(T('M-15,14 Q-20,-6 -14,-14 Q-6,-21 0,-21 Q6,-21 14,-14 Q20,-6 15,14 L22,26 L-22,26Z'), color) + `<path d="${T('M-11.5,10 Q-14,-12 0,-14.5 Q14,-12 11.5,10')}" fill="none" stroke="${trim}" stroke-width="${f(2 * k)}"/>` + Ci(cx, cy - 17.5 * k, 1.6 * k, C.goldLight, 'n');
}

// person(x, y, s, opts) – a standing (or kneeling) figure, feet at (x, y). Height ≈ 130·s.
export function person(x, y, s = 1, o = {}) {
  const {
    robe = C.blue, mantle = C.red, skin = C.skin, hairStyle = 'short', hairColor = '#4a2d18', beard = 'none', beardColor,
    head, headColor, halo: hasHalo = false, pose = 'stand', hold = null, holdColor, turn = 0, flip = false,
    child = false, kneel = false, vest = null, wings = false, eyes = 'open', mouth = 'calm', armor = false, cloak,
    veil: veilColor = null, sash = null, bodyScale = 1, apron = null,
  } = o;
  const hb = (child ? 0.66 : 1) * (kneel ? 0.72 : 1) * bodyScale;
  const top = -94 * hb, hy = top - 13, hr = 12;
  let out = '';
  // wings behind
  if (wings) {
    out += P(`M-6,${top + 6} C-36,${top - 40} -78,${top - 30} -82,${top + 40} C-70,${top + 28} -56,${top + 26} -44,${top + 34} C-40,${top + 20} -26,${top + 14} -10,${top + 20}Z`, '#f6eedb');
    out += P(`M6,${top + 6} C36,${top - 40} 78,${top - 30} 82,${top + 40} C70,${top + 28} 56,${top + 26} 44,${top + 34} C40,${top + 20} 26,${top + 14} 10,${top + 20}Z`, '#f6eedb');
    for (let i = 0; i < 4; i++) out += `<path d="M${-14 - i * 14},${top + 18 - i * 6} Q${-30 - i * 12},${top - 10 - i * 4} ${-50 - i * 8},${top - 14 + i * 4}" class="l" stroke="${C.goldDark}" opacity=".7"/><path d="M${14 + i * 14},${top + 18 - i * 6} Q${30 + i * 12},${top - 10 - i * 4} ${50 + i * 8},${top - 14 + i * 4}" class="l" stroke="${C.goldDark}" opacity=".7"/>`;
  }
  // cloak behind (warriors)
  if (cloak) out += P(`M-18,${top + 2} Q-34,${top * 0.4} -30,-4 L30,-4 Q34,${top * 0.4} 18,${top + 2}Z`, cloak);
  if (hasHalo) out += halo(0, hy - 1, hr * (head === 'cowl' || head === 'schema' ? 2.05 : 1.55));
  if (veilColor) out += veil(0, hy, hr, veilColor);
  // body
  if (armor) {
    const legTop = top * 0.36;
    out += `<path d="M-7,${f(legTop)} L-8,-3 M7,${f(legTop)} L8,-3" stroke="${C.ink}" stroke-width="9.5" stroke-linecap="round"/><path d="M-7,${f(legTop)} L-8,-3 M7,${f(legTop)} L8,-3" stroke="#8a5a32" stroke-width="7" stroke-linecap="round"/>`;
    out += P(`M-17,${top} Q-21,${top * 0.6} -20,${f(legTop)} L20,${f(legTop)} Q21,${top * 0.6} 17,${top} Q0,${top - 6} -17,${top}Z`, robe);
    out += P(`M-15,${top + 2} Q-17,${top * 0.7} -15,${f(top * 0.42)} L15,${f(top * 0.42)} Q17,${top * 0.7} 15,${top + 2} Q0,${top - 3} -15,${top + 2}Z`, '#cfd3d6');
    for (let i = 0; i < 4; i++) out += `<path d="M-13,${f(top + 12 + i * 9 * hb)} q13,6 26,0" class="l" opacity=".45"/>`;
    for (let i = 0; i < 5; i++) out += R(-17 + i * 7, top * 0.42, 6, 10 * hb, '#a8743a', 'o');
    out += E(-9, -2, 6, 3, '#4a2d18') + E(9, -2, 6, 3, '#4a2d18');
  } else {
    const hem = kneel ? 26 : 23;
    out += P(`M-16,${top} Q-21,${top * 0.62} -${hem},0 L${hem},0 Q21,${top * 0.62} 16,${top} Q0,${top - 6} -16,${top}Z`, robe);
    out += `<path d="M5,${top + 2} Q6,${top * 0.5} 7,-1" stroke="${sash || C.gold}" stroke-width="3" fill="none" opacity=".85"/>`;
    out += `<path d="M-${hem - 1},-5 L${hem - 1},-5" stroke="${C.gold}" stroke-width="2.4" opacity=".85"/>`;
    if (apron) out += P(`M-12,${top * 0.5} L12,${top * 0.5} L14,-6 L-14,-6Z`, apron);
    if (!kneel) out += E(-7, 0, 5.5, 2.6, '#4a2d18') + E(7, 0, 5.5, 2.6, '#4a2d18');
    else out += E(-20, -3, 9, 4, robe) ;
    if (mantle) out += P(`M-17,${top - 1} Q-25,${top * 0.55} -22,${f(-8 * hb)} Q-8,${f(-2 * hb)} 4,${f(-18 * hb)} Q12,${top * 0.5} 18,${top + 2} Q0,${top - 7} -17,${top - 1}Z`, mantle);
  }
  // vestments
  if (vest === 'bishop') {
    out += P(`M-17,${top} Q-24,${top * 0.5} -22,${f(-14 * hb)} Q0,${f(-6 * hb)} 22,${f(-14 * hb)} Q24,${top * 0.5} 17,${top} Q0,${top - 6} -17,${top}Z`, mantle || C.red);
    for (let i = 0; i < 6; i++) out += smallCross(-14 + (i % 3) * 14, top + 22 + Math.floor(i / 3) * 26 * hb, 3.2, mantle === '#f6f1e4' ? C.ink : '#f4e3b5');
    out += P(`M-16,${top + 1} L0,${top + 22} L16,${top + 1} L11,${top - 1} L0,${top + 13} L-11,${top - 1}Z M-6,${top + 18} L6,${top + 18} L5,${f(-8 * hb)} L-5,${f(-8 * hb)}Z`, '#fbf6ea');
    out += smallCross(0, top + 34, 4, C.ink) + smallCross(0, top + 58 * hb, 4, C.ink);
  } else if (vest === 'deacon') {
    out += P(`M8,${top + 1} L13,${top + 1} L13,-6 L8,-6Z`, C.gold);
  } else if (vest === 'loros') {
    out += P(`M-15,${top + 2} L15,${top + 2} L16,${top + 10} L-16,${top + 10}Z`, C.gold) + P(`M-5,${top + 10} L5,${top + 10} L6,-6 L-6,-6Z`, C.gold);
    for (let i = 0; i < 5; i++) out += Ci(0, top + 18 + i * 15 * hb, 2, i % 2 ? C.red : '#2c8a5a', 'n');
  } else if (vest === 'monk') {
    out += P(`M-17,${top} Q-26,${top * 0.5} -24,0 L24,0 Q26,${top * 0.5} 17,${top} Q8,${top * 0.4} 0,${top * 0.4} Q-8,${top * 0.4} -17,${top}Z`, mantle || '#3a2e2a');
  } else if (vest === 'sheepskin') {
    out += P(`M-17,${top} Q-26,${top * 0.5} -22,${f(-24 * hb)} Q-8,${f(-14 * hb)} 2,${f(-26 * hb)} L4,${top + 2}Z`, '#b9946a');
    for (let i = 0; i < 8; i++) out += `<path d="M${-18 + (i % 3) * 7},${f(top + 10 + i * 8 * hb)} q3,-3 6,0" class="l" opacity=".55"/>`;
  }
  // arms + held objects
  const sh = top + 6;
  const arm = (x1, y1, cx, cy, x2, y2, col) => `<path d="M${x1},${f(y1)} Q${f(cx)},${f(cy)} ${f(x2)},${f(y2)}" fill="none" stroke="${C.ink}" stroke-width="10.5" stroke-linecap="round"/><path d="M${x1},${f(y1)} Q${f(cx)},${f(cy)} ${f(x2)},${f(y2)}" fill="none" stroke="${col}" stroke-width="8" stroke-linecap="round"/>${Ci(x2, y2, 4, skin)}`;
  const sl = armor ? robe : vest === 'bishop' ? '#fbf6ea' : (mantle && pose !== 'orans' ? mantle : robe);
  const sr = armor ? robe : vest === 'bishop' ? '#fbf6ea' : robe;
  let objects = '';
  const held = (hx, hy2) => hold ? holdObject(hold, hx, hy2, holdColor, hb) : '';
  switch (pose) {
    case 'orans':
      out += arm(-14, sh, -30, sh + 6, -32, sh - 26, sl) + arm(14, sh, 30, sh + 6, 32, sh - 26, sr);
      break;
    case 'bless':
      out += arm(-14, sh, -22, sh + 34 * hb, -10, sh + 20 * hb, sl);
      objects += `<path d="M-12,${f(sh + 16 * hb)} l0,-6 m3,6 l0,-7" stroke="${skin}" stroke-width="2.4" stroke-linecap="round"/>`;
      out += arm(14, sh, 22, sh + 40 * hb, 8, sh + 34 * hb, sr);
      objects += held(9, sh + 30 * hb);
      break;
    case 'hold':
      out += arm(-14, sh, -22, sh + 40 * hb, -6, sh + 34 * hb, sl) + arm(14, sh, 22, sh + 40 * hb, 6, sh + 34 * hb, sr);
      objects += held(0, sh + 28 * hb);
      break;
    case 'point':
      out += arm(-14, sh, -22, sh + 40 * hb, -10, sh + 36 * hb, sl) + arm(14, sh, 34, sh + 4, 46, sh - 6, sr);
      objects += held(-10, sh + 32 * hb);
      break;
    case 'give':
      out += arm(-14, sh, -22, sh + 40 * hb, -10, sh + 38 * hb, sl) + arm(14, sh, 30, sh + 30 * hb, 44, sh + 16 * hb, sr);
      objects += held(48, sh + 10 * hb);
      break;
    case 'raise':
      out += arm(-14, sh, -22, sh + 40 * hb, -10, sh + 38 * hb, sl) + arm(14, sh, 24, sh - 10, 24, sh - 40, sr);
      objects += held(24, sh - 44);
      break;
    case 'spear':
      out += arm(-14, sh, -22, sh + 40 * hb, -8, sh + 34 * hb, sl) + arm(14, sh, 26, sh + 24, 22, sh + 12, sr);
      objects += held(22, sh + 8);
      break;
    case 'pray':
      out += arm(-14, sh, -14, sh + 30 * hb, -3, sh + 16 * hb, sl) + arm(14, sh, 14, sh + 30 * hb, 3, sh + 16 * hb, sr);
      break;
    case 'reach':
      out += arm(-14, sh, -30, sh + 10, -44, sh + 6, sl) + arm(14, sh, 30, sh + 10, 44, sh + 6, sr);
      objects += held(46, sh + 2);
      break;
    case 'carry':
      out += arm(-14, sh, -26, sh + 6, -14, sh - 10, sl) + arm(14, sh, 26, sh + 6, 14, sh - 10, sr);
      objects += held(0, sh - 18);
      break;
    default:
      out += arm(-14, sh, -21, sh + 36 * hb, -19, sh + 56 * hb, sl) + arm(14, sh, 21, sh + 36 * hb, 19, sh + 56 * hb, sr);
      objects += held(20, sh + 52 * hb);
  }
  // neck, head
  if (head === 'cowl' || head === 'schema') out += headwear(0, hy, hr, head + 'Back', headColor);
  out += R(-4, top - 6, 8, 8, skin);
  out += Ci(0, hy, hr, skin);
  out += hair(0, hy, hr, head === 'cowl' || head === 'schema' ? 'none' : hairStyle, hairColor, beard, beardColor || hairColor);
  if (head) out += headwear(0, hy, hr, head, headColor);
  if (veilColor) out += P(`M-12,${hy - 2} Q-14,${hy - 16} 0,${hy - 15} Q14,${hy - 16} 12,${hy - 2} Q10,${hy - 11} 0,${hy - 11} Q-10,${hy - 11} -12,${hy - 2}Z`, veilColor, 'n');
  out += face(0, hy, hr, turn, { eyes, mouth });
  out += objects;
  if (o.extra) out += o.extra;
  return g(x, y, s, out, { flip });
}
function smallCross(x, y, k, color) {
  return `<path d="M${f(x - k)},${f(y)} h${f(2 * k)} M${f(x)},${f(y - k)} v${f(2 * k)}" stroke="${color}" stroke-width="${f(k * 0.7)}" stroke-linecap="round"/>`;
}
function holdObject(kind, x, y, color, hb = 1) {
  const gr = -y; // distance from the hand down to the ground
  switch (kind) {
    case 'book':
      return `<g transform="translate(${f(x)} ${f(y)}) rotate(-8)">${R(-8, -11, 16, 22, color || C.red)}${R(-6, -9, 12, 18, 'none', 'l', ` stroke="${C.gold}"`)}${smallCross(0, 0, 4, C.goldLight)}${Ci(-4, -6, 1.2, '#7ad0e6', 'n')}${Ci(4, 6, 1.2, '#7ad0e6', 'n')}</g>`;
    case 'scroll':
      return `<g transform="translate(${f(x)} ${f(y)}) rotate(-12)">${R(-5, -14, 10, 28, '#f3e6c4')}${E(0, -14, 6, 2.6, '#e7d5a8')}${E(0, 14, 6, 2.6, '#e7d5a8')}</g>`;
    case 'openscroll':
      return `<g transform="translate(${f(x)} ${f(y)})">${R(-12, -4, 24, 40, '#f3e6c4')}${E(0, -4, 13, 3, '#e7d5a8')}${E(0, 36, 13, 3, '#e7d5a8')}${range(6).map((i) => `<path d="M-8,${4 + i * 5} h${12 + (i % 2) * 4}" stroke="${C.ink}" stroke-width=".8" opacity=".6"/>`).join('')}</g>`;
    case 'cross':
      return `<g transform="translate(${f(x)} ${f(y)})">${P('M-2,12 v-26 h-6 v-4 h6 v-6 h4 v6 h6 v4 h-6 v26Z', color || C.gold)}</g>`;
    case 'bigcross':
      return `<g transform="translate(${f(x)} ${f(y)})">${P('M-3,40 v-56 h-14 v-6 h14 v-12 h6 v12 h14 v6 h-14 v56Z', color || C.gold)}</g>`;
    case 'spear':
      return `<g transform="translate(${f(x)} ${f(y)})">${L(0, gr, 0, -70, C.ink, 4.6)}${L(0, gr, 0, -70, '#8a5a32', 2.6)}${P('M-5,-68 L0,-90 L5,-68Z', '#d8dde2')}</g>`;
    case 'sword':
      return `<g transform="translate(${f(x)} ${f(y)})">${P('M-2,0 L-2,-46 L0,-52 L2,-46 L2,0Z', '#dfe3e6')}${R(-8, -2, 16, 4, C.gold)}${R(-2, 2, 4, 10, '#6e4527')}</g>`;
    case 'staff':
      return `<g transform="translate(${f(x)} ${f(y)})">${L(0, gr, 0, -40, C.ink, 4.6)}${L(0, gr, 0, -40, '#8a5a32', 2.8)}${P('M0,-40 q0,-12 10,-12 q8,0 8,8', 'none', 'l', ' stroke-width="2.4"')}</g>`;
    case 'crozier':
      return `<g transform="translate(${f(x)} ${f(y)})">${L(0, gr, 0, -42, C.ink, 4.6)}${L(0, gr, 0, -42, C.gold, 2.8)}${P('M-12,-42 Q-12,-54 -4,-50 L0,-42 L4,-50 Q12,-54 12,-42', 'none', 'l', ` stroke="${C.goldDark}" stroke-width="2.4"`)}</g>`;
    case 'loaves':
      return `<g transform="translate(${f(x)} ${f(y)})">${E(-6, 2, 8, 5, '#d39a52')}${E(6, 2, 8, 5, '#d39a52')}${E(0, -4, 8, 5, '#e2ae63')}<path d="M-4,-5 q4,-3 8,0" class="l" opacity=".5"/></g>`;
    case 'bread':
      return `<g transform="translate(${f(x)} ${f(y)})">${E(0, 0, 9, 6, '#d9a25a')}<path d="M-5,-1 q5,-4 10,0" class="l" opacity=".6"/></g>`;
    case 'bag':
      return `<g transform="translate(${f(x)} ${f(y)})">${P('M-8,-2 Q-11,10 0,12 Q11,10 8,-2 Q4,-6 6,-10 L-6,-10 Q-4,-6 -8,-2Z', color || '#b48a3a')}${L(-6, -8, 6, -8, C.redDark, 2)}${Ci(0, 4, 2.2, C.goldLight, 'n')}</g>`;
    case 'lamp':
      return `<g transform="translate(${f(x)} ${f(y)})"><circle r="18" fill="url(#gLamp)"/>${E(0, 2, 8, 4, C.gold)}${P('M6,0 q6,-2 8,2', 'none', 'l')}${P('M-2,-1 q1,-8 3,-10 q2,4 1,10Z', '#ffcf3d', 'n')}</g>`;
    case 'candle':
      return `<g transform="translate(${f(x)} ${f(y)})"><circle cy="-14" r="14" fill="url(#gLamp)"/>${R(-2, -10, 4, 20, '#f6eecd')}${P('M0,-11 q-3,-5 0,-9 q3,4 0,9Z', '#ffb52e', 'n')}</g>`;
    case 'icon':
      return `<g transform="translate(${f(x)} ${f(y)})">${R(-11, -14, 22, 28, C.gold)}${R(-8, -11, 16, 22, '#7a2a20', 'n')}${Ci(0, -2, 6, '#e8c08e', 'n')}${Ci(0, -2, 8, 'none', 'n', ` stroke="${C.goldLight}" stroke-width="1.4"`)}</g>`;
    case 'box':
      return `<g transform="translate(${f(x)} ${f(y)})">${R(-9, -7, 18, 14, color || '#8a5a32')}${R(-9, -7, 18, 4, '#a8743a', 'n')}${smallCross(0, 2, 3, C.goldLight)}${L(8, -6, 16, -16, '#c9cdd0', 2)}</g>`;
    case 'orb':
      return `<g transform="translate(${f(x)} ${f(y)})">${Ci(0, 0, 7, C.gold)}${L(-7, 0, 7, 0, C.goldDark, 1.2)}${crossTop(0, -7, 0.5)}</g>`;
    case 'sceptre':
      return `<g transform="translate(${f(x)} ${f(y)})">${L(0, 40, 0, -40, C.ink, 4)}${L(0, 40, 0, -40, C.gold, 2.4)}${Ci(0, -42, 4, C.gold)}${crossTop(0, -46, 0.5)}</g>`;
    case 'labarum':
      return `<g transform="translate(${f(x)} ${f(y)})">${L(0, gr, 0, -80, C.ink, 4.6)}${L(0, gr, 0, -80, C.gold, 2.8)}${L(-18, -70, 18, -70, C.gold, 3)}${R(-18, -70, 36, 34, C.purple)}${chiRho(0, -53, 0.55)}${Ci(0, -90, 9, 'none', 'o', ` stroke="${C.gold}" stroke-width="2"`)}</g>`;
    case 'jar':
      return `<g transform="translate(${f(x)} ${f(y)})">${P('M-6,-10 Q-10,0 -7,10 L7,10 Q10,0 6,-10Z', color || C.gold)}${R(-5, -13, 10, 4, color || C.gold)}</g>`;
    case 'flower':
      return `<g transform="translate(${f(x)} ${f(y)})">${L(0, 10, 0, -12, '#3f7a32', 2)}${Ci(0, -14, 4, color || '#f5f0f0')}${Ci(0, -14, 1.6, C.goldLight, 'n')}</g>`;
    case 'egg':
      return `<g transform="translate(${f(x)} ${f(y)})">${E(0, 0, 5, 6.5, color || C.red)}</g>`;
    case 'sickle':
      return `<g transform="translate(${f(x)} ${f(y)})">${P('M0,0 Q-14,-16 0,-28 Q-6,-16 4,-4Z', '#c9cdd0')}${L(2, -2, 6, 8, '#8a5a32', 3)}</g>`;
    case 'axe':
      return `<g transform="translate(${f(x)} ${f(y)})">${L(0, 16, 0, -24, '#8a5a32', 3.2)}${P('M0,-24 L12,-28 Q14,-18 12,-12 L0,-16Z', '#c9cdd0')}</g>`;
    case 'pen':
      return `<g transform="translate(${f(x)} ${f(y)})">${P('M0,0 L14,-22 L16,-20 L2,2Z', '#f6f1e4')}${L(0, 0, -2, 4, C.ink, 1.4)}</g>`;
    case 'net':
      return `<g transform="translate(${f(x)} ${f(y)})">${P('M-10,-6 Q0,14 10,-6', 'none', 'l')}</g>`;
    default:
      return '';
  }
}
export function chiRho(x, y, s = 1) {
  return g(x, y, s, `<path d="M-18,-18 L18,18 M18,-18 L-18,18" stroke="${C.goldLight}" stroke-width="5" stroke-linecap="round"/><path d="M0,-30 L0,30 M0,-30 Q16,-30 16,-20 Q16,-10 0,-10" stroke="${C.goldLight}" stroke-width="5" fill="none" stroke-linecap="round"/>`);
}
export function angel(x, y, s = 1, o = {}) {
  return person(x, y, s, { robe: '#f1f4f8', mantle: '#9cc3e6', hairStyle: 'bob', hairColor: '#c98a3a', halo: true, wings: true, pose: 'spear', hold: 'staff', mouth: 'smile', ...o });
}
// A crowd of simplified onlookers along a baseline.
export function crowd(seed, x0, y, w, n, { s = 0.7, palette = [C.blue, C.red, '#4f8a3c', '#c9913f', '#7a4a8a', '#5a8aa8', '#a85a3a', '#d9c07a'], kerchief = false, poses = ['stand', 'pray', 'orans', 'point'], skin = [C.skin, C.skinTan, C.skinDark] } = {}) {
  const r = rng(seed);
  let out = '';
  const items = range(n).map((i) => ({ x: x0 + (i + r() * 0.6) * (w / n), dy: r() * 8, i })).sort((a, b) => a.dy - b.dy);
  for (const it of items) {
    const female = r() < 0.5;
    const child = r() < 0.18;
    out += person(it.x, y + it.dy, s * (0.92 + r() * 0.16), {
      robe: pick(r, palette), mantle: r() < 0.6 ? pick(r, palette) : null, skin: pick(r, skin),
      hairStyle: female ? 'bob' : pick(r, ['short', 'curly', 'bald']), hairColor: pick(r, ['#4a2d18', '#2a1d14', '#7a4a28', '#a8a8a8', '#c98a3a']),
      beard: !female && !child && r() < 0.5 ? pick(r, ['short', 'long', 'young']) : 'none', head: female ? (kerchief ? 'kerchief' : null) : (r() < 0.2 ? 'cap' : null),
      headColor: pick(r, ['#c94a3a', '#e8c25a', '#5a8aa8', '#f2ead8']), veil: female && !kerchief ? pick(r, ['#8a5a3a', '#5a6aa8', '#a84a4a', '#e8dcc0']) : null,
      pose: pick(r, poses), child, turn: r() < 0.5 ? -1 : 1, mouth: r() < 0.3 ? 'smile' : 'calm',
    });
  }
  return out;
}

// ---------- holy light & effects ----------
export function heaven(x, y, r = 120, { rays = true, rayTo = null } = {}) {
  let out = '';
  if (rays && rayTo) {
    for (let i = -2; i <= 2; i++) out += `<path d="M${f(x + i * 18)},${f(y + r * 0.6)} L${f(rayTo[0] + i * 22 - 8)},${f(rayTo[1])} L${f(rayTo[0] + i * 22 + 8)},${f(rayTo[1])}Z" fill="#fff1a8" opacity=".35"/>`;
  }
  out += `<path d="M${x - r},${y} A${r},${r * 0.7} 0 0 0 ${x + r},${y}Z" fill="url(#gHeaven)" class="o"/>`;
  out += `<path d="M${x - r * 0.75},${y} A${r * 0.75},${r * 0.5} 0 0 0 ${x + r * 0.75},${y}" fill="none" stroke="#fff" stroke-width="1.6" opacity=".7"/>`;
  for (let i = 0; i < 8; i++) {
    const a = Math.PI * (i + 0.5) / 8;
    out += `<circle cx="${f(x + Math.cos(a) * r * 0.55)}" cy="${f(y + Math.sin(a) * r * 0.38)}" r="2.4" fill="#fff8d0"/>`;
  }
  return out;
}
export function glow(x, y, r = 80, op = 1) {
  return `<circle cx="${f(x)}" cy="${f(y)}" r="${f(r)}" fill="url(#gGlow)" opacity="${op}"/>`;
}
export function rays(x, y, { n = 14, r1 = 30, r2 = 260, color = '#fff1a8', op = 0.4, spread = Math.PI * 2, start = 0 } = {}) {
  let out = '';
  for (let i = 0; i < n; i++) {
    const a = start + (i / n) * spread, w = 0.06;
    out += `<path d="M${f(x + Math.cos(a - w) * r1)},${f(y + Math.sin(a - w) * r1)} L${f(x + Math.cos(a) * r2)},${f(y + Math.sin(a) * r2)} L${f(x + Math.cos(a + w) * r1)},${f(y + Math.sin(a + w) * r1)}Z" fill="${color}" opacity="${op}"/>`;
  }
  return out;
}
export function fire(x, y, s = 1) {
  return g(x, y, s, `${P('M-30,0 C-40,-30 -20,-40 -22,-70 C-6,-56 -4,-80 4,-100 C14,-74 30,-70 24,-44 C34,-50 38,-36 32,-20 C30,-8 22,0 0,0Z', 'url(#gFire)')}${P('M-14,0 C-18,-20 -6,-26 -6,-46 C4,-36 14,-34 12,-18 C14,-8 8,0 0,0Z', '#ffe066', 'n')}`);
}
export function altar(x, y, s = 1, { wood = true } = {}) {
  let inner = '';
  for (let i = 0; i < 3; i++) for (let k = 0; k < 4 - i; k++) inner += R(-40 + k * 20 + i * 10, -18 - i * 16, 20, 16, '#b8ab94');
  if (wood) for (let i = 0; i < 5; i++) inner += L(-30 + i * 6, -50, -14 + i * 10, -62, '#7a4a28', 5);
  return g(x, y, s, inner);
}
export function wheel(x, y, s = 1, { broken = false } = {}) {
  let inner = '';
  if (!broken) {
    inner += Ci(0, 0, 40, 'none', 'o', ' stroke-width="6" stroke="#6e4527"') + Ci(0, 0, 40, 'none', 'n', ' stroke="#a8743a" stroke-width="5"');
    for (let i = 0; i < 8; i++) { const a = i * Math.PI / 4; inner += L(0, 0, Math.cos(a) * 38, Math.sin(a) * 38, '#8a5a32', 4); }
    inner += Ci(0, 0, 7, '#6e4527');
  } else {
    const piece = (a0, a1, dx, dy, rot) => `<g transform="translate(${dx} ${dy}) rotate(${rot})"><path d="M${f(Math.cos(a0) * 40)},${f(Math.sin(a0) * 40)} A40,40 0 0 1 ${f(Math.cos(a1) * 40)},${f(Math.sin(a1) * 40)}" fill="none" stroke="#6e4527" stroke-width="9" stroke-linecap="round"/><path d="M${f(Math.cos(a0) * 40)},${f(Math.sin(a0) * 40)} A40,40 0 0 1 ${f(Math.cos(a1) * 40)},${f(Math.sin(a1) * 40)}" fill="none" stroke="#a8743a" stroke-width="6" stroke-linecap="round"/></g>`;
    inner += piece(0, 1.3, 30, -10, 20) + piece(1.6, 2.9, -26, 14, -30) + piece(3.2, 4.4, -34, -26, 40) + piece(4.7, 6, 18, 30, -10);
    inner += L(-50, -50, -30, -36, '#8a5a32', 4) + L(50, 40, 34, 26, '#8a5a32', 4) + L(46, -48, 30, -30, '#8a5a32', 4);
    inner += rays(0, 0, { n: 12, r1: 10, r2: 90, op: 0.45 });
  }
  return g(x, y, s, inner);
}
export function throne(x, y, s = 1, color = C.red) {
  return g(x, y, s, `${R(-34, -110, 68, 110, C.gold)}${R(-28, -104, 56, 60, color)}${R(-40, -46, 80, 14, C.gold)}${R(-38, -32, 10, 32, C.gold)}${R(28, -32, 10, 32, C.gold)}${Ci(-34, -112, 6, C.gold)}${Ci(34, -112, 6, C.gold)}`);
}
export function table(x, y, w = 160, s = 1, { cloth = '#f3e6c4', items = [] } = {}) {
  let inner = R(-w / 2, -54, w, 10, cloth) + P(`M${-w / 2},-44 L${-w / 2 + 6},-10 M${w / 2},-44 L${w / 2 - 6},-10`, 'none', 'l', ' stroke-width="4" stroke="#6e4527"') + L(-w / 2 + 8, 0, -w / 2 + 6, -44, '#6e4527', 5) + L(w / 2 - 8, 0, w / 2 - 6, -44, '#6e4527', 5);
  inner += items.join('');
  return g(x, y, s, inner);
}
export function chariot(x, y, s = 1) {
  let inner = '';
  inner += P('M-60,-20 Q-70,-60 -40,-70 L30,-70 L40,-20Z', 'url(#gFire)');
  inner += Ci(-20, -10, 26, 'none', 'o', ' stroke="#ffcf3d" stroke-width="6"') + Ci(-20, -10, 26, 'none', 'n', ' stroke="#e8701c" stroke-width="3"');
  for (let i = 0; i < 6; i++) { const a = i * Math.PI / 3; inner += L(-20, -10, -20 + Math.cos(a) * 24, -10 + Math.sin(a) * 24, '#ffcf3d', 3); }
  inner += fire(-30, -60, 0.6) + fire(10, -62, 0.7);
  return g(x, y, s, inner);
}
export function fireHorse(x, y, s = 1, { flip = false } = {}) {
  return horse(x, y, s, { flip, color: '#f6a23a', mane: '#e8401c', rearing: true, saddle: null });
}
export function letters(x, y, s = 1, { color = C.ink, set = 'glagolitic', size = 22, cols = 6 } = {}) {
  // Simplified stylised Glagolitic / Cyrillic letter shapes (decorative, not a font).
  const shapes = set === 'glagolitic'
    ? ['M0,0 v-16 m-6,8 h12 m-6,8 a6,6 0 1 1 0.1,0', 'M-6,-16 h12 v8 h-12 v8 h12', 'M-6,0 a6,6 0 1 1 12,0 m-6,-6 v-10 m-6,0 h12', 'M-6,-16 l6,8 l6,-8 m-6,8 v8 m-6,0 h12', 'M-6,0 v-16 h12 v16 m-12,-8 h12', 'M0,-16 a5,5 0 1 0 0.1,0 m0,10 v6 m-6,0 h12', 'M-6,-16 v16 h12 v-16 m-6,0 v16', 'M-6,-8 a6,6 0 1 0 12,0 a6,6 0 1 0 -12,0 m6,-8 v-4']
    : ['M-6,0 l6,-16 l6,16 m-9,-6 h6', 'M-6,0 v-16 h10 m-10,8 h8 a4,4 0 0 1 0,8 h-8', 'M-6,0 v-16 h12', 'M-8,2 h16 m-14,0 v-4 l4,-14 h4 l4,14 v4', 'M6,-16 h-12 v16 h12 m-12,-8 h9', 'M-6,0 v-16 l12,16 v-16', 'M0,-16 a6,8 0 1 0 0.1,0', 'M-6,0 v-16 h12 v16'];
  let inner = '';
  shapes.forEach((d, i) => {
    const cx = (i % cols) * size * 1.3, cy = Math.floor(i / cols) * size * 1.5;
    inner += `<path d="${d}" transform="translate(${cx} ${cy}) scale(${size / 18})" fill="none" stroke="${color}" stroke-width="${f(2.2 * 18 / size)}" stroke-linecap="round" stroke-linejoin="round"/>`;
  });
  return g(x, y, s, inner);
}
export function banner(x, y, w, text, { s = 1, color = C.cream, textColor = C.redDark, size = 22 } = {}) {
  const inner = `${P(`M${-w / 2 - 22},-14 L${-w / 2},-14 L${-w / 2},16 L${-w / 2 - 22},16 L${-w / 2 - 12},1Z`, '#e3cf9e')}${P(`M${w / 2 + 22},-14 L${w / 2},-14 L${w / 2},16 L${w / 2 + 22},16 L${w / 2 + 12},1Z`, '#e3cf9e')}${R(-w / 2, -18, w, 34, color)}<text x="0" y="${f(size * 0.35 - 1)}" text-anchor="middle" font-size="${size}" fill="${textColor}" class="cap">${esc(text)}</text>`;
  return g(x, y, s, inner);
}
// Illuminated vine border helper for wide banners.
export function vineBorder(w, h, color = C.gold) {
  let out = `<rect x="6" y="6" width="${w - 12}" height="${h - 12}" fill="none" stroke="${color}" stroke-width="5"/><rect x="14" y="14" width="${w - 28}" height="${h - 28}" fill="none" stroke="${C.redDark}" stroke-width="1.5"/>`;
  return out;
}

// Bust portrait for medallions (400×400). The figure is drawn large so that the
// head and shoulders fill the circle.
export function portrait(opts, { title = '', bg = 'gold', extra = '', y = 735, s = 5.1 } = {}) {
  const fills = { gold: 'url(#gGold)', blue: '#23498a', red: '#8e1f1a', green: '#2f5e2a' };
  const body = `<rect width="400" height="400" fill="${fills[bg] || bg}"/>${rays(200, 180, { n: 28, r1: 40, r2: 320, color: '#fff6c8', op: bg === 'gold' ? 0.35 : 0.18 })}<circle cx="200" cy="200" r="196" fill="none" stroke="#fbf0c8" stroke-width="4" opacity=".7"/>${extra}${person(200, y, s, opts)}`;
  return scene({ w: 400, h: 400, title, body });
}
