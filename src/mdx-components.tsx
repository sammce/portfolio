import type { MDXComponents } from "mdx/types";
import { LinkableHeading } from "./components/ui/linkable-heading";
import { cn, slugify } from "./lib/utils";
import { Separator } from "./components/ui/separator";
import { ExpandableImage } from "./components/ui/expandable-image";
import { ExternalLink } from "./components/ui/external-link";

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
      <div className="mt-6 mb-3">
        <ExpandableImage
          alt={alt}
          width={800}
          height={600}
          className="my-0!"
          {...props}
        />
      </div>
    ),
    h1: (props) => (
      <Heading {...props} iconSize={30} className="text-4xl xl:text-5xl mb-8" />
    ),
    h2: (props) => (
      <Heading
        {...props}
        iconSize={25}
        className="text-2xl xl:text-3xl"
        as="h2"
      />
    ),
    h3: (props) => (
      <Heading
        {...props}
        iconSize={20}
        className="text-xl xl:text-2xl"
        as="h3"
      />
    ),
    h4: (props) => (
      <Heading
        {...props}
        iconSize={15}
        className="text-base xl:text-lg font-bold"
        as="h4"
      />
    ),
    hr: (props) => <Separator {...props} className="my-8" />,
    a: (props) => (
      <ExternalLink
        {...props}
        className="text-primary"
        target="_blank"
        rel="noopener noreferrer"
      />
    ),
    p: (props) => <p className="my-3!" {...props} />,
    ul: (props) => (
      <ul {...props} style={{ margin: 0 }} className="*:marker:text-primary" />
    ),
    code: (props) => (
      <code
        {...props}
        className="inline not[data-language]:bg-primary/15 px-1 py-1 rounded-sm before:content-[''] after:content-['']"
        style={{ quotes: "none" }}
      />
    ),
    pre: (props) => (
      <pre
        {...props}
        className="bg-neutral-200/60 dark:bg-neutral-800/30 rounded-lg text-lg!"
        style={{ quotes: "none" }}
      />
    ),
    blockquote: (props) => (
      <blockquote
        {...props}
        className="border-l-4 border-primary py-2 pl-4 my-4 bg-neutral-200/60 dark:bg-accent/30 rounded-lg"
        style={{ quotes: "none" }}
      />
    ),
    ...components,
  };
}
