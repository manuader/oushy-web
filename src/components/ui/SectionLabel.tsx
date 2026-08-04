import { Reveal } from "@/components/ui/Reveal";
import { Star } from "@/components/ui/Star";
import { clsx } from "@/lib/clsx";

interface SectionLabelProps {
  /** Two-digit section number, e.g. `"03"`. Omit for unnumbered sections. */
  index?: string;
  label: string;
  /** Rendered on the accent-coloured manifesto background. */
  tone?: "default" | "inverted";
}

/** The small starred eyebrow that opens every section. */
export function SectionLabel({ index, label, tone = "default" }: SectionLabelProps) {
  const inverted = tone === "inverted";

  return (
    <Reveal className="flex items-center gap-2.5">
      <Star size={12} color={inverted ? "var(--color-cream)" : "var(--color-accent)"} />
      <span
        className={clsx(
          "font-mono text-[11px] tracking-[.22em]",
          inverted ? "text-cream/80" : "text-muted",
        )}
      >
        {index ? `${index} · ${label}` : label}
      </span>
    </Reveal>
  );
}
