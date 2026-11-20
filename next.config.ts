import type { NextConfig } from "next";

// Su GitHub Pages il sito vive in una sottocartella (es. /zi-pauluccio-demo): impostare NEXT_PUBLIC_BASE_PATH.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  reactStrictMode: true,
  basePath,
  assetPrefix: basePath || undefined,
};

export default nextConfig;
