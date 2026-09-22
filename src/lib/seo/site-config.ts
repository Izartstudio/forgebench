const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();

export const siteConfig = {
  // Replace this when the final public-facing brand name is confirmed.
  name: "FORGEBENCH",
  url: new URL(configuredUrl || "http://localhost:3000"),
  isProductionUrlConfigured: Boolean(configuredUrl),
} as const;
