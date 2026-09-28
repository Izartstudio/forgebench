import type { Metadata } from "next";

import { BlogIndex } from "@/components/blog/blog-index";
import { FaqSection } from "@/components/layout/faq-section";
import { Navbar } from "@/components/layout/navbar";
import { SiteFooter } from "@/components/layout/site-footer";
import { getBlogPosts, isCmsConfigured } from "@/lib/cms/blog";
import { createMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = createMetadata({
  title: "Forgebench Blog — Enterprise AI Governance and Engineering",
  description:
    "Product, engineering and operational guidance for governing enterprise AI developers, agents, credentials, budgets and audit records.",
  path: "/blog",
  noIndex: !isCmsConfigured,
});

export default async function BlogPage() {
  const posts = await getBlogPosts();
  return <><Navbar /><main id="main-content"><BlogIndex posts={posts} /></main><div className="faq-footer-gradient"><FaqSection /><SiteFooter /></div></>;
}
