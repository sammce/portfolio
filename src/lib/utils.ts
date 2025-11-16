import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Convert a string to a slug, replacing spaces with hyphens and removing
 * all non-alphanumeric characters
 *
 * @param s - The string to slugify
 * @returns The slugified string
 */
export function slugify(s: string) {
  return s
    .toLowerCase()
    .replace(/\s/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}
