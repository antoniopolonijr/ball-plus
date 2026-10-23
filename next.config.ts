import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: [
    "192.168.15.9",
    "192.168.15.7",
    "192.168.15.10",
    "192.168.15.11",
  ],
};

export default nextConfig;
