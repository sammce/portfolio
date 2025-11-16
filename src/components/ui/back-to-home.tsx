"use client";

import { cn } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export function BackToHome({
  className,
  iconSize = 32,
}: {
  className?: string;
  iconSize?: number;
}) {
  const searchParams = useSearchParams();

  return (
    <Link href={`/?${searchParams.toString()}`} className="no-underline">
      <div
        className={cn(
          "flex items-center gap-2 text-primary underline underline-offset-2 max-w-fit",
          className,
        )}
      >
        <ArrowLeft size={iconSize} /> Back to home
      </div>
    </Link>
  );
}
