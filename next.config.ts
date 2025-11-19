import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  experimental: {
    turbopackFileSystemCacheForDev: true,
    scrollRestoration: true,
  },
  images: {
    remotePatterns: [new URL("https://github.com/sammce/**?raw=true")],
  },
};

const withMDX = createMDX({
  options: {
    rehypePlugins: ["rehype-unwrap-images", "rehype-pretty-code"],
  },
});

export default withMDX(nextConfig);
