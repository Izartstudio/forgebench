import { createClient } from "next-sanity";

export type MediaTab = "news" | "pressReleases";

export type MediaItem = {
  _key: string;
  tab: MediaTab;
  publication: string;
  publishedAt: string;
  title: string;
  excerpt: string;
  href: string;
  logo?: string;
};

export type InMediaPage = {
  seoTitle: string;
  seoDescription: string;
  eyebrow: string;
  title: string;
  accentTitle: string;
  newsTabLabel: string;
  pressReleasesTabLabel: string;
  moreNewsLabel: string;
  morePressReleasesLabel: string;
  readLinkLabel: string;
  pageLabel: string;
  nextLabel: string;
  showingLabel: string;
  contactTitle: string;
  contactDescription: string;
  mediaInquiriesLabel: string;
  mediaInquiriesHref: string;
  partnerInquiriesLabel: string;
  partnerInquiriesHref: string;
  items: MediaItem[];
};

const loremTitle = "Lorem ipsum dolor sit amet – consectetur adipiscing";
const loremExcerpt =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";
const publications = [
  "Inc42",
  "Mint",
  "Business Standard",
  "CNBC TV18",
  "Inc42",
  "ET Tech",
  "AIM",
  "YourStory",
  "Mint",
  "Business Standard",
  "CNBC TV18",
  "Inc42",
] as const;

const seedItems = (tab: MediaTab, count: number): MediaItem[] =>
  Array.from({ length: count }, (_, index) => ({
    _key: `${tab}-${index + 1}`,
    tab,
    publication: publications[index % publications.length],
    publishedAt: "2026-10-04",
    title: loremTitle,
    excerpt: loremExcerpt,
    href: "#",
  }));

const fallbackPage: InMediaPage = {
  seoTitle: "Forgebench In Media — News and Press Releases",
  seoDescription:
    "Read the latest Forgebench news, media coverage and company press releases.",
  eyebrow: "Resources / In Media",
  title: "In",
  accentTitle: "Media",
  newsTabLabel: "News",
  pressReleasesTabLabel: "Press Releases",
  moreNewsLabel: "More News",
  morePressReleasesLabel: "More Posts",
  readLinkLabel: "Read Now",
  pageLabel: "Page",
  nextLabel: "Next",
  showingLabel: "Showing {current} of {total} pages",
  contactTitle: "Contact Our Press Team",
  contactDescription: "For Media & Partnership Related Questions",
  mediaInquiriesLabel: "Media Inquiries",
  mediaInquiriesHref: "mailto:info@seedlinglabs.com?subject=Media%20Inquiry",
  partnerInquiriesLabel: "Partner Inquiries",
  partnerInquiriesHref:
    "mailto:info@seedlinglabs.com?subject=Partnership%20Inquiry",
  items: [...seedItems("news", 12), ...seedItems("pressReleases", 8)],
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

const query = `*[_type == "inMediaPage"] | order(_updatedAt desc)[0]{
  seoTitle,
  seoDescription,
  eyebrow,
  title,
  accentTitle,
  newsTabLabel,
  pressReleasesTabLabel,
  moreNewsLabel,
  morePressReleasesLabel,
  readLinkLabel,
  pageLabel,
  nextLabel,
  showingLabel,
  contactTitle,
  contactDescription,
  mediaInquiriesLabel,
  mediaInquiriesHref,
  partnerInquiriesLabel,
  partnerInquiriesHref,
  "items": items[]{
    _key,
    tab,
    publication,
    publishedAt,
    title,
    excerpt,
    href,
    "logo": logo.asset->url
  }
}`;

export async function getInMediaPage(): Promise<InMediaPage> {
  if (!client) return fallbackPage;

  try {
    const page = await client.fetch<Partial<InMediaPage> | null>(
      query,
      {},
      { next: { revalidate: 60, tags: ["in-media"] } },
    );
    if (!page) return fallbackPage;
    return {
      ...fallbackPage,
      ...page,
      items: page.items?.length ? page.items : fallbackPage.items,
    };
  } catch {
    return fallbackPage;
  }
}
