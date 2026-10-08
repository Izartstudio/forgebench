import { createClient } from "next-sanity";

import type { BlogBodyBlock } from "./blog";

export type CaseStudy = {
  _key: string;
  slug: string;
  title: string;
  excerpt: string;
  industry: string;
  useCase: string;
  cloud: string;
  product: string;
  readingMinutes: number;
  publishedAt: string;
  href: string;
  image?: string;
  imageAlt: string;
  editorPick?: boolean;
  tone: "peach" | "cream" | "blue";
  body: BlogBodyBlock[];
};

export type CaseStudiesPage = {
  seoTitle: string;
  seoDescription: string;
  eyebrow: string;
  title: string;
  accentTitle: string;
  editorPickLabel: string;
  moreStudiesLabel: string;
  readLinkLabel: string;
  readTimeSuffix: string;
  pageLabel: string;
  nextLabel: string;
  showingLabel: string;
  relatedStudiesLabel: string;
  studies: CaseStudy[];
};

const loremTitle = "Lorem ipsum dolor sit amet – consectetur adipiscing";
const loremExcerpt =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";
const loremParagraph =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.";
const fallbackImages = [
  "/icons/agents/governance.svg",
  "/icons/about/route.svg",
  "/icons/home/mcp-3.svg",
  "/icons/about/person.svg",
  "/images/platform/cards/adoption.svg",
  "/icons/agents/identity.svg",
  "/icons/about/arrow-range.svg",
  "/icons/home/chat-assistant.svg",
  "/icons/pricing/database.svg",
] as const;

const fallbackStudies: CaseStudy[] = Array.from({ length: 29 }, (_, index) => ({
  _key: `case-study-${index + 1}`,
  slug: `lorem-case-study-${index + 1}`,
  title: loremTitle,
  excerpt: loremExcerpt,
  industry: "Financial Services",
  useCase: "Knowledge Search",
  cloud: "Private Cloud",
  product: "Lorem ipsum",
  readingMinutes: 12,
  publishedAt: "2026-10-04",
  href: "#",
  image: fallbackImages[index % fallbackImages.length],
  imageAlt: "Case study illustration",
  editorPick: index < 2,
  tone: (["peach", "cream", "blue"] as const)[index % 3],
  body: [
    { _type: "block", style: "h2", text: "Lorem ipsum dolor sit amet" },
    { _type: "block", style: "normal", text: loremParagraph },
    {
      _type: "image",
      url: "/images/agents/dashboard.webp",
      alt: "Forgebench dashboard",
    },
    { _type: "block", style: "h2", text: "Sed do eiusmod tempor incididunt" },
    { _type: "block", style: "normal", text: loremParagraph },
    {
      _type: "image",
      url: "/images/developers/call-path/dashboard.webp",
      alt: "Forgebench agent registration",
    },
    { _type: "block", style: "h2", text: "Ut enim ad minim veniam" },
    { _type: "block", style: "normal", text: loremParagraph },
    {
      _type: "block",
      style: "h2",
      text: "Duis aute irure dolor in reprehenderit",
    },
    { _type: "block", style: "normal", text: loremParagraph },
  ],
}));

const fallbackPage: CaseStudiesPage = {
  seoTitle: "Forgebench Case Studies — Enterprise AI Governance",
  seoDescription:
    "See how teams use Forgebench to govern enterprise AI developers, agents, budgets and audit records.",
  eyebrow: "Resources / Case Studies",
  title: "Case",
  accentTitle: "Studies",
  editorPickLabel: "Editor’s Pick",
  moreStudiesLabel: "More Studies",
  readLinkLabel: "Read More",
  readTimeSuffix: "min read",
  pageLabel: "Page",
  nextLabel: "Next",
  showingLabel: "Showing {current} of {total} pages",
  relatedStudiesLabel: "Read Related Case Studies",
  studies: fallbackStudies,
};

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const client = projectId
  ? createClient({
      projectId,
      dataset,
      apiVersion: "2026-09-01",
      perspective: "published",
      useCdn: false,
    })
  : null;

const query = `*[_type == "caseStudiesPage"] | order(_updatedAt desc)[0]{
  seoTitle, seoDescription, eyebrow, title, accentTitle, editorPickLabel,
  moreStudiesLabel, readLinkLabel, readTimeSuffix, pageLabel, nextLabel,
  showingLabel, relatedStudiesLabel,
  "studies": studies[]{
    _key, "slug": slug.current, title, excerpt, industry, useCase, cloud, product, readingMinutes, publishedAt, href, imageAlt, editorPick, tone,
    "body": body[]{ _type, _key, style, listItem, level, "text": pt::text(@), children[]{ _key, _type, text, marks }, markDefs[]{ _key, _type, href, openInNewTab }, "url": asset->url, alt, caption, hasHeaderRow, rows[]{ _key, cells } },
    "image": image.asset->url
  }
}`;

export async function getCaseStudiesPage(): Promise<CaseStudiesPage> {
  if (!client) return fallbackPage;
  try {
    const page = await client.fetch<Partial<CaseStudiesPage> | null>(
      query,
      {},
      { next: { revalidate: 60, tags: ["case-studies"] } },
    );
    if (!page) return fallbackPage;
    return {
      ...fallbackPage,
      ...page,
      studies: page.studies?.length ? page.studies : fallbackPage.studies,
    };
  } catch {
    return fallbackPage;
  }
}

export async function getCaseStudy(slug: string) {
  const page = await getCaseStudiesPage();
  return page.studies.find((study) => study.slug === slug) ?? null;
}

export async function getRelatedCaseStudies(slug: string, limit = 3) {
  const page = await getCaseStudiesPage();
  return page.studies.filter((study) => study.slug !== slug).slice(0, limit);
}
