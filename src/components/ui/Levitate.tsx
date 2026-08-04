import type { CSSProperties, ReactNode } from "react";
import { clsx } from "@/lib/clsx";

interface LevitateProps {
  children: ReactNode;
  /** Vertical travel in pixels. Negative values rise. */
  distance?: number;
  /** Seconds for one rise or one fall. */
  duration?: number;
  /** Resting rotation, in degrees, that the sway oscillates around. */
  tilt?: number;
  /** Degrees of rotation to either side of `tilt`. */
  sway?: number;
  /** How far the opacity dips at the bottom of the drift, 0–1. */
  breath?: number;
  /**
   * Seconds to advance the cycle by at mount. Give sibling elements different
   * values and they stop drifting in lockstep, which is the difference between
   * a set of objects floating and a row of things bobbing on a timer.
   */
  phase?: number;
  className?: string;
}

/**
 * Makes its children float — a slow vertical drift with a rotational sway
 * layered on top.
 *
 * The two motions run on separate elements at deliberately unrelated periods
 * (the sway is ~1.31× the drift), so they drift in and out of phase instead of
 * looping in visible lockstep. That is what keeps it feeling weightless rather
 * than mechanical.
 */
export function Levitate({
  children,
  distance = -16,
  duration = 7,
  tilt = 0,
  sway = 0,
  breath = 0,
  phase = 0,
  className,
}: LevitateProps) {
  const driftStyle = {
    "--levitate-distance": `${distance}px`,
    animation: `levitate ${duration}s var(--ease-float) infinite alternate`,
    // A negative delay starts the animation already in progress.
    animationDelay: `${-phase}s`,
  } as CSSProperties;

  const swayStyle = {
    "--sway-from": `${tilt - sway}deg`,
    "--sway-to": `${tilt + sway}deg`,
    "--sway-opacity-from": 1 - breath,
    "--sway-opacity-to": 1,
    // Resting state, kept outside the keyframes so reduced motion still lands
    // on the intended tilt instead of snapping back to square.
    rotate: `${tilt}deg`,
    animation: `sway ${(duration * 1.31).toFixed(2)}s var(--ease-float) infinite alternate`,
    // Offset from the drift's phase so the two layers stay decorrelated.
    animationDelay: `${-(phase * 0.63)}s`,
  } as CSSProperties;

  return (
    <div className={clsx("will-change-transform", className)} style={driftStyle}>
      <div className="will-change-[rotate,opacity]" style={swayStyle}>
        {children}
      </div>
    </div>
  );
}
