import { GetValidationParams } from "@/screens/builder/types";
import { ControlTypes, ValidationType } from "@/types";

export type ControlProperty = {
  type: ControlTypes;
  value: string;
  isVisible: boolean;
};

export type ControlPropertyWithOptions = {
  value: Options;
} & Omit<ControlProperty, "value">;

interface Options {
  [id: string | number]: {
    value: string;
    label: string;
  };
}

export type TControlPropertiesConfig = {
  [key in ControlTypes]: {
    label: ControlProperty;
    placeholder: ControlProperty;
    description: ControlProperty;
    options?: ControlPropertyWithOptions;
  };
};

export type TTextPropertiesConfig = TControlPropertiesConfig["Text"];
export type TTextAreaPropertiesConfig = TControlPropertiesConfig["TextArea"];
export type TDropDownPropertiesConfig = TControlPropertiesConfig["DropDown"];
export type TRadioPropertiesConfig = TControlPropertiesConfig["Radio"];
export type TCheckBoxPropertiesConfig = TControlPropertiesConfig["CheckBox"];

export type ValidationConfig = {
  [Type in ControlTypes]: {
    [key in ValidationType]?: GetValidationParams;
  };
};
