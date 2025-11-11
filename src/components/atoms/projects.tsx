"use client";

import { LinkableHeading } from "../ui/linkable-heading";
import { Section } from "../ui/section";
import { Separator } from "../ui/separator";

export function Projects() {
  return (
    <Section className="w-full flex flex-col gap-2 mb-12" id="projects">
      <LinkableHeading href="#projects">Projects</LinkableHeading>
      <Separator className="mb-1" />
    </Section>
  );
}
