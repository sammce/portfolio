export type SidebarItem = {
  title: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
  isSubheading?: boolean;
};

import { jobs } from "@/constants/jobs";
import { slugify } from "@/lib/utils";
import { BriefcaseBusiness, Code, User } from "lucide-react";

export const sidebarItems: SidebarItem[] = [
  {
    title: "About",
    href: "#about",
    icon: User,
  },
  {
    title: "Projects",
    href: "#projects",
    icon: Code,
  },
  {
    title: "Experience",
    href: "#experience",
    icon: BriefcaseBusiness,
  },
  ...jobs.map((job) => ({
    title: job.sidebarTitle,
    href: `#${slugify(job.sidebarTitle)}`,
    icon: job.sidebarIcon,
    isSubheading: true,
  })),
] as const;
