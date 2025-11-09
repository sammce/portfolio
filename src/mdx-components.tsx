import type { MDXComponents } from "mdx/types";

const components: MDXComponents = {
  h1: ({ children }) => (
    <h1 className="text-4xl tracking-tight font-semibold">{children}</h1>
  ),
};

export function useMDXComponents(): MDXComponents {
  return components;
}
