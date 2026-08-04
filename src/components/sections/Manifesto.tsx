"use client";

import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { WordScrub } from "@/components/ui/WordScrub";
import { useDrawOnView } from "@/hooks/useDrawOnView";
import { useParallax } from "@/hooks/useParallax";
import { manifesto } from "@/content/sections";
import { brand, sized } from "@/lib/brand";

/** The accent-coloured statement of intent that splits the page in two. */
export function Manifesto() {
  const starRef = useParallax(-0.06);
  const ruleRef = useDrawOnView({ duration: 1.4 });

  return (
    <section
      aria-labelledby="manifiesto-heading"
      className="relative overflow-hidden bg-accent px-[clamp(20px,4.5vw,64px)] py-[clamp(100px,16vh,170px)] text-cream"
    >
      <div ref={starRef} className="absolute right-[4%] top-[10%] will-change-transform">
        <Image
          {...sized(brand.star, 360)}
          alt=""
          aria-hidden="true"
          className="block h-auto w-[clamp(100px,14vw,180px)] origin-center opacity-90 brightness-0 invert will-change-transform"
          style={{ animation: "spin 46s linear infinite" }}
        />
      </div>

      <div className="relative mx-auto max-w-[1280px]">
        <h2 id="manifiesto-heading" className="sr-only">
          {manifesto.label}
        </h2>
        <SectionLabel label={manifesto.label} tone="inverted" />

        <WordScrub
          text={manifesto.headline}
          className="mt-10 max-w-[1000px] font-display text-[clamp(27px,3.9vw,58px)] font-medium leading-[1.16] tracking-[-.01em]"
        />

        <svg
          ref={ruleRef}
          width="100%"
          height="2"
          viewBox="0 0 100 2"
          preserveAspectRatio="none"
          fill="none"
          aria-hidden="true"
          className="mt-[clamp(40px,6vh,64px)] block w-full"
        >
          <path
            d="M0 1 L100 1"
            stroke="rgb(246 239 233 / 0.3)"
            strokeWidth="2"
            pathLength="1"
          />
        </svg>

        <Reveal
          as="p"
          className="mt-[clamp(36px,5vh,52px)] max-w-[640px] text-[17px] leading-[1.75] text-cream/85"
        >
          {manifesto.body}
        </Reveal>
      </div>
    </section>
  );
}
