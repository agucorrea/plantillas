# LQV · Sistema de plantillas automáticas

Genera las piezas semanales del programa desde un servidor, sin intervención manual.
Está separado en dos capas:

1. **Tema de temporada** (`temas/t11/`): todo lo estético. Colores, fondo, fondo de íconos neón,
   tipografías, brillos, botón de Spotify, líneas de luz, fotos, logo.
2. **Plantillas** (`plantillas/`): HTML de tamaño fijo, sin JavaScript. Solo definen posiciones y
   tamaños, y usan las variables del tema.

```
sistema/
  temas/
    activo.css            ← una línea: qué temporada se usa (hoy, t11)
    t11/  tema.css, deco.json, deco-*.svg, logo-lqv.svg, spotify.svg, estrella.svg
    t12/  propuesta de temporada nueva (misma estructura)
  plantillas/
    placa-nota.html               1080×1350
    portada-carrusel-1..4.html    1080×1350 (una por cantidad de notas)
    portada-web-1..4.html         1920×1080
    portada-piso.html             1920×1080
  herramientas/
    render.js             genera los PNG de un programa (para el servidor)
    generar-deco.js       genera el fondo de neones de un tema (una vez por temporada)
    iconos-phosphor.js    íconos usados por generar-deco.js
  ejemplos/
    programa-35.json      ejemplo de datos de entrada para render.js
    fotos/                fotos de las notas usadas en los ejemplos
    t11/, t12/            plantillas ya rellenadas (vista previa)
```

## Marcadores

| Marcador | Dónde | Ejemplo |
|---|---|---|
| `{{numero}}` | portadas, piso | `35` (con dos dígitos: `07`) |
| `{{temporada}}` | portadas, piso | `T11` |
| `{{dia}}` | todas | `MIÉRCOLES` |
| `{{fecha}}` | todas | `14/10` |
| `{{nota_n}}` | placa | `Nota 01` |
| `{{titulo}}` | placa | `CATARTE BY LEBLON` |
| `{{descripcion}}` | placa | 1–3 oraciones |
| `{{nombre}}` | piso | `KARINA ROMERO` |
| `{{foto}}`, `{{foto_pos}}` | placa, piso | URL de la imagen y encuadre CSS (`45% 22%`, `center 30%`) |
| `{{foto_1}}`…`{{foto_4}}`, `{{foto_1_pos}}`…`{{foto_4_pos}}` | portadas | ídem, una por nota |

- Algunos marcadores aparecen **dos veces** en la misma plantilla (texto visible + copia invisible
  para medir). Hay que reemplazar todas las apariciones.
- Los valores tienen que ir escapados para HTML (`&` → `&amp;`, `<` → `&lt;`, `"` → `&quot;`).
  `render.js` ya lo hace.
- `{{foto_pos}}` es el `object-position` de CSS: el primer valor mueve la foto en horizontal, el
  segundo en vertical (`center 20%` sube el encuadre si se cortan las cabezas).

## Textos largos

Título, descripción, nombre del entrevistado, número de programa y la línea día + fecha se achican
solos para no desbordar, sin JavaScript. Una copia invisible del texto mide su largo y el CSS calcula
el tamaño más grande que entra en el ancho y en las líneas disponibles. Cuando el texto entra, se ve
exactamente al tamaño original. Requiere Chromium 120 o posterior (el de Playwright lo cumple).

## Generar las imágenes en el servidor

```bash
npm i playwright && npx playwright install chromium     # una vez
node herramientas/render.js ejemplos/programa-35.json salida/
node herramientas/render.js ejemplos/programa-35.json salida/ --tema t12    # forzar otro tema
```

Con el JSON del programa genera una placa por nota, la portada de carrusel y la web (elige sola la
variante de 1 a 4 notas) y una portada de piso por cada nota que tenga `"nombre"`. Campos opcionales
por nota: `nota_n`, `foto_portada` / `foto_portada_pos` (otra foto o encuadre para las portadas),
`foto_web_pos`, `foto_piso` / `foto_piso_pos`.

Se puede usar cualquier otro motor que abra HTML con Chromium (Puppeteer, servicios de captura):
reemplazar marcadores, abrir el archivo junto a la plantilla para que la ruta `../temas/…` funcione,
esperar `document.fonts.ready` y capturar el elemento `.lqv-frame` a tamaño real.

**Tipografías:** el tema las carga de Google Fonts, así que el servidor necesita salida a internet.
Si no la tiene, instalar las fuentes en el sistema (Bebas Neue, Barlow Condensed, IBM Plex Mono)
y quitar la línea `@import` del tema.

## Márgenes y logo

Ningún texto ni foto queda debajo del logo, y todo el contenido respeta un margen seguro según
dónde se publica cada pieza:

| Pieza | Margen seguro | Por qué |
|---|---|---|
| Placa y portada de carrusel (1080×1350) | 64 px a los costados, 48 px arriba y abajo | La grilla del perfil de Instagram muestra la portada recortada a 3:4 (se pierden unos 34 px por lado). |
| Portada web/YouTube y portada en piso (1920×1080) | 96 px a los costados, 54 px arriba y abajo | Zona segura de título 16:9 (5 %). Además, el botón de Spotify queda por encima de la esquina inferior derecha, donde YouTube superpone la duración o el "EN VIVO". |

El logo va siempre en la esquina superior izquierda, apoyado en esos márgenes.

## Cambiar de temporada

1. Copiar `temas/t11/` a `temas/t12/` (o usar la propuesta que ya está).
2. Cambiar valores en `tema.css` (colores, fuentes, brillos, botón, líneas, fotos…).
3. Cambiar `deco.json` (paleta de neones, íconos, densidad, brillo) y regenerar el fondo:
   `node herramientas/generar-deco.js temas/t12`
4. En `temas/activo.css`, cambiar `t11` por `t12`. Las plantillas no se tocan.

## Notas

- Las rutas de imágenes del tema (`url(...)`) se registran con `@property … '<url>'` al principio
  de `tema.css`: eso hace que se resuelvan relativas a la carpeta del tema. Un tema nuevo tiene que
  conservar ese bloque.
- El modo de foto completa con fondo borroso (`fitWeb: 'contain'`) de la versión anterior no está
  en las plantillas: todas las fotos van recortadas con `object-fit: cover`.
