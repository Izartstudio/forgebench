import { defineField, defineType } from "sanity";

export const tagType = defineType({
  name: "tag",
  title: "Blog tag",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "slug", type: "slug", options: { source: "title" }, validation: (rule) => rule.required() }),
  ],
});
