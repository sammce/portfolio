"use client";

import { LinkableHeading } from "../ui/linkable-heading";
import { Separator } from "../ui/separator";
import { Section } from "../ui/section";
import { jobs } from "@/constants/jobs";
import { JobItem } from "./job-item";

export function WorkExperience() {
  return (
    <div>
      <Section className="w-full flex flex-col mb-6 gap-0" id="experience">
        <LinkableHeading href="#experience" as="h2">
          Experience
        </LinkableHeading>
        <Separator className="mb-1 mt-3" />
      </Section>
      {jobs.map((job) => (
        <div key={job.title}>
          <JobItem key={job.title} job={job} />
        </div>
      ))}
    </div>
  );
}
