import { defineArrayMember, defineField, defineType } from "sanity";

export const postType = defineType({
  name: "post",
  title: "Blog post",
  type: "document",
  fields: [
    defineField({
      name: "title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "title" },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "excerpt",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "publishedAt",
      type: "datetime",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "authorName",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "authorImage",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "readingMinutes",
      type: "number",
      initialValue: 8,
      validation: (rule) => rule.required().min(1),
    }),
    defineField({ name: "featured", type: "boolean", initialValue: false }),
    defineField({ name: "editorsPick", type: "boolean", initialValue: false }),
    defineField({
      name: "category",
      type: "reference",
      to: [{ type: "category" }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "tags",
      type: "array",
      of: [defineArrayMember({ type: "reference", to: [{ type: "tag" }] })],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: "mainImage",
      type: "image",
      options: { hotspot: true },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "navigationLabels",
      title: "Section navigation labels (optional)",
      description:
        "Leave empty to build the scroller navigation from article headings.",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
    }),
    defineField({
      name: "body",
      type: "array",
      of: [
        defineArrayMember({
          type: "block",
          styles: [
            { title: "Paragraph", value: "normal" },
            { title: "Heading 2", value: "h2" },
            { title: "Heading 3", value: "h3" },
            { title: "Quote", value: "blockquote" },
          ],
          lists: [
            { title: "Bulleted list", value: "bullet" },
            { title: "Numbered list", value: "number" },
          ],
          marks: {
            decorators: [
              { title: "Bold", value: "strong" },
              { title: "Italic", value: "em" },
              { title: "Underline", value: "underline" },
              { title: "Strikethrough", value: "strike-through" },
              { title: "Inline code", value: "code" },
            ],
            annotations: [
              {
                name: "link",
                title: "External link",
                type: "object",
                fields: [
                  defineField({
                    name: "href",
                    title: "URL",
                    type: "url",
                    validation: (rule) =>
                      rule.required().uri({
                        scheme: ["http", "https", "mailto", "tel"],
                      }),
                  }),
                  defineField({
                    name: "openInNewTab",
                    title: "Open in a new tab",
                    type: "boolean",
                    initialValue: true,
                  }),
                ],
              },
              {
                name: "internalLink",
                title: "Link to another blog post",
                type: "object",
                fields: [
                  defineField({
                    name: "post",
                    title: "Blog post",
                    type: "reference",
                    to: [{ type: "post" }],
                    validation: (rule) => rule.required(),
                  }),
                ],
              },
            ],
          },
        }),
        defineArrayMember({
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({ name: "alt", type: "string" }),
            defineField({ name: "caption", type: "string" }),
          ],
        }),
        defineArrayMember({
          name: "table",
          title: "Table",
          type: "object",
          fields: [
            defineField({
              name: "caption",
              title: "Caption (optional)",
              type: "string",
            }),
            defineField({
              name: "hasHeaderRow",
              title: "Use first row as column headings",
              type: "boolean",
              initialValue: true,
            }),
            defineField({
              name: "rows",
              title: "Rows",
              type: "array",
              of: [
                defineArrayMember({
                  name: "row",
                  title: "Row",
                  type: "object",
                  fields: [
                    defineField({
                      name: "cells",
                      title: "Cells",
                      description: "Add one item for each column in this row.",
                      type: "array",
                      of: [defineArrayMember({ type: "string" })],
                      validation: (rule) => rule.required().min(1),
                    }),
                  ],
                  preview: {
                    select: { cells: "cells" },
                    prepare: ({ cells }) => ({
                      title: Array.isArray(cells)
                        ? cells.join(" | ")
                        : "Table row",
                    }),
                  },
                }),
              ],
              validation: (rule) => rule.required().min(1),
            }),
          ],
          preview: {
            select: { caption: "caption", rows: "rows" },
            prepare: ({ caption, rows }) => ({
              title: caption || "Table",
              subtitle: `${Array.isArray(rows) ? rows.length : 0} rows`,
            }),
          },
        }),
      ],
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "category.title", media: "mainImage" },
  },
});
