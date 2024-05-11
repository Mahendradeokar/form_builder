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
import {
  ControllerProps,
  FieldPath,
  FieldValues,
  UseFormClearErrors,
} from "react-hook-form";
import { IComponentConfig } from "../types";
import { Ref, forwardRef } from "react";
import { getValidations } from "../services/validations";
import { validate } from "../services/controls";

type FormElementProps<
  TFieldValues extends Record<"controls", any>,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  type: ControlTypes;
  properties: TFormControls["properties"];
  name: TName;
  validations?: TFormControls["validations"];
  clearErrors: UseFormClearErrors<TFieldValues>;
} & ControllerProps<TFieldValues, TName>;

const FormElement = <TFormData extends Record<"controls", any>>(
  {
    type,
    properties,
    validations,
    control,
    clearErrors,
    ...props
  }: Omit<FormElementProps<TFormData>, "render">,
  ref: Ref<HTMLDivElement>
) => {
  const { label, description } = properties;
  return (
    <FormField
      {...props}
      render={({ field, fieldState }) => {
        field.onBlur = () => {
          if (fieldState.isDirty && validations) {
            const typeOfValue =
              typeof field.value === "string" ? "string" : "object";
            const result = validate({
              validations,
              value: field.value,
              type: typeOfValue,
            });
            if (!result.success) {
              control?.setError(field.name, {
                message: result.message,
              });
            } else {
              clearErrors && clearErrors(field.name);
            }
          }
        };
        return (
          <FormItem>
            <FormLabel>{label.value}</FormLabel>
            {controls.renderControllers({
              type,
              field,
              config: properties,
            })}
            <FormMessage />
            {description.value && (
              <FormDescription>{description.value}</FormDescription>
            )}
          </FormItem>
        );
      }}
    />
  );
};

FormElement.displayName = "FormElement";

export default FormElement;
