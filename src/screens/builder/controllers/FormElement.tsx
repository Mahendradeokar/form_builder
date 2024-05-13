import {
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { controls } from "../services";
import {
  ControlTypes,
  InputValue,
  TFormControls,
} from "@/types";
import {
  ControllerProps,
  FieldPath,
  UseFormClearErrors,
} from "react-hook-form";
import { FormElementProperties, IComponentConfig } from "../types";
import { Ref, forwardRef } from "react";
import {
  getApplicableValidations,
} from "../services/validations";
import { validate } from "../services/controls";
import { convertToNormalString } from "@/lib/utils";
import Label from "./Label";

type FormElementProps<
  TFieldValues extends Record<"controls", any>,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  type: ControlTypes;
  properties: FormElementProperties;
  name: TName;
  validations?: TFormControls["validations"];
  clearErrors?: UseFormClearErrors<TFieldValues>;
} & ControllerProps<TFieldValues, TName>;

const FormElement = <TFormData extends Record<"controls", any>>(
  {
    type,
    properties,
    validations,
    control,
    clearErrors,
    name,
    ...props
  }: Omit<FormElementProps<TFormData>, "render">,
) => {
  const { label, description } = properties;

  // handlers
  const handlerOnBlur = ({
    isDirty,
    value,
  }: {
    isDirty: boolean;
    value: Extract<InputValue, string | Record<any, any>>;
  }) => {
    if (isDirty && validations) {
      const typeOfValue = typeof value === "string" ? "string" : "object";
      const applicableValidations = getApplicableValidations(validations);
      const result = validate({
        validations: applicableValidations,
        value: value,
        type: typeOfValue,
      });
      if (!result.success) {
        control?.setError(name, {
          message: result.message,
        });
      } else {
        clearErrors && clearErrors(name);
      }
    }
  };
  return (
    <FormField
      {...props}
      name={name}
      render={({ field, fieldState }) => {
        field.onBlur = () =>
          handlerOnBlur({ isDirty: fieldState.isDirty, value: field.value });
        return (
          <FormItem>
            <Label type={type} label={convertToNormalString(label.value)} />
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
