#!/usr/bin/env node
// generar-deco.js
// ---------------------------------------------------------------------------
// Genera las capas de fondo de neón (íconos + láser + destellos) de un tema,
// como SVG estáticos: uno por formato de pieza. Es la misma lógica (y la misma
// semilla) que usaban los componentes React originales (lqv-base.jsx), así que
// para T11 el resultado es idéntico píxel a píxel.
//
// Uso:   node herramientas/generar-deco.js temas/t11
// Lee:   temas/<tema>/deco.json   (paleta de neones, íconos, brillos, densidad)
// Crea:  temas/<tema>/deco-placa.svg, deco-carrusel.svg, deco-web.svg, deco-piso.svg
//
// Se corre UNA vez por temporada (o cuando cambia deco.json). El servidor que
// genera las imágenes semanales no necesita este script.
// ---------------------------------------------------------------------------

const fs = require('fs');
const path = require('path');
const vm = require('vm');

// ── Formatos: tamaño, semilla y zonas de neones de cada pieza ──────────────
// Las zonas (clusters) están pensadas para no tapar fotos ni textos de cada
// plantilla, por eso viven acá y no en el tema.
const FORMATOS = {
  placa: {
    w: 1080, h: 1350, seed: 202, laser: 2, bokeh: 5,
    clusters: [
      { cx: 8,  cy: 4,  rx: 20, ry: 6,  count: 8 },
      { cx: 75, cy: 3,  rx: 28, ry: 5,  count: 7 },
      { cx: 4,  cy: 50, rx: 8,  ry: 30, count: 7 },
      { cx: 96, cy: 50, rx: 8,  ry: 30, count: 7 },
      { cx: 12, cy: 96, rx: 22, ry: 10, count: 10 },
      { cx: 86, cy: 96, rx: 20, ry: 10, count: 10 },
    ],
  },
  carrusel: {
    w: 1080, h: 1350, seed: 23, laser: 3, bokeh: 6,
    clusters: [
      { cx: 8,  cy: 6,  rx: 22, ry: 10, count: 12 },
      { cx: 72, cy: 4,  rx: 30, ry: 8,  count: 10 },
      { cx: 6,  cy: 60, rx: 8,  ry: 32, count: 9 },
      { cx: 96, cy: 38, rx: 6,  ry: 14, count: 5 },
      { cx: 6,  cy: 95, rx: 18, ry: 12, count: 11 },
      { cx: 78, cy: 96, rx: 28, ry: 10, count: 11 },
    ],
  },
  web: {
    w: 1920, h: 1080, seed: 23, laser: 3, bokeh: 6,
    clusters: [
      { cx: 6,  cy: 8,  rx: 14, ry: 12, count: 10 },
      { cx: 50, cy: 4,  rx: 30, ry: 6,  count: 8 },
      { cx: 96, cy: 18, rx: 8,  ry: 16, count: 7 },
      { cx: 4,  cy: 55, rx: 6,  ry: 20, count: 7 },
      { cx: 96, cy: 60, rx: 6,  ry: 18, count: 7 },
      { cx: 12, cy: 96, rx: 18, ry: 8,  count: 10 },
      { cx: 88, cy: 96, rx: 18, ry: 8,  count: 10 },
    ],
  },
  piso: {
    w: 1920, h: 1080, seed: 414, laser: 2, bokeh: 5,
    clusters: [
      { cx: 8,  cy: 6,  rx: 18, ry: 8,  count: 8 },
      { cx: 90, cy: 4,  rx: 14, ry: 6,  count: 6 },
      { cx: 4,  cy: 55, rx: 6,  ry: 22, count: 6 },
      { cx: 96, cy: 50, rx: 5,  ry: 25, count: 7 },
      { cx: 50, cy: 4,  rx: 24, ry: 4,  count: 6 },
    ],
  },
};

