"use client";

import { TechStackBadge } from "../ui/tech-stack-badge";
import { ProjectMetadata } from "@/lib/types";
import { Plus } from "lucide-react";
import { useTechFilter } from "@/hooks/use-tech-filter";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

export function ProjectTechBadge({ project }: { project: ProjectMetadata }) {
  const { techFilter } = useTechFilter();
  const router = useRouter();

  const filterIncludesSecondary = techFilter.some((tech) => {
    return project.secondaryTechnologies?.includes(tech);
  });

  return (
    <div
      className="flex items-center gap-2 flex-wrap"
      onClick={(e) => {
        e.preventDefault();
      }}
    >
      {project.coreTechnologies.map((tech) => (
        <TechStackBadge technology={tech} key={tech} />
      ))}
      {project.secondaryTechnologies && (
        <div
          onClick={() => {
            router.push(project.href);
          }}
          className={cn(
            "flex items-center space-x-2 px-2.5 py-1.5 rounded-lg border border-foreground/15 transition-colors font-bold",

            {
              "bg-primary/20 dark:bg-primary/20 border-primary shadow-md shadow-primary/15":
                filterIncludesSecondary,
            },
          )}
        >
          <Plus size={16} /> <span>{project.secondaryTechnologies.length}</span>
        </div>
      )}
    </div>
  );
}
