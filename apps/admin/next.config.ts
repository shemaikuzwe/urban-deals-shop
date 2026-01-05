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
      { hostname: "cmx55brlhb.ufs.sh", protocol: "https" },
    ],
  },
};

export default nextConfig;
