import { Marquee } from "@/components/ui/Marquee";
import { Star } from "@/components/ui/Star";
import { heroMarquee } from "@/content/sections";

/** The accent-coloured band of disciplines that closes the hero. */
export function DisciplinesBand() {
  return (
    <Marquee className="bg-accent py-4" duration={26}>
      <div className="inline-flex items-center gap-[34px] pr-[34px]">
        {heroMarquee.map((word) => (
          <span key={word} className="inline-flex items-center gap-[34px]">
            <span className="whitespace-nowrap font-display text-[23px] font-medium text-cream">
              {word}
            </span>
            <Star size={15} color="var(--color-cream)" />
          </span>
        ))}
      </div>
    </Marquee>
  );
}
