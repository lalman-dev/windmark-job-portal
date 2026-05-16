import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  typescript: {
    ignoreBuildErrors: false,
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "jsonfakery.com",
      },
    ],
  },

  reactStrictMode: true,
};

export default nextConfig;
