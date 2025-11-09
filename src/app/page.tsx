import { About } from "@/components/atoms/about";
import { Projects } from "@/components/atoms/projects";
import { TechStack } from "@/components/atoms/tech-stack";
import { WorkExperience } from "@/components/atoms/work-experience";

export default function LandingPage() {
  return (
    <div className="flex flex-col gap-2 max-w-[600px] 2xl:max-w-[750px] min-h-screen mx-auto text-sm mb-40">
      <About />
      <Projects />
      <WorkExperience />
      <TechStack />
    </div>
  );
}
