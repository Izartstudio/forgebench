import { defineField, defineType } from "sanity";

const screenshotField = (name: string, title: string, description: string) =>
  defineField({
    name,
    title,
    type: "responsiveScreenshot",
    description,
  });

export const responsiveScreenshotType = defineType({
  name: "responsiveScreenshot",
  title: "Responsive screenshot",
  type: "object",
  fields: [
    defineField({
      name: "desktop",
      title: "Desktop / tablet image",
      type: "image",
      description:
        "Used from 768px upward. Any source dimensions are accepted; the site crops the image to cover the fixed frame.",
      options: { hotspot: true },
    }),
    defineField({
      name: "mobile",
      title: "Mobile image (optional)",
      type: "image",
      description:
        "Used below 768px. Leave empty to reuse the desktop image (or the built-in fallback). Any source dimensions are accepted and cropped to cover.",
      options: { hotspot: true },
    }),
  ],
  preview: {
    select: {
      media: "desktop",
    },
    prepare: ({ media }) => ({ title: "Desktop + optional mobile", media }),
  },
});

export const pageScreenshotsType = defineType({
  name: "pageScreenshots",
  title: "Page screenshots",
  type: "document",
  groups: [
    { name: "agentsHero", title: "Agents hero", default: true },
    { name: "developersHero", title: "Developers hero" },
    { name: "agentsSlides", title: "Agents slides" },
    { name: "developersSlides", title: "Developers slides" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Configuration name",
      type: "string",
      initialValue: "Website page screenshots",
      readOnly: true,
      hidden: true,
    }),
    {
      ...screenshotField(
        "agentsHeroBack",
        "Agents hero — back / left screenshot",
        "Displayed in a fixed 1688:868 frame (recommended upload ratio 1.94:1). Mobile keeps the same frame ratio.",
      ),
      group: "agentsHero",
    },
    {
      ...screenshotField(
        "agentsHeroFront",
        "Agents hero — front / right screenshot",
        "Displayed in a fixed 3200:2000 frame (recommended upload ratio 1.6:1). Mobile keeps the same frame ratio.",
      ),
      group: "agentsHero",
    },
    {
      ...screenshotField(
        "developersHeroBack",
        "Developers hero — back / left screenshot",
        "Displayed in a fixed 2697:1726 frame (recommended upload ratio 1.56:1). Mobile keeps the same frame ratio.",
      ),
      group: "developersHero",
    },
    {
      ...screenshotField(
        "developersHeroFront",
        "Developers hero — front / right screenshot",
        "Displayed in a fixed 2412:1710 frame (recommended upload ratio 1.41:1). Mobile keeps the same frame ratio.",
      ),
      group: "developersHero",
    },
    defineField({
      name: "agentsSlides",
      title: "Agents page slides",
      type: "object",
      group: "agentsSlides",
      fields: [
        screenshotField(
          "slide01",
          "01 — Register (registry)",
          "Recommended desktop ratio 2:1 and mobile ratio 1:1 (keep important content centered). Both are cropped to cover the fixed slide frame.",
        ),
        screenshotField(
          "slide02",
          "02 — Provision (governed call path)",
          "Recommended desktop ratio 2:1 and mobile ratio 1:1 (keep important content centered). Both are cropped to cover the fixed slide frame.",
        ),
        screenshotField(
          "slide03",
          "03 — Tool authorization",
          "Recommended desktop ratio 1.76:1 and mobile ratio 1:1 (keep important content centered). Both are cropped to cover the fixed slide frame.",
        ),
        screenshotField(
          "slide04",
          "04 — Agent cost control",
          "Recommended desktop ratio 1.75:1 and mobile ratio 1:1 (keep important content centered). Both are cropped to cover the fixed slide frame.",
        ),
        screenshotField(
          "slide05",
          "05 — Audit record",
          "Recommended desktop ratio 1.76:1 and mobile ratio 1:1 (keep important content centered). Both are cropped to cover the fixed slide frame.",
        ),
        screenshotField(
          "slide06",
          "06 — Guardrails",
          "Recommended desktop ratio 1.76:1 and mobile ratio 1:1 (keep important content centered). Both are cropped to cover the fixed slide frame.",
        ),
      ],
    }),
    defineField({
      name: "developersSlides",
      title: "Developers page slides",
      type: "object",
      group: "developersSlides",
      fields: [
        screenshotField(
          "slide01",
          "01 — Credentials authenticated / ceilings",
          "Recommended desktop ratio 1.97:1 and mobile ratio 1:1 (keep important content centered). Both are cropped to cover the fixed slide frame.",
        ),
        screenshotField(
          "slide02",
          "02 — Audit recorded / call path",
          "Recommended desktop ratio 1.96:1 and mobile ratio 1:1 (keep important content centered). Both are cropped to cover the fixed slide frame.",
        ),
        screenshotField(
          "slide03",
          "03 — Guardrails and audit",
          "Recommended desktop ratio 1.96:1 and mobile ratio 1:1 (keep important content centered). Both are cropped to cover the fixed slide frame.",
        ),
        screenshotField(
          "slide04",
          "04 — Adoption measured",
          "Recommended desktop ratio 1.76:1 and mobile ratio 1:1 (keep important content centered). Both are cropped to cover the fixed slide frame.",
        ),
        screenshotField(
          "slide05",
          "05 — ROI measured",
          "Recommended desktop ratio 1.43:1 and mobile ratio 1:1 (keep important content centered). Both are cropped to cover the fixed slide frame.",
        ),
      ],
    }),
  ],
  preview: {
    prepare: () => ({ title: "Website page screenshots" }),
  },
});
