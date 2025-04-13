import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  output: "export", // Enables static export
  basePath: isProd ? "/TEST" : "", // Replace with your actual repo name
  assetPrefix: isProd ? "/TEST/" : "", // Same as basePath, with trailing slash
  images: {
    unoptimized: true, // Required for static export, as GitHub Pages doesn't support Next.js image optimization
  },
};

export default nextConfig;
