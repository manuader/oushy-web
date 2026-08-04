import Image from "next/image";
import { Marquee } from "@/components/ui/Marquee";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { industriesSection, industryRows } from "@/content/sections";
import { sectionIds } from "@/content/site";
import { brand, sized } from "@/lib/brand";

function IndustryRow({ items }: { items: readonly string[] }) {
  return (
    <div className="inline-flex items-center gap-11 pr-11">
      {items.map((item) => (
        <span key={item} className="inline-flex items-center gap-11">
          <span
            data-hover
            className="text-stroke whitespace-nowrap font-display text-[clamp(42px,6.6vw,96px)] font-semibold leading-[1.15]"
          >
            {item}
          </span>
          <Image
            {...sized(brand.star, 54)}
            alt=""
            aria-hidden="true"
            className="h-auto w-[27px] flex-none"
          />
        </span>
      ))}
    </div>
  );
}

/** Two counter-scrolling bands of the sectors the studio has worked in. */
export function Industries() {
  return (
    <section
      id={sectionIds.industries}
      aria-labelledby="industrias-heading"
      className="border-t border-rule pb-[clamp(80px,12vh,120px)] pt-[clamp(80px,12vh,130px)]"
    >
      <div className="mx-auto max-w-[1280px] px-[clamp(20px,4.5vw,64px)]">
        <h2 id="industrias-heading" className="sr-only">
          {industriesSection.label}
        </h2>
        <SectionLabel index={industriesSection.index} label={industriesSection.label} />

        <Reveal
          as="p"
          className="mt-[30px] max-w-[640px] text-pretty font-display text-[clamp(18px,1.7vw,23px)] font-medium leading-[1.5]"
        >
          {industriesSection.intro}
        </Reveal>
      </div>

      <Marquee
        duration={39}
        className="mt-[clamp(44px,7vh,70px)] border-y border-rule pb-[26px] pt-[30px]"
      >
        <IndustryRow items={industryRows[0]} />
      </Marquee>

      <Marquee duration={49} reverse className="border-b border-rule pb-[30px] pt-[26px]">
        <IndustryRow items={industryRows[1]} />
      </Marquee>

      <div className="mx-auto max-w-[1280px] px-[clamp(20px,4.5vw,64px)]">
        <Reveal
          as="p"
          className="mt-[clamp(40px,6vh,56px)] max-w-[560px] text-[16.5px] leading-[1.75] text-ink-soft"
        >
          {industriesSection.outro}
        </Reveal>
      </div>
    </section>
  );
}
