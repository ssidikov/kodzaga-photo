import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["192.168.1.15", "localhost"],
  images: {
    qualities: [75, 100],
  },
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
