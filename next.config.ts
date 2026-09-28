import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  poweredByHeader: false,
  compress: true,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  reactStrictMode: true,
  turbopack: {
    root: process.cwd(),
  },
  async redirects() {
    return [
      {
        source: "/agent-management",
        destination: "/agents",
        permanent: true,
      },
      {
        source: "/about-us",
        destination: "/company",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
