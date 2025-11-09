import { ContactInfo } from "@/components/atoms/contact-info";
import { Projects } from "@/components/atoms/projects";
import { MyTechStack } from "@/components/atoms/tech-stack";
import { MoveRight } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="flex flex-col gap-2 max-w-[600px] min-h-screen mx-auto">
      <div className="flex items-center justify-between w-full mt-20">
        <h1 className="text-4xl font-bold tracking-tight">Sam McElligott</h1>
        <MoveRight size={32} />
        <h2 className="text-xl tracking-tight">Software Engineer</h2>
      </div>
      <p className="text-muted-foreground">
        When I spot a problem, I build a solution you can test, scale and
        measure
      </p>
      <ContactInfo />
      <MyTechStack />
      <Projects />
    </div>
  );
}
