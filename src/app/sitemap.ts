import type { MetadataRoute } from "next";

import { siteConfig } from "@/lib/seo/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
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
    {
      url: new URL("/blog", siteConfig.url).toString(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];
}
