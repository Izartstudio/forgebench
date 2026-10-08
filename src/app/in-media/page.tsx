import type { Metadata } from "next";

import { SiteFooter } from "@/components/layout/site-footer";
import { Navbar } from "@/components/layout/navbar";
import { ContactActions } from "@/components/layout/contact-actions";
import { MediaIndex } from "@/components/media/media-index";
import { getInMediaPage } from "@/lib/cms/in-media";
import { createMetadata } from "@/lib/seo/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getInMediaPage();
  return createMetadata({
    title: page.seoTitle,
    description: page.seoDescription,
    path: "/in-media",
  });
}

export const revalidate = 60;

export default async function InMediaPage() {
  const page = await getInMediaPage();
  return (
    <>
      <Navbar />
      <main id="main-content">
        <MediaIndex page={page} />
        <ContactActions
          title={page.contactTitle}
          description={page.contactDescription}
          actions={[
            { label: page.mediaInquiriesLabel, href: page.mediaInquiriesHref },
            {
              label: page.partnerInquiriesLabel,
              href: page.partnerInquiriesHref,
            },
          ]}
        />
      </main>
      <div className="footer-only-gradient">
        <SiteFooter />
      </div>
    </>
  );
}
