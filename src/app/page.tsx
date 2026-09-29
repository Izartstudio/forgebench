import { FaqSection } from "@/components/layout/faq-section";
import { Navbar } from "@/components/layout/navbar";
import { SiteFooter } from "@/components/layout/site-footer";
import { HomeHero } from "@/components/sections/home-hero";
import { OutcomesSection } from "@/components/sections/outcomes-section";
import { DeploymentTimeline } from "@/components/sections/deployment-timeline";
import { PilotCta } from "@/components/sections/pilot-cta";
import { PlatformAccordion } from "@/components/sections/platform-accordion";
import { SolutionOverview } from "@/components/sections/solution-overview";
import { JsonLd } from "@/components/seo/json-ld";
import { createMetadata } from "@/lib/seo/metadata";
import { softwareApplicationSchema } from "@/lib/seo/schema";

export const metadata: Metadata = createMetadata({
  title:
    "Forgebench — The Control Plane for Enterprise AI | AI Credentials, Budgets and Audit",
  description:
    "Give every developer and agent their own credential, ceiling and audit record. Govern every LLM call, see who owns it and what it costs. Self-hosted and model-agnostic.",
  path: "/",
  ogTitle: "Forgebench — The Control Plane for Enterprise AI",
  ogDescription:
    "Every call, governed. Every dollar, accounted for. Self-hosted.",
});

export default function Home() {
  return (
    <>
      <JsonLd data={softwareApplicationSchema()} />
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
        <FaqSection variant="homepage" />
        <SiteFooter />
      </div>
    </>
  );
}
import type { Metadata } from "next";
