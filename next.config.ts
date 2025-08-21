import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ac.goit.global",
        port: "",
        pathname: "/**", // Дозволяє всі шляхи на цьому хості
      },
    ],
  },
};

export default nextConfig;
