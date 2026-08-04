"use client";

import { useEffect, useRef } from "react";
import { usePointerFine, useReducedMotion } from "@/hooks/useMediaQuery";
import { clamp } from "@/lib/ticker";

const MAX_X = 11;
const MAX_Y = 8;

/**
 * Pulls an element slightly towards the cursor while hovering it, then springs
 * it back on leave. Disabled on coarse pointers and with reduced motion.
 */
export function useMagnetic<T extends HTMLElement = HTMLAnchorElement>() {
  const ref = useRef<T | null>(null);
  const pointerFine = usePointerFine();
  const reducedMotion = useReducedMotion();
  const enabled = pointerFine && !reducedMotion;

  useEffect(() => {
    const element = ref.current;
    if (!element || !enabled) return;

    const onMove = (event: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const dx = (event.clientX - rect.left - rect.width / 2) * 0.24;
      const dy = (event.clientY - rect.top - rect.height / 2) * 0.34;

      element.style.transition = "transform .12s linear";
      element.style.transform = `translate(${clamp(dx, -MAX_X, MAX_X).toFixed(1)}px, ${clamp(dy, -MAX_Y, MAX_Y).toFixed(1)}px)`;
    };

    const onLeave = () => {
      element.style.transition = "transform .55s var(--ease-out-expo)";
      element.style.transform = "translate(0, 0)";
    };

    element.addEventListener("mousemove", onMove);
    element.addEventListener("mouseleave", onLeave);
    return () => {
      element.removeEventListener("mousemove", onMove);
      element.removeEventListener("mouseleave", onLeave);
      element.style.transform = "";
    };
  }, [enabled]);

  return ref;
}
