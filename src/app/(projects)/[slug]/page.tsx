import { notFound } from "next/navigation";
import fs from "node:fs";
import { Metadata } from "next";
import { BackToHome } from "@/components/ui/back-to-home";
import { OnThisPage } from "./on-this-page";
import { LinkableHeading } from "@/components/ui/linkable-heading";
import { cn, slugify } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { Link as LinkIcon } from "lucide-react";
import GithubOriginal from "devicons-react/icons/GithubOriginal";
import { TechStackBadge } from "@/components/ui/tech-stack-badge";
import { Technology } from "@/constants/tech-stacks";
import { Suspense } from "react";
import { ProjectMetadata } from "@/lib/types";
import { ExpandableImage } from "@/components/ui/expandable-image";

export default async function Page(props: PageProps<"/[slug]">) {
  const { slug } = await props.params;

  try {
    const { default: Content, metadata } = (await import(
      `@/projects/${slug}.mdx`
    )) as {
      default: React.ComponentType;
      metadata: ProjectMetadata;
    };

    return (
      <div className="mb-20 scroll-mt-52 overflow-visible">
        <Suspense>
          <BackToHome iconSize={24} className="text-lg" />
        </Suspense>
        <div className="flex flex-col xl:flex-row justify-between items-center mb-4 xl:mb-0">
          <LinkableHeading
            iconSize={30}
            href={"#" + slugify(metadata.title)}
            id={slugify(metadata.title)}
            className="text-5xl mb-4 mt-4 w-full xl:w-auto"
          >
            {metadata.title}
          </LinkableHeading>
          <span className="text-2xl font-bold text-muted-foreground w-full xl:w-auto">
            {metadata.year}
          </span>
        </div>

        {metadata.tags && (
          <>
            <div className="flex flex-wrap gap-2 mb-8">
              {metadata.tags?.map((tag: string) => (
                <span
                  key={tag}
                  className="text-sm font-bold  border  rounded-lg px-3 py-1.5"
                >
                  {tag}
                </span>
              ))}
            </div>
          </>
        )}

        <div className="flex flex-wrap gap-2 mb-4">
          {metadata.coreTechnologies.map((tech: Technology) => (
            <TechStackBadge
              technology={tech}
              key={tech}
              className="rounded-lg"
            />
          ))}
        </div>

        {metadata.secondaryTechnologies && (
          <div className="flex flex-wrap gap-2 mb-8">
            {metadata.secondaryTechnologies?.map((tech: Technology) => (
              <TechStackBadge
                technology={tech}
                key={tech}
                small
                className="rounded-lg"
              />
            ))}
          </div>
        )}

        <p>{metadata.description}</p>

        {metadata.liveUrl && (
          <Link
            href={metadata.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 mb-4 text-primary max-w-fit"
          >
            <LinkIcon size={18} />
            <span className="text-sm font-medium">{metadata.liveUrl}</span>
          </Link>
        )}

        {metadata.github && (
          <Link
            href={metadata.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 mb-4 text-primary max-w-fit"
          >
            <GithubOriginal
              size={18}
              className="dark:bg-foreground dark:invert-100 mr-1"
            />
            <span className="text-sm font-medium">View source</span>
          </Link>
        )}

        {metadata.splash && (
          <div className="rounded-lg bg-primary/40">
            <ExpandableImage
              src={metadata.splash}
              alt={`Splash screen for ${metadata.title}`}
              width={800}
              height={600}
              className={cn(
                "rounded-lg border hover:translate-x-4 hover:shadow-xl hover:-translate-y-4 transition-transform bg-transparent",
              )}
            />
          </div>
        )}
        <Separator />
        <br />
        <div className="text-foreground">
          <OnThisPage>
            <Content />
          </OnThisPage>
        </div>
      </div>
    );
  } catch {
    notFound();
  }
}

export async function generateMetadata(
  props: PageProps<"/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;

  try {
    const { metadata } = await import(`@/projects/${slug}.mdx`);
    return { title: metadata.title };
  } catch {
    return { title: "Project not found" };
  }
}

export async function generateStaticParams() {
  const projects = fs.readdirSync("./src/projects");

  return projects.map(async (projectMdxFile) => {
    return { slug: projectMdxFile.replace(".mdx", "") };
  });
}
