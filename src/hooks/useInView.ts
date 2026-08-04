"use client";

import { useEffect, useRef, useState } from "react";

interface UseInViewOptions extends IntersectionObserverInit {
  /** Stop observing after the first intersection. Defaults to true. */
  once?: boolean;
}

/**
 * Observes an element and reports when it enters the viewport.
 * Used by every scroll-triggered reveal on the page.
 */
export function useInView<T extends Element = HTMLDivElement>({
  once = true,
  threshold = 0.12,
  rootMargin = "0px 0px -5% 0px",
  root,
}: UseInViewOptions = {}) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) observer.unobserve(entry.target);
        } else if (!once) {
          setInView(false);
        }
      },
      { threshold, rootMargin, root },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [once, threshold, rootMargin, root]);

  return { ref, inView } as const;
}
