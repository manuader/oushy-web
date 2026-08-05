"use client";

import Image from "next/image";
import { HandwrittenNote } from "@/components/ui/HandwrittenNote";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { WordScrub } from "@/components/ui/WordScrub";
import { useParallax } from "@/hooks/useParallax";
import { studio } from "@/content/sections";
import { sectionIds } from "@/content/site";
import { brand, sized } from "@/lib/brand";

/** Who the studio is — the positioning statement and the two-column intro. */
export function Studio() {
  const starRef = useParallax(-0.07);

  return (
    <section
      id={sectionIds.studio}
      aria-labelledby="estudio-heading"
      className="relative mx-auto max-w-[1280px] px-[clamp(20px,4.5vw,64px)] pb-[clamp(80px,12vh,130px)] pt-[clamp(90px,14vh,150px)]"
    >
      <div ref={starRef} className="absolute right-[2.5%] top-[3%] will-change-transform">
        <Image
          {...sized(brand.star, 216)}
          alt=""
          aria-hidden="true"
          className="block h-auto w-[clamp(40px,7vw,108px)]"
          style={{ animation: "spin 44s linear infinite" }}
        />
      </div>

      <h2 id="estudio-heading" className="sr-only">
        {studio.label}
      </h2>
      <SectionLabel index={studio.index} label={studio.label} />

      <WordScrub
        text={studio.headline}
        className="mt-9 max-w-[1080px] font-display text-[clamp(26px,3.5vw,54px)] font-medium leading-[1.18] tracking-[-.01em]"
      />

      <Reveal delay={0.15} className="mt-[30px] inline-block">
        <HandwrittenNote>{studio.note}</HandwrittenNote>
      </Reveal>

      <div className="mt-[clamp(48px,7vh,76px)] grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-x-[clamp(32px,4vw,72px)] gap-y-11">
        {studio.paragraphs.map((paragraph, index) => (
          <Reveal
            key={index}
            as="p"
            delay={0.05 + index * 0.1}
            className="m-0 max-w-[560px] text-[16.5px] leading-[1.78] text-ink-soft"
          >
            {paragraph}
          </Reveal>
        ))}
      </div>
    </section>
  );
}
