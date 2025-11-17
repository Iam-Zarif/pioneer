// next.config.ts
import { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // or specific hostname like "example.com"
      },
    ],
  },
};

export default nextConfig;
