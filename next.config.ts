import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve("."),
  },
  async redirects() {
    return [
      {
        source: "/ass-network",
        destination: "/partner-network",
        permanent: true,
      },
      {
        source: "/solutions/cube",
        destination: "/products/cube",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
