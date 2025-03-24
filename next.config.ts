import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
      },
      {
        protocol: "https",
        hostname: "optimistic-desire-d80dc8463e.media.strapiapp.com",
      },
    ],
  },
};

export default nextConfig;
