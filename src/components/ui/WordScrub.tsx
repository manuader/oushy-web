"use client";

import { useMemo, useRef, useState } from "react";
import { useTicker } from "@/hooks/useTicker";
import { useReducedMotion } from "@/hooks/useMediaQuery";
import { clamp } from "@/lib/ticker";
import { clsx } from "@/lib/clsx";

interface WordScrubProps {
  /** Plain text — it is split on whitespace, one span per word. */
  text: string;
  className?: string;
}

const DIM = 0.13;

/**
 * Large statement copy that lights up word by word as the block travels
 * through the viewport. With reduced motion the text renders fully lit.
 */
export function WordScrub({ text, className }: WordScrubProps) {
  const ref = useRef<HTMLParagraphElement | null>(null);
  const words = useMemo(() => text.trim().split(/\s+/), [text]);
  const reducedMotion = useReducedMotion();
  const [lit, setLit] = useState(0);

  useTicker(({ viewportHeight }) => {
    const element = ref.current;
    if (!element) return;

    const rect = element.getBoundingClientRect();
    if (rect.bottom < 0 || rect.top > viewportHeight) return;

    const progress = clamp(
      (viewportHeight * 0.9 - rect.top) / (rect.height + viewportHeight * 0.45),
      0,
      1,
    );

    const next = Math.round(progress * words.length);
    setLit((current) => (current === next ? current : next));
  }, !reducedMotion);

  return (
    <p ref={ref} className={clsx("text-pretty", className)}>
      {words.map((word, index) => (
        <span
          key={`${word}-${index}`}
          className="transition-opacity duration-300 ease-linear"
          style={{ opacity: reducedMotion || index < lit ? 1 : DIM }}
        >
          {word}
          {index < words.length - 1 ? " " : ""}
        </span>
      ))}
    </p>
  );
}
