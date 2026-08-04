"use client";

import Image from "next/image";
import { useRef } from "react";
import { useTicker } from "@/hooks/useTicker";
import { useReducedMotion } from "@/hooks/useMediaQuery";
import { brand, sized } from "@/lib/brand";
import { clamp } from "@/lib/ticker";
import { clsx } from "@/lib/clsx";

interface RollingStarProps {
  /** Rendered diameter, any CSS length. */
  size?: string;
  /** Height of the band the star travels through. */
  height?: string;
  className?: string;
}

/**
 * A star that rolls across the viewport, left to right, driven by scroll
 * position rather than by a timer — so it advances only while the visitor is
 * moving, and reverses when they scroll back up.
 *
 * The source clip only "boils" (hand-drawn frame jitter); it never actually
 * turns, so the rotation here is derived from the distance travelled:
 * `angle = distance / radius`. That is the real rolling relationship, which is
 * what stops it from looking like a sticker sliding sideways.
 */
export function RollingStar({
  size = "clamp(64px, 9vw, 132px)",
  height = "clamp(120px, 20vh, 220px)",
  className,
}: RollingStarProps) {
  const bandRef = useRef<HTMLDivElement | null>(null);
  const starRef = useRef<HTMLDivElement | null>(null);
  const reducedMotion = useReducedMotion();

  useTicker(({ viewportHeight }) => {
    const band = bandRef.current;
    const star = starRef.current;
    if (!band || !star) return;

    const rect = band.getBoundingClientRect();
    // 0 when the band first touches the bottom edge, 1 once it has fully left
    // the top — so the crossing spans the whole time the band is on screen.
    const progress = clamp(
      (viewportHeight - rect.top) / (viewportHeight + rect.height),
      0,
      1,
    );

    const diameter = star.offsetWidth;
    const travel = window.innerWidth + diameter * 2;
    const x = -diameter + progress * travel;

    // Rolling without slipping: a circle turns 1 radian per radius travelled.
    const angle = (x / (diameter / 2)) * (180 / Math.PI);

    // The -50% keeps it vertically centred: writing `transform` here would
    // otherwise clobber a Tailwind -translate-y-1/2.
    star.style.transform = `translate3d(${x.toFixed(1)}px, -50%, 0) rotate(${angle.toFixed(1)}deg)`;
  }, !reducedMotion);

  return (
    <div
      ref={bandRef}
      aria-hidden="true"
      className={clsx("relative w-full overflow-x-clip", className)}
      style={{ height }}
    >
      <div
        ref={starRef}
        className="absolute left-0 top-1/2 will-change-transform"
        style={{ width: size, transform: "translate3d(0, -50%, 0)" }}
      >
        <Image
          {...sized(brand.starMotion, 240)}
          alt=""
          unoptimized
          className="block h-auto w-full"
        />
      </div>
    </div>
  );
}
