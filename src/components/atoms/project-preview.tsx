"use client";

import Link from "next/link";
import { BookOpen, Globe, Radio, Sparkles, Wrench } from "lucide-react";
import { ProjectTechBadge } from "./project-tech-badge";
import { ProjectMetadata, Tag } from "@/lib/types";
import { AnimatePresence, motion } from "motion/react";
import { Section } from "../ui/section";
import { LinkableHeading } from "../ui/linkable-heading";
import { Separator } from "../ui/separator";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { ExternalLink as ExternalLinkIcon } from "lucide-react";

const MotionLink = motion.create(Link);

const projectFilterOptions: Record<Tag, React.ComponentType> = {
  Web: Globe,
  "AI/ML": Sparkles,
  Research: BookOpen,
  Tool: Wrench,
  Live: Radio,
};

export function ProjectPreviews({ projects }: { projects: ProjectMetadata[] }) {
  const [projectFilter, setProjectFilter] = useState<Tag | null>(null);
  const [didMount, setDidMount] = useState(false);

  const filteredProjects = projectFilter
    ? projects.filter((project) => project.tags?.includes(projectFilter))
    : projects;

  const handleProjectFilterChange = (tag: Tag) => {
    setProjectFilter(tag === projectFilter ? null : tag);
  };

  useEffect(() => {
    if (!didMount) {
      // eslint-disable-next-line
      setDidMount(true);
    }
  }, [didMount]);

  return (
    <Section className="w-full flex flex-col gap-2 mb-12" id="projects">
      <div className="flex flex-col 2xl:flex-row items-start gap-2 2xl:items-center justify-between">
        <LinkableHeading href="#projects" as="h2">
          Projects
        </LinkableHeading>

        <div className="flex items-center gap-2 flex-wrap">
          {(
            Object.entries(projectFilterOptions) as [Tag, React.ComponentType][]
          ).map(([tag, Icon]) => (
            <Button
              key={tag}
              onClick={() => handleProjectFilterChange(tag)}
              variant="outline"
              className={cn("hover:bg-primary/20! ", {
                "bg-primary/20! dark:bg-primary/20! border-primary! shadow-md! shadow-primary/15!":
                  projectFilter === tag,
              })}
            >
              <Icon /> {tag}
            </Button>
          ))}
        </div>
      </div>
      <Separator className="mb-1" />

      <motion.div className="flex flex-col font-code">
        <AnimatePresence>
          {filteredProjects.map((project) => (
            <MotionLink
              key={project.title}
              href={project.href}
              initial={
                didMount
                  ? { opacity: 0, height: 0 }
                  : { opacity: 1, height: "auto" }
              }
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
            >
              <div className="rounded-xl p-4 border mt-4 flex flex-col gap-3 hover:bg-primary/10 hover:border-primary/30 transition-colors relative">
                <ExternalLinkIcon
                  className={cn("absolute top-[18px] right-[18px]")}
                  size={20}
                />
                <h2 className="font-bold font-code text-xl flex flex-col items-start lg:flex-row lg:items-center gap-4">
                  <span>{project.title}</span>
                  <span className="text-muted-foreground text-base">
                    ({project.year})
                  </span>
                </h2>
                <p className="text-muted-foreground">{project.description}</p>
                <ProjectTechBadge project={project} />
              </div>
            </MotionLink>
          ))}
        </AnimatePresence>
      </motion.div>
    </Section>
  );
}
