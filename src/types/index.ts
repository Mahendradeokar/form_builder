// For getting event type by - Matt Pocock - TOtalTypescript
type GetEventHandlers<T extends keyof JSX.IntrinsicElements> = Extract<
  keyof JSX.IntrinsicElements[T],
  `on${string}`
>;

/**
 * Provides the event type for a given element and handler.
 *
 * @example
 *
 * type MyEvent = EventFor<"input", "onChange">;
 */
export type EventFor<
  TElement extends keyof JSX.IntrinsicElements,
  THandler extends GetEventHandlers<TElement>
> = JSX.IntrinsicElements[TElement][THandler] extends
  | ((e: infer TEvent) => any)
  | undefined
  ? TEvent
  : never;

import { controlTypes, validationsType } from "@/config/formConfig";
import {
  TCheckBoxPropertiesConfig,
  TControlPropertiesConfig,
  TDropDownPropertiesConfig,
  TRadioPropertiesConfig,
  TTextAreaPropertiesConfig,
  TTextPropertiesConfig,
  ValidationConfig,
} from "@/config/types";

// Component types

export type ControlTypes = keyof typeof controlTypes;
export type ValidationType = keyof typeof validationsType;

interface Component<T extends ControlTypes> {
  componentType: T;
  componentName: string;
  componentId: number;
}
export type InputValue = string | boolean | number | Record<any, any> | any[];
export type TComponentOptions = {
  label: string;
  value: InputValue;
  id: string;
};

interface TextArea extends Component<"TextArea"> {}
interface Text extends Component<"Text"> {}
interface DropDown extends Component<"DropDown"> {
  options: TComponentOptions[];
  placeHolder: string;
}
export interface IRadio extends Component<"Radio"> {
  options: TComponentOptions[];
}
export interface CheckBox extends Component<"CheckBox"> {}
export interface Switch extends Component<"Switch"> {}
export type Components =
  | Text
  | DropDown
  | TextArea
  | IRadio
  | CheckBox
  | Switch;

export type TElementConfig = {
  [Properties in keyof Components as Properties extends
    | "componentName"
    | "componentType"
    | "componentId"
    ? Properties
    : never]: Components[Properties];
};

export type TElementTypes = Components["componentType"];

// Form Slice

export type TFormControls<T extends ControlTypes = ControlTypes> = {
  type: T;
  _id: string;
  properties: TControlPropertiesConfig[T];
  validations: ValidationConfig[T];
};

export interface IFormState {
  name: string;
  description: string;
  controlConfig: TFormControls<ControlTypes>[];
}

export type TFormDetailsSetterAllowedField = keyof Pick<
  IFormState,
  "name" | "description"
>;

// Drop item pass data type
export interface IDropItemData {
  type: ControlTypes;
}
