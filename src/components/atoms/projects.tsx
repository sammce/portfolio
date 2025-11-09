import { LinkableHeading } from "../ui/linkable-heading";
import { Separator } from "../ui/separator";

export function Projects() {
  return (
    <div className="w-full flex flex-col gap-2">
      <LinkableHeading id="projects">Projects</LinkableHeading>
      <Separator className="mb-1" />
    </div>
  );
}
