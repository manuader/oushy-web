import Image from "next/image";
import { Carousel } from "@/components/ui/Carousel";
import { PillLink } from "@/components/ui/PillLink";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Star } from "@/components/ui/Star";
import { feedPosts, feedSection } from "@/content/sections";
import { contact, sectionIds } from "@/content/site";
import { getInstagramPosts } from "@/lib/instagram";

/** Widths are fluid so a partial slide peeks in, hinting the track scrolls. */
const SLIDE = "w-[78%] shrink-0 snap-start sm:w-[46%] lg:w-[30%] xl:w-[23%]";

const TILE =
  "relative block aspect-[4/5] overflow-hidden rounded-[18px] border border-rule transition-[transform,border-color] duration-500 ease-[var(--ease-out-expo)] hover:-translate-y-1.5 hover:border-accent";

/** Both sources — curated files and the Instagram API — normalise to this. */
interface Slide {
  key: string;
  src?: string;
  alt: string;
  href: string;
  isVideo?: boolean;
}

function FeedSlide({ slide }: { slide: Slide }) {
  // Nothing to link to until the image exists; keep the tile inert.
  if (!slide.src) {
    return (
      <li className={SLIDE}>
        <div className={TILE}>
          <div className="flex size-full items-center justify-center bg-ink/[0.03] p-6 text-center">
            <span className="font-mono text-[10.5px] tracking-[.18em] text-muted">{slide.alt}</span>
          </div>
        </div>
      </li>
    );
  }

  return (
    <li className={SLIDE}>
      <a
        href={slide.href}
        target="_blank"
        rel="noopener noreferrer"
        data-hover
        className={TILE}
      >
        <Image
          src={slide.src}
          alt={slide.alt}
          fill
          sizes="(max-width: 640px) 78vw, (max-width: 1024px) 46vw, 23vw"
          className="object-cover"
        />
        {slide.isVideo ? (
          <span
            aria-hidden="true"
            className="absolute right-3 top-3 flex size-7 items-center justify-center rounded-full bg-ink/55 text-cream backdrop-blur-[2px]"
          >
            <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
        ) : null}
      </a>
    </li>
  );
}

/**
 * Instagram carousel — a window into what the studio is currently shipping.
 *
 * Curated by hand from `feedPosts` today. If INSTAGRAM_ACCESS_TOKEN is ever
 * set, the live API takes over automatically and nothing else has to change;
 * see docs/instagram-token.md for how to obtain one.
 */
export async function Feed() {
  const live = await getInstagramPosts(10);

  const slides: Slide[] = live.length
    ? live.map((post) => ({
        key: post.id,
        src: post.imageUrl,
        alt: post.caption,
        href: post.permalink,
        isVideo: post.isVideo,
      }))
    : feedPosts.map((post) => ({
        key: post.id,
        src: post.src,
        alt: post.alt,
        href: post.permalink ?? contact.instagram,
      }));

  return (
    <section
      id={sectionIds.feed}
      aria-labelledby="proyectos-heading"
      className="border-t border-rule px-[clamp(20px,4.5vw,64px)] py-[clamp(80px,12vh,130px)]"
    >
      <div className="mx-auto max-w-[1280px]">
        <SectionLabel index={feedSection.index} label={feedSection.label} />

        <div className="mt-[30px] flex flex-wrap items-end justify-between gap-x-10 gap-y-6">
          <Reveal
            as="h2"
            variant="clip"
            id="proyectos-heading"
            className="m-0 flex items-center gap-3 font-display text-[clamp(44px,6.5vw,96px)] font-semibold leading-[.95] tracking-[-.015em]"
          >
            {feedSection.title}
            <Star
              size="clamp(24px, 3vw, 46px)"
              className="origin-center"
              style={{ animation: "spin 30s linear infinite" }}
            />
          </Reveal>

          <a
            href={contact.instagram}
            target="_blank"
            rel="noopener noreferrer"
            data-hover
            className="border-b-[1.4px] border-accent pb-1 font-mono text-[12px] tracking-[.14em] transition-colors hover:text-accent"
          >
            {contact.instagramHandle} ↗
          </a>
        </div>

        <Reveal as="p" className="mt-[26px] max-w-[560px] text-[16.5px] leading-[1.75] text-ink-soft">
          {feedSection.intro}
        </Reveal>

        <Carousel label="Publicaciones de OUSHY Studio" className="mt-[clamp(36px,6vh,56px)]">
          {slides.map((slide) => (
            <FeedSlide key={slide.key} slide={slide} />
          ))}
        </Carousel>

        <Reveal className="mt-[clamp(28px,4vh,40px)] flex justify-center">
          <PillLink href={contact.instagram} variant="outline">
            {feedSection.cta}
          </PillLink>
        </Reveal>
      </div>
    </section>
  );
}
