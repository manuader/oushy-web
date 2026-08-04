"use client";

import { useState } from "react";
import { useTicker } from "@/hooks/useTicker";

/** True once the page has scrolled past `threshold` pixels. */
export function useScrolled(threshold = 28): boolean {
  const [scrolled, setScrolled] = useState(false);

  useTicker(({ y }) => {
    setScrolled((current) => {
      const next = y > threshold;
      return next === current ? current : next;
    });
  });

  return scrolled;
}
