import { ComponentProps } from "react";
import { IControllerProps } from "../types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FormControl, FormLabel, FormMessage } from "@/components/ui/form";
import { ControlTypes } from "@/types";
import { objectEntities } from "@/lib/utils";
import { convertComponentOptionsIntoArray } from "../services/controls";

export default function DropDown({
  field,
  config,
}: IControllerProps<"DropDown">) {
  const { options, placeholder } = config;

  if (typeof options?.value === "string") {
    return <p>Something went wrong. Please refresh site.</p>;
  }

  let ops = convertComponentOptionsIntoArray(options!.value);
  return (
    <>
      <Select
        onValueChange={field.onChange}
        defaultValue={field.value?.toString()}
      >
        <FormControl>
          <SelectTrigger>
            <SelectValue placeholder={placeholder.value as string} />
          </SelectTrigger>
        </FormControl>
        <SelectContent>
          {ops.map((ops) => {
            return (
              <SelectItem key={ops.id} value={ops.value}>
                {ops.label}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </>
  );
}
