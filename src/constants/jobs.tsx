import { GraduationCap, Laptop } from "lucide-react";
import type { Technology } from "./tech-stacks";

export type Responsibility = {
  description: string;
  technologies?: Technology[];
};

export type Job = {
  title: string;
  sidebarTitle: string;
  sidebarIcon: React.ComponentType<{ className?: string }>;
  pageHref: string;
  company: string;
  location: string;
  projects: {
    name: string;
    technologies?: Technology[];
    responsibilities: Responsibility[];
  }[];
  startDate: Date;
  endDate: Date;
  href: string;
};

const CALC_MONTHS = 1000 * 60 * 60 * 24 * 30;
const CALC_YEARS = 1000 * 60 * 60 * 24 * 365;

/**
 * Calculate the duration of a job in years and months
 */
export function calculateDuration(startDate: string, endDate: string) {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const duration = end.getTime() - start.getTime();
  const years = Math.floor(duration / CALC_YEARS);
  const leftoverMonths = Math.ceil((duration % CALC_YEARS) / CALC_MONTHS);

  if (years === 0) {
    return `${leftoverMonths} months`;
  }

  return `${years} year${years > 1 ? "s" : ""}, ${leftoverMonths} month${
    leftoverMonths > 1 ? "s" : ""
  }`;
}

export const jobs: Job[] = [
  {
    title: "Software Engineering Intern",
    sidebarTitle: "SWE Intern",
    sidebarIcon: Laptop,
    pageHref: "soft-eng-intern",
    company: "Nuritas",
    projects: [
      {
        name: "Internal Python Library",
        technologies: ["Python", "Bash"],
        responsibilities: [
          {
            description:
              "Collaborated with an external service provider to mirror their API in a Python library, enabling a more efficient data pipeline and faster development cycle. Ensured test coverage for vital components and robust error handling, improving stability of software using the library.",
          },
          {
            description:
              "Reduced automated test suite duration from 20 minutes to ~10 seconds by architecting a HTTP caching layer for integration/e2e tests (Pytest). Added cache scoping per request, automatic version-aware cache invalidation and opt-out paths where necessary. Integrated with CI, enabling a quicker feedback loop for developers.",
            technologies: ["Pytest", "Gitlab-CI"],
          },
          {
            description:
              "Developed an in-memory mock implementation of the external API using pandas, allowing developers to iterate more effectively by working locally before deploying to production.",
            technologies: ["Pandas"],
          },
        ],
      },
      {
        name: "Flask Web Application",
        technologies: ["Python", "Docker", "AWS"],
        responsibilities: [
          {
            description:
              "Shipped a web application written in Flask and HTMX to interact with an internal data service, improving the user experience and performance in comparison to its legacy predecessor. ",
            technologies: ["Flask", "HTMX"],
          },
          {
            description:
              "Automated the provision of infrastructure for the application on AWS using Elastic Container Service and Terraform/CDKTF, integrating it with the existing AWS network. Added CPU-utilization aware auto-scaling, giving the application a 99.9% effective uptime.",
            technologies: ["Bash", "Terraform", "Nginx"],
          },
          {
            description:
              "Implemented a CI/CD pipeline, automating the deployment on AWS to ensure a consistent and reliable workflow.",
            technologies: ["Gitlab-CI"],
          },
        ],
      },
    ],
    location: "Dublin, Ireland (On-site)",
    startDate: new Date("2025-04-07"),
    endDate: new Date("2025-08-29"),
    href: "https://www.nuritas.com",
  },
  {
    title: "Teaching Assistant",
    sidebarTitle: "Teaching Assistant",
    sidebarIcon: GraduationCap,
    pageHref: "teaching-assistant",
    company: "DCU",
    location: "Dublin, Ireland",
    projects: [
      {
        name: "ComputeTY Lab Lead",
        technologies: ["Python"],
        responsibilities: [
          {
            description:
              "Led a team of tutors during a week long programming bootcamp for TY students in 2 consecutive years. Performed daily lectures about Python fundamentals, robotics and software development processes.",
          },
          {
            description:
              "Managed the behaviour of the participating students, establishing a safe and engaging learning environment.",
          },
        ],
      },
      {
        name: "First Year Programming Tutor",
        technologies: ["Python", "Linux", "Bash"],
        responsibilities: [
          {
            description:
              "Coordinated with the Introduction to Programming professor to provide support for students during their first year of Python lab sessions in DCU, ensuring a streamlined learning experience.",
          },
          {
            description:
              "Taught students how to write and debug Python programs effectively, fostering a strong foundation in programming fundamentals.",
          },
          {
            description:
              "Invigilated exam sessions in accordance with the DCU examination guidelines.",
          },
        ],
      },
    ],
    startDate: new Date("2022-04-01"),
    endDate: new Date("2023-04-15"),
    href: "https://www.dcu.ie",
  },
];
