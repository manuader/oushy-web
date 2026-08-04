"use client";

import type { ReactNode } from "react";
import { useScrollSkew } from "@/hooks/useScrollSkew";
import { clsx } from "@/lib/clsx";

interface MarqueeProps {
  /** One pass of the content. It is duplicated to make the loop seamless. */
  children: ReactNode;
  /** Seconds for a full loop. */
  duration?: number;
  reverse?: boolean;
  /** Skew the band with scroll velocity. */
  skew?: boolean;
  className?: string;
  trackClassName?: string;
}

/**
 * An infinite horizontal band. The track holds two identical copies of the
 * children and slides by exactly -50%, so the seam is never visible.
 */
export function Marquee({
  children,
  duration = 26,
  reverse = false,
  skew = true,
  className,
  trackClassName,
}: MarqueeProps) {
  const skewRef = useScrollSkew<HTMLDivElement>();

  return (
    <div
      ref={skew ? skewRef : undefined}
      className={clsx("flex overflow-hidden will-change-transform", className)}
    >
      <div
        className={clsx(
          "inline-flex w-max flex-none items-center animate-marquee will-change-transform",
          trackClassName,
        )}
        style={
          {
            "--marquee-duration": `${duration}s`,
            animationDirection: reverse ? "reverse" : "normal",
          } as React.CSSProperties
        }
      >
        {children}
        {/* Duplicate pass — decorative, so it is hidden from screen readers. */}
        <div aria-hidden="true" className="contents">
          {children}
        </div>
      </div>
    </div>
  );
}
