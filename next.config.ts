import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "irsuuwijrpcxxvzkitpr.supabase.co",
      },
    ],
    domains: ["irsuuwijrpcxxvzkitpr.supabase.co"],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
