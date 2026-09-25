"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import type { BlogPost } from "@/lib/cms/blog";
import { blogCategories } from "@/lib/cms/blog";

import styles from "./blog-index.module.css";

function ArticleCard({ post }: { post: BlogPost }) {
  return (
    <article className={styles.listCard}>
      <div className={styles.cardCopy}>
        <p className={styles.meta}><span>{post.category}</span>{post.readingMinutes} min read</p>
        <h2><Link href={`/blog/${post.slug}`}>{post.title}</Link></h2>
        <p>{post.excerpt}</p>
        <Link className={styles.readMore} href={`/blog/${post.slug}`}>Read More <i aria-hidden="true" /></Link>
      </div>
      <Link href={`/blog/${post.slug}`} className={styles.imageLink} aria-label={`Read ${post.title}`}>
        <Image src={post.image} alt="" fill sizes="(max-width: 720px) 100vw, 40vw" className={styles.cardImage} />
      </Link>
    </article>
  );
}

export function BlogIndex({ posts }: { posts: BlogPost[] }) {
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const isFiltered = category !== "All" || query.trim().length > 0;
  const featured = posts.find((post) => post.featured) ?? posts[0];
  const editorsPick = posts.find((post) => post.editorsPick) ?? posts[1];
  const filtered = useMemo(() => posts.filter((post) => {
    const matchesCategory = category === "All" || post.category === category;
    const haystack = `${post.title} ${post.excerpt} ${post.tags.join(" ")}`.toLowerCase();
    return matchesCategory && haystack.includes(query.trim().toLowerCase());
  }), [category, posts, query]);
  const topCards = !isFiltered
    ? filtered.filter((post) => !post.featured && !post.editorsPick).slice(0, 3)
    : [];
  const listingPosts = !isFiltered
    ? filtered.filter((post) => !post.featured && !post.editorsPick)
    : filtered;
  const postsPerPage = 4;
  const pageCount = Math.max(1, Math.ceil(listingPosts.length / postsPerPage));
  const visiblePosts = listingPosts.slice((page - 1) * postsPerPage, page * postsPerPage);

  useEffect(() => setPage(1), [category, query]);
  useEffect(() => {
    if (page > pageCount) setPage(pageCount);
  }, [page, pageCount]);

  const pageNumbers = useMemo(() => {
    if (pageCount <= 7) return Array.from({ length: pageCount }, (_, index) => index + 1);
    const candidates = [1, 2, page - 1, page, page + 1, pageCount];
    return [...new Set(candidates.filter((item) => item >= 1 && item <= pageCount))].sort((a, b) => a - b);
  }, [page, pageCount]);

  return (
    <>
      <header className={styles.header}>
        <p className={styles.breadcrumb}>Resources&nbsp;&nbsp;/&nbsp;&nbsp;Blog</p>
        <h1>Forgebench <span>Blog</span></h1>
        <div className={styles.controls}>
          <nav aria-label="Blog categories">
            {blogCategories.map((item) => <button className={category === item ? styles.activeCategory : ""} key={item} onClick={() => setCategory(item)}>{item}</button>)}
          </nav>
          <label className={styles.search}><span className="sr-only">Search articles</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search" type="search" /><i aria-hidden="true" /></label>
        </div>
      </header>

      {!isFiltered && featured && editorsPick && (
        <section className={styles.leadGrid} aria-label="Featured articles">
          <article className={styles.featured}>
            <div className={styles.featuredCopy}>
              <p className={styles.meta}><span>{featured.category}</span>{featured.readingMinutes} min read</p>
              <h2><Link href={`/blog/${featured.slug}`}>{featured.title}</Link></h2>
              <p>{featured.excerpt}</p>
              <Link className={styles.readMore} href={`/blog/${featured.slug}`}>Read More <i aria-hidden="true" /></Link>
            </div>
            <div className={styles.featuredImage}><Image src={featured.image} alt="" fill preload sizes="(max-width: 800px) 100vw, 34vw" /></div>
          </article>
          <article className={styles.editorsPick}>
            <p className={styles.pickLabel}>Editor&apos;s Picks</p>
            <h2><Link href={`/blog/${editorsPick.slug}`}>{editorsPick.title}</Link></h2>
            <p>{editorsPick.excerpt}</p>
            <span>{editorsPick.readingMinutes} min read</span>
            <Link className={styles.readMore} href={`/blog/${editorsPick.slug}`}>Read More <i aria-hidden="true" /></Link>
          </article>
        </section>
      )}

      {topCards.length > 0 && <section className={styles.topCards} aria-label="Highlighted articles">
        {topCards.map((post) => <article className={styles.card} key={post.slug}>
          <Link href={`/blog/${post.slug}`} className={styles.topCardImage} aria-label={`Read ${post.title}`}>
            <Image src={post.image} alt="" fill sizes="(max-width: 720px) 100vw, 33vw" className={styles.cardImage} />
          </Link>
          <div className={styles.cardCopy}>
            <p className={styles.meta}><span>{post.category}</span>{post.readingMinutes} min read</p>
            <h2><Link href={`/blog/${post.slug}`}>{post.title}</Link></h2>
            <p>{post.excerpt}</p>
            <Link className={styles.readMore} href={`/blog/${post.slug}`}>Read More <i aria-hidden="true" /></Link>
          </div>
        </article>)}
      </section>}

      <section className={styles.morePosts} aria-labelledby={!isFiltered ? "more-posts-title" : undefined} aria-label={isFiltered ? "Filtered blog posts" : undefined}>
        {!isFiltered && <h2 id="more-posts-title">More Posts</h2>}
        <div className={styles.list} aria-live="polite">
          {visiblePosts.map((post) => <ArticleCard post={post} key={post.slug} />)}
          {listingPosts.length === 0 && <p className={styles.empty}>No articles match this filter.</p>}
        </div>
        {listingPosts.length > 0 && <nav className={styles.pagination} aria-label="Blog pagination">
          <span>Pages</span>
          <div>
            {pageNumbers.map((number, index) => <span key={number} className={styles.pageCluster}>
              {index > 0 && number - pageNumbers[index - 1] > 1 && <i>•••</i>}
              <button className={page === number ? styles.activePage : ""} onClick={() => setPage(number)} aria-current={page === number ? "page" : undefined}>{number}</button>
            </span>)}
            <button className={styles.next} disabled={page === pageCount} onClick={() => setPage((current) => Math.min(pageCount, current + 1))}>Next <i aria-hidden="true" /></button>
          </div>
          <span>Showing {page} of {pageCount} pages</span>
        </nav>}
      </section>
    </>
  );
}
