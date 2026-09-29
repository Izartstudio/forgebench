import { createClient } from "next-sanity";

export type ResponsiveScreenshot = {
  desktop?: string;
  mobile?: string;
};

type DesktopScreenshot = Pick<ResponsiveScreenshot, "desktop">;

type SlideKey =
  "slide01" | "slide02" | "slide03" | "slide04" | "slide05" | "slide06";

export type PageScreenshots = {
  agentsHeroBack?: ResponsiveScreenshot;
  agentsHeroFront?: ResponsiveScreenshot;
  developersHeroBack?: ResponsiveScreenshot;
  developersHeroFront?: ResponsiveScreenshot;
  agentsSlides?: Partial<Record<SlideKey, DesktopScreenshot>>;
  developersSlides?: Partial<Record<SlideKey, DesktopScreenshot>>;
};

export type ResolvedScreenshot = {
  desktop: string;
  mobile?: string;
};

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "lin8bo6x";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const client = createClient({
  projectId,
  dataset,
  apiVersion: "2026-09-01",
  // Next.js owns the 60-second page cache. Fetch fresh published content from
  // Sanity whenever that page cache is regenerated.
  useCdn: false,
});

const imageProjection = `{
  "desktop": desktop.asset->url,
  "mobile": mobile.asset->url
}`;

const desktopImageProjection = `{
  "desktop": desktop.asset->url
}`;

const pageScreenshotsQuery = `*[_type == "pageScreenshots"] | order(_updatedAt desc)[0]{
  "agentsHeroBack": agentsHeroBack ${imageProjection},
  "agentsHeroFront": agentsHeroFront ${imageProjection},
  "developersHeroBack": developersHeroBack ${imageProjection},
  "developersHeroFront": developersHeroFront ${imageProjection},
  "agentsSlides": agentsSlides{
    "slide01": slide01 ${desktopImageProjection},
    "slide02": slide02 ${desktopImageProjection},
    "slide03": slide03 ${desktopImageProjection},
    "slide04": slide04 ${desktopImageProjection},
    "slide05": slide05 ${desktopImageProjection},
    "slide06": slide06 ${desktopImageProjection}
  },
  "developersSlides": developersSlides{
    "slide01": slide01 ${desktopImageProjection},
    "slide02": slide02 ${desktopImageProjection},
    "slide03": slide03 ${desktopImageProjection},
    "slide04": slide04 ${desktopImageProjection},
    "slide05": slide05 ${desktopImageProjection}
  }
}`;

export async function getPageScreenshots(): Promise<PageScreenshots> {
  try {
    return (
      (await client.fetch<PageScreenshots | null>(
        pageScreenshotsQuery,
        {},
        { next: { revalidate: 60 } },
      )) ?? {}
    );
  } catch {
    return {};
  }
}

export function resolveScreenshot(
  screenshot: ResponsiveScreenshot | undefined,
  fallback: string,
): ResolvedScreenshot {
  return {
    desktop: screenshot?.desktop || fallback,
    mobile: screenshot?.mobile,
  };
}

export function getSlideScreenshot(
  slides: PageScreenshots["agentsSlides"],
  index: number,
) {
  const key = `slide${String(index + 1).padStart(2, "0")}` as SlideKey;
  return slides?.[key];
}
