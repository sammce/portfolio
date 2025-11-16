import { About } from "@/components/atoms/about";
import { Projects } from "@/components/atoms/projects";
import { WorkExperience } from "@/components/atoms/work-experience";
import { SidebarLinksListener } from "@/components/layout/sidebar-links-listener";

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      <About />
      <Projects />
      <WorkExperience />

      <SidebarLinksListener />
    </div>
  );
}
