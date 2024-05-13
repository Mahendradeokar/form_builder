import { FormLabel } from "@/components/ui/form";
import { ControlTypes } from "@/types";
import { ComponentProps } from "react";

export default function Label({
  label,
  type,
  ...prop
}: { label: string; type: ControlTypes } & ComponentProps<"label">) {
  if (type !== "Switch") {
    return <FormLabel {...prop}>{label}</FormLabel>;
  }
  return <></>;
}
