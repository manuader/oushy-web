import Image from "next/image";
import { HandwrittenNote } from "@/components/ui/HandwrittenNote";
import { Levitate } from "@/components/ui/Levitate";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Star } from "@/components/ui/Star";
import { services, servicesSection, type Service } from "@/content/sections";
import { sectionIds } from "@/content/site";
import { brand, serviceIcons, sized } from "@/lib/brand";
import { clsx } from "@/lib/clsx";

/* Stacked on small screens, four editorial columns from `lg` up. */
const ROW_GRID =
  "flex flex-col gap-5 lg:grid lg:grid-cols-[clamp(44px,5vw,80px)_1.05fr_1fr_clamp(64px,8vw,104px)] lg:items-start lg:gap-[clamp(18px,3vw,44px)]";

function ServiceRow({ service, index }: { service: Service; index: number }) {
  return (
    <div
      data-hover
      className={clsx(
        ROW_GRID,
        "relative border-t border-rule py-11 transition-transform duration-500 ease-[var(--ease-out-expo)] hover:translate-x-2.5",
      )}
    >
      <span className="font-mono text-[13px] text-accent">({service.index})</span>

      <Reveal
        as="h3"
        className="m-0 font-display text-[clamp(28px,3.4vw,50px)] font-semibold leading-none tracking-[-.01em]"
      >
        {service.title}
      </Reveal>

      <Reveal delay={0.1} as="ul" className="m-0 flex list-none flex-col gap-3 p-0">
        {service.items.map((item) => (
          <li key={item} className="flex items-start gap-2.5">
            <Star size={10} className="mt-1.5" />
            <span className="text-[15.5px] leading-[1.5] text-ink-softer">{item}</span>
          </li>
        ))}
      </Reveal>

      {/* Each icon floats on its own clock: the period grows down the list and
          every one starts at a different point in its cycle, so the column
          never reads as four things bobbing in time. */}
      <Levitate
        distance={-9}
        duration={4.2 + index * 0.37}
        sway={1.6}
        breath={0.1}
        phase={index * 1.45}
        className="w-full max-w-[59px] justify-self-end"
      >
        <Image
          {...sized(serviceIcons[service.icon], 128)}
          alt=""
          aria-hidden="true"
          className="block w-full"
        />
      </Levitate>
    </div>
  );
}

/** The four service pillars, one editorial row each. */
export function Services() {
  return (
    <section
      id={sectionIds.services}
      aria-labelledby="servicios-heading"
      className="relative border-t border-rule px-[clamp(20px,4.5vw,64px)] pb-[clamp(90px,13vh,140px)] pt-[clamp(80px,12vh,130px)]"
    >
      {/* Services was the one numbered section without a drawn motif of its
          own. It sits in the bottom padding, clear of the last row. */}
      <Reveal className="pointer-events-none absolute bottom-[clamp(12px,2vh,24px)] left-[clamp(14px,3vw,52px)]">
        <Image
          {...sized(brand.grayStar, 240)}
          alt=""
          aria-hidden="true"
          className="block h-auto w-[clamp(54px,7vw,108px)] origin-center opacity-55 will-change-transform"
          style={{ animation: "spin 60s linear infinite" }}
        />
      </Reveal>

      <div className="relative mx-auto max-w-[1280px]">
        <SectionLabel index={servicesSection.index} label={servicesSection.label} />

        <div className="mt-[30px] flex flex-wrap items-end justify-between gap-x-10 gap-y-6">
          <Reveal
            as="h2"
            variant="clip"
            id="servicios-heading"
            className="m-0 font-display text-[clamp(52px,8vw,122px)] font-semibold leading-[.95] tracking-[-.015em]"
          >
            {servicesSection.title}{" "}
            <Star size="clamp(26px, 3.5vw, 52px)" className="inline-block align-[.06em]" />
          </Reveal>

          <Reveal delay={0.15}>
            <HandwrittenNote variant="circle" rotate={-3}>
              {servicesSection.note}
            </HandwrittenNote>
          </Reveal>
        </div>

        <div className="mt-[clamp(44px,7vh,70px)]">
          {services.map((service, index) => (
            <ServiceRow key={service.index} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
