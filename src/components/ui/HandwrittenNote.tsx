"use client";

import { useDrawOnView } from "@/hooks/useDrawOnView";
import { clsx } from "@/lib/clsx";

interface HandwrittenNoteProps {
  children: string;
  /** `underline` scribbles beneath the words; `circle` loops around them. */
  variant?: "underline" | "circle";
  /** Degrees of tilt applied to the handwriting. */
  rotate?: number;
  className?: string;
}

/**
 * A handwritten aside with a stroke that draws itself in when it scrolls
 * into view — the studio's way of annotating its own copy.
 */
export function HandwrittenNote({
  children,
  variant = "underline",
  rotate = -2.5,
  className,
}: HandwrittenNoteProps) {
  const svgRef = useDrawOnView({ duration: variant === "circle" ? 1.4 : 1.1 });

  if (variant === "circle") {
    return (
      <div className={clsx("relative inline-block px-6 py-3.5", className)}>
        <span
          className="inline-block whitespace-nowrap font-script text-[clamp(16px,1.7vw,22px)] text-accent"
          style={{ transform: `rotate(${rotate}deg)` }}
        >
          {children}
        </span>
        <svg
          ref={svgRef}
          viewBox="0 0 260 70"
          preserveAspectRatio="none"
          fill="none"
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 h-full w-full"
        >
          <ellipse
            cx="130"
            cy="35"
            rx="126"
            ry="31"
            stroke="var(--color-accent)"
            strokeWidth="1.6"
            pathLength="1"
            transform="rotate(-2 130 35)"
          />
        </svg>
      </div>
    );
  }

  return (
    <div className={clsx("relative inline-block", className)}>
      <span
        className="inline-block font-script text-[clamp(17px,1.8vw,24px)] text-accent"
        style={{ transform: `rotate(${rotate}deg)` }}
      >
        {children}
      </span>
      <svg
        ref={svgRef}
        width="100%"
        height="12"
        viewBox="0 0 200 12"
        preserveAspectRatio="none"
        fill="none"
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-3 left-0 w-full"
      >
        <path
          d="M2 8 C 34 2, 68 11, 102 6 S 168 3, 198 7"
          stroke="var(--color-accent)"
          strokeWidth="2"
          strokeLinecap="round"
          pathLength="1"
        />
      </svg>
    </div>
  );
}
