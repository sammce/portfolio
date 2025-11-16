import { LinkableHeading } from "../ui/linkable-heading";
import { Section } from "../ui/section";
import { Separator } from "../ui/separator";
import Link from "next/link";
import { ProjectTechBadge } from "./project-tech-badge";
import { ProjectMetadata } from "@/lib/types";
import fs from "node:fs";

async function getProjectInfo() {
  const projects = fs.readdirSync("./src/projects");

  return await Promise.all(
    projects.map(async (projectMdxFile) => {
      const { metadata } = await import(`@/projects/${projectMdxFile}`);
      return metadata as ProjectMetadata;
    }),
  );
}
const projects = await getProjectInfo();

export function Projects() {
  return (
    <Section className="w-full flex flex-col gap-2 mb-12" id="projects" flash>
      <LinkableHeading href="#projects">Projects</LinkableHeading>
      <Separator className="mb-1" />

      <div className="flex flex-col gap-2 font-code">
        {projects.map((project) => (
          <Link key={project.title} href={project.href} scroll>
            <div className="rounded-xl p-4 border mt-4 flex flex-col gap-3 hover:bg-primary/10 hover:border-primary/30 transition-colors">
              <h3 className="font-bold font-code text-lg">
                {project.title}{" "}
                <span className="text-muted-foreground">({project.year})</span>
              </h3>
              <p className="text-muted-foreground">{project.description}</p>
              <ProjectTechBadge project={project} />
            </div>
          </Link>
        ))}
      </div>
    </Section>
  );
}
