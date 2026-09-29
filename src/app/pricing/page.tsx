import type { Metadata } from "next";

import { Navbar } from "@/components/layout/navbar";
import { SiteFooter } from "@/components/layout/site-footer";
import { PricingComparison } from "@/components/pricing/pricing-comparison";
import { PricingHero } from "@/components/pricing/pricing-hero";
import { createMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = createMetadata({
  title: "Forgebench Pricing — Enterprise AI Governance",
  description:
    "Compare Forgebench plans and find the right level of AI governance for your team.",
  path: "/pricing",
});

export default function PricingPage() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <PricingHero />
        <PricingComparison />
      </main>
      <div className="footer-only-gradient">
        <SiteFooter />
      </div>
    </>
  );
}
