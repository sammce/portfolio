"use client";

import { Technology } from "@/constants/tech-stacks";
import { LinkableHeading } from "../ui/linkable-heading";
import { Separator } from "../ui/separator";
import { Section } from "../ui/section";
import { useRef } from "react";

type Job = {
  title: string;
  company: string;
  location: string;
  startDate: Date;
  endDate: Date;
  tags?: string[];
  href: string;
  technologies: Technology[];
};

const jobs: Job[] = [
  {
    title: "Software Engineering Intern",
    company: "Nuritas",
    location: "Dublin, Ireland",
    startDate: new Date("2025-04-07"),
    endDate: new Date("2025-08-29"),
    tags: ["Full-time"],
    href: "/work/nuritas",
    technologies: [
      "Python",
      "Bash",
      "HTML",
      "CSS",
      "TypeScript",
      "React",
      "NextJS",
      "Flask",
      "AWS",
      "Docker",
    ],
  },
  {
    title: "Teaching Assistant",
    company: "DCU",
    location: "Dublin, Ireland",
    startDate: new Date("2022-09-01"),
    endDate: new Date("2023-04-15"),
    tags: ["Part-time"],
    href: "/work/dcu",
    technologies: ["Python", "Linux", "Bash"],
  },
];

const CALC_MONTHS = 1000 * 60 * 60 * 24 * 30;
const CALC_YEARS = 1000 * 60 * 60 * 24 * 365;

function calculateDuration(startDate: string, endDate: string) {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const duration = end.getTime() - start.getTime();
  const years = Math.floor(duration / CALC_YEARS);
  const leftoverMonths = Math.ceil((duration % CALC_YEARS) / CALC_MONTHS);

  if (years === 0) {
    return `${leftoverMonths} months`;
  }

  return `${years} years, ${leftoverMonths} months`;
}

function JobItem({ job }: { job: Job }) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col gap-1">
        <span className="text-muted-foreground">{job.title}</span>
        <span className="text-muted-foreground">{job.company}</span>
        <span className="text-muted-foreground">{job.location}</span>
      </div>
      <span className="text-muted-foreground">
        {calculateDuration(
          job.startDate.toDateString(),
          job.endDate.toDateString(),
        )}
      </span>
    </div>
  );
}

export function WorkExperience() {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <Section
      className="w-full flex flex-col gap-2 mb-12"
      id="experience"
      viewRef={ref}
    >
      <LinkableHeading href="#experience" ref={ref}>
        Experience
      </LinkableHeading>
      <Separator className="mb-1" />
      {jobs.map((job) => (
        <JobItem key={job.title} job={job} />
      ))}
    </Section>
  );
}
