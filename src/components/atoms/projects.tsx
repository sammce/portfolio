"use client";

import { useRef } from "react";
import { LinkableHeading } from "../ui/linkable-heading";
import { Section } from "../ui/section";
import { Separator } from "../ui/separator";

export function Projects() {
  const viewRef = useRef<HTMLHeadingElement>(null);

  return (
    <Section
      viewRef={viewRef}
      className="w-full flex flex-col gap-2 mb-12"
      id="projects"
    >
      <LinkableHeading ref={viewRef} href="#projects">
        Projects
      </LinkableHeading>
      <Separator className="mb-1" />
    </Section>
  );
}
