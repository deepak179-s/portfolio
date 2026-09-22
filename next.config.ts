import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ghchart.rshah.org",
      },
      {
        protocol: "https",
        hostname: "irunidgtivonmksjvddr.supabase.co",
      }
    ],
  },
};

export default nextConfig;
