import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { BlogArticleBody } from "@/components/blog/blog-article-body";
import { Navbar } from "@/components/layout/navbar";
import { SiteFooter } from "@/components/layout/site-footer";
import {
  getCaseStudiesPage,
  getCaseStudy,
  getRelatedCaseStudies,
} from "@/lib/cms/case-studies";
import { createMetadata } from "@/lib/seo/metadata";

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

  return (
    <>
      <Navbar />
      <main id="main-content" className={styles.main}>
        <article>
          <header className={styles.hero}>
            <div className={styles.heroCopy}>
              <p className={styles.breadcrumb}>
                Resources&nbsp;&nbsp;/&nbsp;&nbsp;
                <Link href="/case-studies">Case Studies</Link>
                &nbsp;&nbsp;/&nbsp;&nbsp;{study.title}
              </p>
              <h1>{study.title}</h1>
              <p className={styles.excerpt}>{study.excerpt}</p>
              <span className={styles.readTime}>
                {study.readingMinutes} {page.readTimeSuffix}
              </span>
            </div>
            <div className={`${styles.heroImage} ${styles[study.tone]}`}>
              {study.image && (
                <Image
                  src={study.image}
                  alt={study.imageAlt}
                  fill
                  preload
                  sizes="(max-width: 48rem) 100vw, 52vw"
                />
              )}
            </div>
          </header>
          <BlogArticleBody body={study.body} />
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
