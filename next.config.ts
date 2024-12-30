import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.imgur.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "imgur.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "i.toucheese-macwin.store",
        port: "",
        pathname: "/**",
      },
    ],
  },

  webpack(config, { isServer }) {
    if (!isServer) {
      config.resolve.alias["api/test"] = false;
    }
    return config;
  },
};

export default nextConfig;
