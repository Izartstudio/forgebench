import type { Metadata } from "next";
import localFont from "next/font/local";

import { ReloadScrollRestoration } from "@/components/layout/reload-scroll-restoration";
import { SiteMotion } from "@/components/layout/site-motion";
import { JsonLd } from "@/components/seo/json-ld";
import { createMetadata } from "@/lib/seo/metadata";
import { organizationSchema, websiteSchema } from "@/lib/seo/schema";

import "./globals.css";

const aeonikPro = localFont({
  src: [
    {
      path: "../../public/fonts/aeonik-pro/aeonik-pro-light.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/fonts/aeonik-pro/aeonik-pro-regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/aeonik-pro/aeonik-pro-bold.otf",
      weight: "700",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-aeonik-pro",
});

export const metadata: Metadata = createMetadata({
  title:
    "Forgebench — The Control Plane for Enterprise AI | AI Credentials, Budgets and Audit",
  description:
    "Give every developer and agent their own credential, ceiling and audit record. Govern every LLM call, see who owns it and what it costs. Self-hosted and model-agnostic.",
  ogTitle: "Forgebench — The Control Plane for Enterprise AI",
  ogDescription:
    "Every call, governed. Every dollar, accounted for. Self-hosted.",
  keywords: [
    "enterprise AI governance",
    "AI control plane",
    "LLM cost management",
    "AI agent governance",
    "AI credentials",
    "LLM audit trail",
  ],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={aeonikPro.variable}>
      <body>
        <JsonLd data={[organizationSchema, websiteSchema]} />
        <ReloadScrollRestoration />
        <SiteMotion />
        {children}
      </body>
    </html>
  );
}
