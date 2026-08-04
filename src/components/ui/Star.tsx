import { clsx } from "@/lib/clsx";

interface StarProps {
  /** Any CSS length — numbers are treated as pixels. */
  size?: number | string;
  className?: string;
  /** Any valid CSS colour. Defaults to the OUSHY accent. */
  color?: string;
  style?: React.CSSProperties;
}

/**
 * The four-point sparkle used as the studio's punctuation mark.
 * Purely decorative, so it is hidden from assistive technology.
 */
export function Star({
  size = 12,
  className,
  color = "var(--color-accent)",
  style,
}: StarProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
      className={clsx("shrink-0", className)}
      style={{ width: size, height: size, ...style }}
    >
      <path
        d="M12 0Q12.5 10.8 16.6 7.4Q13.2 11.5 24 12Q13.2 12.5 16.6 16.6Q12.5 13.2 12 24Q11.5 13.2 7.4 16.6Q10.8 12.5 0 12Q10.8 11.5 7.4 7.4Q11.5 10.8 12 0Z"
        fill={color}
      />
    </svg>
  );
}
