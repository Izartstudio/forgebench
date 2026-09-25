import { defineArrayMember, defineField, defineType } from "sanity";

export const postType = defineType({
  name: "post",
  title: "Blog post",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "slug", type: "slug", options: { source: "title" }, validation: (rule) => rule.required() }),
    defineField({ name: "excerpt", type: "text", rows: 3, validation: (rule) => rule.required() }),
    defineField({ name: "publishedAt", type: "datetime", validation: (rule) => rule.required() }),
    defineField({ name: "authorName", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "authorImage", type: "image", options: { hotspot: true } }),
    defineField({ name: "readingMinutes", type: "number", initialValue: 8, validation: (rule) => rule.required().min(1) }),
    defineField({ name: "featured", type: "boolean", initialValue: false }),
    defineField({ name: "editorsPick", type: "boolean", initialValue: false }),
    defineField({ name: "category", type: "reference", to: [{ type: "category" }], validation: (rule) => rule.required() }),
    defineField({
      name: "tags",
      type: "array",
      of: [defineArrayMember({ type: "reference", to: [{ type: "tag" }] })],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({ name: "mainImage", type: "image", options: { hotspot: true }, validation: (rule) => rule.required() }),
    defineField({
      name: "navigationLabels",
      title: "Section navigation labels (optional)",
      description: "Leave empty to build the scroller navigation from article headings.",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
    }),
    defineField({
      name: "body",
      type: "array",
      of: [
        defineArrayMember({ type: "block" }),
        defineArrayMember({
          type: "image",
          options: { hotspot: true },
          fields: [defineField({ name: "alt", type: "string" }), defineField({ name: "caption", type: "string" })],
        }),
      ],
      validation: (rule) => rule.required(),
    }),
  ],
  preview: { select: { title: "title", subtitle: "category.title", media: "mainImage" } },
});
