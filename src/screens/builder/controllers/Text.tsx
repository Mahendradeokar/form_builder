import { Input } from "@/components/ui/input";
import { ComponentProps } from "react";
import { IControllerProps } from "../types";
import { ControlTypes } from "@/types";
import {
  FormControl,
  FormDescription,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

export default function Text({ field, config }: IControllerProps<"Text">) {
  return (
    <>
      <FormControl>
        <Input placeholder={config.placeholder.value} {...field} />
      </FormControl>
    </>
  );
}
