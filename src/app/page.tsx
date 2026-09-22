import { FaqSection } from "@/components/layout/faq-section";
import { Navbar } from "@/components/layout/navbar";
import { SiteFooter } from "@/components/layout/site-footer";
import { HomeHero } from "@/components/sections/home-hero";
import { OutcomesSection } from "@/components/sections/outcomes-section";
import { DeploymentTimeline } from "@/components/sections/deployment-timeline";
import { PilotCta } from "@/components/sections/pilot-cta";
import { PlatformAccordion } from "@/components/sections/platform-accordion";
import { SolutionOverview } from "@/components/sections/solution-overview";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <HomeHero />
        <SolutionOverview />
        <PlatformAccordion />
        <OutcomesSection />
        <DeploymentTimeline />
        <PilotCta />
      </main>
      <div className="faq-footer-gradient">
        <FaqSection />
        <SiteFooter />
      </div>
    </>
  );
}
