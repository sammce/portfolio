"use client";

import { LinkableHeading } from "../ui/linkable-heading";
import { Separator } from "../ui/separator";
import { TechStackBadge } from "../ui/tech-stack-badge";
import { Technology } from "@/constants/tech-stacks";

const languages: Technology[] = ["HTML", "CSS", "TypeScript", "Python", "Bash"];
const frameworks: Technology[] = ["React", "NextJS", "Django", "TailwindCSS"];
const infra: Technology[] = ["PostgreSQL", "Docker", "AWS", "Linux"];

export function MyTechStack() {
  return (
    <div className="w-full flex flex-col gap-2">
      <LinkableHeading id="technologies">Technologies</LinkableHeading>
      <Separator className="mb-1" />
      <p className="text-muted-foreground">
        The tools I&apos;m <b>fluent</b> in, and have used to ship production
        code.
      </p>

      <h2 className="font-bold mt-4">Languages</h2>
      <div className="flex flex-wrap gap-2">
        {languages.map((language) => (
          <TechStackBadge key={language} technology={language} />
        ))}
      </div>

      <h2 className="font-bold mt-6">Frameworks</h2>
      <div className="flex flex-wrap gap-2">
        {frameworks.map((framework) => (
          <TechStackBadge key={framework} technology={framework} />
        ))}
      </div>

      <h2 className="font-bold mt-6">Infrastructure</h2>
      <div className="flex flex-wrap gap-2">
        {infra.map((platform) => (
          <TechStackBadge key={platform} technology={platform} />
        ))}
      </div>

      <div className="flex flex-wrap gap-2 mt-8"></div>
    </div>
  );
}
