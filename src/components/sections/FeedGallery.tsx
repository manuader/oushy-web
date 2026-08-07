"use client";

import Image from "next/image";
import { useState } from "react";
import { Carousel } from "@/components/ui/Carousel";
import { Lightbox, type LightboxItem } from "@/components/ui/Lightbox";

/** Widths are fluid so a partial slide peeks in, hinting the track scrolls. */
const SLIDE = "w-[78%] shrink-0 snap-start sm:w-[46%] lg:w-[30%] xl:w-[23%]";

const TILE =
  "group relative block w-full aspect-[4/5] overflow-hidden rounded-[18px] border border-rule transition-[transform,border-color] duration-500 ease-[var(--ease-out-expo)] hover:-translate-y-1.5 hover:border-accent";

export interface GallerySlide {
  key: string;
  src?: string;
  alt: string;
  href?: string;
  isVideo?: boolean;
}

/**
 * The carousel plus its viewer. Split out of `Feed` because the open-photo
 * state is shared across every slide, and `Feed` stays a server component so
 * the Instagram fetch keeps happening on the server.
 */
export function FeedGallery({ slides }: { slides: GallerySlide[] }) {
  const [openAt, setOpenAt] = useState<number | null>(null);

  // Only slides with an image can be opened, so the viewer indexes its own
  // list rather than the slide list — otherwise a placeholder in the middle
  // would make "next" skip a beat.
  const items: LightboxItem[] = slides
    .filter((s): s is GallerySlide & { src: string } => Boolean(s.src))
    .map((s) => ({ key: s.key, src: s.src, alt: s.alt, href: s.href }));

  return (
    <>
      <Carousel label="Publicaciones de OUSHY Studio" className="mt-[clamp(36px,6vh,56px)]">
        {slides.map((slide, index) => {
          const itemIndex = slide.src ? items.findIndex((i) => i.key === slide.key) : -1;

          return (
            <li key={slide.key} className={SLIDE}>
              {slide.src ? (
                <button
                  type="button"
                  data-hover
                  onClick={() => setOpenAt(itemIndex)}
                  aria-label={`Ampliar: ${slide.alt}`}
                  className={TILE}
                >
                  {/* Oversized inside a fixed frame so it has room to drift.
                      `translate` carries the carousel parallax and `scale` the
                      hover zoom — separate longhands, so neither clobbers the
                      other. */}
                  <Image
                    src={slide.src}
                    alt={slide.alt}
                    fill
                    sizes="(max-width: 640px) 78vw, (max-width: 1024px) 46vw, 23vw"
                    className="object-cover transition-[scale] duration-[900ms] ease-[var(--ease-out-expo)] group-hover:[--feed-scale:1.16]"
                    style={
                      {
                        translate: "var(--feed-shift, 0%) 0",
                        scale: "var(--feed-scale, 1.08)",
                      } as React.CSSProperties
                    }
                  />

                  {/* Reads as an editorial folio, matching the (01) markers on
                      the services rows. Difference blending keeps it legible
                      over a photo of any tone. */}
                  <span className="pointer-events-none absolute left-4 top-4 font-mono text-[10.5px] tracking-[.18em] text-cream mix-blend-difference">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  {slide.isVideo ? (
                    <span
                      aria-hidden="true"
                      className="absolute right-3 top-3 flex size-7 items-center justify-center rounded-full bg-ink/55 text-cream backdrop-blur-[2px]"
                    >
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </span>
                  ) : null}
                </button>
              ) : (
                <div className={TILE}>
                  <div className="flex size-full items-center justify-center bg-ink/[0.03] p-6 text-center">
                    <span className="font-mono text-[10.5px] tracking-[.18em] text-muted">
                      {slide.alt}
                    </span>
                  </div>
                </div>
              )}
            </li>
          );
        })}
      </Carousel>

      <Lightbox
        items={items}
        index={openAt}
        onClose={() => setOpenAt(null)}
        onNavigate={setOpenAt}
      />
    </>
  );
}
