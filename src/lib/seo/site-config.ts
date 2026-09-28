const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();

export const siteConfig = {
  name: "Forgebench",
  organizationName: "Seedling Labs",
  email: "info@seedlinglabs.com",
  url: new URL(configuredUrl || "http://localhost:3000"),
  isProductionUrlConfigured: Boolean(configuredUrl),
} as const;
