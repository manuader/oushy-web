"use client";

import Image from "next/image";
import { PillLink } from "@/components/ui/PillLink";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { useParallax } from "@/hooks/useParallax";
import { contactSection } from "@/content/sections";
import { contact, sectionIds } from "@/content/site";
import { brand, sized } from "@/lib/brand";

/**
 * Closing invitation, with the oversized "trabajemos juntos" lockup.
 *
 * The section clips on the x axis only. The clipping exists to contain the
 * oversized outline artwork sideways; `overflow-hidden` would clip both axes
 * and cut the descenders of the rotated "juntos" script, which — like most
 * handwriting faces — draws well below its layout box.
 */
export function Contact() {
  const outlineRef = useParallax(0.05);

  return (
    <section
      id={sectionIds.contact}
      aria-labelledby="contacto-heading"
      className="relative overflow-x-clip px-[clamp(20px,4.5vw,64px)] pt-[clamp(90px,14vh,150px)]"
    >
      <div ref={outlineRef} className="absolute right-[3%] top-[6%] opacity-[0.18] will-change-transform sm:opacity-30">
        <Image
          {...sized(brand.outline, 541)}
          alt=""
          aria-hidden="true"
          className="block h-auto w-[clamp(190px,32vw,540px)]"
        />
      </div>

      <div className="relative mx-auto max-w-[1280px]">
        <SectionLabel index={contactSection.index} label={contactSection.label} />

        <div className="mt-9 flex flex-wrap items-end justify-between gap-x-[clamp(40px,5vw,90px)] gap-y-12">
          <div className="relative min-w-[min(100%,320px)]">
            <Reveal
              as="h2"
              variant="clip"
              id="contacto-heading"
              className="m-0 whitespace-nowrap font-display text-[clamp(56px,9.5vw,150px)] font-semibold leading-[.95] tracking-[-.02em]"
            >
              {contactSection.title}
            </Reveal>
            <Reveal delay={0.2} className="mt-2 inline-block">
              {/* Rotation lives on the inner span so it can't fight the
                  translate the reveal animates. */}
              <span className="inline-block rotate-[-4deg] font-script text-[clamp(34px,5.6vw,84px)] text-accent">
                {contactSection.script}
              </span>
            </Reveal>
          </div>

          <div className="min-w-[min(100%,320px)] max-w-[560px] flex-1">
            <Reveal as="p" className="m-0 max-w-[520px] text-[16.5px] leading-[1.78] text-ink-soft">
              {contactSection.body}
            </Reveal>

            <Reveal delay={0.12} className="mt-[34px] flex flex-wrap items-center gap-3.5">
              <PillLink href={contact.whatsapp} variant="ink">
                {contactSection.cta}
              </PillLink>
              <a
                href={contact.instagram}
                target="_blank"
                rel="noopener noreferrer"
                data-hover
                className="border-b-[1.4px] border-accent pb-1 font-mono text-[12px] tracking-[.14em] transition-colors hover:text-accent"
              >
                {contact.instagramHandle}
              </a>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
