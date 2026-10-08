"use client";

import Image from "next/image";
import { useState } from "react";

import type { CaseStudiesPage, CaseStudy } from "@/lib/cms/case-studies";
import styles from "./case-studies-index.module.css";

function StudyVisual({ study }: { study: CaseStudy }) {
  return (
    <div className={`${styles.visual} ${styles[study.tone]}`}>
      {study.image && (
        <Image
          src={study.image}
          alt={study.imageAlt}
          fill
          sizes="(max-width: 48rem) 100vw, 33vw"
        />
      )}
    </div>
  );
}

function ReadLink({ study, label }: { study: CaseStudy; label: string }) {
  const href = study.href === "#" ? `/case-studies/${study.slug}` : study.href;
  return (
    <a className={styles.readLink} href={href}>
      {label} <i aria-hidden="true" />
    </a>
  );
}

export function CaseStudiesIndex({ page }: { page: CaseStudiesPage }) {
  const [currentPage, setCurrentPage] = useState(1);
  const featured = page.studies.slice(0, 2);
  const studies = page.studies.slice(2);
  const studiesPerPage = 9;
  const pageCount = Math.max(1, Math.ceil(studies.length / studiesPerPage));
  const safePage = Math.min(currentPage, pageCount);
  const visibleStudies = studies.slice(
    (safePage - 1) * studiesPerPage,
    safePage * studiesPerPage,
  );

  return (
    <section className={styles.page}>
      <header className={styles.header}>
        <p>{page.eyebrow}</p>
        <h1>
          {page.title} <span>{page.accentTitle}</span>
        </h1>
      </header>

      <div className={styles.featuredGrid}>
        {featured.map((study) => (
          <article className={styles.featuredCard} key={study._key}>
            <StudyVisual study={study} />
            <div className={styles.featuredCopy}>
              {study.editorPick && <strong>{page.editorPickLabel}</strong>}
              <h2>{study.title}</h2>
              <p>{study.excerpt}</p>
              <ReadLink study={study} label={page.readLinkLabel} />
            </div>
          </article>
        ))}
      </div>

      {studies.length > 0 && (
        <section className={styles.more} aria-labelledby="more-studies-title">
          <h2 id="more-studies-title">{page.moreStudiesLabel}</h2>
          <div className={styles.grid}>
            {visibleStudies.map((study) => (
              <article className={styles.card} key={study._key}>
                <StudyVisual study={study} />
                <div className={styles.cardCopy}>
                  <span>
                    {study.readingMinutes} {page.readTimeSuffix}
                  </span>
                  <h3>{study.title}</h3>
                  <p>{study.excerpt}</p>
                  <ReadLink study={study} label={page.readLinkLabel} />
                </div>
              </article>
            ))}
          </div>
          <nav
            className={styles.pagination}
            aria-label="Case studies pagination"
          >
            <span>{page.pageLabel}</span>
            <div>
              {Array.from({ length: pageCount }, (_, index) => index + 1).map(
                (number) => (
                  <button
                    type="button"
                    key={number}
                    className={
                      safePage === number ? styles.activePage : undefined
                    }
                    aria-current={safePage === number ? "page" : undefined}
                    onClick={() => setCurrentPage(number)}
                  >
                    {number}
                  </button>
                ),
              )}
              <button
                type="button"
                className={styles.next}
                disabled={safePage === pageCount}
                onClick={() =>
                  setCurrentPage((value) => Math.min(pageCount, value + 1))
                }
              >
                {page.nextLabel} <i aria-hidden="true" />
              </button>
            </div>
            <span>
              {page.showingLabel
                .replace("{current}", String(safePage))
                .replace("{total}", String(pageCount))}
            </span>
          </nav>
        </section>
      )}
    </section>
  );
}
