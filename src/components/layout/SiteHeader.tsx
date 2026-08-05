"use client";

import Image from "next/image";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { PillLink } from "@/components/ui/PillLink";
import { useScrolled } from "@/hooks/useScrolled";
import { contact, navLinks, site } from "@/content/site";
import { clsx } from "@/lib/clsx";
import { brand, sized } from "@/lib/brand";

/**
 * Fixed navigation. It sits transparent over the hero and fades in a frosted
 * background once the page starts scrolling.
 */
export function SiteHeader() {
  const scrolled = useScrolled();

  return (
    <header
      className={clsx(
        "fixed inset-x-0 top-0 z-[100] flex items-center justify-between border-b px-[clamp(20px,4vw,56px)] py-4",
        "transition-[background-color,border-color,backdrop-filter] duration-[400ms]",
        scrolled
          ? "border-ink/12 bg-cream/88 backdrop-blur-[14px] backdrop-saturate-[1.15]"
          : "border-transparent bg-transparent",
      )}
    >
      {/* The panel is a descendant of this header, so its z-index resolves
          inside the header's own stacking context. The mark has to be raised
          here to stay visible above an open panel. */}
      <a
        href="#top"
        data-hover
        className="relative z-[210] flex items-center"
        aria-label={`${site.name} — inicio`}
      >
        <Image
          {...sized(brand.wordmark, 240)}
          alt={site.name}
          priority
          className="block h-8 w-auto"
        />
      </a>

      <div className="flex items-center gap-[clamp(18px,2.6vw,40px)]">
        <nav aria-label="Principal" className="hidden gap-[clamp(16px,2.2vw,30px)] min-[861px]:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              data-hover
              className="font-mono text-[11px] tracking-[.16em] transition-colors hover:text-accent"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* The panel carries this CTA on phones, so the bar keeps just the
            wordmark and the toggle and nothing has to shrink to fit.
            The wrapper does the hiding: PillLink already sets `inline-block`,
            and two display utilities on one element resolve by stylesheet
            order, not by the order they appear in the attribute. */}
        <div className="hidden min-[861px]:block">
          <PillLink href={contact.whatsapp} variant="outline" size="sm">
            INICIAR PROYECTO
          </PillLink>
        </div>

        <MobileMenu />
      </div>
    </header>
  );
}
