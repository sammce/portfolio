import { LinkableHeading } from "../ui/linkable-heading";
import { Section } from "../ui/section";
import { Separator } from "../ui/separator";
import { projects } from "@/constants/projects";
import { TechStackBadge } from "../ui/tech-stack-badge";
import Link from "next/link";

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
              <p className="text-muted-foreground">{project.blurb}</p>
              <div
                className="flex items-center gap-2"
                onClick={(e) => {
                  e.preventDefault();
                }}
              >
                {project.technologies.map((tech) => (
                  <TechStackBadge technology={tech} key={tech} />
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </Section>
  );
}
