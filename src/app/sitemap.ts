import type { MetadataRoute } from "next";

import { getBlogPosts, isCmsConfigured } from "@/lib/cms/blog";
import { getCaseStudiesPage } from "@/lib/cms/case-studies";
import { siteConfig } from "@/lib/seo/site-config";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = isCmsConfigured ? await getBlogPosts() : [];
  const caseStudiesPage = await getCaseStudiesPage();
  const pages: MetadataRoute.Sitemap = [
    {
      url: siteConfig.url.toString(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: new URL("/developers", siteConfig.url).toString(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: new URL("/agents", siteConfig.url).toString(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    ...(isCmsConfigured
      ? [
          {
            url: new URL("/blog", siteConfig.url).toString(),
            changeFrequency: "weekly" as const,
            priority: 0.8,
          },
        ]
      : []),
    {
      url: new URL("/in-media", siteConfig.url).toString(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: new URL("/case-studies", siteConfig.url).toString(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: new URL("/pricing", siteConfig.url).toString(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: new URL("/about-us", siteConfig.url).toString(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];

  return [
    ...pages,
    ...posts.map((post) => ({
      url: new URL(`/blog/${post.slug}`, siteConfig.url).toString(),
      lastModified: new Date(post.publishedAt),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...caseStudiesPage.studies.map((study) => ({
      url: new URL(`/case-studies/${study.slug}`, siteConfig.url).toString(),
      lastModified: new Date(study.publishedAt),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
