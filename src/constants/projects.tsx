import { Technology } from "./tech-stacks";

export type Project = {
  title: string;
  year: number | string;
  href: string;
  blurb: string;
  technologies: Technology[];
};

export const projects: Project[] = [
  {
    title: "DGS Trade Fair",
    href: "/dgs-trade-fair",
    year: "2021 - Present",
    blurb:
      "A web application for managing application to, and advertisement of, the annual Drogheda Grammar School Trade Fair.",
    technologies: ["TypeScript", "React", "NextJS", "Python", "Django"],
  },
  {
    title: "Adaptive Learning",
    year: "2024 - 2025",
    href: "/adaptive-learning",
    blurb:
      "An AI-enabled adaptive learning platform aimed at improving education for students with intellectual disabilities, developed in a team of 2.",
    technologies: ["TypeScript", "React", "NextJS", "Python", "Django"],
  },
  {
    title: "Diverse Derma",
    href: "/diverse-derma",
    year: 2025,
    blurb:
      "A research project with the goal of improving the accuracy of deep learning models for diverse skin lesion classification using transfer learning. Developed in a team of 5.",
    technologies: ["Python", "Pandas", "PyTorch"],
  },
  {
    title: "Fleeting.nvim",
    href: "/fleeting",
    year: 2024,
    blurb: "A simple Neovim plugin for tracking time spent working in Neovim.",
    technologies: ["Lua"],
  },
  {
    title: "Vacuumba",
    href: "/vacuumba",
    year: 2022,
    blurb:
      "A proof-of-concept for an automated vacuum cleaner, which can be controlled through a web interface.",
    technologies: ["TypeScript", "React", "NextJS", "Python", "Django"],
  },
  {
    title: "Samutil",
    href: "/samutil",
    year: 2022,
    blurb:
      "A collection of tools to help with the development of Python applications. Particularly testing and console colorisation.",
    technologies: ["Python"],
  },
  {
    title: "Housing Crisis - Study",
    href: "/housing-crisis-study",
    year: 2021,
    blurb:
      "A data analysis and visualization project focused on the housing crisis in Ireland.",
    technologies: ["JavaScript", "React", "Python", "Pandas"],
  },
];
