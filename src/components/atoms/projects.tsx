import { ProjectMetadata } from "@/lib/types";
import fs from "node:fs";
import { ProjectPreviews } from "./project-preview";

export async function getProjectInfo() {
  const projects = fs.readdirSync("./src/projects");

  const mdxFiles = await Promise.all(
    projects.map(async (projectMdxFile) => {
      const { metadata } = await import(`@/projects/${projectMdxFile}`);
      return metadata as ProjectMetadata;
    }),
  );

  return mdxFiles.sort((a, b) => a.index - b.index);
}
const projects = await getProjectInfo();

export function Projects() {
  return <ProjectPreviews projects={projects} />;
}
