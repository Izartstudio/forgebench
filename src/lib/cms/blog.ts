import { createClient } from "next-sanity";

export type BlogBodyBlock =
  | { _type: "block"; style: "normal" | "h2" | "h3"; text: string }
  | { _type: "image"; url: string; alt?: string; caption?: string };

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  tags: string[];
  readingMinutes: number;
  image: string;
  featured?: boolean;
  editorsPick?: boolean;
  body: BlogBodyBlock[];
  navigationLabels?: string[];
  publishedAt: string;
  authorName?: string;
  authorImage?: string;
};

export const blogCategories = ["All", "Product", "Engineering", "Events & PR", "News", "Customer Stories"] as const;

const loremTitle = "Lorem ipsum dolor sit amet – consectetur adipiscing";
const loremExcerpt = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";
const loremParagraph = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

const seededPosts: BlogPost[] = [
  {
    slug: "governing-model-choice-at-scale",
    title: loremTitle,
    excerpt: loremExcerpt,
    category: "Product",
    tags: ["governance", "model-routing", "cost-control"],
    readingMinutes: 12,
    image: "/images/blog/circle.svg",
    featured: true,
    body: [{ _type: "block", style: "h2", text: "Lorem ipsum dolor sit amet" }, { _type: "block", style: "normal", text: loremParagraph }, { _type: "image", url: "/images/blog/circle.svg", alt: "Forgebench model network" }, { _type: "block", style: "h2", text: "Lorem ipsum dolor sit amet" }, { _type: "block", style: "normal", text: loremParagraph }],
    publishedAt: "2026-09-20",
  },
  {
    slug: "why-ai-infrastructure-needs-an-operating-plane",
    title: loremTitle,
    excerpt: loremExcerpt,
    category: "Engineering",
    tags: ["infrastructure", "governance", "architecture"],
    readingMinutes: 8,
    image: "/images/blog/ai-robotics-research.webp",
    body: [{ _type: "block", style: "h2", text: "Lorem ipsum dolor sit amet" }, { _type: "block", style: "normal", text: loremParagraph }, { _type: "image", url: "/images/blog/ai-robotics-research.webp", alt: "AI robotics research" }, { _type: "block", style: "h2", text: "Lorem ipsum dolor sit amet" }, { _type: "block", style: "normal", text: loremParagraph }],
    publishedAt: "2026-09-16",
  },
  {
    slug: "measuring-the-real-impact-of-ai-development",
    title: "Sed do eiusmod tempor incididunt",
    excerpt: loremExcerpt,
    category: "Customer Stories",
    tags: ["measurement", "developer-tools", "roi"],
    readingMinutes: 7,
    image: "/images/blog/image-2.webp",
    editorsPick: true,
    body: [{ _type: "block", style: "h2", text: "Lorem ipsum dolor sit amet" }, { _type: "block", style: "normal", text: loremParagraph }, { _type: "image", url: "/images/blog/image-2.webp", alt: "AI impact visualization" }, { _type: "block", style: "h2", text: "Lorem ipsum dolor sit amet" }, { _type: "block", style: "normal", text: loremParagraph }],
    publishedAt: "2026-09-10",
  },
  {
    slug: "the-agent-governance-stack",
    title: loremTitle,
    excerpt: loremExcerpt,
    category: "Product",
    tags: ["agents", "governance", "architecture"],
    readingMinutes: 10,
    image: "/images/blog/ai-data-infrastructure.webp",
    body: [{ _type: "block", style: "h2", text: "Lorem ipsum dolor sit amet" }, { _type: "block", style: "normal", text: loremParagraph }, { _type: "image", url: "/images/blog/ai-data-infrastructure.webp", alt: "AI data infrastructure" }, { _type: "block", style: "h2", text: "Lorem ipsum dolor sit amet" }, { _type: "block", style: "normal", text: loremParagraph }],
    publishedAt: "2026-09-04",
  },
  {
    slug: "forgebench-at-ai-infrastructure-day",
    title: loremTitle,
    excerpt: loremExcerpt,
    category: "Events & PR",
    tags: ["events", "infrastructure", "enterprise-ai"],
    readingMinutes: 5,
    image: "/images/blog/generative-ai-models.webp",
    body: [{ _type: "block", style: "h2", text: "Lorem ipsum dolor sit amet" }, { _type: "block", style: "normal", text: loremParagraph }, { _type: "image", url: "/images/blog/generative-ai-models.webp", alt: "Generative AI model network" }, { _type: "block", style: "h2", text: "Lorem ipsum dolor sit amet" }, { _type: "block", style: "normal", text: loremParagraph }],
    publishedAt: "2026-08-28",
  },
  {
    slug: "new-agent-audit-controls",
    title: loremTitle,
    excerpt: loremExcerpt,
    category: "News",
    tags: ["agents", "audit", "governance"],
    readingMinutes: 6,
    image: "/images/blog/responsible-ai-governance.webp",
    body: [{ _type: "block", style: "h2", text: "Lorem ipsum dolor sit amet" }, { _type: "block", style: "normal", text: loremParagraph }, { _type: "image", url: "/images/blog/responsible-ai-governance.webp", alt: "Responsible AI governance" }, { _type: "block", style: "h2", text: "Lorem ipsum dolor sit amet" }, { _type: "block", style: "normal", text: loremParagraph }],
    publishedAt: "2026-08-21",
  },
];

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const client = projectId ? createClient({ projectId, dataset, apiVersion: "2026-09-01", useCdn: true }) : null;

const postProjection = `{ "slug": slug.current, title, excerpt, "category": category->title, "tags": tags[]->slug.current, readingMinutes, "image": mainImage.asset->url, featured, editorsPick, navigationLabels, "body": body[]{ _type, _key, style, "text": pt::text(@), "url": asset->url, alt, caption }, publishedAt, authorName, "authorImage": authorImage.asset->url }`;

export async function getBlogPosts(): Promise<BlogPost[]> {
  if (!client) return seededPosts;
  try {
    return await client.fetch(`*[_type == "post"] | order(publishedAt desc) ${postProjection}`);
  } catch {
    return seededPosts;
  }
}

export async function getBlogPost(slug: string) {
  const posts = await getBlogPosts();
  return posts.find((post) => post.slug === slug) ?? null;
}

export async function getRelatedPosts(post: BlogPost, limit = 3) {
  const posts = await getBlogPosts();
  return posts
    .filter((candidate) => candidate.slug !== post.slug)
    .map((candidate) => ({ candidate, score: candidate.tags.filter((tag) => post.tags.includes(tag)).length }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ candidate }) => candidate);
}
