# OUSHY Studio

Landing page de OUSHY Studio, migrada del prototipo estático (`legacy/index.html`) a **Next.js 16 (App Router) + TypeScript + Tailwind CSS v4**.

## Comandos

```bash
npm run dev
```

```bash
npm run build
```

Otros: `npm run start` (servidor de producción), `npm run lint`, `npm run typecheck`.

## Estructura

```
src/
  app/
    layout.tsx        # fuentes (next/font), metadata/OG, shell global
    page.tsx          # orden de las secciones — nada más
    globals.css       # tokens de diseño (@theme), keyframes, base y utilities
  components/
    layout/           # cromo que envuelve la página
      SiteHeader      # nav fija, se escarcha al hacer scroll
      SiteFooter      # colofón
      Preloader       # cortina de intro
      GrainOverlay    # grano de papel
      CustomCursor    # punto + anillo que reemplazan el cursor
    sections/         # una sección de la landing por archivo
      Hero · DisciplinesBand · Studio · Services · Process
      Industries · Manifesto · Feed · Contact
    ui/               # primitivas reutilizables
      Reveal          # aparición al entrar en viewport (fade | clip)
      WordScrub       # texto que se enciende palabra por palabra
      Marquee         # banda infinita con doble pasada
      PillLink        # CTA en píldora (solid | outline | ink)
      HandwrittenNote # nota manuscrita con trazo que se dibuja
      SectionLabel · Star · ServiceIcon
  hooks/              # comportamiento reutilizable
      useTicker       # suscripción al rAF compartido
      useInView       # IntersectionObserver
      useDrawOnView   # dibuja trazos SVG al entrar en viewport
      useParallax · useScrollSkew · useMagnetic · useScrolled
      useMediaQuery   # + usePointerFine, useReducedMotion
  lib/
      ticker.ts       # un único rAF para toda la página + helpers (damp, clamp)
      clsx.ts
  content/
      site.ts         # metadata, contacto, navegación, anchors
      sections.ts     # todos los textos de la landing
public/assets/        # marca, wordmark, estrella, outlines
legacy/               # prototipo original, conservado como referencia
```

## Decisiones

- **Contenido separado del markup.** Todos los textos viven en `src/content/`, así que editar copy no toca componentes.
- **Un solo `requestAnimationFrame`.** Parallax, skew, cursor, word-scrub y el scrub del proceso comparten el loop de `lib/ticker.ts`, que sólo corre mientras haya suscriptores.
- **Server Components por defecto.** Sólo lleva `"use client"` lo que realmente necesita estado o efectos.
- **Tokens en `@theme`.** Colores, tipografías y easings se definen una vez y generan las utilidades de Tailwind (`bg-cream`, `text-ink`, `font-display`…).
- **Fuentes con `next/font`.** Fredoka, Archivo, Space Mono y Homemade Apple se auto-hospedan; sin requests a Google Fonts en runtime.
- **`prefers-reduced-motion`.** El preloader se omite, las apariciones se muestran directamente y los efectos de scroll no se suscriben al loop.
- **Sin JS igual se lee.** Un `<noscript>` fuerza visibles los elementos con `data-reveal`.

## Feed de Instagram

Las seis celdas de la sección *proyectos* se renderizan desde `feedPosts` en `src/content/sections.ts`. Cada entrada sin `src` muestra un placeholder; para publicar una imagen, dejala en `public/` y agregá la ruta:

```ts
{ id: "ig-post-1", src: "/feed/post-01.jpg", alt: "Campaña de verano" }
```
