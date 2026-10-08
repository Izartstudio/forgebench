import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { BlogArticleBody } from "@/components/blog/blog-article-body";
import { Navbar } from "@/components/layout/navbar";
import { SiteFooter } from "@/components/layout/site-footer";
import { JsonLd } from "@/components/seo/json-ld";
import {
  getCaseStudiesPage,
  getCaseStudy,
  getRelatedCaseStudies,
} from "@/lib/cms/case-studies";
import { createMetadata } from "@/lib/seo/metadata";
import { siteConfig } from "@/lib/seo/site-config";

import styles from "./page.module.css";

type PageProps = { params: Promise<{ slug: string }> };

export const revalidate = 60;

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const study = await getCaseStudy(slug);
  return study
    ? createMetadata({
        title: study.title,
        description: study.excerpt,
        path: `/case-studies/${slug}`,
        image: study.image,
      })
    : {};
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const [study, related, page] = await Promise.all([
    getCaseStudy(slug),
    getRelatedCaseStudies(slug),
    getCaseStudiesPage(),
  ]);
  if (!study) notFound();
  const canonical = new URL(
    `/case-studies/${study.slug}`,
    siteConfig.url,
  ).toString();
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: study.title,
    description: study.excerpt,
    datePublished: study.publishedAt,
    image: study.image
      ? new URL(study.image, siteConfig.url).toString()
      : undefined,
    mainEntityOfPage: canonical,
    publisher: { "@id": `${siteConfig.url.toString()}#organization` },
  };

  return (
    <>
      <JsonLd data={schema} />
      <Navbar />
      <main id="main-content" className={styles.main}>
        <article>
          <header className={styles.hero}>
            <div className={styles.heroLeft}>
              <div className={styles.heroCopy}>
                <p className={styles.breadcrumb}>
                  Resources&nbsp;&nbsp;/&nbsp;&nbsp;
                  <Link href="/case-studies">Case Studies</Link>
                  &nbsp;&nbsp;/&nbsp;&nbsp;{study.title}
                </p>
                <h1>{study.title}</h1>
                <span className={styles.readTime}>
                  {study.readingMinutes} {page.readTimeSuffix}
                </span>
              </div>
              <dl className={styles.details}>
                <dt>Details</dt>
                <dd>
                  <span>Industry:</span> {study.industry}
                </dd>
                <dd>
                  <span>Use Case:</span> {study.useCase}
                </dd>
                <dd>
                  <span>Cloud:</span> {study.cloud}
                </dd>
                <dd>
                  <span>Product:</span> {study.product}
                </dd>
              </dl>
            </div>
            <div className={`${styles.heroImage} ${styles[study.tone]}`}>
              {study.image && (
                <Image
                  src={study.image}
                  alt={study.imageAlt}
                  fill
                  preload
                  quality={92}
                  sizes="(max-width: 48rem) 100vw, 52vw"
                />
              )}
            </div>
          </header>
          <div className={styles.articleContent}>
            <BlogArticleBody body={study.body} navigationTitle="Contents" />
          </div>
        </article>

        {related.length > 0 && (
          <section
            className={styles.related}
            aria-labelledby="related-case-studies-title"
          >
            <h2 id="related-case-studies-title">{page.relatedStudiesLabel}</h2>
            <div>
              {related.map((item) => (
                <article key={item.slug}>
                  <div
                    className={`${styles.relatedImage} ${styles[item.tone]}`}
                  >
                    {item.image && (
                      <Image
                        src={item.image}
                        alt={item.imageAlt}
                        fill
                        quality={85}
                        sizes="(max-width: 48rem) 100vw, 33vw"
                      />
                    )}
                  </div>
                  <p>
                    {item.readingMinutes} {page.readTimeSuffix}
                  </p>
                  <h3>
                    <Link href={`/case-studies/${item.slug}`}>
                      {item.title}
                    </Link>
                  </h3>
                  <p className={styles.relatedExcerpt}>{item.excerpt}</p>
                  <Link
                    className={styles.readMore}
                    href={`/case-studies/${item.slug}`}
                  >
                    {page.readLinkLabel} <i aria-hidden="true" />
                  </Link>
                </article>
              ))}
            </div>
          </section>
        )}
      </main>
      <div className="footer-only-gradient">
        <SiteFooter />
      </div>
    </>
  );
}
