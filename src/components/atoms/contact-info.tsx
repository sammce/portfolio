import { GithubOriginal, LinkedinPlain } from "devicons-react";
import { Mail } from "lucide-react";
import { Separator } from "../ui/separator";

function ContactLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a
      className="underline text-primary flex items-center justify-start gap-2 w-auto basis-auto underline-offset-2"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  );
}
export function ContactInfo() {
  return (
    <>
      <Separator className="my-2" />
      <p>Dublin, Ireland</p>
      <div className="space-y-2 mb-16">
        <ContactLink href="mailto:sammcelligott@outlook">
          <Mail size={20} className="mt-1 text-foreground" />
          sammcelligott@outlook.com
        </ContactLink>
        <ContactLink href="https://www.linkedin.com/in/sammce/">
          <LinkedinPlain size={20} />
          LinkedIn
        </ContactLink>
        <ContactLink href="https://github.com/sammce">
          <GithubOriginal
            size={20}
            className="dark:bg-foreground dark:rounded-sm dark:p-0.5"
          />
          GitHub
        </ContactLink>
      </div>
    </>
  );
}
