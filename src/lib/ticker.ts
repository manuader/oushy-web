/**
 * A single shared `requestAnimationFrame` loop for the whole page.
 *
 * Every scroll-driven effect (parallax, skew, cursor, word scrub, process
 * scrub) subscribes here instead of opening its own rAF, so the page runs one
 * loop that only spins while at least one subscriber is mounted.
 */

export interface Frame {
  /** Current `window.scrollY`. */
  y: number;
  /** Pixels scrolled since the previous frame. */
  velocity: number;
  /** Current viewport height. */
  viewportHeight: number;
}

type Subscriber = (frame: Frame) => void;

const subscribers = new Set<Subscriber>();
let rafId: number | null = null;
let lastY = 0;

function loop() {
  const y = window.scrollY;
  const frame: Frame = {
    y,
    velocity: y - lastY,
    viewportHeight: window.innerHeight,
  };
  lastY = y;

  for (const subscriber of subscribers) {
    subscriber(frame);
  }

  rafId = requestAnimationFrame(loop);
}

/** Registers a per-frame callback. Returns an unsubscribe function. */
export function subscribe(subscriber: Subscriber): () => void {
  subscribers.add(subscriber);

  if (rafId === null) {
    lastY = window.scrollY;
    rafId = requestAnimationFrame(loop);
  }

  return () => {
    subscribers.delete(subscriber);
    if (subscribers.size === 0 && rafId !== null) {
      cancelAnimationFrame(rafId);
      rafId = null;
    }
  };
}

/** Frame-rate independent easing towards a target value. */
export function damp(current: number, target: number, factor = 0.1): number {
  return current + (target - current) * factor;
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}
