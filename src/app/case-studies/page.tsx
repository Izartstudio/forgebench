import type { Metadata } from "next";

import { CaseStudiesIndex } from "@/components/case-studies/case-studies-index";
import { Navbar } from "@/components/layout/navbar";
import { SiteFooter } from "@/components/layout/site-footer";
import { JsonLd } from "@/components/seo/json-ld";
import { getCaseStudiesPage } from "@/lib/cms/case-studies";
import { createMetadata } from "@/lib/seo/metadata";
import { siteConfig } from "@/lib/seo/site-config";

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
  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${page.title} ${page.accentTitle}`,
    description: page.seoDescription,
    url: new URL("/case-studies", siteConfig.url).toString(),
    mainEntity: {
      "@type": "ItemList",
      itemListElement: page.studies.map((study, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: study.title,
        url: new URL(`/case-studies/${study.slug}`, siteConfig.url).toString(),
      })),
    },
  };
  return (
    <>
      <JsonLd data={schema} />
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
