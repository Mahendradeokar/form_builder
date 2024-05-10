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
  toast({ title: title, description: message });
}

export const ObjectValues = <T>(obj: Record<string, T>): T[] =>
  Object.values(obj) as T[];

export const objectEntities = <TData extends Record<any, any>>(obj: {
  [K in keyof TData]: TData[K];
}): [keyof TData, TData[keyof TData]][] =>
  Object.entries(obj) as [keyof TData, TData[keyof TData]][];

export const jsonParse = <TData extends string>(
  jsonSting: TData
): Array<any> | Record<string, any> | string => {
  try {
    const parsedData = JSON.parse(jsonSting) as
      | Array<any>
      | Record<string, any>;
    return parsedData;
  } catch (error) {
    return jsonSting as string;
  }
};

export const isArrayEmpty = (arr: unknown[]) => {
  return arr.length === 0;
};
