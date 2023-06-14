import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(input: string | number): string {
  const date = new Date(input);
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export const removeUnwantedKeys = (obj: Object) => {
  return Object.entries(obj).reduce((acc, [key, value]) => {
    if (key.startsWith("$") && key !== "$id") {
      return acc;
    }
    return { ...acc, [key]: value };
  }, {});
};

export function absoluteUrl(path: string) {
  return `${process.env.NEXT_PUBLIC_APP_URL}${path}`;
}
