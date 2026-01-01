import createMDX from "@next/mdx";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  pageExtensions: ["mdx", "ts", "tsx"],
  
  async redirects() {
    return [
      {
        source: "/project/:slug",
        destination: "/projects/:slug",
        permanent: true, // 301 redirect
      },
    ];
  },
};

const withMDX = createMDX({});

export default withMDX(nextConfig);
