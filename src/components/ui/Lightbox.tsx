"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef } from "react";
import { useReducedMotion } from "@/hooks/useMediaQuery";
import { clsx } from "@/lib/clsx";

export interface LightboxItem {
  key: string;
  src: string;
  alt: string;
  /** Link out to the original post, when there is one. */
  href?: string;
}

interface LightboxProps {
  items: LightboxItem[];
  /** Index of the open item, or null when closed. */
  index: number | null;
  onClose: () => void;
  onNavigate: (next: number) => void;
}

function Chevron({ direction }: { direction: "prev" | "next" }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
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
 * Full-screen viewer for the feed.
 *
 * Deliberately on cream rather than the usual black scrim: a dark overlay would
 * read as a third-party component dropped into the page. Keeping the studio's
 * own paper background makes it feel like the site opened up rather than
 * something covering it.
 *
 * Sits below the grain overlay in the stack so the paper texture carries across
 * it, and below the custom cursor so that keeps working.
 */
export function Lightbox({ items, index, onClose, onNavigate }: LightboxProps) {
  const open = index !== null;
  const item = open ? items[index] : null;
  const closeRef = useRef<HTMLButtonElement | null>(null);
  const reducedMotion = useReducedMotion();

  const go = useCallback(
    (delta: number) => {
      if (index === null || items.length === 0) return;
      onNavigate((index + delta + items.length) % items.length);
    },
    [index, items.length, onNavigate],
  );

  useEffect(() => {
    if (!open) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      else if (event.key === "ArrowRight") go(1);
      else if (event.key === "ArrowLeft") go(-1);
    };

    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKey);
    closeRef.current?.focus();

    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [open, onClose, go]);

  if (!open || !item) return null;

  const enter = (delay: number) =>
    reducedMotion
      ? undefined
      : { animation: `fade-up .55s var(--ease-out-expo) ${delay}s backwards` };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={item.alt}
      className="fixed inset-0 z-[140] flex flex-col bg-cream"
      style={reducedMotion ? undefined : { animation: "appear .35s ease" }}
    >
      {/* The backdrop closes on click; the figure below stops the bubble so
          clicking the photo itself never dismisses it. */}
      <button
        type="button"
        aria-label="Cerrar"
        tabIndex={-1}
        onClick={onClose}
        className="absolute inset-0 cursor-default"
      />

      <header className="relative flex items-center justify-between px-[clamp(20px,4.5vw,64px)] py-5">
        <span className="font-mono text-[10.5px] tracking-[.22em] text-muted" style={enter(0.1)}>
          {String(index + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
        </span>

        <button
          ref={closeRef}
          type="button"
          data-hover
          onClick={onClose}
          aria-label="Cerrar"
          className="-mr-2 flex size-11 items-center justify-center rounded-full"
        >
          <span aria-hidden="true" className="relative block size-5">
            <span className="absolute left-0 top-1/2 block h-[1.6px] w-5 -translate-y-1/2 rotate-45 rounded-full bg-ink" />
            <span className="absolute left-0 top-1/2 block h-[1.6px] w-5 -translate-y-1/2 -rotate-45 rounded-full bg-ink" />
          </span>
        </button>
      </header>

      <div className="relative flex min-h-0 flex-1 items-center justify-center px-[clamp(12px,4vw,64px)]">
        <button
          type="button"
          data-hover
          onClick={() => go(-1)}
          aria-label="Anterior"
          className="absolute left-[clamp(8px,2.5vw,40px)] z-[2] flex size-11 items-center justify-center rounded-full border-[1.4px] border-ink transition-colors duration-[350ms] hover:bg-ink hover:text-cream"
          style={enter(0.18)}
        >
          <Chevron direction="prev" />
        </button>

        {/* `key` on the figure restarts the entrance on every navigation, so
            moving between photos reads as a change rather than a swap. */}
        <figure
          key={item.key}
          className="relative m-0 flex min-h-0 items-center justify-center"
          style={enter(0.06)}
        >
          {/* Capped against the viewport rather than a parent height. `fill`
              needs a box with a definite height and `max-h-full` only caps one,
              so the earlier wrapper collapsed and the photo never rendered;
              chaining percentage heights then left it far smaller than the
              space available.

              The height is definite rather than a max: with `h-auto` the used
              size comes from the intrinsic size of whichever srcset candidate
              the browser picks, not from the width/height attributes, so the
              photo rendered at roughly half the room it had. Avoid `svh` here —
              it resolves to zero in headless Chrome. */}
          <Image
            src={item.src}
            alt={item.alt}
            width={900}
            height={1125}
            sizes="(max-width: 768px) 86vw, 60vh"
            className="h-auto w-[86vw] shrink-0 rounded-[14px] object-contain sm:h-[74vh] sm:w-auto sm:max-w-[86vw]"
            priority
          />
        </figure>

        <button
          type="button"
          data-hover
          onClick={() => go(1)}
          aria-label="Siguiente"
          className="absolute right-[clamp(8px,2.5vw,40px)] z-[2] flex size-11 items-center justify-center rounded-full border-[1.4px] border-ink transition-colors duration-[350ms] hover:bg-ink hover:text-cream"
          style={enter(0.18)}
        >
          <Chevron direction="next" />
        </button>
      </div>

      <footer
        className="relative flex flex-wrap items-center justify-between gap-x-8 gap-y-2 px-[clamp(20px,4.5vw,64px)] py-6"
        style={enter(0.22)}
      >
        <p className="m-0 max-w-[62ch] text-[14px] leading-[1.6] text-ink-soft">{item.alt}</p>
        {item.href ? (
          <a
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            data-hover
            className={clsx(
              "shrink-0 border-b-[1.4px] border-accent pb-1 font-mono text-[11px] tracking-[.14em]",
              "transition-colors hover:text-accent",
            )}
          >
            VER EN INSTAGRAM ↗
          </a>
        ) : null}
      </footer>
    </div>
  );
}
