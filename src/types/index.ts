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

import {
  TCheckBoxPropertiesConfig,
  TControlPropertiesConfig,
  TDropDownPropertiesConfig,
  TRadioPropertiesConfig,
  TTextAreaPropertiesConfig,
  TTextPropertiesConfig,
} from "@/config/types";

// Component types
export const controlTypes = {
  Text: "Text",
  TextArea: "TextArea",
  DropDown: "DropDown",
  Radio: "Radio",
  CheckBox: "CheckBox",
  OptionsGenerator: "OptionsGenerator",
} as const;

export type ControlTypes = keyof typeof controlTypes;

interface Component<T extends ControlTypes> {
  componentType: T;
  componentName: string;
  componentId: number;
}

interface Text extends Component<"Text"> {}
interface TextArea extends Component<"TextArea"> {}

export type TComponentOptions = {
  label: string;
  value: string;
  id: string;
};
interface DropDown extends Component<"DropDown"> {
  options: TComponentOptions[];
  placeHolder: string;
}

export interface IRadio extends Component<"Radio"> {
  options: TComponentOptions[];
}

export interface ICheckBox extends Component<"CheckBox"> {}

export type Components = Text | DropDown | TextArea | IRadio | ICheckBox;

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
};

export interface IFormState {
  name: string;
  description: string;
  controlConfig: TFormControls<ControlTypes>[];
}

export type TFormDetailsSetterAllowedField = keyof Omit<
  IFormState,
  "controlConfig"
>;

// Drop item pass data type
export interface IDropItemData {
  type: ControlTypes;
}
