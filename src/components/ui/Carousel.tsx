"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { useReducedMotion } from "@/hooks/useMediaQuery";
import { useTicker } from "@/hooks/useTicker";
import { clamp } from "@/lib/ticker";
import { clsx } from "@/lib/clsx";

interface CarouselProps {
  /** One `<li>` per slide. */
  children: ReactNode;
  /** Announced to assistive tech as the carousel's name. */
  label: string;
  className?: string;
}

function Arrow({ direction }: { direction: "prev" | "next" }) {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d={direction === "next" ? "M9 5l7 7-7 7" : "M15 5l-7 7 7 7"}
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Horizontal carousel built on native overflow scrolling with CSS scroll-snap.
 *
 * Swipe, trackpad and keyboard scrolling all work with no JavaScript — the
 * script only adds the arrows, the progress rail, and the parallax.
 *
 * Each slide's image drifts within its own frame according to how far that
 * slide sits from the centre of the track. It is the detail that separates a
 * row of pictures from something that feels built: the images resolve as they
 * reach the middle and slide away as they leave.
 */
export function Carousel({ children, label, className }: CarouselProps) {
  const trackRef = useRef<HTMLUListElement | null>(null);
  const railRef = useRef<HTMLDivElement | null>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(true);
  const reducedMotion = useReducedMotion();

  const sync = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const max = track.scrollWidth - track.clientWidth;
    setAtStart(track.scrollLeft <= 1);
    setAtEnd(track.scrollLeft >= max - 1);
    if (railRef.current) {
      railRef.current.style.transform = `scaleX(${max > 0 ? clamp(track.scrollLeft / max, 0, 1) : 0})`;
    }
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    sync();
    track.addEventListener("scroll", sync, { passive: true });

    // Slide widths are fluid, so re-measure whenever the track resizes.
    const observer = new ResizeObserver(sync);
    observer.observe(track);

    return () => {
      track.removeEventListener("scroll", sync);
      observer.disconnect();
    };
  }, [sync]);

  // One subscriber drives every slide rather than one per slide: the maths is
  // trivial and this keeps the shared rAF loop to a single callback.
  useTicker(() => {
    const track = trackRef.current;
    if (!track) return;

    const mid = track.clientWidth / 2;
    for (const slide of Array.from(track.children) as HTMLElement[]) {
      const offset = slide.offsetLeft - track.scrollLeft + slide.offsetWidth / 2 - mid;
      const t = clamp(offset / (track.clientWidth || 1), -1, 1);
      slide.style.setProperty("--feed-shift", `${(t * -5).toFixed(2)}%`);
    }
  }, !reducedMotion);

  return (
    <div
      role="group"
      aria-roledescription="carrusel"
      aria-label={label}
      className={clsx("relative", className)}
    >
      <ul
        ref={trackRef}
        tabIndex={0}
        className={clsx(
          "no-scrollbar m-0 flex snap-x snap-mandatory list-none gap-4 overflow-x-auto p-0",
          // Let a focused track show a ring, since it is keyboard scrollable.
          "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent",
        )}
      >
        {children}
      </ul>

      <div className="mt-8 flex items-center gap-6">
        <div className="flex gap-3">
          {(["prev", "next"] as const).map((direction) => {
            const disabled = direction === "prev" ? atStart : atEnd;
            return (
              <button
                key={direction}
                type="button"
                data-hover
                onClick={() => {
                  const track = trackRef.current;
                  const slide = track?.firstElementChild;
                  if (!track || !slide) return;
                  const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
                  const step = slide.getBoundingClientRect().width + gap;
                  track.scrollBy({
                    left: (direction === "next" ? 1 : -1) * step,
                    behavior: reducedMotion ? "auto" : "smooth",
                  });
                }}
                disabled={disabled}
                aria-label={direction === "next" ? "Siguiente" : "Anterior"}
                className={clsx(
                  "flex size-11 items-center justify-center rounded-full border-[1.4px] border-ink",
                  "transition-[background-color,color,opacity] duration-[350ms]",
                  disabled ? "cursor-default opacity-25" : "hover:bg-ink hover:text-cream",
                )}
              >
                <Arrow direction={direction} />
              </button>
            );
          })}
        </div>

        {/* Progress rail. Scaled rather than resized so it animates on the
            compositor and never lays out mid-scroll. */}
        <div aria-hidden="true" className="h-px flex-1 bg-rule">
          <div ref={railRef} className="h-px origin-left bg-accent" style={{ transform: "scaleX(0)" }} />
        </div>
      </div>
    </div>
  );
}
