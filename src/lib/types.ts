import { Technology } from "@/constants/tech-stacks";

export type Tag = "Web" | "AI/ML" | "Research" | "Tool" | "Live";

export type ProjectMetadata = {
  index: number;
  title: string;
  description: string;
  splash?: string;
  github?: string;
  href: string;
  liveUrl?: string;
  tags?: Tag[];
  year: string;
  coreTechnologies: Technology[];
  secondaryTechnologies?: Technology[];
};
