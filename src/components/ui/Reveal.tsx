"use client";

import type { ElementType, ReactNode } from "react";
import { useInView } from "@/hooks/useInView";
import { useReducedMotion } from "@/hooks/useMediaQuery";
import { clsx } from "@/lib/clsx";

type RevealVariant = "fade" | "clip";

interface RevealProps extends React.HTMLAttributes<HTMLElement> {
  children: ReactNode;
  /** `fade` rises into place; `clip` wipes upward like a title reveal. */
  variant?: RevealVariant;
  /** Stagger in seconds. */
  delay?: number;
  as?: ElementType;
}

const HIDDEN: Record<RevealVariant, React.CSSProperties> = {
  fade: { opacity: 0, transform: "translateY(30px)" },
  clip: { opacity: 1, transform: "translateY(55%)", clipPath: "inset(0 -6% 100% -6%)" },
};

const VISIBLE: Record<RevealVariant, React.CSSProperties> = {
  fade: { opacity: 1, transform: "translateY(0)" },
  clip: { opacity: 1, transform: "translateY(0)", clipPath: "inset(-12% -6% -14% -6%)" },
};

const TRANSITION: Record<RevealVariant, string> = {
  fade: "opacity 1s var(--ease-out-expo), transform 1.15s var(--ease-out-expo)",
  clip: "opacity .9s var(--ease-out-expo), transform 1.1s var(--ease-out-expo), clip-path 1.1s var(--ease-out-expo)",
};

/**
 * Reveals its children the first time they scroll into view.
 * Marked with `data-reveal` so the no-script fallback can force it visible.
 */
export function Reveal({
  children,
  variant = "fade",
  delay = 0,
  as: Tag = "div",
  className,
  style,
  ...rest
}: RevealProps) {
  // `clip` reveals fire a little earlier so long headlines aren't cut off.
  const { ref, inView } = useInView<HTMLElement>(
    variant === "clip" ? { threshold: 0, rootMargin: "0px 0px -12% 0px" } : undefined,
  );

  // With reduced motion there is nothing to reveal — show the content outright
  // rather than transitioning it in over 1ms.
  const reducedMotion = useReducedMotion();
  const shown = inView || reducedMotion;

  return (
    <Tag
      ref={ref}
      data-reveal={variant}
      className={clsx("will-change-[opacity,transform]", className)}
      style={{
        ...(shown ? VISIBLE[variant] : HIDDEN[variant]),
        transition: TRANSITION[variant],
        transitionDelay: `${delay}s`,
        ...style,
      }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
