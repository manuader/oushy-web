import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // Pin the workspace root so Turbopack ignores stray lockfiles above the repo.
  turbopack: {
    root: path.join(__dirname),
  },
  images: {
    formats: ["image/avif", "image/webp"],
    // Instagram serves media from rotating CDN subdomains, and the exact host
    // differs per asset — hence the wildcards rather than fixed hostnames.
    remotePatterns: [
      { protocol: "https", hostname: "**.cdninstagram.com" },
      { protocol: "https", hostname: "**.fbcdn.net" },
    ],
    // Next 16 caches optimized images for 4h by default, so replacing a file in
    // /public keeps serving the stale version while developing. In production
    // that TTL is what we want; in dev it just hides your own edits.
    minimumCacheTTL: process.env.NODE_ENV === "development" ? 0 : 14400,
  },
};

export default nextConfig;
