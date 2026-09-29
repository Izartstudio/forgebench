"use client";

import Image from "next/image";
import Link from "next/link";
import { Fragment, type ReactNode, useEffect, useMemo, useState } from "react";

import type {
  BlogBodyBlock,
  BlogMarkDefinition,
  BlogTextBlock,
} from "@/lib/cms/blog";

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

function textWithLineBreaks(text: string) {
  return text.split("\n").map((part, index) => (
    <Fragment key={index}>
      {index > 0 && <br />}
      {part}
    </Fragment>
  ));
}

function applyMark(
  content: ReactNode,
  mark: string,
  definitions: BlogMarkDefinition[],
  key: string,
) {
  if (mark === "strong") return <strong key={key}>{content}</strong>;
  if (mark === "em") return <em key={key}>{content}</em>;
  if (mark === "underline") return <u key={key}>{content}</u>;
  if (mark === "strike-through") return <s key={key}>{content}</s>;
  if (mark === "code") return <code key={key}>{content}</code>;

  const definition = definitions.find((item) => item._key === mark);
  if (definition?._type === "internalLink" && definition.internalSlug) {
    return (
      <Link key={key} href={`/blog/${definition.internalSlug}`}>
        {content}
      </Link>
    );
  }
  if (definition?._type === "link" && definition.href) {
    const isSafe = /^(https?:\/\/|mailto:|tel:)/i.test(definition.href);
    if (!isSafe) return content;
    return (
      <a
        key={key}
        href={definition.href}
        target={definition.openInNewTab ? "_blank" : undefined}
        rel={definition.openInNewTab ? "noopener noreferrer" : undefined}
      >
        {content}
      </a>
    );
  }
  return content;
}

function RichText({ block }: { block: BlogTextBlock }) {
  if (!block.children?.length) return <>{block.text}</>;

  return (
    <>
      {block.children.map((span, spanIndex) => {
        let content: ReactNode = textWithLineBreaks(span.text);
        for (const [markIndex, mark] of (span.marks || []).entries()) {
          content = applyMark(
            content,
            mark,
            block.markDefs || [],
            `${span._key || spanIndex}-${markIndex}`,
          );
        }
        return <Fragment key={span._key || spanIndex}>{content}</Fragment>;
      })}
    </>
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
  const renderBlock = (block: BlogBodyBlock, index: number) => {
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
          <RichText block={block} />
        </h2>
      ) : (
        <h3 id={id} key={`${block.text}-${index}`}>
          <RichText block={block} />
        </h3>
      );
    }
    if (/<table\b/i.test(block.text)) {
      return <CmsTable html={block.text} key={`table-${index}`} />;
    }
    if (block.style === "blockquote") {
      return (
        <blockquote key={block._key || index}>
          <RichText block={block} />
        </blockquote>
      );
    }
    return (
      <p key={block._key || `${block.text}-${index}`}>
        <RichText block={block} />
      </p>
    );
  };

  const renderedBody: ReactNode[] = [];
  for (let index = 0; index < body.length; index += 1) {
    const block = body[index];
    if (block._type === "block" && block.listItem) {
      const listType = block.listItem;
      const items: BlogTextBlock[] = [];
      let listIndex = index;
      while (listIndex < body.length) {
        const candidate = body[listIndex];
        if (candidate._type !== "block" || candidate.listItem !== listType)
          break;
        items.push(candidate);
        listIndex += 1;
      }
      const children = items.map((item, itemIndex) => (
        <li key={item._key || itemIndex}>
          <RichText block={item} />
        </li>
      ));
      renderedBody.push(
        listType === "number" ? (
          <ol key={`list-${index}`}>{children}</ol>
        ) : (
          <ul key={`list-${index}`}>{children}</ul>
        ),
      );
      index = listIndex - 1;
      continue;
    }
    renderedBody.push(renderBlock(block, index));
  }

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
      <div className={styles.content}>{renderedBody}</div>
    </div>
  );
}
