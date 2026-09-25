"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

import type { BlogBodyBlock } from "@/lib/cms/blog";

import styles from "./blog-article-body.module.css";

function slugify(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export function BlogArticleBody({ body, navigationLabels }: { body: BlogBodyBlock[]; navigationLabels?: string[] }) {
  const sections = useMemo(() => body
    .filter((block): block is Extract<BlogBodyBlock, { _type: "block" }> => block._type === "block" && (block.style === "h2" || block.style === "h3"))
    .map((heading, index) => {
      const baseId = slugify(heading.text) || "section";
      return { id: `${baseId}-${index + 1}`, label: navigationLabels?.[index] || heading.text };
    }), [body, navigationLabels]);
  const [activeId, setActiveId] = useState(sections[0]?.id ?? "");

  useEffect(() => {
    const elements = sections.map(({ id }) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setActiveId(visible.target.id);
    }, { rootMargin: "-15% 0px -70%", threshold: [0, .25, .5, 1] });
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [sections]);

  let headingIndex = 0;
  return <div className={styles.layout}>
    <aside className={styles.navigation}>
      <p>Section navigation</p>
      <nav>{sections.map((section) => <a key={section.id} className={activeId === section.id ? styles.active : ""} href={`#${section.id}`}>{section.label}</a>)}</nav>
    </aside>
    <div className={styles.content}>
      {body.map((block, index) => {
        if (block._type === "image") return <figure key={`${block.url}-${index}`}><div><Image src={block.url} alt={block.alt || ""} fill sizes="(max-width: 800px) 100vw, 54vw" /></div>{block.caption && <figcaption>{block.caption}</figcaption>}</figure>;
        if (block.style === "h2" || block.style === "h3") {
          const id = sections[headingIndex++]?.id;
          return block.style === "h2" ? <h2 id={id} key={`${block.text}-${index}`}>{block.text}</h2> : <h3 id={id} key={`${block.text}-${index}`}>{block.text}</h3>;
        }
        return <p key={`${block.text}-${index}`}>{block.text}</p>;
      })}
    </div>
  </div>;
}
