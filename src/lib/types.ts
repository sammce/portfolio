import { Technology } from "@/constants/tech-stacks";

export type ProjectMetadata = {
  title: string;
  description: string;
  splash?: string;
  github?: string;
  href: string;
  liveUrl?: string;
  tags?: string[];
  year: string;
  coreTechnologies: Technology[];
  secondaryTechnologies?: Technology[];
};
