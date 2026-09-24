import type { Metadata } from "next";
import Image from "next/image";

import { FaqSection } from "@/components/layout/faq-section";
import { Navbar } from "@/components/layout/navbar";
import { SiteFooter } from "@/components/layout/site-footer";
import { DeveloperCapabilities } from "@/components/sections/developer-capabilities";
import { DeveloperCallPath } from "@/components/sections/developer-call-path";
import { DeveloperExperience } from "@/components/sections/developer-experience";
import { AudienceHero } from "@/components/sections/audience-hero";
import { DeploymentTimeline } from "@/components/sections/deployment-timeline";
import { PilotCta } from "@/components/sections/pilot-cta";
import { createMetadata } from "@/lib/seo/metadata";

import styles from "./page.module.css";

export const metadata: Metadata = createMetadata({
  title: "Developers",
  description:
    "Give developers the freedom to use AI while keeping every model, tool, and workflow governed.",
  path: "/developers",
});

const integrations = [
  {
    name: "Claude",
    src: "/images/developers/claude-logo.webp",
    hoverSrc: "/images/developers/claude-logo.webp",
    width: 92,
    height: 20,
  },
  {
    name: "Codex",
    src: "/images/developers/codex-logo.svg",
    hoverSrc: "/images/developers/codex-hover.svg",
    width: 112,
    height: 20,
  },
  {
    name: "GitHub Copilot",
    src: "/images/developers/copilot-logo.webp",
    hoverSrc: "/images/developers/copilot-hover.webp",
    width: 87,
    height: 30,
  },
  {
    name: "Cursor",
    src: "/images/developers/cursor-logo.webp",
    hoverSrc: "/images/developers/cursor-hover.svg",
    width: 98,
    height: 24,
  },
  {
    name: "Kiro",
    src: "/images/developers/kiro-logo.webp",
    hoverSrc: "/images/developers/kiro-hover-cropped.webp",
    width: 70,
    height: 22,
  },
] as const;

export default function DevelopersPage() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <AudienceHero
          id="developers-title"
          eyebrow={<>Self-hosted deployment <i aria-hidden="true" /> Model agnostic</>}
          title={<>Know Every Developer<br /> Using AI In Your Org.</>}
          description="Govern Every Call. Trace ROI on Every Build."
          image={{
            src: "/images/developers/hero-imagery.png",
            alt: "Forgebench routing and governance dashboard",
          }}
        />

        <section className={styles.integrations} aria-label="Integrations">
          <div className={styles.integrationLabel}>
            <span aria-hidden="true" />
            <p>Integrations</p>
          </div>
          <div className={styles.integrationList}>
            {integrations.map((integration) => (
              <div className={styles.integration} key={integration.name}>
                <span
                  className={`${styles.integrationLogoFrame} ${integration.name === "Claude" ? styles.integrationLogoCompact : ""}`}
                  style={{
                    width: integration.width,
                    height: integration.height,
                  }}
                >
                  <Image
                    src={integration.src}
                    alt={integration.name}
                    fill
                    sizes={`${integration.width}px`}
                    className={`${styles.integrationLogo} ${styles.integrationLogoDefault}`}
                  />
                  <Image
                    src={integration.hoverSrc}
                    alt=""
                    fill
                    sizes={`${integration.width}px`}
                    className={`${styles.integrationLogo} ${styles.integrationLogoHover}`}
                  />
                </span>
              </div>
            ))}
          </div>
        </section>
        <DeveloperCapabilities />
        <DeveloperCallPath />
        <DeveloperExperience />
        <DeploymentTimeline variant="developers" />
        <PilotCta />
      </main>
      <div className="faq-footer-gradient">
        <FaqSection />
        <SiteFooter />
      </div>
    </>
  );
}
