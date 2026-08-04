"use client";

import { useEffect, useState } from "react";

/**
 * SSR-safe media query subscription. Always returns `false` on the server and
 * on the first client render, so markup stays consistent during hydration.
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = () => setMatches(mql.matches);

    onChange();
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, [query]);

  return matches;
}

/** True on devices with a precise pointer — where hover effects make sense. */
export function usePointerFine(): boolean {
  return useMediaQuery("(pointer: fine)");
}

/** True when the visitor asked the OS to reduce motion. */
export function useReducedMotion(): boolean {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}
