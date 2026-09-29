import type { Metadata } from "next";

import { SiteFooter } from "@/components/layout/site-footer";
import { Navbar } from "@/components/layout/navbar";
import { AboutHero } from "@/components/about/about-hero";
import { OriginSection } from "@/components/about/origin-section";
import { BeliefsSection } from "@/components/about/beliefs-section";
import { PilotCta } from "@/components/sections/pilot-cta";
import { FinalCta } from "@/components/about/final-cta";
import { createMetadata } from "@/lib/seo/metadata";

import styles from "./page.module.css";

export const metadata: Metadata = createMetadata({
  title: "About Forgebench — Enterprise AI Governance by SeedlingLabs",
  description:
    "Forgebench gives organizations the visibility and control to move fast with AI.",
  path: "/about-us",
});

export default function AboutUsPage() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <AboutHero />
        <OriginSection />
        <BeliefsSection />
        <PilotCta />
        <FinalCta />
      </main>
      <div className={styles.footerGradient}>
        <SiteFooter />
      </div>
    </>
  );
}
