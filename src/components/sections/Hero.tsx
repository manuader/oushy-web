"use client";

import Image from "next/image";
import { PillLink } from "@/components/ui/PillLink";
import { useParallax } from "@/hooks/useParallax";
import { hero } from "@/content/sections";
import { contact, sectionIds, site } from "@/content/site";
import { brand, sized } from "@/lib/brand";

/**
 * Opening statement: the wordmark wipes in, two hand-drawn lines sweep across
 * the background, and the primary calls to action settle underneath.
 */
export function Hero() {
  const wordmarkRef = useParallax<HTMLImageElement>(-0.045);

  return (
    <section
      id="top"
      aria-label="Presentación"
      className="relative flex min-h-svh flex-col justify-center px-[clamp(20px,4.5vw,64px)] pb-[90px] pt-[120px]"
    >
      {/* Two long strokes that sweep across the hero as it settles. */}
      <svg
        aria-hidden="true"
        viewBox="0 0 1440 900"
        preserveAspectRatio="none"
        fill="none"
        className="pointer-events-none absolute inset-0 hidden h-full w-full sm:block"
      >
        <path
          d="M -30 640 C 380 560, 720 340, 1470 110"
          stroke="var(--color-accent)"
          strokeWidth="2"
          vectorEffect="non-scaling-stroke"
          pathLength="1"
          style={{ animation: "draw 1.9s var(--ease-draw) 1.7s forwards" }}
        />
        <path
          d="M -30 726 C 420 646, 760 424, 1470 194"
          stroke="rgb(84 87 79 / 0.2)"
          strokeWidth="1.5"
          vectorEffect="non-scaling-stroke"
          pathLength="1"
          style={{ animation: "draw 1.9s var(--ease-draw) 1.95s forwards" }}
        />
      </svg>

      <div
        className="relative flex flex-col gap-1.5 font-mono text-[10px] tracking-[.2em] text-muted sm:flex-row sm:justify-between sm:gap-5 sm:text-[11px]"
        style={{ animation: "fade-up .9s var(--ease-out-expo) 1.55s backwards" }}
      >
        <span>{hero.eyebrow}</span>
        <span>{site.location}</span>
      </div>

      <div className="relative mt-[clamp(26px,5vh,54px)] w-[min(84vw,1020px)] self-center">
        <Image
          ref={wordmarkRef}
          {...sized(brand.wordmark, 1927)}
          alt={site.name}
          priority
          className="block h-auto w-full will-change-[clip-path,transform]"
          style={{ animation: "clip-in 1.3s cubic-bezier(.77,0,.18,1) 1.6s backwards" }}
        />
        <span
          className="absolute -right-[1%] -bottom-[17%] z-[2] whitespace-nowrap font-script text-[clamp(26px,4vw,58px)] text-accent"
          style={{
            transform: "rotate(-5deg)",
            animation: "fade-up 1s var(--ease-out-expo) 2.55s backwards",
          }}
        >
          studio
        </span>
        <Image
          {...sized(brand.star, 168)}
          alt=""
          aria-hidden="true"
          className="absolute -top-[9%] -right-[5%] h-auto w-[clamp(44px,5.5vw,84px)] origin-center will-change-transform"
          style={{ animation: "appear .9s ease 2.2s backwards, spin 26s linear infinite" }}
        />
      </div>

      <div className="relative mt-[clamp(52px,9vh,92px)] grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] items-end gap-9">
        <div>
          <p
            className="m-0 max-w-[560px] text-pretty font-display text-[clamp(19px,1.8vw,26px)] font-medium leading-[1.4]"
            style={{ animation: "fade-up .9s var(--ease-out-expo) 2s backwards" }}
          >
            {hero.claim}{" "}
            <Image
              {...sized(brand.star, 40)}
              alt=""
              aria-hidden="true"
              className="inline-block h-auto w-[19px] align-[-2px]"
            />
          </p>
          <p
            className="mt-[18px] font-mono text-[11.5px] tracking-[.16em] text-muted"
            style={{ animation: "fade-up .9s var(--ease-out-expo) 2.15s backwards" }}
          >
            {hero.disciplines}
          </p>
        </div>

        <div
          className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-end sm:gap-3.5"
          style={{ animation: "fade-up .9s var(--ease-out-expo) 2.3s backwards" }}
        >
          <PillLink href={contact.whatsapp}>{hero.primaryCta}</PillLink>
          <PillLink href={`#${sectionIds.services}`} variant="outline">
            {hero.secondaryCta}
          </PillLink>
        </div>
      </div>

      <div
        aria-hidden="true"
        className="absolute bottom-5 left-1/2 flex -translate-x-1/2 flex-col items-center gap-[9px]"
        style={{ animation: "fade-up 1s ease 3.3s backwards" }}
      >
        <span className="font-mono text-[9.5px] tracking-[.34em] text-muted">SCROLL</span>
        <div className="h-[42px] w-0.5 overflow-hidden rounded-[2px]">
          <div
            className="h-full w-0.5 bg-accent"
            style={{ animation: "scroll-cue 2.3s var(--ease-draw) 4s infinite" }}
          />
        </div>
      </div>
    </section>
  );
}
