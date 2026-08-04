"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { Levitate } from "@/components/ui/Levitate";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { useParallax } from "@/hooks/useParallax";
import { useTicker } from "@/hooks/useTicker";
import { useReducedMotion } from "@/hooks/useMediaQuery";
import { clamp, damp } from "@/lib/ticker";
import { processSection, processSteps } from "@/content/sections";
import { sectionIds } from "@/content/site";
import { clsx } from "@/lib/clsx";
import { brand, sized } from "@/lib/brand";

const PROCESS_PATH =
  "M -12 118 C 40 118, 70 52, 125 56 C 180 60, 200 108, 260 106 C 320 104, 330 48, 375 50 C 425 52, 450 112, 510 108 C 570 104, 585 44, 625 48 C 680 53, 700 116, 760 110 C 815 105, 830 55, 875 56 C 930 57, 950 96, 1012 84";

/**
 * The four-step method. A single wavy line is scrubbed by scroll position and
 * lights each node as the stroke reaches it.
 */
export function Process() {
  const outlineRef = useParallax(0.06);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const pathRef = useRef<SVGPathElement | null>(null);
  const progress = useRef(0);
  const reducedMotion = useReducedMotion();

  // Drives which nodes are lit. Kept in state so React owns the visuals and
  // the raw per-frame value stays in a ref.
  const [litCount, setLitCount] = useState(0);
  const [starVisible, setStarVisible] = useState(false);

  useTicker(({ viewportHeight }) => {
    const track = trackRef.current;
    const path = pathRef.current;
    if (!track || !path) return;

    const rect = track.getBoundingClientRect();
    const target = clamp((viewportHeight * 0.85 - rect.top) / (rect.height * 0.95), 0, 1);

    progress.current = damp(progress.current, target, 0.09);
    const value = progress.current;

    path.style.strokeDashoffset = String(Math.max(0, 1 - value));

    const lit = processSteps.filter((_, i) => value > (i + 0.45) / processSteps.length).length;
    setLitCount((current) => (current === lit ? current : lit));
    setStarVisible(value > 0.93);
  }, !reducedMotion);

  return (
    <section
      id={sectionIds.process}
      aria-labelledby="proceso-heading"
      className="relative border-t border-rule px-[clamp(20px,4.5vw,64px)] pb-[clamp(90px,13vh,140px)] pt-[clamp(80px,12vh,130px)]"
    >
      <div ref={outlineRef} className="absolute right-[4%] top-[9%] opacity-50 will-change-transform">
        <Levitate distance={-34} duration={3.4} tilt={8} sway={4} breath={0.3}>
          <Image
            {...sized(brand.uOutline, 302)}
            alt=""
            aria-hidden="true"
            className="block h-auto w-[clamp(83px,9.1vw,151px)]"
          />
        </Levitate>
      </div>

      <div className="mx-auto max-w-[1280px]">
        <SectionLabel index={processSection.index} label={processSection.label} />

        <Reveal
          as="h2"
          variant="clip"
          id="proceso-heading"
          className="mt-[30px] max-w-[980px] font-display text-[clamp(38px,5.4vw,84px)] font-semibold leading-[1.02] tracking-[-.015em]"
        >
          {processSection.titleLines[0]}
          <br />
          {processSection.titleLines[1]}
        </Reveal>

        <div ref={trackRef} className="relative mt-[clamp(56px,9vh,96px)]">
          <svg
            aria-hidden="true"
            viewBox="0 0 1000 150"
            preserveAspectRatio="none"
            fill="none"
            className="pointer-events-none absolute left-0 top-0 h-[150px] w-full"
          >
            <path
              ref={pathRef}
              d={PROCESS_PATH}
              stroke="var(--color-accent)"
              strokeWidth="2"
              vectorEffect="non-scaling-stroke"
              pathLength="1"
              style={reducedMotion ? { strokeDashoffset: 0 } : undefined}
            />
          </svg>

          <Image
            {...sized(brand.star, 64)}
            alt=""
            aria-hidden="true"
            className="absolute -right-[9px] top-[56px] h-auto w-8 transition-[opacity,transform] duration-500 ease-[var(--ease-out-expo)]"
            style={{
              opacity: starVisible ? 1 : 0,
              transform: starVisible ? "scale(1) rotate(0deg)" : "scale(.4) rotate(-90deg)",
            }}
          />

          <ol className="m-0 grid list-none grid-cols-[repeat(auto-fit,minmax(190px,1fr))] gap-x-5 p-0">
            {processSteps.map((step, index) => {
              const lit = reducedMotion || index < litCount;

              return (
                <li key={step.index} className="text-center">
                  <div className="flex h-[150px] items-center justify-center">
                    <span
                      aria-hidden="true"
                      className={clsx(
                        "flex size-[58px] items-center justify-center rounded-full border-[1.6px]",
                        "font-display text-[17px] font-semibold",
                        "transition-[opacity,transform,border-color,background-color,color] duration-500 ease-[var(--ease-out-expo)]",
                        lit
                          ? "scale-100 border-accent bg-accent text-cream opacity-100"
                          : "scale-[.82] border-ink bg-cream text-ink opacity-20",
                      )}
                    >
                      {step.index}
                    </span>
                  </div>
                  <h3 className="mt-[18px] font-display text-[clamp(21px,2vw,27px)] font-medium">
                    {step.title}
                  </h3>
                  <p className="mt-[9px] font-mono text-[11px] tracking-[.12em] text-muted">
                    {step.caption}
                  </p>
                </li>
              );
            })}
          </ol>
        </div>

        <Reveal
          as="p"
          className="mt-[clamp(48px,8vh,80px)] max-w-[620px] text-[17px] leading-[1.75] text-ink-soft"
        >
          {processSection.outro}
        </Reveal>
      </div>
    </section>
  );
}
