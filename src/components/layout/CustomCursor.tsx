"use client";

import { useEffect, useRef } from "react";
import { useTicker } from "@/hooks/useTicker";
import { usePointerFine, useReducedMotion } from "@/hooks/useMediaQuery";
import { damp } from "@/lib/ticker";

const IDLE_RING = 36;
const HOVER_RING = 62;

/**
 * Replaces the native cursor with a dot that tracks the pointer exactly and a
 * ring that trails behind it, expanding over anything marked `data-hover`.
 *
 * Only mounted for precise pointers and when motion is allowed — touch users
 * and reduced-motion visitors keep their native cursor.
 */
export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);
  const pointer = useRef({ x: -100, y: -100 });
  const ring = useRef({ x: -100, y: -100, size: IDLE_RING });

  const pointerFine = usePointerFine();
  const reducedMotion = useReducedMotion();
  const enabled = pointerFine && !reducedMotion;

  useEffect(() => {
    if (!enabled) return;

    document.documentElement.setAttribute("data-oushy-cursor", "");

    const onMove = (event: MouseEvent) => {
      pointer.current = { x: event.clientX, y: event.clientY };
    };

    const onOver = (event: MouseEvent) => {
      const target = event.target as Element | null;
      const hovering = Boolean(target?.closest?.("[data-hover]"));
      const element = ringRef.current;
      if (!element) return;

      ring.current.size = hovering ? HOVER_RING : IDLE_RING;
      element.style.width = `${ring.current.size}px`;
      element.style.height = `${ring.current.size}px`;
      element.style.borderColor = hovering ? "var(--color-accent)" : "rgb(84 87 79 / 0.5)";
      element.style.background = hovering ? "rgb(234 99 48 / 0.07)" : "transparent";
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onOver);

    return () => {
      document.documentElement.removeAttribute("data-oushy-cursor");
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
    };
  }, [enabled]);

  useTicker(() => {
    const dot = dotRef.current;
    const ringEl = ringRef.current;
    if (!dot || !ringEl) return;

    dot.style.transform = `translate(${pointer.current.x - 4}px, ${pointer.current.y - 4}px)`;

    ring.current.x = damp(ring.current.x, pointer.current.x, 0.16);
    ring.current.y = damp(ring.current.y, pointer.current.y, 0.16);

    const half = ring.current.size / 2;
    ringEl.style.transform = `translate(${ring.current.x - half}px, ${ring.current.y - half}px)`;
  }, enabled);

  if (!enabled) return null;

  return (
    <div aria-hidden="true">
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[300] size-2 rounded-full bg-accent"
        style={{ transform: "translate(-100px, -100px)" }}
      />
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[299] rounded-full border-[1.2px] border-ink/50 transition-[width,height,border-color,background-color] duration-[250ms]"
        style={{ width: IDLE_RING, height: IDLE_RING, transform: "translate(-100px, -100px)" }}
      />
    </div>
  );
}
