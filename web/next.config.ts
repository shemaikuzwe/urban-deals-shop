import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  experimental: {
    cacheComponents: true,
  },
  images: {
    remotePatterns: [
      {
        hostname: "lh3.googleusercontent.com",
        protocol: "https",
      },
      { hostname: "fra.cloud.appwrite.io", protocol: "https" },
    ],
  },
};

export default nextConfig;
