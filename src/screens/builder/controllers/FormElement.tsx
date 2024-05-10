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
import { ControllerProps, FieldPath, FieldValues } from "react-hook-form";
import { IComponentConfig } from "../types";

type FormElementProps<
  TFieldValues extends Record<"controls", any>,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  type: ControlTypes;
  properties: TFormControls["properties"];
  name: TName;
} & ControllerProps<TFieldValues, TName>;

export default function FormElement<TFormData extends Record<"controls", any>>({
  type,
  properties,
  ...props
}: Omit<FormElementProps<TFormData>, "render">) {
  const { label, description } = properties;
  return (
    <FormField
      {...props}
      render={({ field }) => {
        return (
          <FormItem>
            <FormLabel>{label.value}</FormLabel>
            {controls.renderControllers({
              type,
              field,
              config: properties,
            })}
            {description.value && (
              <FormDescription>{description.value}</FormDescription>
            )}
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}
