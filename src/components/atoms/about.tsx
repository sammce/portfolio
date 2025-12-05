import { Section } from "../ui/section";
import { GithubOriginal, LinkedinPlain } from "devicons-react";
import { Mail } from "lucide-react";
import { Separator } from "../ui/separator";
import { LinkableHeading } from "../ui/linkable-heading";
import { ExternalLink } from "../ui/external-link";

export function About() {
  return (
    <Section
      className="mt-20 mb-20 scroll-mt-32 items-start justify-center gap-1"
      id="about"
    >
      <h1 className="text-4xl font-bold tracking-tight">Sam McElligott</h1>
      <div className="flex flex-col items-start gap-2 2xl:flex-row 2xl:items-center 2xl:gap-4">
        <p className="text-lg tracking-tight">Software Engineer</p>
        <Separator
          orientation="vertical"
          className="hidden min-h-5 2xl:block"
        />
        <p className="text-lg tracking-tight">
          B.Sc Computer Science @ DCU (May 2026)
        </p>
      </div>
      <p className="mt-2 text-muted-foreground">
        Currently focusing on infrastructure &amp; deployment automation, CI/CD
        and AI/ML.
      </p>
      <Separator className="my-2" />
      <h3 className="text-base font-bold">Dublin, Ireland</h3>
      <div className="space-y-2">
        <LinkableHeading
          iconSize={16}
          tooltipNoun="email"
          href="sammcelligott@outlook.com"
          noPrefix
          as="p"
        >
          <ExternalLink
            href="mailto:sammcelligott@outlook.com"
            showExternalLink={false}
          >
            <Mail size={18} className="mt-0.5 mr-1 font-code text-foreground" />
            <span className="font-code text-sm font-normal">
              sammcelligott@outlook.com
            </span>
          </ExternalLink>
        </LinkableHeading>
        <ExternalLink
          href="https://www.linkedin.com/in/sammce/"
          className="flex"
        >
          <LinkedinPlain size={18} className="mr-1" />
          LinkedIn
        </ExternalLink>
        <ExternalLink href="https://github.com/sammce" className="flex">
          <GithubOriginal
            size={18}
            className="mr-1 dark:bg-foreground dark:invert-100"
          />
          GitHub
        </ExternalLink>
      </div>
    </Section>
  );
}
