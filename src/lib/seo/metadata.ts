import type { Metadata } from "next";

import { siteConfig } from "./site-config";

type MetadataOptions = {
  title?: string;
  description?: string;
  path?: string;
  noIndex?: boolean;
};

export function createMetadata({
  title,
  description,
  path = "/",
  noIndex = false,
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
      title: resolvedTitle,
      description,
    },
    twitter: {
      card: "summary",
      title: resolvedTitle,
      description,
    },
  };
}
