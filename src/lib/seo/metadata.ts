import type { Metadata } from "next";

import { siteConfig } from "./site-config";

type MetadataOptions = {
  title?: string;
  description?: string;
  path?: string;
  noIndex?: boolean;
  image?: string;
  ogTitle?: string;
  ogDescription?: string;
  keywords?: string[];
};

export function createMetadata({
  title,
  description,
  path = "/",
  noIndex = false,
  image = "/images/agents/dashboard.webp",
  ogTitle,
  ogDescription,
  keywords,
}: MetadataOptions = {}): Metadata {
  const canonical = new URL(path, siteConfig.url);
  const resolvedTitle = title ?? siteConfig.name;

  return {
    metadataBase: siteConfig.url,
    title: {
      default: siteConfig.name,
      template: `%s | ${siteConfig.name}`,
      absolute: title,
    },
    description,
    keywords,
    alternates: {
      canonical,
    },
    robots: {
      index: siteConfig.isProductionUrlConfigured && !noIndex,
      follow: siteConfig.isProductionUrlConfigured && !noIndex,
    },
    openGraph: {
      type: "website",
      url: canonical,
      siteName: siteConfig.name,
      title: ogTitle ?? resolvedTitle,
      description: ogDescription ?? description,
      images: [{ url: image, alt: `${siteConfig.name} enterprise AI control plane` }],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle ?? resolvedTitle,
      description: ogDescription ?? description,
      images: [image],
    },
  };
}
