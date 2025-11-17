import { cn } from "@/lib/utils";
import { ExternalLink as ExternalLinkIcon } from "lucide-react";

export function ExternalLink({
  href,
  children,
  className,
  showExternalLink = true,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  showExternalLink?: boolean;
}) {
  return (
    <a
      className={cn(
        "underline text-primary inline-flex items-center justify-start gap-4 w-max basis-auto underline-offset-2",
        className,
      )}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
    >
      <span className="flex items-center gap-2">
        {children}
        {showExternalLink && <ExternalLinkIcon size={16} />}
      </span>
    </a>
  );
}
