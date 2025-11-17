import { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  experimental: {
    // add other experimental flags if needed, e.g.,
    // appDir: true
  },
};

export default nextConfig;
