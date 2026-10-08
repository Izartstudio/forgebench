import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  poweredByHeader: false,
  compress: true,
  images: {
    // Local assets are already compressed and Sanity resizes CMS images at its
    // edge. Avoiding the serverless image worker removes cold transform delays.
    loader: "custom",
    loaderFile: "./src/lib/image-loader.ts",
    qualities: [75, 85, 92],
    deviceSizes: [384, 640, 750, 828, 1080, 1200, 1440, 1920],
    imageSizes: [16, 24, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        pathname: "/images/**",
      },
    ],
  },
  reactStrictMode: true,
  turbopack: {
    root: process.cwd(),
  },
  async headers() {
    const imageCache = [
      {
        key: "Cache-Control",
        value: "public, max-age=86400, stale-while-revalidate=31536000",
      },
    ];

    return [
      { source: "/images/:path*", headers: imageCache },
      { source: "/logos/:path*", headers: imageCache },
      { source: "/icons/:path*", headers: imageCache },
    ];
  },
  async redirects() {
    return [
      {
        source: "/agent-management",
        destination: "/agents",
        permanent: true,
      },
      {
        source: "/company",
        destination: "/about-us",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
