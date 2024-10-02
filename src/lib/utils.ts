import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const WAIT_TIME = 4000;

export const getSleep = (ms: number) => () =>
  new Promise((resolve) => setTimeout(resolve, ms));
