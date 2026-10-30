import legacyRedirects from "./data/legacy-redirects.json";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: { root: process.cwd() },
  async redirects() {
    return legacyRedirects;
  },
  experimental: { serverActions: { bodySizeLimit: "4mb" } },
  images: {
    // 90 : diaporama plein écran de /drone-architecture.
    qualities: [75, 90],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "qyqxwtawqsinvlaiynxt.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
};

export default nextConfig;
