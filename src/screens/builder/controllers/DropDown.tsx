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

export default function DropDown({
  field,
  config,
}: IControllerProps<ControlTypes.DropDown>) {
  return (
    <>
      <Select
        onValueChange={field.onChange}
        defaultValue={field.value?.toString()}
      >
        <FormControl>
          <SelectTrigger>
            <SelectValue placeholder={config.placeHolder} />
          </SelectTrigger>
        </FormControl>
        <SelectContent>
          {config.options.map((ops) => {
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
