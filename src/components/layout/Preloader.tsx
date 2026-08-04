"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useReducedMotion } from "@/hooks/useMediaQuery";
import { site } from "@/content/site";
import { brand, sized } from "@/lib/brand";

const CURTAIN_MS = 2600;

/**
 * Full-bleed intro curtain that lifts away after the mark has drawn itself in.
 * It unmounts once the animation finishes so it never traps pointer events.
 */
export function Preloader() {
  const [visible, setVisible] = useState(true);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), CURTAIN_MS);
    return () => clearTimeout(timer);
  }, []);

  // The curtain is pure choreography — skip it entirely for reduced motion.
  if (!visible || reducedMotion) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[400] flex flex-col items-center justify-center gap-[26px] bg-cream will-change-transform"
      style={{ animation: "curtain-up .9s var(--ease-in-out-expo) 1.45s forwards" }}
    >
      <Image
        {...sized(brand.mark, 240)}
        alt=""
        priority
        className="h-[clamp(96px,16vh,150px)] w-auto will-change-[clip-path,transform]"
        style={{ animation: "mark-in 1s var(--ease-out-expo) .1s backwards" }}
      />
      <span
        className="font-mono text-[10.5px] uppercase tracking-[.34em] text-muted"
        style={{ animation: "fade-up .8s var(--ease-out-expo) .55s backwards" }}
      >
        {site.tagline}
      </span>
    </div>
  );
}
