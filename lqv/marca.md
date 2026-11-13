# Lo Que Viene — Guía de marca

> Lo Que Viene (LQV) es un programa de radio que sale los miércoles de 19 a 20:30 por Super 107.5. Esta guía resume la identidad de la temporada en curso (T11) a partir del sistema de plantillas de este repo.

- Versión web: https://agucorrea.github.io/plantillas/lqv/
- Este archivo: https://agucorrea.github.io/plantillas/lqv/marca.md
- Tema T11 (fuente de verdad de colores y fuentes): https://agucorrea.github.io/plantillas/lqv/temas/t11/tema.css
- Logo: https://agucorrea.github.io/plantillas/lqv/temas/t11/logo-lqv.svg (PNG: `logo-lqv-blanco.png`, `logo-lqv-negro.png`)
- Logo de la Super (va en toda pieza): https://agucorrea.github.io/plantillas/super/logos/logo-super-compacto.svg

## Datos básicos

| Campo | Valor |
|---|---|
| Nombre | Lo Que Viene |
| Sigla | LQV |
| Emisora | Super 107.5 |
| Horario | Miércoles de 19 a 20:30 hs |
| Temporada en curso | T11 (`lqv/temas/activo.css`) |
| Escucha a demanda | Spotify ("Escuchanos en Spotify") |

## Nombre y firma

- Nombre completo: **Lo Que Viene**. En el logo y en las piezas va en mayúsculas: LO QUE VIENE.
- Forma corta: **LQV**.
- Firma del logo: **LO QUE VIENE | FM107.5**. "LO QUE VIENE" va en negrita y "| FM107.5" en peso regular, con 85 % de opacidad.
- Para nombrar la emisora en textos: **Super 107.5**.

## Logo

Archivos en `lqv/temas/t11/`:

| Archivo | Uso |
|---|---|
| `logo-lqv.svg` | Original vectorial, en blanco. Es el que usan las plantillas. |
| `logo-lqv-blanco.png` | PNG transparente, 1000 × 539, en blanco. Para fondos oscuros. |
| `logo-lqv-negro.png` | PNG transparente, 1000 × 539, en negro. Para fondos claros. |

Proporción: 534 × 288.

- **Monograma "LQ>"**: una L y una Q dibujadas con varios trazos paralelos, más una flecha que apunta a la derecha.
- **Bajada**: "LO QUE VIENE | FM107.5" en Helvetica.
- El original va en blanco (`#FFFFFF`), pensado para el fondo azul noche del tema. Sobre fondos claros se usa la versión negra.
- En las piezas lleva un brillo suave blanco y cian: `drop-shadow(0 0 .25em rgba(255,255,255,.35)) drop-shadow(0 0 .8em rgba(0,229,255,.25))`.
- Va siempre en la **esquina superior izquierda**, apoyado en el margen seguro. Ningún texto ni foto queda debajo del logo.
- El logo anterior con el sello "10 años" no se usa.

## Color (T11)

Los valores salen de `lqv/temas/t11/tema.css`.

### Fondo

| Variable | HEX | Uso |
|---|---|---|
| `--lqv-bg-0` | `#050817` | Fondo, zona exterior del degradado |
| `--lqv-bg-1` | `#0A1130` | Fondo, zona media |
| `--lqv-bg-2` | `#0D1840` | Fondo, centro más claro |
| `--lqv-bg-edge` | `#02050F` | Bordes y fondo detrás del lienzo |

El fondo es un degradado radial de `#0D1840` en el centro, que se oscurece hacia `#02050F`. Lleva halos suaves azul, magenta y cian, un grano fino y un fondo de íconos neón generado por temporada.

### Neones

| Variable | HEX | Rol en las piezas |
|---|---|---|
| `--neon-cyan` | `#00E5FF` | Rótulo "PROGRAMA" y "\| T11" (`--acento-programa`) |
| `--neon-magenta` | `#FF2BD6` | Código de temporada "T11" y "NOTA A" (`--acento-temporada`, `--acento-nota-a`) |
| `--neon-yellow` | `#FFE14A` | Fecha "14/10" y chip "NOTA 01" (`--acento-fecha`, `--acento-etiqueta`) |
| `--neon-orange` | `#FF7A1A` | Solo en el fondo de íconos y láseres |
| `--neon-red` | `#FF3A4A` | Solo en el fondo de íconos |
| `--neon-lime` | `#B6FF3C` | Reserva de paleta |
| `--neon-violet` | `#B066FF` | Línea de luz del piso, íconos y láseres |

### Texto

