"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

import type { InMediaPage, MediaItem, MediaTab } from "@/lib/cms/in-media";
import styles from "./media-index.module.css";

function PublicationMark({ item }: { item: MediaItem }) {
  if (item.logo) {
    return (
      <Image
        className={styles.logoImage}
        src={item.logo}
        alt={`${item.publication} logo`}
        width={260}
        height={110}
        sizes="260px"
      />
    );
  }
  const slug = item.publication.toLowerCase().replaceAll(" ", "");
  return (
    <span className={`${styles.publicationMark} ${styles[slug] ?? ""}`}>
      {item.publication}
      {item.publication === "Business Standard" && (
        <small>when you&apos;re sure</small>
      )}
    </span>
  );
}

function ReadLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      className={styles.readLink}
      href={href}
      {...(href !== "#" ? { target: "_blank", rel: "noreferrer" } : {})}
    >
      {label} <i aria-hidden="true" />
    </a>
  );
}

function formatDate(date: string) {
  const parsed = new Date(`${date}T00:00:00`);
  return Number.isNaN(parsed.getTime())
    ? date
    : new Intl.DateTimeFormat("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      }).format(parsed);
}

function MediaCopy({
  item,
  readLabel,
}: {
  item: MediaItem;
  readLabel: string;
}) {
  return (
    <>
      <time dateTime={item.publishedAt}>{formatDate(item.publishedAt)}</time>
      <h2>{item.title}</h2>
      <p>{item.excerpt}</p>
      <ReadLink href={item.href} label={readLabel} />
    </>
  );
}

export function MediaIndex({ page }: { page: InMediaPage }) {
  const [activeTab, setActiveTab] = useState<MediaTab>("news");
  const [currentPage, setCurrentPage] = useState(1);
  const items = useMemo(
    () => page.items.filter((item) => item.tab === activeTab),
    [activeTab, page.items],
  );
  const [featured, ...remaining] = items;
  const cards = remaining.slice(0, 3);
  const moreItems = remaining.slice(3);
  const itemsPerPage = 4;
  const pageCount = Math.max(1, Math.ceil(moreItems.length / itemsPerPage));
  const safePage = Math.min(currentPage, pageCount);
  const visibleMoreItems = moreItems.slice(
    (safePage - 1) * itemsPerPage,
    safePage * itemsPerPage,
  );
  const moreTitle =
    activeTab === "news" ? page.moreNewsLabel : page.morePressReleasesLabel;
  const changeTab = (tab: MediaTab) => {
    setActiveTab(tab);
    setCurrentPage(1);
  };

  return (
    <section className={styles.page}>
      <header className={styles.header}>
        <p className={styles.breadcrumb}>{page.eyebrow}</p>
        <h1>
          {page.title} <span>{page.accentTitle}</span>
        </h1>
        <div
          className={styles.tabs}
          role="tablist"
          aria-label="In Media sections"
        >
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === "news"}
            className={activeTab === "news" ? styles.activeTab : undefined}
            onClick={() => changeTab("news")}
          >
            {page.newsTabLabel}
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === "pressReleases"}
            className={
              activeTab === "pressReleases" ? styles.activeTab : undefined
            }
            onClick={() => changeTab("pressReleases")}
          >
            {page.pressReleasesTabLabel}
          </button>
        </div>
      </header>

      <div className={styles.content} role="tabpanel">
        {featured && (
          <article className={styles.featured}>
            <div className={styles.featuredCopy}>
              <MediaCopy item={featured} readLabel={page.readLinkLabel} />
            </div>
            <div className={styles.publicationPanel}>
              <PublicationMark item={featured} />
            </div>
          </article>
        )}
        <div className={styles.grid}>
          {cards.map((item) => (
            <article className={styles.card} key={item._key}>
              <div className={styles.cardVisual}>
                <PublicationMark item={item} />
              </div>
              <div className={styles.cardCopy}>
                <MediaCopy item={item} readLabel={page.readLinkLabel} />
              </div>
            </article>
          ))}
        </div>

        {moreItems.length > 0 && (
          <section className={styles.more} aria-labelledby="more-media-title">
            <h2 id="more-media-title">{moreTitle}</h2>
            <div className={styles.moreList}>
              {visibleMoreItems.map((item) => (
                <article className={styles.moreCard} key={item._key}>
                  <div className={styles.moreCopy}>
                    <MediaCopy item={item} readLabel={page.readLinkLabel} />
                  </div>
                  <div className={styles.moreVisual}>
                    <PublicationMark item={item} />
                  </div>
                </article>
              ))}
            </div>
            <nav
              className={styles.pagination}
              aria-label={`${moreTitle} pagination`}
            >
              <span>{page.pageLabel}</span>
              <div>
                {Array.from({ length: pageCount }, (_, index) => index + 1).map(
                  (number) => (
                    <button
                      key={number}
                      type="button"
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
      </div>
    </section>
  );
}
