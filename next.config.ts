import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https', // or 'http' if necessary, but HTTPS is recommended
        hostname: '**', // Allows any hostname
        port: '',
        pathname: '**', // Allows any path
      },
    ],
  },
};

export default nextConfig;
