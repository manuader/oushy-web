import Image from "next/image";
import { site } from "@/content/site";
import { brand, sized } from "@/lib/brand";

/** Colophon rule that closes the page. */
export function SiteFooter() {
  return (
    <footer className="px-[clamp(20px,4.5vw,64px)]">
      <div className="mx-auto mt-[clamp(70px,11vh,120px)] flex max-w-[1280px] flex-wrap items-center justify-between gap-x-8 gap-y-4 border-t border-rule pb-[26px] pt-[22px] font-mono text-[10.5px] tracking-[.18em] text-muted">
        <span className="flex items-center gap-2.5">
          © OUSHY STUDIO — {site.year}
          {/* The animated mark signs the page off. Back under the wordmark's
              h-11 (44px), which is what sets the bar's height — so the bar
              returns to its original size. 44px is the ceiling here.
              `unoptimized` is what keeps it animated through next/image. */}
          <Image
            {...sized(brand.markMotion, 120)}
            alt=""
            aria-hidden="true"
            unoptimized
            loading="lazy"
            className="block h-10 w-auto"
          />
        </span>

        <Image
          {...sized(brand.wordmark, 280)}
          alt={site.name}
          className="block h-11 w-auto"
        />

        <span>{site.location}</span>
      </div>
    </footer>
  );
}
