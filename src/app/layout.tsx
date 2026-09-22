import type { Metadata } from "next";
import localFont from "next/font/local";

import { ReloadScrollRestoration } from "@/components/layout/reload-scroll-restoration";
import { SiteMotion } from "@/components/layout/site-motion";
import { createMetadata } from "@/lib/seo/metadata";

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

export const metadata: Metadata = createMetadata();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={aeonikPro.variable}>
      <body>
        <ReloadScrollRestoration />
        <SiteMotion />
        {children}
      </body>
    </html>
  );
}
