import { notFound } from "next/navigation";
import fs from "node:fs";
import { Metadata } from "next";
import { BackToHome } from "@/components/ui/back-to-home";
import { OnThisPage } from "./on-this-page";
import { LinkableHeading } from "@/components/ui/linkable-heading";
import { slugify } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, ArrowRight, Link as LinkIcon } from "lucide-react";
import GithubOriginal from "devicons-react/icons/GithubOriginal";
import { TechStackBadge } from "@/components/ui/tech-stack-badge";
import { Technology } from "@/constants/tech-stacks";
import { Suspense } from "react";
import { ProjectMetadata } from "@/lib/types";
import { ExpandableImage } from "@/components/ui/expandable-image";
import { ExternalLink } from "@/components/ui/external-link";
import Link from "next/link";
import { getProjectInfo } from "@/components/atoms/projects";

const FurtherReading = ({
  metadata,
  direction,
}: {
  metadata?: ProjectMetadata;
  direction: "prev" | "next";
}) => {
  return (
    <div className="w-full md:w-1/2">
      {metadata && (
        <Link
          href={metadata.href}
          className="rounded-xl p-4 border mt-4 flex flex-col gap-2 hover:bg-primary/10 hover:border-primary/30 transition-colors relative no-underline w-full"
        >
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              {direction === "next" && (
                <>
                  Next <ArrowRight size={20} />
                </>
              )}
              {direction === "prev" && (
                <>
                  <ArrowLeft size={20} /> Previous
                </>
              )}
            </span>
            {metadata.tags && (
              <div className="flex items-center text-sm gap-2">
                {metadata.tags.map((tag) => (
                  <div key={tag} className="px-2 py-1 rounded-md border">
                    {tag}
                  </div>
                ))}
              </div>
            )}
          </div>
          <h3 className="text-xl not-prose">{metadata.title}</h3>
          <span className="text-muted-foreground text-sm line-clamp-2 text-ellipsis">
            {metadata.description}
          </span>
        </Link>
      )}
    </div>
  );
};

const projects = await getProjectInfo();

export default async function Page(props: PageProps<"/[slug]">) {
  const { slug } = await props.params;

  const metadata = projects.find((project) => project.href === "/" + slug);

  if (!metadata) {
    return notFound();
  }

  const nextMetadata: ProjectMetadata | undefined =
    projects[metadata.index + 1];
  const prevMetadata: ProjectMetadata | undefined =
    projects[metadata.index - 1];

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
        <div className="flex flex-col xl:flex-row justify-between items-center mb-6 mt-4 not-prose">
          <LinkableHeading
            iconSize={30}
            href={"#" + slugify(metadata.title)}
            id={slugify(metadata.title)}
            className="text-4xl xl:text-5xl w-full xl:w-auto"
          >
            {metadata.title}
          </LinkableHeading>
          <span className="text-2xl font-bold text-muted-foreground w-full xl:w-auto">
            {metadata.year}
          </span>
        </div>

        <p>{metadata.description}</p>

        <div className="flex flex-col gap-4">
          {metadata.liveUrl && (
            <ExternalLink
              href={metadata.liveUrl}
              className="flex items-center gap-2 text-primary max-w-fit"
            >
              <LinkIcon size={18} />
              <span className="text-sm font-medium">{metadata.liveUrl}</span>
            </ExternalLink>
          )}

          {metadata.github && (
            <ExternalLink
              href={metadata.github}
              className="flex items-center gap-2 text-primary max-w-fit"
            >
              <GithubOriginal
                size={18}
                className="dark:bg-foreground dark:invert-100 mr-1"
              />
              <span className="text-sm font-medium">View source</span>
            </ExternalLink>
          )}

          {!metadata.github && (
            <div className="flex items-center gap-2">
              <GithubOriginal
                size={18}
                className="dark:bg-foreground dark:invert-100 mr-1 opacity-20"
              />
              <p className="text-muted-foreground my-0!">Closed source</p>
            </div>
          )}
        </div>

        <div className="flex flex-wrap gap-2 mt-6 mb-4">
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

        {metadata.splash && (
          <ExpandableImage
            src={metadata.splash}
            alt={`Splash screen for ${metadata.title}`}
            width={800}
            height={600}
          />
        )}
        <Separator />
        <br />
        <div className="text-foreground">
          <OnThisPage>
            <Content />
          </OnThisPage>
          <div className="flex flex-col md:flex-row justify-between mb-8 gap-8">
            <FurtherReading metadata={prevMetadata} direction="prev" />
            <FurtherReading metadata={nextMetadata} direction="next" />
          </div>
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
    return { title: metadata.title + " | Sam McElligott" };
  } catch {
    return { title: "Project not found" };
  }
}

export async function generateStaticParams() {
  const projects = fs.readdirSync("./src/projects");

  return projects.map((projectMdxFile) => {
    return { slug: projectMdxFile.replace(".mdx", "") };
  });
}
