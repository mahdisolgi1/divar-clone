import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "wrqgqxhrblgwtcssvgyo.supabase.co",
      },
    ],
  },
};

export default nextConfig;
