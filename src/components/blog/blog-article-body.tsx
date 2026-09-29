"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

import type { BlogBodyBlock } from "@/lib/cms/blog";

import styles from "./blog-article-body.module.css";

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function decodeHtmlText(value: string) {
  return value
    .replace(/<br\s*\/?\s*>/gi, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&quot;/gi, '"')
    .replace(/&#(?:0*39|x0*27);/gi, "'")
    .trim();
}

function CmsTable({ html }: { html: string }) {
  const tableMatch = html.match(/<table\b[^>]*>([\s\S]*?)<\/table>/i);
  if (!tableMatch) return <p>{html}</p>;

  const rows = [...tableMatch[1].matchAll(/<tr\b[^>]*>([\s\S]*?)<\/tr>/gi)]
    .map((row) =>
      [...row[1].matchAll(/<(th|td)\b[^>]*>([\s\S]*?)<\/\1>/gi)].map(
        (cell) => ({
          type: cell[1].toLowerCase(),
          text: decodeHtmlText(cell[2]),
        }),
      ),
    )
    .filter((row) => row.length > 0);

  if (rows.length === 0) return <p>{decodeHtmlText(html)}</p>;

  return (
    <div className={styles.tableScroll}>
      <table>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) =>
                cell.type === "th" ? (
                  <th key={cellIndex}>{cell.text}</th>
                ) : (
                  <td key={cellIndex}>{cell.text}</td>
                ),
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function StructuredTable({
  rows,
  hasHeaderRow,
  caption,
}: {
  rows: { _key?: string; cells: string[] }[];
  hasHeaderRow?: boolean;
  caption?: string;
}) {
  if (!rows?.length) return null;

  const header = hasHeaderRow ? rows[0] : undefined;
  const bodyRows = hasHeaderRow ? rows.slice(1) : rows;

  return (
    <figure className={styles.structuredTable}>
      <div className={styles.tableScroll}>
        <table>
          {header && (
            <thead>
              <tr>
                {header.cells.map((cell, index) => (
                  <th key={index} scope="col">
                    {cell}
                  </th>
                ))}
              </tr>
            </thead>
          )}
          <tbody>
            {bodyRows.map((row, rowIndex) => (
              <tr key={row._key || rowIndex}>
                {row.cells.map((cell, cellIndex) => (
                  <td key={cellIndex}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}

export function BlogArticleBody({
  body,
  navigationLabels,
}: {
  body: BlogBodyBlock[];
  navigationLabels?: string[];
}) {
  const sections = useMemo(
    () =>
      body
        .filter(
          (block): block is Extract<BlogBodyBlock, { _type: "block" }> =>
            block._type === "block" &&
            (block.style === "h2" || block.style === "h3"),
        )
        .map((heading, index) => {
          const baseId = slugify(heading.text) || "section";
          return {
            id: `${baseId}-${index + 1}`,
            label: navigationLabels?.[index] || heading.text,
          };
        }),
    [body, navigationLabels],
  );
  const [activeId, setActiveId] = useState(sections[0]?.id ?? "");

  useEffect(() => {
    const elements = sections
      .map(({ id }) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveId(visible.target.id);
      },
      { rootMargin: "-15% 0px -70%", threshold: [0, 0.25, 0.5, 1] },
    );
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [sections]);

  let headingIndex = 0;
  return (
    <div className={styles.layout}>
      <aside className={styles.navigation}>
        <p>Section navigation</p>
        <nav>
          {sections.map((section) => (
            <a
              key={section.id}
              className={activeId === section.id ? styles.active : ""}
              href={`#${section.id}`}
            >
              {section.label}
            </a>
          ))}
        </nav>
      </aside>
      <div className={styles.content}>
        {body.map((block, index) => {
          if (block._type === "image")
            return (
              <figure key={`${block.url}-${index}`}>
                <div>
                  <Image
                    src={block.url}
                    alt={block.alt || block.caption || "Article illustration"}
                    fill
                    sizes="(max-width: 800px) 100vw, 54vw"
                  />
                </div>
                {block.caption && <figcaption>{block.caption}</figcaption>}
              </figure>
            );
          if (block._type === "table")
            return (
              <StructuredTable
                key={`table-${index}`}
                rows={block.rows}
                hasHeaderRow={block.hasHeaderRow}
                caption={block.caption}
              />
            );
          if (block.style === "h2" || block.style === "h3") {
            const id = sections[headingIndex++]?.id;
            return block.style === "h2" ? (
              <h2 id={id} key={`${block.text}-${index}`}>
                {block.text}
              </h2>
            ) : (
              <h3 id={id} key={`${block.text}-${index}`}>
                {block.text}
              </h3>
            );
          }
          if (/<table\b/i.test(block.text)) {
            return <CmsTable html={block.text} key={`table-${index}`} />;
          }
          return <p key={`${block.text}-${index}`}>{block.text}</p>;
        })}
      </div>
    </div>
  );
}
