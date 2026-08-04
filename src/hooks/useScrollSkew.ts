"use client";

import { useRef } from "react";
import { useTicker } from "@/hooks/useTicker";
import { useReducedMotion } from "@/hooks/useMediaQuery";
import { clamp, damp } from "@/lib/ticker";

const MAX_SKEW = 5;

/**
 * Skews an element proportionally to scroll velocity — the effect that makes
 * the marquee bands feel like they lag behind the page.
 */
export function useScrollSkew<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T | null>(null);
  const skew = useRef(0);
  const reducedMotion = useReducedMotion();

  useTicker(({ velocity }) => {
    const element = ref.current;
    if (!element) return;

    const target = clamp(velocity * 0.35, -MAX_SKEW, MAX_SKEW);
    skew.current = damp(skew.current, target);

    if (Math.abs(skew.current) < 0.02 && target === 0) {
      element.style.transform = "skewX(0deg)";
      return;
    }

    element.style.transform = `skewX(${skew.current.toFixed(2)}deg)`;
  }, !reducedMotion);

  return ref;
}
