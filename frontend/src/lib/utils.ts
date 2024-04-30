import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function filterNonObjects(obj: Record<string, unknown>) {
  return Object.fromEntries(
    Object.entries(obj).filter(([, value]) => typeof value !== "object")
  );
}

export function blacklistObjectKeys(
  obj: Record<string, unknown>,
  filterList: string[]
) {
  return Object.fromEntries(
    Object.entries(obj).filter(([key]) => !filterList.includes(key))
  );
}
