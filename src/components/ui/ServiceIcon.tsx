"use client";

import { useDrawOnView } from "@/hooks/useDrawOnView";
import type { ServiceIcon as ServiceIconName } from "@/content/sections";

/**
 * Line icons for the services list. Every stroke carries `pathLength="1"` so
 * `useDrawOnView` can draw them in when the row enters the viewport.
 */
const PATHS: Record<ServiceIconName, React.ReactNode> = {
  target: (
    <>
      <circle cx="24" cy="24" r="16.5" pathLength="1" />
      <circle cx="24" cy="24" r="7" pathLength="1" />
      <line x1="24" y1="2.5" x2="24" y2="7.5" pathLength="1" />
      <line x1="24" y1="40.5" x2="24" y2="45.5" pathLength="1" />
      <line x1="2.5" y1="24" x2="7.5" y2="24" pathLength="1" />
      <line x1="40.5" y1="24" x2="45.5" y2="24" pathLength="1" />
      <circle cx="24" cy="24" r="1.6" fill="var(--color-accent)" stroke="none" />
    </>
  ),
  identity: (
    <>
      <rect x="5" y="5" width="38" height="38" rx="10" pathLength="1" />
      <path d="M16 15v9c0 4.4 3.6 8 8 8s8-3.6 8-8v-9" pathLength="1" />
    </>
  ),
  play: (
    <>
      <rect x="5" y="9" width="38" height="30" rx="8" pathLength="1" />
      <path d="M21 18l9 6-9 6z" pathLength="1" />
    </>
  ),
  chart: (
    <>
      <path d="M5 40L18 26l8 7L40 14" pathLength="1" />
      <path d="M31 13h10v10" pathLength="1" />
      <line x1="5" y1="45" x2="43" y2="45" opacity=".3" pathLength="1" />
    </>
  ),
};

export function ServiceIcon({ name }: { name: ServiceIconName }) {
  const ref = useDrawOnView({ duration: 1.2 });

  return (
    <svg
      ref={ref}
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden="true"
      className="w-full max-w-[92px] justify-self-end"
    >
      <g stroke="var(--color-ink)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        {PATHS[name]}
      </g>
    </svg>
  );
}
