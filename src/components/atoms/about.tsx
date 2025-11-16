import { Section } from "../ui/section";
import { GithubOriginal, LinkedinPlain } from "devicons-react";
import { Mail } from "lucide-react";
import { Separator } from "../ui/separator";
import { LinkableHeading } from "../ui/linkable-heading";
import { ExternalLink } from "../ui/external-link";

export function About() {
  return (
    <Section
      className="items-start justify-center gap-1 mt-20 scroll-mt-32 mb-20"
      id="about"
      flash
    >
      <h1 className="text-4xl font-bold tracking-tight">Sam McElligott</h1>
      <div className="flex flex-col 2xl:flex-row items-start 2xl:items-center gap-2 2xl:gap-4">
        <p className="text-lg tracking-tight">Software Engineer</p>
        <Separator
          orientation="vertical"
          className="min-h-5 hidden 2xl:block"
        />
        <p className="text-lg tracking-tight">
          B.Sc Computer Science @ DCU (Oct. 2026)
        </p>
      </div>
      <p className="text-muted-foreground mt-2">
        From age 12, I&apos;ve been developing full-stack web applications and
        developer tooling.
        <br />
        <br />
        Currently focusing on infrastructure &amp; deployment automation, CI/CD
        and ML/AI.
      </p>
      <Separator className="my-2" />
      <h3 className="font-bold text-base">Dublin, Ireland</h3>
      <div className="space-y-2">
        <LinkableHeading
          iconSize={16}
          tooltipNoun="email"
          href="sammcelligott@outlook.com"
          noPrefix
        >
          <ExternalLink
            href="mailto:sammcelligott@outlook.com"
            showExternalLink={false}
          >
            <Mail size={18} className="mt-0.5 mr-1 text-foreground font-code" />
            <span className="text-sm font-normal font-code">
              sammcelligott@outlook.com
            </span>
          </ExternalLink>
        </LinkableHeading>
        <ExternalLink href="https://www.linkedin.com/in/sammce/">
          <LinkedinPlain size={18} className="mr-1" />
          LinkedIn
        </ExternalLink>
        <ExternalLink href="https://github.com/sammce">
          <GithubOriginal
            size={18}
            className="dark:bg-foreground dark:invert-100 mr-1"
          />
          GitHub
        </ExternalLink>
      </div>
    </Section>
  );
}
