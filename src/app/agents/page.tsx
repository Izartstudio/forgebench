import type { Metadata } from "next";
import Image from "next/image";

import { FaqSection } from "@/components/layout/faq-section";
import { Navbar } from "@/components/layout/navbar";
import { SiteFooter } from "@/components/layout/site-footer";
import { AudienceHero } from "@/components/sections/audience-hero";
import { AgentDeployment } from "@/components/sections/agent-deployment";
import { CredentialsStrip } from "@/components/sections/credentials-strip";
import { DeveloperCapabilities } from "@/components/sections/developer-capabilities";
import { DeveloperCallPath } from "@/components/sections/developer-call-path";
import { DeploymentTimeline } from "@/components/sections/deployment-timeline";
import { PilotCta } from "@/components/sections/pilot-cta";
import { createMetadata } from "@/lib/seo/metadata";

import styles from "./page.module.css";

export const metadata: Metadata = createMetadata({
  title: "For Agents",
  description: "Know every AI agent running across your organization and govern every call it makes.",
  path: "/agents",
});

export default function AgentsPage() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <AudienceHero
          id="agents-title"
          eyebrow={<>Self-hosted deployment <i aria-hidden="true" /> Model agnostic</>}
          title={<>Know Every Agent<br />You&apos;re Running.</>}
          description="Govern Every Call It Makes."
        >
          <div className={styles.routingFrame}>
            <Image src="/images/agents/routing.webp" alt="Forgebench model routing dashboard" fill preload unoptimized sizes="(max-width: 767px) 64vw, 43vw" />
          </div>
          <div className={styles.dashboardFrame}>
            <Image src="/images/agents/dashboard.webp" alt="Forgebench agent governance dashboard" fill preload unoptimized sizes="(max-width: 767px) 92vw, 58vw" />
          </div>
        </AudienceHero>
        <CredentialsStrip />
        <DeveloperCapabilities variant="agents" />
        <DeveloperCallPath variant="agents" />
        <AgentDeployment />
        <DeploymentTimeline variant="agents" />
        <PilotCta />
      </main>
      <div className="faq-footer-gradient">
        <FaqSection />
        <SiteFooter />
      </div>
    </>
  );
}
