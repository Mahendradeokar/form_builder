import { toast } from "@/components/ui/use-toast";
import { nanoid } from "@reduxjs/toolkit";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateUniqueId() {
  return nanoid();
}

export function isEmpty(obj: { [field: string]: any }) {
  return Object.keys(obj).length === 0;
}

const NOT_FUNCTIONAL_MESSAGE = {
  message:
    "Feature not functional yet. Under development. Apologies for inconvenience.",
  title: "Incomplete Feature: Under Development",
};

export function showMessage({
  title,
  message,
}: { title: string; message: React.ReactNode } = NOT_FUNCTIONAL_MESSAGE) {
  toast({ title: title, description: message, variant: "destructive" });
}
