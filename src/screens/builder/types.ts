import {
  ControlTypes,
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

interface FormValuesWithObjectType {
  controls: {
    _id: string;
    value: { [optionId: string]: string };
  }[];
}
export interface FormValuesWithStringType {
  controls: {
    _id: string;
    value: string;
  }[];
}

export type FormValues = {
  controls: {
    _id: string;
    value: string | { [optionId: string]: string };
  }[];
};
export type TFormControllerRenderProps<T extends ControlTypes = ControlTypes> =
  T extends "CheckBox"
    ? ControllerRenderProps<
        FormValuesWithObjectType,
        `controls.${number}.value`
      >
    : ControllerRenderProps<
        FormValuesWithStringType,
        `controls.${number}.value`
      >;

export interface IComponentConfig {
  options: TComponentOptions[];
}

export interface IControllerProps<T extends ControlTypes> {
  field: TFormControllerRenderProps<T>;
  config: TFormControls<T>["properties"];
}

export type GetValidationParams =
  | Parameters<StringValidationType[ValidationType]>[1]
  | Parameters<ObjectValidationType[ValidationType]>[1];
