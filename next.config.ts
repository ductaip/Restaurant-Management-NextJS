import type { NextConfig } from "next";
import envConfig from "./config";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '4000',
        pathname: '/**',
        search: '',
      },
    ],
  },
};

export default nextConfig;
