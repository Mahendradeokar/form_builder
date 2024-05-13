import {
  ControlTypes,
  InputValue,
  TComponentOptions,
  TFormControls,
  ValidationType,
} from "@/types";
import { ComponentProps } from "react";
import {
  ControllerProps,
  ControllerRenderProps,
  FieldPath,
} from "react-hook-form";
import { StringValidationType } from "./services/validations/string";
import { ObjectValidationType } from "./services/validations/object";
import {
  ControlProperty,
  ControlPropertyWithOptions,
  validationProperty,
} from "@/config/types";

interface FormValuesWithObjectType {
  controls: {
    _id: string;
    value: Record<string, any>;
  }[];
}
export interface FormValuesWithPrimitives {
  controls: {
    _id: string;
    value: Exclude<InputValue, Record<any, any> | any[]>;
  }[];
}

export type FormValues = {
  controls: {
    _id: string;
    value: Exclude<InputValue, any[] | Record<any, any>>;
  }[];
};
export type TFormControllerRenderProps<T extends ControlTypes = ControlTypes> =
  T extends "CheckBox"
    ? ControllerRenderProps<
        FormValuesWithObjectType,
        `controls.${number}.value`
      >
    : ControllerRenderProps<
        FormValuesWithPrimitives,
        `controls.${number}.value`
      >;

export interface IComponentConfig {
  options: TComponentOptions[];
}

export interface IControllerProps<T extends ControlTypes> {
  field: TFormControllerRenderProps<T>;
  config: FormElementProperties;
}

export type GetValidationParams =
  | Parameters<StringValidationType[ValidationType]>[1]
  | Parameters<ObjectValidationType[ValidationType]>[1];

export type FormElementProperties = {
  label: ControlProperty<string> | validationProperty<string>;
  description: ControlProperty<string> | validationProperty<string>;
  placeholder: ControlProperty<string> | validationProperty<string>;
  options?: ControlPropertyWithOptions | undefined;
};
