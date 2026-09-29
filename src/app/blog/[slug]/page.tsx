import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { BlogArticleBody } from "@/components/blog/blog-article-body";
import { Navbar } from "@/components/layout/navbar";
import { SiteFooter } from "@/components/layout/site-footer";
import { JsonLd } from "@/components/seo/json-ld";
import { getBlogPost, getRelatedPosts, isCmsConfigured } from "@/lib/cms/blog";
import { createMetadata } from "@/lib/seo/metadata";
import { siteConfig } from "@/lib/seo/site-config";

import styles from "./page.module.css";

type PageProps = { params: Promise<{ slug: string }> };

export const revalidate = 60;

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  return post
    ? createMetadata({
        title: post.title,
        description: post.excerpt,
        path: `/blog/${slug}`,
        image: post.image,
        noIndex: !isCmsConfigured,
      })
    : {};
}

export default async function BlogArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) notFound();
  const related = await getRelatedPosts(post);
  const published = new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(post.publishedAt));
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    image: new URL(post.image, siteConfig.url).toString(),
    datePublished: post.publishedAt,
    author: {
      "@type": post.authorName ? "Person" : "Organization",
      name: post.authorName || "Forgebench Editorial",
    },
    publisher: { "@id": `${siteConfig.url.toString()}#organization` },
    mainEntityOfPage: new URL(`/blog/${post.slug}`, siteConfig.url).toString(),
  };

  return (
    <>
      <JsonLd data={articleSchema} />
      <Navbar />
      <main id="main-content" className={styles.main}>
        <article>
          <header className={styles.hero}>
            <div className={styles.heroCopy}>
              <p className={styles.breadcrumb}>
                Resources&nbsp;&nbsp;/&nbsp;&nbsp;<Link href="/blog">Blog</Link>
                &nbsp;&nbsp;/&nbsp;&nbsp;{post.title}
              </p>
              <h1>{post.title}</h1>
              <div className={styles.meta}>
                <span>{post.category}</span>
                <span>{post.readingMinutes} min read</span>
              </div>
              <div className={styles.author}>
                {post.authorImage ? (
                  <Image
                    src={post.authorImage}
                    alt={`${post.authorName || "Forgebench Editorial"} profile`}
                    width={48}
                    height={48}
                  />
                ) : (
                  <i aria-hidden="true" />
                )}
                <p>
                  <strong>{post.authorName || "Forgebench Editorial"}</strong>
                  <span>{published}</span>
                </p>
              </div>
            </div>
            <div className={styles.heroImage}>
              <Image
                src={post.image}
                alt={`${post.title} article cover`}
                fill
                preload
                sizes="(max-width: 800px) 100vw, 52vw"
              />
            </div>
          </header>
          <BlogArticleBody
            body={post.body}
            navigationLabels={post.navigationLabels}
          />
        </article>
        {related.length > 0 && (
          <section className={styles.related} aria-labelledby="related-title">
            <h2 id="related-title">Read Related Articles</h2>
            <div>
              {related.map((item) => (
                <article key={item.slug}>
                  <div>
                    <Image
                      src={item.image}
                      alt={`${item.title} article cover`}
                      fill
                      sizes="(max-width: 720px) 100vw, 33vw"
                    />
                  </div>
                  <p>
                    <span>{item.category}</span>
                    {item.readingMinutes} min read
                  </p>
                  <h3>
                    <Link href={`/blog/${item.slug}`}>{item.title}</Link>
                  </h3>
                  <p className={styles.relatedExcerpt}>{item.excerpt}</p>
                  <Link className={styles.readMore} href={`/blog/${item.slug}`}>
                    Read More <i aria-hidden="true" />
                  </Link>
                </article>
              ))}
            </div>
          </section>
        )}
      </main>
      <div className={styles.footerBackdrop}>
        <SiteFooter />
      </div>
    </>
  );
}
