"use client";

import type { AnchorHTMLAttributes, ReactNode } from "react";
import { useMagnetic } from "@/hooks/useMagnetic";
import { clsx } from "@/lib/clsx";

type PillVariant = "solid" | "outline" | "ink";
type PillSize = "sm" | "md";

interface PillLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children: ReactNode;
  variant?: PillVariant;
  size?: PillSize;
  /** Pull the button towards the cursor on hover. */
  magnetic?: boolean;
}

const VARIANTS: Record<PillVariant, string> = {
  solid: "bg-accent text-cream hover:bg-accent-dark",
  outline: "border-[1.4px] border-ink hover:bg-ink hover:text-cream",
  ink: "bg-ink text-cream hover:bg-accent",
};

const SIZES: Record<PillSize, string> = {
  sm: "px-5 py-2.5 text-[11px]",
  md: "px-8 py-[18px] text-[12px]",
};

/**
 * The studio's pill-shaped call to action, in its three brand variants.
 * External links get `rel="noopener"` automatically.
 */
export function PillLink({
  href,
  children,
  variant = "solid",
  size = "md",
  magnetic = true,
  className,
  ...props
}: PillLinkProps) {
  const ref = useMagnetic<HTMLAnchorElement>();
  const isExternal = href.startsWith("http");

  return (
    <a
      ref={magnetic ? ref : undefined}
      href={href}
      data-hover
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      className={clsx(
        "inline-block rounded-full font-mono tracking-[.14em] transition-[background-color,color,border-color] duration-[350ms]",
        VARIANTS[variant],
        SIZES[size],
        className,
      )}
      {...props}
    >
      {children}
    </a>
  );
}
