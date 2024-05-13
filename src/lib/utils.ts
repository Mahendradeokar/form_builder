import { toast } from "@/components/ui/use-toast";
import { InputValue } from "@/types";
import { nanoid } from "@reduxjs/toolkit";
import { type ClassValue, clsx } from "clsx";
import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";
import { InputType } from "zlib";

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
  variant: "default" as const,
};

export function showToast({
  title,
  message,
  variant,
}: {
  title: string;
  message: React.ReactNode;
  variant?: "default" | "destructive";
} = NOT_FUNCTIONAL_MESSAGE) {
  toast({ title: title, description: message, variant: variant });
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

export function fixedForwardRef<T, P = {}>(
  render: (props: P, ref: React.Ref<T>) => React.ReactNode
): (props: P & React.RefAttributes<T>) => React.ReactNode {
  return forwardRef(render) as any;
}

export const isPrimitive = (value: any): value is string | number | boolean => {
  return typeof value !== "object";
};

export const isArrayType = (arr: any): arr is Array<any> => Array.isArray(arr);

export const isObject = (obj: any): obj is Record<any, any> => {
  return obj !== null && typeof obj === "object";
};

export const convertToString = (val: string | number | boolean): string => {
  const type = typeof val;

  switch (type) {
    case "string":
      return String(val);
    case "boolean":
      return val ? String(val) : "";
    case "number":
      return String(val);
    default:
      throw new Error("Type mismatch...");
  }
};

// Regular expression to match camelCase, snake_case, kebab-case.
const regex = /([a-z])([A-Z])|[_-]+/g;
export const convertToNormalString = (str: string) => {
  let normalString = str.replace(regex, "$1 $2").toLowerCase();
  return normalString.charAt(0).toUpperCase() + normalString.slice(1);
};
