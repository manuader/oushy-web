"use client";

import { useEffect } from "react";
import { useInView } from "@/hooks/useInView";

interface UseDrawOnViewOptions {
  /** Seconds each stroke takes to draw. */
  duration?: number;
  /** Seconds before the first stroke starts. */
  delay?: number;
  /** Seconds added per subsequent stroke. */
  stagger?: number;
}

/**
 * Returns a ref for an `<svg>`. Once it scrolls into view, every nested shape
 * carrying `pathLength="1"` is drawn in, one after the other.
 *
 * The retracted starting state lives in `globals.css` so the strokes are
 * already hidden on the very first paint.
 */
export function useDrawOnView({
  duration = 1.3,
  delay = 0.1,
  stagger = 0.18,
}: UseDrawOnViewOptions = {}) {
  const { ref, inView } = useInView<SVGSVGElement>({ threshold: 0.35 });

  useEffect(() => {
    if (!inView) return;

    const strokes = ref.current?.querySelectorAll<SVGGeometryElement>('[pathLength="1"]');
    strokes?.forEach((stroke, index) => {
      stroke.style.transition = `stroke-dashoffset ${duration}s var(--ease-draw) ${delay + index * stagger}s`;
      stroke.style.strokeDashoffset = "0";
    });
  }, [inView, duration, delay, stagger, ref]);

  return ref;
}
