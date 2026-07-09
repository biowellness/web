# BioWellness · San Isidro — Sitio web

Sistema de diseño y frontend base del sitio. HTML5 + CSS modular + JavaScript vanilla, sin dependencias ni build: se abre y se publica tal cual.

## Estructura

```
biowellness/
├── index.html          Página principal (landing v2 con blueprint de comunicación)
├── styleguide.html     Guía de estilos viva: todos los componentes con su HTML de ejemplo
├── css/
│   ├── tokens.css      1º · Design tokens (colores, tipos, espaciado). LA fuente de verdad.
│   ├── base.css        2º · Reset + defaults del documento + foco visible
│   ├── layout.css      3º · .wrap, .section, contextos .on-dark/.on-light, grillas
│   ├── components.css  4º · Todos los componentes (nav, hero, cards, forms, footer…)
│   └── utilities.css   5º · .display, .eyebrow, .mono, .reveal, a11y, reduced-motion
├── js/
│   └── main.js         Comportamientos (nav, menú móvil, reveal, biomarcadores)
└── img/                Imágenes del sitio (ver nota adentro)
```

**Cargar siempre en ese orden** (tokens primero). El orden ya está resuelto en las dos páginas incluidas.

## Cómo funciona el CSS

**1 · Capas (`@layer`).** El sistema declara `reset → base → layout → components → utilities`. Regla práctica: **cualquier CSS que escribas sin capa le gana al sistema**. Para ajustes puntuales de una página, agregá un `<style>` en esa página (como hace `styleguide.html`) o un `css/pages/mi-pagina.css` sin `@layer`, y listo — sin peleas de especificidad.

**2 · Contextos de color.** Cada sección declara su fondo con `.on-dark` o `.on-light`. Esas clases redefinen las variables semánticas `--bg`, `--bg-2`, `--border`, `--tx`, `--tx-mut`. Los componentes genéricos (formularios, `.notice`, `.badge`, `.table`) las leen: **el mismo HTML funciona en fondo claro y oscuro** sin clases extra.

**3 · Tokens.** Todo color, tipografía, radio o sombra sale de `tokens.css`. Para retocar la identidad (p. ej. el rojo de acción), editá el token una vez.

## Reglas de la identidad

- `--red` (660 nm) es **la** acción primaria: un solo botón primario por vista.
- `--oxy` (oxígeno) señala **datos, medición y confirmación** — nunca es un botón de compra.
- El gradiente `--spectrum` es la firma: reglas, barras, un acento por sección. Con moderación.
- Voz tipográfica: `Fraunces` con `.display` para títulos; `Manrope` (default) para todo el cuerpo; `IBM Plex Mono` con `.mono` para la capa de datos (ATA, nm, %O₂, precios técnicos).
- Tono del copy: proceso y medición, no promesas. ("Medimos, intervenimos y volvemos a medir.")

## Crear una página nueva

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>BioWellness · [Título]</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..600;1,9..144,300..500&family=IBM+Plex+Mono:wght@400;500&family=Manrope:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="css/tokens.css">
  <link rel="stylesheet" href="css/base.css">
  <link rel="stylesheet" href="css/layout.css">
  <link rel="stylesheet" href="css/components.css">
  <link rel="stylesheet" href="css/utilities.css">
</head>
<body>
  <!-- copiá el <header class="nav"> de index.html -->

  <section class="section on-dark">
    <div class="wrap">
      <div class="sec-head">
        <span class="eyebrow">Etiqueta</span>
        <h2 class="display">Título de la sección.</h2>
        <p>Bajada.</p>
      </div>
      <!-- contenido: ver styleguide.html para el HTML de cada componente -->
    </div>
  </section>

  <!-- copiá el <footer class="foot"> de index.html -->
  <script src="js/main.js" defer></script>
</body>
</html>
```

`styleguide.html` tiene el HTML listo para copiar de: botones, badges, formularios, avisos, tarjetas (oscura/clara/precio), journey, biomarcadores, tablas y animaciones.

## JavaScript

`main.js` inicializa solo lo que existe en la página (cada módulo tiene guardas). Incluye: nav con fondo al scroll, menú móvil, animación `.reveal`, pintado de biomarcadores (`data-conv` / `data-opt`), placeholders de CTA (`data-cta`) y año automático (`data-year`). Para funcionalidades nuevas (p. ej. el formulario de reservas contra el backend Medplum), agregá `js/reservas.js` y cargalo solo en esa página.

## Antes de publicar

1. Reemplazar WhatsApp, email y los `href="#"` de los CTA (`data-cta`) por los enlaces reales.
2. Subir fotos a `img/` y usar `<img class="img-cover" src="img/..." alt="...">` dentro de `.img-slot` y `.avatar`.
3. Opcional (rendimiento): concatenar los 5 CSS en uno y minificar. En desarrollo, dejalos separados.

## Cumplimiento

El pie legal referencia Ley 26.529 (Historia Clínica), Ley 25.506 (Firma Digital) y Ley 25.326 (Protección de Datos). El componente `.notice--medical` existe para replicar el disclaimer donde haga falta.