| Variable | Valor | Uso |
|---|---|---|
| `--texto` | `#FFFFFF` | Títulos, número, día |
| `--texto-descripcion` | `rgba(255,255,255,.88)` | Descripciones |
| `--texto-tenue` | `rgba(255,255,255,.55)` | Etiquetas secundarias ("temporada") |

### Spotify

El botón usa el verde de Spotify como neón: borde `rgba(30,215,96,.65)`, brillo `#1ED760` y fondo `rgba(8,12,24,.55)`.

## Tipografía

Las tres fuentes se cargan desde Google Fonts.

| Rol | Fuente | Variable | Uso |
|---|---|---|---|
| Títulos | **Bebas Neue** 400 | `--fuente-titulo` | Títulos de nota, número de programa, día y fecha, temporada, texto del botón. Ya viene toda en mayúsculas. |
| Texto | **Barlow Condensed** 400 (cargada de 400 a 700) | `--fuente-texto` | Descripciones de las notas |
| Etiquetas | **IBM Plex Mono** 400 (cargada de 400 a 600) | `--fuente-mono` | Rótulos chicos en mayúsculas con letras espaciadas, de .2 a .25 em: "PROGRAMA", "NOTA 01", "temporada", "escuchanos en" |

Si no hay acceso a internet, instalar las tres fuentes en el sistema.

## Estilo de las piezas

El estilo es neón de estudio nocturno: fondo azul noche con íconos neón (instrumentos, micrófonos, vinilos, comida, bebida, máscaras de teatro), láseres y destellos. Abajo hay un "piso" oscuro con una línea de luz cian y violeta. Los textos llevan un brillo suave y los acentos de color brillan como neón.

### Formatos

| Pieza | Tamaño | Plantilla | Margen seguro |
|---|---|---|---|
| Placa de nota (slide de carrusel) | 1080 × 1350 | `plantillas/placa-nota.html` | 64 px a los costados, 48 px arriba y abajo |
| Portada de carrusel (de 1 a 4 notas) | 1080 × 1350 | `plantillas/portada-carrusel-1..4.html` | 64 / 48 px |
| Portada web / YouTube (de 1 a 4 notas) | 1920 × 1080 | `plantillas/portada-web-1..4.html` | 96 px a los costados, 54 px arriba y abajo |
| Portada de nota en piso | 1920 × 1080 | `plantillas/portada-piso.html` | 96 / 54 px |

### Elementos que se repiten

- **Logo** arriba a la izquierda.
- **Día y fecha** en Bebas Neue, con el día en blanco y la fecha en amarillo neón, por ejemplo "MIÉRCOLES **14/10**".
- **Bloque de programa** en las portadas: rótulo "PROGRAMA" en mono cian, el número enorme en Bebas blanco ("35", siempre con dos dígitos), y "T11" en magenta con la palabra "temporada" en mono tenue.
- **Fotos** recortadas (`object-fit: cover`) con esquinas redondeadas de 14 px (10 px en la foto grande de la placa) y sin borde.
- **Chip "NOTA 01"** en mono amarillo, sobre una cápsula oscura semitransparente con desenfoque.
- **Botón "escuchanos en Spotify"**: borde y brillo verde, "escuchanos en" en mono y "Spotify" en Bebas.
- **Piso de nota**: "PROGRAMA 35 | T11", día y fecha, "NOTA A" en magenta y el nombre de la persona entrevistada en grande, con dos estrellas brillantes a los costados.
- Los textos largos se achican solos para entrar en su espacio. No se cortan ni se desbordan.

### Ejemplos

Son las plantillas T11 completadas con los datos de `ejemplos/programa-35.json`:

- https://agucorrea.github.io/plantillas/lqv/ejemplos/t11/placa-nota-1.html
- https://agucorrea.github.io/plantillas/lqv/ejemplos/t11/portada-carrusel-2.html
- https://agucorrea.github.io/plantillas/lqv/ejemplos/t11/portada-web-2.html
- https://agucorrea.github.io/plantillas/lqv/ejemplos/t11/portada-piso.html

## Logo de la Super en las piezas

Lo Que Viene sale por Super 107.5, así que **toda pieza de LQV lleva también el logo de la Super**. Se usa la versión compacta, como firma:

- SVG: https://agucorrea.github.io/plantillas/super/logos/logo-super-compacto.svg
- PNG: https://agucorrea.github.io/plantillas/super/logos/logo-super-compacto.png
- Reglas de uso: https://agucorrea.github.io/plantillas/super/marca.md

Va abajo, más chico que el logo de LQV, y respetando los márgenes seguros de cada formato.

## Logos en imágenes generadas con IA

