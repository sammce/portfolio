"use client";

import { calculateDuration, Job } from "@/constants/jobs";
import { Section } from "../ui/section";
import { ExternalLink } from "../ui/external-link";
import { cn, slugify } from "@/lib/utils";
import { TechStackBadge } from "../ui/tech-stack-badge";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronDown } from "lucide-react";

export function JobItem({ job }: { job: Job }) {
  const [expanded, setExpanded] = useState(false);

  const handleExpand = () => {
    setExpanded((prev) => !prev);
  };

  return (
    <Section
      className="flex flex-col mt-3 rounded-lg border gap-0 mb-5"
      id={slugify(job.sidebarTitle)}
    >
      <div
        className={cn(
          "p-4 rounded-lg hover:bg-primary/10 cursor-pointer hover:p-[15px] hover:border hover:border-primary/30 transition-colors",
        )}
        onClick={handleExpand}
      >
        <div className="flex flex-row items-center justify-between gap-1">
          <p className="text-lg">
            <span className="font-bold">{job.title} @ </span>
            <ExternalLink
              href={job.href}
              className="font-normal ml-1 inline-block"
            >
              {job.company}
            </ExternalLink>
          </p>
          <ChevronDown
            className={cn("cursor-pointer transition-transform", {
              "rotate-180": expanded,
            })}
          />
        </div>
        <p className="text-muted-foreground flex flex-col gap-1 pt-1">
          <span>{job.location}</span>
          <span>
            {calculateDuration(
              job.startDate.toDateString(),
              job.endDate.toDateString(),
            )}
          </span>
        </p>
        <div className="flex items-center gap-2 pt-3">
          {job.technologies?.map((tech) => (
            <TechStackBadge technology={tech} key={tech} />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            className="overflow-y-hidden "
          >
            {job.projects.map((project) => (
              <div key={project.name} className="p-4 origin-top">
                <div
                  className={cn(
                    "flex flex-col lg:flex-row items-start lg:items-center",
                  )}
                >
                  <p className="font-bold text-base mr-4 pb-2 lg:pb-0">
                    {project.name}
                  </p>
                  <div className="flex items-center gap-2 flex-wrap">
                    {project.technologies?.map((tech) => (
                      <TechStackBadge technology={tech} key={tech} small />
                    ))}
                  </div>
                </div>
                <ul className="list-disc pl-4" key={project.name}>
                  {project.responsibilities.map((responsibility, index) => (
                    <li key={index} className="py-2">
                      <p className="pb-2">{responsibility.description}</p>
                      <div className="flex items-center gap-2">
                        {responsibility.technologies?.map((tech) => (
                          <TechStackBadge technology={tech} key={tech} small />
                        ))}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
}
