**Usá solo la información de esta guía. No busques imágenes ni logos de la marca en internet.**

# Super 107.5 — Guía de marca

> Super 107.5 es una radio FM de Rosario. Su eslogan es "Radio con vos". Es una radio musical y cercana, y en ella sale, entre otros programas, Lo Que Viene. Esta guía toma como fuente los logos oficiales (`super/logos/`) y el sitio super1075.com.

- Versión web: https://agucorrea.github.io/plantillas/super/
- Este archivo: https://agucorrea.github.io/plantillas/super/marca.md
- Carpeta de logos: https://github.com/agucorrea/plantillas/tree/main/super/logos
- Sitio oficial: https://www.super1075.com/

## Datos básicos

| Campo | Valor |
|---|---|
| Nombre | Super 107.5 |
| Frecuencia | FM 107.5 |
| Ciudad | Rosario |
| Eslogan | Radio con vos |
| Hashtags | #Super1075 #Rosario |
| Sitio | super1075.com |

## Nombre y firma

- Se escribe **Super 107.5**, con mayúscula inicial y la frecuencia con punto decimal. En el logo va en mayúsculas: SUPER 107.5.
- Forma corta en textos: **la Super**, con artículo y en minúscula. Es la forma en que la nombra el propio sitio.
- Eslogan: **Radio con vos**. En el logo va en mayúsculas: RADIO CON VOS.
- Hashtags: siempre **#Super1075** y **#Rosario**, en ese orden y sin punto en "1075".
- No usar: "Super 1075" en textos (solo en el hashtag y en el dominio), "Súper", "Radio Super".

## Logo

**El único logo vigente es el de los archivos de super/logos/ (SUPER 107.5 · Radio con vos). Cualquier logo de 107.5 que aparezca en internet, como el de la estrella roja con ‘Frecuencia Modulada’, es anterior y no se usa.**

Hay tres versiones. Cada una está en SVG (vectorial, la preferida) y en PNG transparente de 1000 px de ancho.

| Versión | Archivos | Contenido | Proporción |
|---|---|---|---|
| Horizontal | `logo-super-horizontal.svg` · `.png` | "SUPER 107.5" en una línea y "RADIO CON VOS" debajo | 3,8 : 1 (517 × 135) |
| Vertical | `logo-super-vertical.svg` · `.png` | "SUPER" / "107.5" / "RADIO CON VOS", apilados | 1,45 : 1 (233 × 161) |
| Compacto | `logo-super-compacto.svg` · `.png` | "SUPER" / "107.5", sin eslogan | 1,65 : 1 (180 × 109) |

URLs:

- https://agucorrea.github.io/plantillas/super/logos/logo-super-horizontal.svg
- https://agucorrea.github.io/plantillas/super/logos/logo-super-vertical.svg
- https://agucorrea.github.io/plantillas/super/logos/logo-super-compacto.svg
- (las mismas rutas con `.png`)

### Cuándo usar cada versión

- **Horizontal**: piezas anchas, como portadas web y de YouTube (16:9), banners, encabezados y zócalos.
- **Vertical**: piezas cuadradas y verticales, como posts 1:1, placas 4:5, historias y reels 9:16.
- **Compacto**: espacios chicos o como firma. Por ejemplo avatares, favicons, marcas de agua, la firma en piezas de programas (como Lo Que Viene) y cualquier lugar donde el eslogan no se leería.

### Cómo está construido

- Tiene letras gruesas en cursiva, con "SUPER" y "RADIO CON VOS" en blanco hueso (`#F1F1F0`) y "107.5" en azul (`#0383F2`).
- Todo va con un contorno negro grueso (`#030404`) y un borde exterior claro, como un sticker. Por eso funciona sobre fondos claros, oscuros y fotos.
- En "RADIO CON VOS", la O de "CON" es un botón de play y la O de "VOS" es un micrófono.
- Las letras están convertidas en curvas, así que el logo no depende de ninguna fuente instalada.

### Reglas de uso

- Usar los archivos tal cual. No redibujar, recolorear, deformar, rotar ni quitar el contorno.
- Dejar alrededor un margen libre de al menos la mitad del alto de "SUPER".
- Elegir la versión según el formato de la pieza, no achicar una versión que no corresponde. Si el horizontal queda por debajo de unos 300 px de ancho, usar el compacto.
- Las IA de imágenes nunca dibujan el logo. Se deja el espacio libre y después se superpone el archivo real.

