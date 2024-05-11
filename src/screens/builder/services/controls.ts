import {
  ControlTypes,
  IFormState,
  TComponentOptions,
  TFormControls,
} from "@/types";
import ControllersIcons from "../controllers/icons";
import Controllers from "../controllers";
import { ComponentProps } from "react";
import {
  FormValues,
  IComponentConfig,
  TFormControllerRenderProps,
} from "../types";
import { jsonParse, objectEntities } from "@/lib/utils";
import { ControlPropertyWithOptions } from "@/config/types";
import { getValidations } from "./validations";
import { FieldPath } from "react-hook-form";

// Types
type TControlType = keyof typeof ControllersIcons & ControlTypes;

interface IRenderControllers<T extends ControlTypes> {
  type: T;
  field: TFormControllerRenderProps<T> | any;
  config: TFormControls<T>["properties"];
}

interface ValidateArg {
  validations: TFormControls["validations"];
  value: string | Record<any, any>;
  type: "object" | "string";
}

// service
export const renderIcon = (type: TControlType) => {
  return ControllersIcons[type]();
};

export const renderControllers = <T extends ControlTypes>({
  type,
  ...rest
}: IRenderControllers<T>) => {
  return Controllers[type](rest);
};

export const shouldAppend = (
  field: FormValues["controls"],
  controlConfig: IFormState["controlConfig"]
) => {
  const isNewEntry = controlConfig.every(({ _id: controllerId }) => {
    return field.some(({ _id: fieldId }) => fieldId === controllerId);
  });

  return !isNewEntry;
};

export const convertComponentOptionsIntoArray = (
  obj: ControlPropertyWithOptions["value"]
) => {
  return objectEntities(obj).map(([id, values]) => {
    return { id, ...values };
  });
};

export const validate = ({ validations, value, type }: ValidateArg) => {
  const schema = getValidations(validations, type);
  const result = schema.safeParse(value);
  let errorMessage = null;
  const parseData = jsonParse(result.error?.message ?? "");
  const isArray = Array.isArray(parseData);
  debugger;
  if (!result.success && isArray) {
    errorMessage = (parseData as (typeof result.error)[])[0].message;
  } else {
    errorMessage = result.error?.message;
  }
  return {
    success: result.success,
    message: errorMessage,
  };
};
