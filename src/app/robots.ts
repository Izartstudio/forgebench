import type { MetadataRoute } from "next";

import { siteConfig } from "@/lib/seo/site-config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: siteConfig.isProductionUrlConfigured
      ? { userAgent: "*", allow: "/" }
      : { userAgent: "*", disallow: "/" },
    sitemap: new URL("/sitemap.xml", siteConfig.url).toString(),
  };
}
