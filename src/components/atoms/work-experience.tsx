import { LinkableHeading } from "../ui/linkable-heading";
import { Separator } from "../ui/separator";
import { Section } from "../ui/section";
import { Fragment } from "react";
import { ExternalLink } from "../ui/external-link";
import { TechStackBadge } from "../ui/tech-stack-badge";
import { cn } from "@/lib/utils";
import { calculateDuration, jobs, type Job } from "@/constants/jobs";

function JobItem({ job }: { job: Job }) {
  return (
    <Section
      className="flex flex-col gap-2 mb-4 mt-3"
      id={job.sidebarTitle.toLowerCase()}
    >
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
    </Section>
  );
}

export function WorkExperience() {
  return (
    <div>
      <Section
        className="w-full flex flex-col gap-2 mb-6"
        id="experience"
        flash
      >
        <LinkableHeading href="#experience">Experience</LinkableHeading>
        <Separator className="mb-1" />
      </Section>
      {jobs.map((job, index) => (
        <div key={job.title}>
          <JobItem key={job.title} job={job} />
          {index < jobs.length - 1 && <Separator className="mt-2 mb-8" />}
        </div>
      ))}
    </div>
  );
}