// ── PRNG seedeable (mulberry32), idéntico al original ──────────────────────
function mulberry32(seed) {
  return function () {
    seed = (seed + 0x6D2B79F5) | 0;
    let t = seed;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const n = (v) => +v.toFixed(3);

function parseColor(c) {
  const m = /^rgba?\(([^)]+)\)$/.exec(c.trim());
  if (!m) return { rgb: c, a: 1 };
  const p = m[1].split(',').map((s) => s.trim());
  return { rgb: `rgb(${p[0]},${p[1]},${p[2]})`, a: p[3] !== undefined ? parseFloat(p[3]) : 1 };
}

// ── Íconos ─────────────────────────────────────────────────────────────────
function cargarIconos() {
  const src = fs.readFileSync(path.join(__dirname, 'iconos-phosphor.js'), 'utf8');
  const ctx = { window: {} };
  vm.runInNewContext(src, ctx);
  return ctx.window.LQV_ICON_PATHS;
}

// ── Scatter de íconos (misma lógica que NeonScatter) ───────────────────────
function scatter(f, cfg) {
  const { w: width, h: height, seed, clusters } = f;
  const rand = mulberry32(seed * 1000 + (clusters.length || 1));
  const placed = [];
  const sizeBase = Math.min(width, height);
  for (const cluster of clusters) {
    const { cx, cy, rx = 30, ry = 30, count: rawCount = 18 } = cluster;
    const count = Math.round(rawCount * cfg.densidad);
    if (count <= 0) continue;
    let attempts = 0;
    let placedInCluster = 0;
    while (placedInCluster < count && attempts < count * 30) {
      attempts++;
      const r = Math.pow(rand(), .7);
      const theta = rand() * Math.PI * 2;
      const x = cx + Math.cos(theta) * rx * r;
      const y = cy + Math.sin(theta) * ry * r;
      if (x < -5 || x > 105 || y < -5 || y > 105) continue;
      let tooClose = false;
      for (const p of placed) {
        const dx = x - p.x, dy = y - p.y;
        if (dx * dx + dy * dy < 14) { tooClose = true; break; }
      }
      if (tooClose) continue;
      const sizeRoll = rand();
      let sizeFactor;
      if (sizeRoll < 0.5) sizeFactor = 0.055 + rand() * 0.025;
      else if (sizeRoll < 0.85) sizeFactor = 0.085 + rand() * 0.04;
      else sizeFactor = 0.13 + rand() * 0.05;
      const size = sizeBase * sizeFactor * (cfg.escalaIconos || 1);
      placed.push({
        x, y, size,
        icon: cfg.iconos[Math.floor(rand() * cfg.iconos.length)],
        color: cfg.coloresIconos[Math.floor(rand() * cfg.coloresIconos.length)],
        rotate: (rand() - 0.5) * 18,
        opacity: 0.65 + rand() * 0.35,
      });
      placedInCluster++;
    }
  }
  return placed;
}

function lasers(f, cfg) {
  const seed = f.seed + 100, count = f.laser;
  const rand = mulberry32(seed * 7 + count);
  const out = [];
  for (let i = 0; i < count; i++) {
    const top = 15 + rand() * 70;
    const left = rand() * 20;
    const widthPct = 35 + rand() * 50;
    out.push({
      top, left, widthPct,
      color: cfg.coloresLaser[Math.floor(rand() * cfg.coloresLaser.length)],
      opacity: 0.45 + rand() * 0.4,
    });
  }
  return out;
}

function bokeh(f, cfg) {
  const seed = f.seed + 200, count = f.bokeh;
  const rand = mulberry32(seed * 11 + count);
  const out = [];
  for (let i = 0; i < count; i++) {
    const x = rand() * 100;
    const y = 20 + rand() * 70;
    const size = Math.min(f.w, f.h) * (0.04 + rand() * 0.07);
    out.push({ x, y, size, color: cfg.bokeh[Math.floor(rand() * cfg.bokeh.length)], opacity: 0.25 + rand() * 0.4 });
  }
  return out;
}

// ── SVG ────────────────────────────────────────────────────────────────────
function svgFormato(nombre, f, cfg, ICON_PATHS) {
  const { w, h } = f;
  const hex = (name) => cfg.neones[name] || name;
  const defs = [];
  const body = [];
  const full = `x="0" y="0" width="${w}" height="${h}" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"`;

  // Bokeh / destellos
  defs.push(`<filter id="fb" ${full}><feGaussianBlur stdDeviation="${cfg.bokehDesenfoque}"/></filter>`);
  body.push('<g id="destellos">');
  bokeh(f, cfg).forEach((d, i) => {
    const c = parseColor(d.color);
    const cx = n(d.x / 100 * w), cy = n(d.y / 100 * h);
    defs.push(`<radialGradient id="rb${i}" gradientUnits="userSpaceOnUse" cx="${cx}" cy="${cy}" r="${n(d.size * Math.SQRT1_2)}"><stop offset="0" stop-color="${c.rgb}" stop-opacity="${c.a}"/><stop offset=".65" stop-color="${c.rgb}" stop-opacity="0"/></radialGradient>`);
    body.push(`<circle cx="${cx}" cy="${cy}" r="${n(d.size / 2)}" fill="url(#rb${i})" opacity="${n(d.opacity)}" filter="url(#fb)" style="mix-blend-mode:screen"/>`);
  });
  body.push('</g>');

  // Láser
  const sombras = cfg.laserSombras; // radios de blur de box-shadow (px)
  // Sombra difusa recortada por fuera de la línea (igual que box-shadow).
  sombras.forEach((b, k) => defs.push(`<filter id="fl${k}" ${full}><feGaussianBlur stdDeviation="${b / 2}" result="s"/><feComposite in="s" in2="SourceAlpha" operator="out"/></filter>`));
  defs.push(`<filter id="flb" ${full}><feGaussianBlur stdDeviation="${cfg.laserDesenfoque}"/></filter>`);
  body.push('<g id="laser">');
  lasers(f, cfg).forEach((l, i) => {
    const c = hex(l.color);
    // Se alinea a píxeles enteros, como hace el navegador con las cajas HTML.
    const x = Math.round(l.left / 100 * w), y = Math.round(l.top / 100 * h);
    const lw = Math.round(l.left / 100 * w + l.widthPct / 100 * w) - x, lh = cfg.laserAlto;
    defs.push(`<linearGradient id="lg${i}" gradientUnits="userSpaceOnUse" x1="${x}" y1="0" x2="${n(x + lw)}" y2="0"><stop offset="0" stop-color="${c}" stop-opacity="0"/><stop offset=".3" stop-color="${c}"/><stop offset=".5" stop-color="${cfg.laserNucleo}"/><stop offset=".7" stop-color="${c}"/><stop offset="1" stop-color="${c}" stop-opacity="0"/></linearGradient>`);
    body.push(`<g opacity="${n(l.opacity)}">`);
    for (let k = sombras.length - 1; k >= 0; k--) {
      body.push(`<rect x="${x}" y="${y}" width="${lw}" height="${lh}" fill="${c}" filter="url(#fl${k})"/>`);
    }
    body.push(`<rect x="${x}" y="${y}" width="${lw}" height="${lh}" fill="url(#lg${i})" filter="url(#flb)"/></g>`);
  });
  body.push('</g>');

  // Íconos neón
  const items = scatter(f, cfg);
  const usados = new Set(items.map((it) => it.icon));
  usados.forEach((name) => defs.push(`<symbol id="i-${name}" viewBox="0 0 256 256">${ICON_PATHS[name]}</symbol>`));
  const filtros = new Set();
  const bigThreshold = Math.min(w, h) * 0.1;
  body.push('<g id="neones">');
  items.forEach((it) => {
    const glow = it.size > bigThreshold ? 'hard' : 'mid';
    const c = hex(it.color);
    const fid = `g-${glow}-${it.color}`;
    if (!filtros.has(fid)) {
      filtros.add(fid);
      const [r0, r1, r2] = cfg.brillo[glow];
      defs.push(`<filter id="${fid}" x="-100%" y="-100%" width="300%" height="300%" color-interpolation-filters="sRGB"><feDropShadow dx="0" dy="0" stdDeviation="${r0}" flood-color="${cfg.brilloNucleo}"/><feDropShadow dx="0" dy="0" stdDeviation="${r1}" flood-color="${c}"/><feDropShadow dx="0" dy="0" stdDeviation="${r2}" flood-color="${c}"/></filter>`);
    }
    const s = n(it.size);
    body.push(`<g transform="translate(${n(it.x / 100 * w)} ${n(it.y / 100 * h)}) rotate(${n(it.rotate)})" opacity="${n(it.opacity)}"><g filter="url(#${fid})"><use href="#i-${it.icon}" x="${n(-it.size / 2)}" y="${n(-it.size / 2)}" width="${s}" height="${s}" fill="${c}"/></g></g>`);
  });
  body.push('</g>');

  return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">\n<!-- Fondo de neones · formato ${nombre} · generado por herramientas/generar-deco.js -->\n<defs>\n${defs.join('\n')}\n</defs>\n${body.join('\n')}\n</svg>\n`;
}

// ── main ───────────────────────────────────────────────────────────────────
const temaDir = path.resolve(process.argv[2] || '');
if (!process.argv[2] || !fs.existsSync(path.join(temaDir, 'deco.json'))) {
  console.error('Uso: node herramientas/generar-deco.js temas/<tema>   (requiere temas/<tema>/deco.json)');
  process.exit(1);
}
const cfg = Object.assign({
  densidad: 1,
  escalaIconos: 1,
  brillo: { mid: [1, 3, 6], hard: [1, 4, 9] },
  brilloNucleo: '#fff',
  laserSombras: [6, 16, 32],
  laserAlto: 2,
  laserNucleo: '#fff',
  laserDesenfoque: 0.4,
  bokehDesenfoque: 2,
}, JSON.parse(fs.readFileSync(path.join(temaDir, 'deco.json'), 'utf8')));
const ICON_PATHS = cargarIconos();
for (const name of cfg.iconos) if (!ICON_PATHS[name]) throw new Error(`Ícono desconocido: ${name}`);

for (const [nombre, f] of Object.entries(FORMATOS)) {
  const out = path.join(temaDir, `deco-${nombre}.svg`);
  fs.writeFileSync(out, svgFormato(nombre, f, cfg, ICON_PATHS));
  console.log('✓', path.relative(process.cwd(), out));
}
