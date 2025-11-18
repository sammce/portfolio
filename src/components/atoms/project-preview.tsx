"use client";

import Link from "next/link";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { Radio } from "lucide-react";
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

const projectFilterOptions: Tag[] = [
  "Web",
  "AI/ML",
  "Research",
  "Tool",
  "Live",
];

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
      <div className="flex flex-col lg:flex-row items-start gap-2 lg:items-center justify-between">
        <LinkableHeading href="#projects" as="h2">
          Projects
        </LinkableHeading>

        <div className="flex items-center gap-2">
          {projectFilterOptions.map((tag) => (
            <Button
              key={tag}
              onClick={() => handleProjectFilterChange(tag)}
              variant="outline"
              className={cn("hover:bg-primary/20! ", {
                "bg-primary/20! dark:bg-primary/20! border-primary! shadow-md! shadow-primary/15!":
                  projectFilter === tag,
              })}
            >
              {tag}
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
                {project.liveUrl && (
                  <Tooltip disableHoverableContent>
                    <TooltipTrigger className="absolute top-3 right-3">
                      <div className="absolute top-0 right-0 size-8 rounded-full bg-destructive/20 animate-pulse"></div>
                      <Radio className="absolute top-1.5 right-1.5 size-5 rounded-full text-red-800 dark:text-red-400"></Radio>
                    </TooltipTrigger>
                    <TooltipContent className="mr-8">
                      <p>Live Site</p>
                    </TooltipContent>
                  </Tooltip>
                )}
                <ExternalLinkIcon
                  className={cn("absolute top-[18px] right-[18px]", {
                    "right-16": project.liveUrl,
                  })}
                  size={20}
                />
                <h2 className="font-bold font-code text-xl flex items-center gap-4">
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
