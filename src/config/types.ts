import { ControlTypes } from "@/types";
import { controlPropertiesConfig } from "./formElements.config";

export type TControlPropertiesConfig = typeof controlPropertiesConfig;
export type TTextPropertiesConfig = TControlPropertiesConfig[ControlTypes.Text];
export type TTextAreaPropertiesConfig =
  TControlPropertiesConfig[ControlTypes.TextArea];
export type TDropDownPropertiesConfig =
  TControlPropertiesConfig[ControlTypes.DropDown];
export type TRadioPropertiesConfig =
  TControlPropertiesConfig[ControlTypes.Radio];
export type TCheckBoxPropertiesConfig =
  TControlPropertiesConfig[ControlTypes.CheckBox];
