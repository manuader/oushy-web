/**
 * Brand artwork and its true intrinsic aspect ratios.
 *
 * `next/image` uses `width`/`height` to reserve space before the file loads —
 * if the ratio is wrong the box collapses or jumps on load. Deriving the height
 * from the real pixel dimensions here means a component only ever picks the
 * width it wants to render at, and the ratio can't drift.
 */

interface BrandAsset {
  src: string;
  /** Intrinsic width ÷ height of the source file. */
  ratio: number;
}

export const brand = {
  mark: { src: "/assets/oushy-mark.png", ratio: 1312 / 1846 },
  wordmark: { src: "/assets/oushy-wordmark.png", ratio: 1927 / 670 },
  star: { src: "/assets/oushy-star.png", ratio: 664 / 676 },
  outline: { src: "/assets/oushy-outline.png", ratio: 541 / 199 },
  uOutline: { src: "/assets/oushy-u-outline.png", ratio: 380 / 556 },
  grayStar: { src: "/assets/OUSHY-gray-star.png", ratio: 1 },

  /**
   * Animated WebP, keyed out of the source clips in `assets-source/video/`.
   * They must be rendered with `unoptimized`: the image optimizer would
   * flatten an animation to a single still frame.
   */
  starMotion: { src: "/assets/motion/oushy-star.webp", ratio: 1 },
  markMotion: { src: "/assets/motion/oushy-mark.webp", ratio: 1 },
  lockup: { src: "/assets/oushy-lockup.png", ratio: 688 / 345 },
} as const satisfies Record<string, BrandAsset>;

/**
 * Paper-craft service icons, cropped square out of the masters in
 * `assets-source/icons/` with their paper shifted onto the page cream and the
 * tile edge feathered, so no rectangle shows against the background.
 */
export const serviceIcons = {
  estrategia: { src: "/assets/icons/estrategia.png", ratio: 1 },
  identidad: { src: "/assets/icons/identidad.png", ratio: 1 },
  contenido: { src: "/assets/icons/contenido.png", ratio: 1 },
  performance: { src: "/assets/icons/performance.png", ratio: 1 },
} as const satisfies Record<string, BrandAsset>;

export type ServiceIconName = keyof typeof serviceIcons;

/**
 * Spreads into an `<Image>`: `{...sized(brand.star, 168)}`.
 * Pass roughly twice the largest CSS width the image is rendered at, so the
 * generated srcset covers retina without over-fetching.
 */
export function sized(asset: BrandAsset, width: number) {
  return {
    src: asset.src,
    width,
    height: Math.round(width / asset.ratio),
  };
}
