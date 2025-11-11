"use client";

import { LinkableHeading } from "../ui/linkable-heading";
import { Separator } from "../ui/separator";
import { Section } from "../ui/section";
import { Fragment, useMemo } from "react";
import { ExternalLink } from "../ui/external-link";
import { useTechFilter } from "@/hooks/use-tech-filter";
import { AnimatePresence, motion } from "motion/react";
import { TechStackBadge } from "../ui/tech-stack-badge";
import { cn } from "@/lib/utils";
import { calculateDuration, jobs, type Job } from "@/constants/jobs";

function JobItem({ job }: { job: Job }) {
  return (
    <div className="flex flex-col gap-2 mb-4 mt-3">
      <div className="flex items-center justify-between gap-1">
        <p className="text-lg">
          <span className="font-bold">{job.title} @ </span>
          <ExternalLink
            href={job.href}
            className="font-normal ml-1 inline-block"
          >
            {job.company}
          </ExternalLink>
        </p>
        <p className="text-muted-foreground">
          {calculateDuration(
            job.startDate.toDateString(),
            job.endDate.toDateString(),
          )}
        </p>
      </div>
      <p className="text-muted-foreground mb-6">{job.location}</p>
      {job.projects.map((project) => (
        <Fragment key={project.name}>
          <div
            className={cn("flex items-center gap-2 mt-4", {
              "mb-3": project.technologies,
            })}
          >
            <p className="font-bold text-base mr-4">{project.name}</p>
            {project.technologies?.map((tech) => (
              <TechStackBadge technology={tech} key={tech} small />
            ))}
          </div>
          <ul className="list-disc pl-4" key={project.name}>
            {project.responsibilities.map((responsibility, index) => (
              <li key={index} className="mb-5">
                <p className="my-2">{responsibility.description}</p>
                <div className="flex items-center gap-2">
                  {responsibility.technologies?.map((tech) => (
                    <TechStackBadge technology={tech} key={tech} small />
                  ))}
                </div>
              </li>
            ))}
          </ul>
        </Fragment>
      ))}
    </div>
  );
}

export function WorkExperience() {
  const { techFilter } = useTechFilter();

  // worst case n^3 but it's fine, lists are all < 15 items
  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      // If no filter, return true for all jobs
      if (techFilter.length === 0) {
        return true;
      }

      // Collect all nested technologies from the job
      const joinedTechs = [
        ...job.technologies,
        ...job.projects.flatMap((p) => p.technologies),
      ];

      // If any of the technologies are in the filter, return true
      return joinedTechs.some((tech) => tech && techFilter.includes(tech));
    });
  }, [techFilter]);

  return (
    <Section className="w-full flex flex-col gap-2 mb-12" id="experience">
      <LinkableHeading href="#experience">Experience</LinkableHeading>
      <Separator className="mb-1" />
      <AnimatePresence>
        {filteredJobs.map((job, index) => (
          <motion.div
            className="origin-bottom"
            key={job.title}
            exit={{
              height: 0,
              opacity: 0,
              transition: { duration: 0.2 },
            }}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
          >
            <JobItem key={job.title} job={job} />
            {index < jobs.length - 1 && <Separator className="my-2" />}
          </motion.div>
        ))}
      </AnimatePresence>
    </Section>
  );
}
