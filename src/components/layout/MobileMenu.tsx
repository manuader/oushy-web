"use client";

import { useEffect, useRef, useState } from "react";
import { PillLink } from "@/components/ui/PillLink";
import { Star } from "@/components/ui/Star";
import { contact, navLinks, site } from "@/content/site";
import { clsx } from "@/lib/clsx";

/**
 * Below the desktop breakpoint the inline nav links are hidden, which used to
 * leave phones with no way to reach any section. This is that navigation:
 * a toggle in the header and a full-height panel.
 *
 * The panel closes on Escape, on any link activation, and whenever the viewport
 * grows past the breakpoint — otherwise rotating a phone to landscape could
 * leave an invisible open panel holding the scroll lock.
 */
export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const toggleRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!open) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    // Above the breakpoint the desktop nav is the real one; a panel left open
    // underneath would trap scroll with nothing visible to close.
    const mql = window.matchMedia("(min-width: 861px)");
    const onWide = () => mql.matches && setOpen(false);
    onWide();

    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKey);
    mql.addEventListener("change", onWide);

    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener("keydown", onKey);
      mql.removeEventListener("change", onWide);
    };
  }, [open]);

  // Send focus back to the toggle on close, so keyboard users don't lose place.
  useEffect(() => {
    if (!open) toggleRef.current?.blur();
  }, [open]);

  return (
    <>
      <button
        ref={toggleRef}
        type="button"
        data-hover
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="menu-mobile"
        aria-label={open ? "Cerrar menú" : "Abrir menú"}
        className={clsx(
          "relative z-[210] -mr-2 flex size-11 items-center justify-center rounded-full",
          // Written out rather than composed: Tailwind only sees literal
          // class strings in the source, so a template would never be emitted.
          "min-[861px]:hidden",
        )}
      >
        {/* Two bars that cross into an X. Animating them beats swapping icons:
            there is no flash between states. */}
        <span aria-hidden="true" className="relative block h-3 w-6">
          <span
            className={clsx(
              "absolute left-0 block h-[1.6px] w-6 rounded-full bg-ink",
              "transition-transform duration-300 ease-[var(--ease-out-expo)]",
              open ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0",
            )}
          />
          <span
            className={clsx(
              "absolute left-0 block h-[1.6px] w-6 rounded-full bg-ink",
              "transition-transform duration-300 ease-[var(--ease-out-expo)]",
              open ? "top-1/2 -translate-y-1/2 -rotate-45" : "top-full",
            )}
          />
        </span>
      </button>

      <div
        id="menu-mobile"
        ref={panelRef}
        // `hidden` rather than unmounting keeps the id stable for aria-controls.
        hidden={!open}
        className={clsx(
          "fixed inset-0 z-[200] flex flex-col justify-center gap-2 bg-cream px-[clamp(20px,7vw,56px)]",
          "min-[861px]:hidden",
        )}
      >
        <nav aria-label="Principal" className="flex flex-col">
          {navLinks.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 border-b border-rule py-5 font-display text-[clamp(28px,8vw,44px)] font-medium leading-tight"
              style={
                open
                  ? { animation: `fade-up .5s var(--ease-out-expo) ${0.05 + i * 0.06}s backwards` }
                  : undefined
              }
            >
              <Star size={12} />
              {link.label.toLowerCase()}
            </a>
          ))}
        </nav>

        <div
          className="mt-9 flex flex-col gap-4"
          style={open ? { animation: "fade-up .5s var(--ease-out-expo) .3s backwards" } : undefined}
        >
          <PillLink href={contact.whatsapp} magnetic={false} className="text-center">
            INICIAR PROYECTO ↗
          </PillLink>
          <a
            href={contact.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="text-center font-mono text-[11px] tracking-[.18em] text-muted"
          >
            {contact.instagramHandle}
          </a>
          <p className="text-center font-mono text-[10px] tracking-[.2em] text-muted">
            {site.location}
          </p>
        </div>
      </div>
    </>
  );
}
