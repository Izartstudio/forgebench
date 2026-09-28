import { siteConfig } from "./site-config";

const absoluteUrl = (path: string) => new URL(path, siteConfig.url).toString();

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${absoluteUrl("/")}#organization`,
  name: siteConfig.organizationName,
  url: absoluteUrl("/"),
  email: siteConfig.email,
  brand: {
    "@type": "Brand",
    name: siteConfig.name,
  },
  logo: absoluteUrl("/logos/nav-logo.webp"),
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${absoluteUrl("/")}#website`,
  name: siteConfig.name,
  url: absoluteUrl("/"),
  publisher: { "@id": `${absoluteUrl("/")}#organization` },
  inLanguage: "en",
};

export function softwareApplicationSchema(path = "/") {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": `${absoluteUrl(path)}#software-application`,
    name: siteConfig.name,
    applicationCategory: "BusinessApplication",
    applicationSubCategory: "Enterprise AI governance",
    operatingSystem: "Self-hosted",
    url: absoluteUrl(path),
    description:
      "An enterprise AI control plane for credentials, budgets, policy, attribution and audit records across developers and agents.",
    publisher: { "@id": `${absoluteUrl("/")}#organization` },
  };
}

export function faqPageSchema(
  faqs: readonly { question: string; answer: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}
