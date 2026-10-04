import type { NextConfig } from "next";

const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
let apiHost = "localhost";
try {
  apiHost = new URL(apiUrl).hostname;
} catch {
  apiHost = "localhost";
}

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: apiHost,
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: apiHost,
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
