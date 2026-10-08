import { defineArrayMember, defineField, defineType } from "sanity";

const copyField = (name: string, title: string, initialValue: string) =>
  defineField({
    name,
    title,
    type: "string",
    initialValue,
    validation: (rule) => rule.required(),
  });

export const caseStudiesPageType = defineType({
  name: "caseStudiesPage",
  title: "Case Studies page",
  type: "document",
  groups: [
    { name: "seo", title: "SEO" },
    { name: "page", title: "Page copy", default: true },
    { name: "studies", title: "Case studies" },
  ],
  fields: [
    {
      ...copyField(
        "seoTitle",
        "SEO title",
        "Forgebench Case Studies — Enterprise AI Governance",
      ),
      group: "seo",
    },
    defineField({
      name: "seoDescription",
      title: "SEO description",
      type: "text",
      rows: 3,
      group: "seo",
      initialValue:
        "See how teams use Forgebench to govern enterprise AI developers, agents, budgets and audit records.",
      validation: (rule) => rule.required(),
    }),
    {
      ...copyField("eyebrow", "Breadcrumb", "Resources / Case Studies"),
      group: "page",
    },
    { ...copyField("title", "Title", "Case"), group: "page" },
    { ...copyField("accentTitle", "Accent title", "Studies"), group: "page" },
    {
      ...copyField("editorPickLabel", "Editor pick label", "Editor’s Pick"),
      group: "page",
    },
    {
      ...copyField("moreStudiesLabel", "Listing heading", "More Studies"),
      group: "page",
    },
    {
      ...copyField("readLinkLabel", "Read link label", "Read More"),
      group: "page",
    },
    {
      ...copyField("readTimeSuffix", "Read time suffix", "min read"),
      group: "page",
    },
    { ...copyField("pageLabel", "Pagination label", "Page"), group: "page" },
    { ...copyField("nextLabel", "Next button label", "Next"), group: "page" },
    {
      ...copyField(
        "showingLabel",
        "Page count text",
        "Showing {current} of {total} pages",
      ),
      description: "Use {current} and {total} as placeholders.",
      group: "page",
    },
    {
      ...copyField(
        "relatedStudiesLabel",
        "Related studies heading",
        "Read Related Case Studies",
      ),
      group: "page",
    },
    defineField({
      name: "studies",
      title: "Case studies",
      type: "array",
      group: "studies",
      description:
        "The first two studies appear as featured cards. Remaining studies appear in the paginated grid.",
      of: [
        defineArrayMember({
          name: "caseStudy",
          title: "Case study",
          type: "object",
          fields: [
            defineField({
              name: "slug",
              type: "slug",
              options: { source: "title" },
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "title",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "excerpt",
              type: "text",
              rows: 3,
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "industry",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "useCase",
              title: "Use Case",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "cloud",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "product",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "readingMinutes",
              title: "Reading minutes",
              type: "number",
              initialValue: 12,
              validation: (rule) => rule.required().min(1),
            }),
            defineField({
              name: "publishedAt",
              title: "Published date",
              type: "date",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "href",
              title: "Case study URL",
              type: "string",
              initialValue: "#",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "image",
              title: "Illustration",
              type: "image",
              options: { hotspot: true },
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "imageAlt",
              title: "Illustration alt text",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "editorPick",
              title: "Show editor’s pick label",
              type: "boolean",
              initialValue: false,
            }),
            defineField({
              name: "tone",
              title: "Illustration background",
              type: "string",
              initialValue: "peach",
              options: {
                list: [
                  { title: "Peach", value: "peach" },
                  { title: "Cream", value: "cream" },
                  { title: "Blue", value: "blue" },
                ],
                layout: "radio",
              },
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "body",
              title: "Case study content",
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
                            type: "url",
                            validation: (rule) =>
                              rule.required().uri({
                                scheme: ["http", "https", "mailto", "tel"],
                              }),
                          }),
                          defineField({
                            name: "openInNewTab",
                            type: "boolean",
                            initialValue: true,
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
                    defineField({ name: "caption", type: "string" }),
                    defineField({
                      name: "hasHeaderRow",
                      title: "Use first row as column headings",
                      type: "boolean",
                      initialValue: true,
                    }),
                    defineField({
                      name: "rows",
                      type: "array",
                      of: [
                        defineArrayMember({
                          name: "row",
                          type: "object",
                          fields: [
                            defineField({
                              name: "cells",
                              type: "array",
                              of: [defineArrayMember({ type: "string" })],
                              validation: (rule) => rule.required().min(1),
                            }),
                          ],
                        }),
                      ],
                      validation: (rule) => rule.required().min(1),
                    }),
                  ],
                }),
              ],
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: { title: "title", subtitle: "excerpt", media: "image" },
          },
        }),
      ],
      validation: (rule) => rule.required().min(2),
    }),
  ],
  preview: { prepare: () => ({ title: "Case Studies page" }) },
});
