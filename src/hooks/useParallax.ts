"use client";

import { useRef } from "react";
import { useTicker } from "@/hooks/useTicker";
import { useReducedMotion } from "@/hooks/useMediaQuery";
import { damp } from "@/lib/ticker";

/**
 * Translates an element vertically relative to its distance from the centre of
 * the viewport. Negative speeds move against the scroll direction.
 */
export function useParallax<T extends HTMLElement = HTMLDivElement>(speed = 0.05) {
  const ref = useRef<T | null>(null);
  const offset = useRef(0);
  const reducedMotion = useReducedMotion();

  useTicker(({ viewportHeight }) => {
    const element = ref.current;
    if (!element) return;

    const rect = element.getBoundingClientRect();
    if (rect.bottom < -300 || rect.top > viewportHeight + 300) return;

    // Undo the offset we already applied so the measurement stays absolute.
    const naturalTop = rect.top - offset.current;
    const target = (naturalTop + rect.height / 2 - viewportHeight / 2) * speed;

    offset.current = damp(offset.current, target);
    element.style.transform = `translate3d(0, ${offset.current.toFixed(2)}px, 0)`;
  }, !reducedMotion);

  return ref;
}