## Color

Los valores del logo salen de los SVG. Los de la interfaz salen de las variables CSS de super1075.com.

### Marca

| Rol | HEX | Fuente | Uso |
|---|---|---|---|
| Azul Super | `#0087F7` | sitio (`--primary`) | Color principal: botones, enlaces, acentos |
| Azul logo | `#0383F2` | logos | "107.5" en el logo. Es el mismo azul que el del sitio y no hace falta distinguirlos en piezas. |
| Naranja en vivo | `#FF6600` | sitio (`--secondary`, `--live`) | Solo para "AL AIRE" / "EN VIVO" |
| Negro | `#0B0B0F` | sitio (`--ink`, `--dark`) | Textos y fondos oscuros |
| Negro logo | `#030404` | logos | Contorno del logo |
| Blanco hueso | `#F1F1F0` | logos | Letras del logo |
| Blanco | `#FFFFFF` | sitio | Fondo y texto sobre azul, naranja o negro |

### Neutros de la interfaz

| HEX | Variable del sitio | Uso |
|---|---|---|
| `#2A2C33` | `--ink-2` | Texto secundario fuerte |
| `#646875` | `--muted` | Texto secundario |
| `#A0A3AB` | `--faint` | Texto tenue |
| `#E6E7EB` | `--line` | Líneas y bordes |
| `#F4F5F7` | `--surface` | Fondos de sección |
| `#E9EAEE` | `--surface-2` | Fondos alternativos |
| `#17181D` | `--dark-2` | Tarjetas sobre fondo oscuro |

## Tipografía

Las dos fuentes salen de super1075.com y se cargan desde Google Fonts.

| Rol | Fuente | Uso |
|---|---|---|
| Display | **Archivo** 800 y 900 (también se carga de 500 a 700) | Títulos y secciones en mayúsculas ("AHORA Y DESPUÉS", "NUESTROS PROGRAMAS"), nombre del programa al aire |
| Texto | **Inter** de 400 a 700 | Textos, horarios, botones, datos |

Respaldo: `"Archivo", "Arial Black", sans-serif` y `"Inter", system-ui, sans-serif`.

## Estilo

Lo que sigue sale de super1075.com.

- La interfaz es limpia, con fondo blanco o gris muy claro y modo oscuro en negro (`#0B0B0F`).
- Las tarjetas tienen esquinas redondeadas de 14 px (8 px en las chicas) y sombras suaves.
- La tarjeta del programa al aire tiene un degradado azul arriba y un bloque oscuro abajo, con el nombre del programa en Archivo blanco.
- Los botones "Escuchar en vivo" son píldoras con un círculo de play.
- La etiqueta "AL AIRE" / "EN VIVO" es una píldora naranja con un punto.
- Hay iconografía de ondas de audio (barras verticales) junto a los títulos de sección.

## Voz y tono

Es una radio musical y cercana de Rosario.

- **Español rioplatense con voseo**: "escuchanos", "sumate", "contanos". Es una radio que habla *con* vos.
- Tono cálido, de barrio y de ciudad, con energía musical. Cercano pero no chabacano.
- Nombrar a Rosario y sus lugares con orgullo local.
- Frases cortas. Se pueden usar emojis al inicio de los títulos de notas, como hace el sitio (🎶🛍️, 🍷🎭), uno o dos por título.
- Cerrar las publicaciones con **#Super1075 #Rosario**.

Ejemplos de tono:

- "Escuchanos en vivo por la 107.5 y en super1075.com."
- "La Super, Radio con vos. #Super1075 #Rosario"

## Para asistentes de IA

1. Escribir el nombre como **Super 107.5** o **la Super**. El eslogan es **Radio con vos** y los hashtags son **#Super1075 #Rosario**.
2. Elegir la versión del logo según el formato: horizontal para piezas anchas, vertical para cuadradas y verticales, compacto para espacios chicos o como firma.
3. Nunca generar el logo ni textos dentro de una imagen con IA. Dejar el espacio libre y superponer el archivo real de `super/logos/`.
4. Usar el naranja `#FF6600` solo para "en vivo".
5. No inventar programas, horarios ni conductores. La grilla está en super1075.com.
