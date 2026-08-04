import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { Contact } from "@/components/sections/Contact";
import { DisciplinesBand } from "@/components/sections/DisciplinesBand";
import { Feed } from "@/components/sections/Feed";
import { Hero } from "@/components/sections/Hero";
import { Industries } from "@/components/sections/Industries";
import { Manifesto } from "@/components/sections/Manifesto";
import { Process } from "@/components/sections/Process";
import { Services } from "@/components/sections/Services";
import { Studio } from "@/components/sections/Studio";
import { RollingStar } from "@/components/ui/RollingStar";

/**
 * The OUSHY Studio landing page. Each section owns its own copy and motion —
 * this file is only the running order.
 */
export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <DisciplinesBand />
        <Studio />
        {/* The star rolls across the seam between the two sections. */}
        <RollingStar />
        <Services />
        <Process />
        <Industries />
        <Manifesto />
        <Feed />
        <Contact />
      </main>
      <SiteFooter />
    </>
  );
}
