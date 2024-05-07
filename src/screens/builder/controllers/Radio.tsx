import { Input } from "@/components/ui/input";
import { ControlTypes, IRadio } from "@/types";
import { Label } from "@radix-ui/react-label";
import { ComponentProps } from "react";
import { IControllerProps } from "../types";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { FormControl, FormItem, FormLabel } from "@/components/ui/form";

export default function Radio({
  field,
  config,
}: IControllerProps<ControlTypes.Radio>) {
  console.log("Radio button", field.value);
  return (
    <FormControl>
      <RadioGroup
        onValueChange={field.onChange}
        defaultValue={config.defaultValue}
        className="flex flex-col space-y-1"
      >
        {config.options.map((ops) => {
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
