import type { Metadata } from "next";

import { siteConfig } from "./site-config";

type MetadataOptions = {
  title?: string;
  description?: string;
  path?: string;
  noIndex?: boolean;
  ogTitle?: string;
  ogDescription?: string;
  keywords?: string[];
  image?: string;
};

export function createMetadata({
  title,
  description,
  path = "/",
  noIndex = false,
  ogTitle,
  ogDescription,
  keywords,
  image = "/images/social/forgebench-thumbnail.jpg",
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
      images: [
        {
          url: image,
          width: 1207,
          height: 671,
          alt: "Forgebench — Operating Plane for Enterprise AI",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle ?? resolvedTitle,
      description: ogDescription ?? description,
      images: [image],
    },
  };
}
