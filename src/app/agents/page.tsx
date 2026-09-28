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
import { JsonLd } from "@/components/seo/json-ld";
import { softwareApplicationSchema } from "@/lib/seo/schema";

import styles from "./page.module.css";

export const metadata: Metadata = createMetadata({
  title:
    "Forgebench for Agent Management — The Control Plane for Enterprise AI Agents",
  description:
    "Every agent registered before its first call, on its own credential, with a ceiling that refuses and a record that holds. Self-hosted and model-agnostic.",
  path: "/agents",
  image: "/images/agents/dashboard.webp",
  keywords: [
    "AI agent management",
    "AI agent control plane",
    "agent governance",
    "AI agent audit trail",
    "agent cost controls",
  ],
});

export default function AgentsPage() {
  return (
    <>
      <JsonLd data={softwareApplicationSchema("/agents")} />
      <Navbar />
      <main id="main-content">
        <AudienceHero
          id="agents-title"
          eyebrow={
            <>
              Self-hosted deployment <i aria-hidden="true" /> Model agnostic
            </>
          }
          title={
            <>
              Know Every Agent
              <br />
              You&apos;re Running.
            </>
          }
          description="Govern Every Call It Makes."
        >
          <div className={styles.routingFrame}>
            <Image
              src="/images/agents/secondheroagent.png"
              alt="Forgebench organisation overview dashboard"
              fill
              preload
              sizes="(max-width: 767px) 64vw, 43vw"
            />
          </div>
          <div className={styles.dashboardFrame}>
            <Image
              src="/images/agents/agenthero1.png"
              alt="Forgebench agent inventory dashboard"
              fill
              preload
              sizes="(max-width: 767px) 92vw, 58vw"
            />
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