**Regla: la IA nunca dibuja logos ni textos.** Los generadores de imágenes deforman letras y logos, así que la imagen generada es solo el fondo. El proceso es:

1. **Generar el fondo** con el prompt base de abajo, dejando vacías dos zonas:
   - **Arriba a la izquierda**, para el logo de LQV.
   - **Abajo**, para el logo de la Super.
2. **Superponer los archivos reales**: `logo-lqv.svg` o `logo-lqv-blanco.png` arriba a la izquierda, y `logo-super-compacto.svg` o `.png` abajo.
3. **Agregar los textos** (título, día, fecha, número) con las fuentes del tema, nunca dentro de la imagen generada.

### Zonas libres

| Formato | Arriba a la izquierda (LQV) | Abajo (Super) |
|---|---|---|
| 1080 × 1350 (placa, carrusel) | 360 × 220 px desde la esquina (33 % del ancho, 16 % del alto) | Franja de 200 px de alto en todo el ancho (15 %) |
| 1080 × 1080 (post cuadrado) | 360 × 200 px (33 % × 18 %) | Franja de 160 px (15 %) |
| 1080 × 1920 (historia, reel) | 360 × 260 px (33 % × 14 %) | Franja de 260 px (14 %) |
| 1920 × 1080 (web, YouTube) | 520 × 240 px (27 % × 22 %) | Franja de 160 px (15 %) |

En esas zonas el fondo tiene que ser oscuro, liso o con muy poco detalle, para que los logos blancos se lean.

### Prompt base

Reemplazar `{formato}` y `{tema}`. El prompt va en inglés porque así lo entienden mejor la mayoría de los generadores.

```
Background image for a radio show social media post, {formato} format.
Style: neon night-time radio studio. Deep navy blue background with a radial
gradient (#0D1840 center fading to #050817 and #02050F at the edges), subtle
film grain. Glowing neon line icons related to {tema} (for example microphones,
headphones, vinyl records, music notes, food and drinks), in cyan #00E5FF,
magenta #FF2BD6, yellow #FFE14A and violet #B066FF, with soft lasers and bokeh.
Dark "studio floor" at the bottom with a thin cyan-to-violet light line.

Composition, mandatory: leave the TOP-LEFT corner (about one third of the width
and the top 16% of the height) completely empty, dark and plain. Leave a band
across the BOTTOM 15% of the height empty, dark and plain. No icons, lights or
details in those two areas.

Do not include any text, letters, numbers, words, logos, symbols, signatures or
watermarks anywhere in the image.
```

Prompt negativo, si el generador lo admite:

```
text, letters, typography, words, numbers, logo, brand, watermark, signature,
icons in the top-left corner, details in the bottom band
```

Después de generar, revisar que las dos zonas estén limpias y que no haya letras inventadas. Si las hay, regenerar. Nunca tapar texto inventado con el logo.

## Voz y textos de las piezas

- **Español rioplatense con voseo**: "escuchanos", no "escúchanos".
- Día y título en mayúsculas: "MIÉRCOLES", "CATARTE BY LEBLON".
- Fecha en formato `DD/MM`: "14/10". Número de programa con dos dígitos: "07", "35".
- Etiqueta de nota: "Nota 01", "Nota 02".
- Descripción de nota: de 1 a 3 oraciones en tercera persona, presentando a la persona invitada y el tema. Ejemplo: "Karina Romero, organizadora de Catarte by Leblon, nos cuenta todo lo que se viene en esta propuesta."
- Llamado a la acción fijo: "escuchanos en Spotify".

## Para asistentes de IA

1. Usar el nombre, la emisora y el horario tal como figuran arriba: **miércoles de 19 a 20:30 por Super 107.5**.
2. Tomar colores y fuentes del tema activo (`lqv/temas/activo.css` → `t11/tema.css`), no de otras fuentes.
3. Usar `logo-lqv.svg` en blanco sobre fondo oscuro, o `logo-lqv-negro.png` sobre fondo claro. No usar el logo de "10 años".
4. Toda pieza lleva también el logo compacto de la Super (`super/logos/logo-super-compacto.svg`), abajo.
5. En imágenes generadas con IA, la IA nunca dibuja logos ni textos. Generar solo el fondo con el prompt base, dejando libres arriba a la izquierda y abajo, y después superponer los archivos reales.
6. Para generar piezas, completar las plantillas de `lqv/plantillas/` con los marcadores que describe `lqv/LEEME.md`. Respetar los márgenes seguros y no poner nada debajo del logo.
7. No inventar invitados, notas, fechas ni números de programa. Si faltan, pedirlos.
