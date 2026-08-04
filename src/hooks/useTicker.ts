"use client";

import { useEffect, useRef } from "react";
import { subscribe, type Frame } from "@/lib/ticker";

/**
 * Runs `callback` on every animation frame while the component is mounted.
 * The callback is mirrored into a ref after each render, so consumers can pass
 * an inline function without re-subscribing to the loop on every render.
 */
export function useTicker(callback: (frame: Frame) => void, enabled = true) {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  });

  useEffect(() => {
    if (!enabled) return;
    return subscribe((frame) => callbackRef.current(frame));
  }, [enabled]);
}
