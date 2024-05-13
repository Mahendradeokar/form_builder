import { Input } from "@/components/ui/input";
import { ControlTypes, IRadio } from "@/types";
import { Label } from "@radix-ui/react-label";
import { ComponentProps } from "react";
import { IControllerProps } from "../types";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { FormControl, FormItem, FormLabel } from "@/components/ui/form";
import { convertComponentOptionsIntoArray } from "../services/controls";

export default function Radio({ field, config }: IControllerProps<"Radio">) {
  const { options, placeholder } = config;

  if (options && typeof options.value === "string") {
    return <p>Something went wrong. Please refresh site.</p>;
  }

  let ops = convertComponentOptionsIntoArray(options!.value);
  return (
    <FormControl>
      <RadioGroup
        onValueChange={field.onChange}
        className="flex flex-col space-y-1"
      >
        {ops.map((ops) => {
          return (
            <FormItem
              key={ops.id}
              className="flex items-center space-x-3 space-y-0"
            >
              <FormControl>
                <RadioGroupItem value={ops.value} />
              </FormControl>
              <FormLabel className="font-normal">{ops.label}</FormLabel>
            </FormItem>
          );
        })}
      </RadioGroup>
    </FormControl>
  );
}
