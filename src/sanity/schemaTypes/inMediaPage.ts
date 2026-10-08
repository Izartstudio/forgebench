import { defineArrayMember, defineField, defineType } from "sanity";

const requiredString = (name: string, title: string, initialValue: string) =>
  defineField({
    name,
    title,
    type: "string",
    initialValue,
    validation: (rule) => rule.required(),
  });

export const inMediaPageType = defineType({
  name: "inMediaPage",
  title: "In Media page",
  type: "document",
  groups: [
    { name: "seo", title: "SEO" },
    { name: "page", title: "Page copy", default: true },
    { name: "items", title: "Media items" },
    { name: "contact", title: "Contact section" },
  ],
  fields: [
    {
      ...requiredString(
        "seoTitle",
        "SEO title",
        "Forgebench In Media — News and Press Releases",
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
        "Read the latest Forgebench news, media coverage and company press releases.",
      validation: (rule) => rule.required(),
    }),
    {
      ...requiredString("eyebrow", "Breadcrumb", "Resources / In Media"),
      group: "page",
    },
    { ...requiredString("title", "Title", "In"), group: "page" },
    {
      ...requiredString("accentTitle", "Accent title", "Media"),
      group: "page",
    },
    {
      ...requiredString("newsTabLabel", "News tab label", "News"),
      group: "page",
    },
    {
      ...requiredString(
        "pressReleasesTabLabel",
        "Press releases tab label",
        "Press Releases",
      ),
      group: "page",
    },
    {
      ...requiredString("moreNewsLabel", "More news heading", "More News"),
      group: "page",
    },
    {
      ...requiredString(
        "morePressReleasesLabel",
        "More press releases heading",
        "More Press Releases",
      ),
      group: "page",
    },
    {
      ...requiredString("readLinkLabel", "Read link label", "Read Now"),
      group: "page",
    },
    {
      ...requiredString("pageLabel", "Pagination label", "Page"),
      group: "page",
    },
    {
      ...requiredString("nextLabel", "Next button label", "Next"),
      group: "page",
    },
    {
      ...requiredString(
        "showingLabel",
        "Page count text",
        "Showing {current} of {total} pages",
      ),
      description: "Use {current} and {total} as placeholders.",
      group: "page",
    },
    {
      ...requiredString("contactTitle", "Heading", "Contact Our Press Team"),
      group: "contact",
    },
    {
      ...requiredString(
        "contactDescription",
        "Description",
        "For Media & Partnership Related Questions",
      ),
      group: "contact",
    },
    {
      ...requiredString(
        "mediaInquiriesLabel",
        "Media button label",
        "Media Inquiries",
      ),
      group: "contact",
    },
    defineField({
      name: "mediaInquiriesHref",
      title: "Media button URL",
      type: "string",
      group: "contact",
      initialValue: "mailto:info@seedlinglabs.com?subject=Media%20Inquiry",
      validation: (rule) => rule.required(),
    }),
    {
      ...requiredString(
        "partnerInquiriesLabel",
        "Partner button label",
        "Partner Inquiries",
      ),
      group: "contact",
    },
    defineField({
      name: "partnerInquiriesHref",
      title: "Partner button URL",
      type: "string",
      group: "contact",
      initialValue:
        "mailto:info@seedlinglabs.com?subject=Partnership%20Inquiry",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "items",
      title: "Media items",
      type: "array",
      group: "items",
      description:
        "Order controls placement: the first item is featured, the next three are cards, and all remaining items appear under More News / More Press Releases.",
      of: [
        defineArrayMember({
          name: "mediaItem",
          title: "Media item",
          type: "object",
          fields: [
            defineField({
              name: "tab",
              title: "Section",
              type: "string",
              options: {
                list: [
                  { title: "News", value: "news" },
                  { title: "Press Releases", value: "pressReleases" },
                ],
                layout: "radio",
              },
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "publication",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "publishedAt",
              title: "Published date",
              type: "date",
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
              name: "href",
              title: "Article URL",
              description:
                "Required external URL for the original publication.",
              type: "url",
              validation: (rule) =>
                rule.required().uri({ scheme: ["http", "https"] }),
            }),
            defineField({
              name: "logo",
              title: "Publication logo",
              type: "image",
              description:
                "Transparent PNG, WebP or SVG-style logo artwork works best.",
              options: { hotspot: true },
            }),
          ],
          preview: {
            select: { title: "title", subtitle: "publication", media: "logo" },
          },
        }),
      ],
      validation: (rule) => rule.required().min(1),
    }),
  ],
  preview: { prepare: () => ({ title: "In Media page" }) },
});
