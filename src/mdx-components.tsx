import type { MDXComponents } from "mdx/types";
import Image, { ImageProps } from "next/image";
import Link from "next/link";
import { LinkableHeading } from "./components/ui/linkable-heading";
import { cn, slugify } from "./lib/utils";
import { Separator } from "./components/ui/separator";
import { ExpandableImage } from "./components/ui/expandable-image";

const Heading = ({
  children,
  iconSize = 20,
  className,
  as = "h1",
}: {
  children: string;
  iconSize?: number;
  className?: string;
  isSubheading?: boolean;
  as: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}) => {
  return (
    <LinkableHeading
      iconSize={iconSize}
      href={"#" + slugify(children)}
      className={cn(className, "my-0!")}
      id={slugify(children)}
      isSubheading={as !== "h1" && as !== "h2"}
      as={as}
    >
      {children}
    </LinkableHeading>
  );
};

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    img: ({ alt, ...props }: React.ComponentProps<typeof ExpandableImage>) => (
      <div className="rounded-lg bg-primary/40 mt-6 mb-3">
        <ExpandableImage
          alt={alt}
          width={800}
          height={600}
          className="rounded-lg border hover:translate-x-4 hover:shadow-xl hover:-translate-y-4 transition-transform bg-transparent my-0!"
          {...props}
        />
      </div>
    ),
    h1: (props) => (
      <Heading {...props} iconSize={30} className="text-5xl mb-8" />
    ),
    h2: (props) => (
      <Heading {...props} iconSize={25} className="text-3xl" as="h2" />
    ),
    h3: (props) => (
      <Heading {...props} iconSize={20} className="text-[26px]" as="h3" />
    ),
    h4: (props) => (
      <Heading
        {...props}
        iconSize={15}
        className="text-inherit font-bold"
        as="h4"
      />
    ),
    hr: (props) => <Separator {...props} className="my-8" />,
    a: (props) => <Link {...props} className="text-primary" />,
    p: (props) => <p className="my-3!" {...props} />,
    ul: (props) => <ul {...props} style={{ margin: 0 }} />,
    ...components,
  };
}
