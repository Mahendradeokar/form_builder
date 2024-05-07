import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { controls } from "../services";
import { ControlTypes, TComponentOptions, TFormControls } from "@/types";
import { ControllerProps } from "react-hook-form";
import { FormValues, IComponentConfig } from "../types";

type FormElementProps = {
  label: string;
  type: ControlTypes;
  options: TFormControls;
} & ControllerProps<FormValues, `controls.${number}.value`>;

export default function FormElement({
  label,
  type,
  options,
  ...props
}: Omit<FormElementProps, "render">) {
  return (
    <FormField
      {...props}
      render={({ field }) => {
        return (
          <FormItem>
            <FormLabel>{options.label}</FormLabel>
            {controls.renderControllers({
              type,
              field,
              config: options,
            })}
            {options.description && (
              <FormDescription>{options.description}</FormDescription>
            )}
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}
