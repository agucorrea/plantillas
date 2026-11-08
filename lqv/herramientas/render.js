#!/usr/bin/env node
// render.js — genera las imágenes PNG de un programa a partir de un JSON.
// ---------------------------------------------------------------------------
// Requisitos en el servidor:  Node 18+  y  npm i playwright && npx playwright install chromium
//
// Uso:
//   node herramientas/render.js ejemplos/programa-35.json salida/
//   node herramientas/render.js ejemplos/programa-35.json salida/ --tema t12
//
// El JSON describe el programa (ver ejemplos/programa-35.json). Se generan:
//   placa-nota-01.png …         una placa 1080×1350 por nota
//   portada-carrusel.png        1080×1350 (elige la variante de 1 a 4 notas)
//   portada-web.png             1920×1080 (ídem)
//   portada-piso-01.png …       1920×1080, solo para notas con "nombre"
// Sin --tema se usa el tema activo (temas/activo.css).
// Las rutas de fotos pueden ser URLs o rutas relativas al archivo JSON.
// ---------------------------------------------------------------------------
const fs = require('fs');
const path = require('path');
const { pathToFileURL } = require('url');
const { chromium } = require('playwright');

const RAIZ = path.resolve(__dirname, '..');
const PLANTILLAS = path.join(RAIZ, 'plantillas');

function esc(v) {
  return String(v).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function rellenar(html, datos, nombrePlantilla) {
  return html.replace(/\{\{(\w+)\}\}/g, (_, k) => {
    if (!(k in datos)) throw new Error(`Falta el dato "${k}" para ${nombrePlantilla}`);
    return esc(datos[k]);
  });
}

function urlFoto(f, baseDir) {
  if (!f) throw new Error('Falta una foto');
  if (/^(https?|file|data):/i.test(f)) return f;
  return pathToFileURL(path.resolve(baseDir, f)).href;
}

async function main() {
  const args = process.argv.slice(2);
  const iTema = args.indexOf('--tema');
  const tema = iTema >= 0 ? args.splice(iTema, 2)[1] : null;
  const [jsonPath, salida = 'salida'] = args;
  if (!jsonPath) {
    console.error('Uso: node herramientas/render.js programa.json carpeta-salida [--tema t12]');
    process.exit(1);
  }
  const baseDir = path.dirname(path.resolve(jsonPath));
  const prog = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
  const notas = prog.notas || [];
  if (!notas.length) throw new Error('El programa no tiene notas');
  fs.mkdirSync(salida, { recursive: true });

  const comun = {
    numero: String(prog.numero).padStart(2, '0'),
    temporada: prog.temporada,
    dia: String(prog.dia).toUpperCase(),
    fecha: prog.fecha,
  };
  const dos = (i) => String(i + 1).padStart(2, '0');

  const trabajos = [];
  notas.forEach((n, i) => {
    trabajos.push({
      plantilla: 'placa-nota.html', salida: `placa-nota-${dos(i)}.png`,
      datos: { ...comun, nota_n: n.nota_n || `Nota ${dos(i)}`, titulo: n.titulo, descripcion: n.descripcion,
               foto: urlFoto(n.foto, baseDir), foto_pos: n.foto_pos || 'center' },
    });
  });
  const portada = notas.slice(0, 4);
  const fotos = {};
  portada.forEach((n, i) => {
    fotos[`foto_${i + 1}`] = urlFoto(n.foto_portada || n.foto, baseDir);
    fotos[`foto_${i + 1}_pos`] = n.foto_portada_pos || n.foto_pos || 'center';
  });
  trabajos.push({ plantilla: `portada-carrusel-${portada.length}.html`, salida: 'portada-carrusel.png', datos: { ...comun, ...fotos } });
  const fotosWeb = { ...fotos };
  portada.forEach((n, i) => { if (n.foto_web_pos) fotosWeb[`foto_${i + 1}_pos`] = n.foto_web_pos; });
  trabajos.push({ plantilla: `portada-web-${portada.length}.html`, salida: 'portada-web.png', datos: { ...comun, ...fotosWeb } });
  notas.forEach((n, i) => {
    if (!n.nombre) return;
    trabajos.push({
      plantilla: 'portada-piso.html', salida: `portada-piso-${dos(i)}.png`,
      datos: { ...comun, nombre: n.nombre, foto: urlFoto(n.foto_piso || n.foto, baseDir), foto_pos: n.foto_piso_pos || n.foto_pos || 'center' },
    });
  });

  const browser = await chromium.launch();
  try {
    for (const t of trabajos) {
      let html = rellenar(fs.readFileSync(path.join(PLANTILLAS, t.plantilla), 'utf8'), t.datos, t.plantilla);
      if (tema) html = html.replace('href="../temas/activo.css"', `href="../temas/${tema}/tema.css"`);
      // Archivo temporal al lado de la plantilla para que las rutas relativas funcionen.
      const tmp = path.join(PLANTILLAS, `.render-${process.pid}-${t.salida}.html`);
      fs.writeFileSync(tmp, html);
      try {
        const page = await browser.newPage({ viewport: { width: 1920, height: 1350 } });
        await page.goto(pathToFileURL(tmp).href, { waitUntil: 'load' });
        await page.evaluate(async () => {
          await document.fonts.ready;
          await Promise.all([...document.images].map((im) => im.complete ? 0 : new Promise((r) => { im.onload = im.onerror = r; })));
        });
        await page.waitForTimeout(150);
        const marco = await page.$('.lqv-frame');
        await marco.screenshot({ path: path.join(salida, t.salida) });
        await page.close();
        console.log('✓', t.salida, `(${t.plantilla})`);
      } finally {
        fs.unlinkSync(tmp);
      }
    }
  } finally {
    await browser.close();
  }
}

main().catch((e) => { console.error('✗', e.message); process.exit(1); });
