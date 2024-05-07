import {
  TCheckBoxPropertiesConfig,
  TControlPropertiesConfig,
  TDropDownPropertiesConfig,
  TRadioPropertiesConfig,
  TTextAreaPropertiesConfig,
  TTextPropertiesConfig,
} from "@/config/types";

// Component types
export enum ControlTypes {
  Text = "Text",
  TextArea = "TextArea",
  DropDown = "DropDown",
  Radio = "Radio",
  CheckBox = "CheckBox",
}

interface Component<T extends string> {
  componentType: T;
  componentName: string;
  componentId: number;
}

interface Text extends Component<ControlTypes.Text> {}
interface TextArea extends Component<ControlTypes.TextArea> {}

export type TComponentOptions = {
  label: string;
  value: string;
  id: string;
};
interface DropDown extends Component<ControlTypes.DropDown> {
  options: TComponentOptions[];
  placeHolder: string;
}

export interface IRadio extends Component<ControlTypes.Radio> {
  options: TComponentOptions[];
}

export interface ICheckBox extends Component<ControlTypes.CheckBox> {}

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
  name: string;
  _id: string;
  label: string;
  description?: string;
} & TControlPropertiesConfig[T];

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
