import { PillLink } from "@/components/ui/PillLink";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Star } from "@/components/ui/Star";
import { FeedGallery, type GallerySlide } from "@/components/sections/FeedGallery";
import { feedPosts, feedSection } from "@/content/sections";
import { contact, sectionIds } from "@/content/site";
import { getInstagramPosts } from "@/lib/instagram";

/**
 * Instagram carousel — a window into what the studio is currently shipping.
 *
 * Curated by hand from `feedPosts` today. If INSTAGRAM_ACCESS_TOKEN is ever
 * set, the live API takes over automatically and nothing else has to change;
 * see docs/instagram-token.md for how to obtain one.
 */
export async function Feed() {
  const live = await getInstagramPosts(10);

  const slides: GallerySlide[] = live.length
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

        <FeedGallery slides={slides} />

        <Reveal className="mt-[clamp(28px,4vh,40px)] flex justify-center">
          <PillLink href={contact.instagram} variant="outline">
            {feedSection.cta}
          </PillLink>
        </Reveal>
      </div>
    </section>
  );
}
