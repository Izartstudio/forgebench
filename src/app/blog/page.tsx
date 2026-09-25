import type { Metadata } from "next";

import { BlogIndex } from "@/components/blog/blog-index";
import { FaqSection } from "@/components/layout/faq-section";
import { Navbar } from "@/components/layout/navbar";
import { SiteFooter } from "@/components/layout/site-footer";
import { getBlogPosts } from "@/lib/cms/blog";
import { createMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = createMetadata({ title: "Blog", description: "Forgebench product, engineering and enterprise AI insights.", path: "/blog" });

export default async function BlogPage() {
  const posts = await getBlogPosts();
  return <><Navbar /><main id="main-content"><BlogIndex posts={posts} /></main><div className="faq-footer-gradient"><FaqSection /><SiteFooter /></div></>;
}
