import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  experimental: {
    cacheComponents: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        hostname: "lh3.googleusercontent.com",
        protocol: "https",
      },
      { hostname: "cu8iqyca8r.ufs.sh", protocol: "https" },
    ],
  },
};

export default nextConfig;
