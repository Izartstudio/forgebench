import type { Metadata } from "next";

import { CaseStudiesIndex } from "@/components/case-studies/case-studies-index";
import { Navbar } from "@/components/layout/navbar";
import { SiteFooter } from "@/components/layout/site-footer";
import { getCaseStudiesPage } from "@/lib/cms/case-studies";
import { createMetadata } from "@/lib/seo/metadata";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const page = await getCaseStudiesPage();
  return createMetadata({
    title: page.seoTitle,
    description: page.seoDescription,
    path: "/case-studies",
  });
}

export default async function CaseStudiesPage() {
  const page = await getCaseStudiesPage();
  return (
    <>
      <Navbar />
      <main id="main-content">
        <CaseStudiesIndex page={page} />
      </main>
      <div className="footer-only-gradient">
        <SiteFooter />
      </div>
    </>
  );
}
