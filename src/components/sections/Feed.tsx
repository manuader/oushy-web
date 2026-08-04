import Image from "next/image";
import { PillLink } from "@/components/ui/PillLink";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Star } from "@/components/ui/Star";
import { feedPosts, feedSection, type FeedPost } from "@/content/sections";
import { contact, sectionIds } from "@/content/site";

function FeedTile({ post, delay }: { post: FeedPost; delay: number }) {
  return (
    <Reveal
      delay={delay}
      data-hover
      className="aspect-[4/5] overflow-hidden rounded-[18px] border border-rule transition-[transform,border-color] duration-500 ease-[var(--ease-out-expo)] hover:-translate-y-1.5 hover:border-accent"
    >
      {post.src ? (
        <Image
          src={post.src}
          alt={post.alt}
          width={800}
          height={1000}
          sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw"
          className="size-full object-cover"
        />
      ) : (
        // Empty slot: keeps the grid rhythm until real feed art is dropped in.
        <div className="flex size-full items-center justify-center bg-ink/[0.03] p-6 text-center">
          <span className="font-mono text-[10.5px] tracking-[.18em] text-muted">{post.alt}</span>
        </div>
      )}
    </Reveal>
  );
}

/** Instagram grid — a window into what the studio is currently shipping. */
export function Feed() {
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

        <div className="mt-[clamp(36px,6vh,56px)] grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-4">
          {feedPosts.map((post, index) => (
            <FeedTile key={post.id} post={post} delay={(index % 3) * 0.08} />
          ))}
        </div>

        <Reveal className="mt-[clamp(36px,6vh,52px)] flex justify-center">
          <PillLink href={contact.instagram} variant="outline">
            {feedSection.cta}
          </PillLink>
        </Reveal>
      </div>
    </section>
  );
}
