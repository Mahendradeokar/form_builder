import { GetValidationParams } from "@/screens/builder/types";
import { ControlTypes, InputValue, ValidationType } from "@/types";

interface baseRenderProperty<TValue extends InputValue = InputValue> {
  type: ControlTypes;
  memberOf: "properties" | "validations";
  value: TValue;
}
export interface ControlProperty<TValue extends InputValue = InputValue>
  extends baseRenderProperty<TValue> {
  memberOf: "properties";
}

export interface ControlPropertyWithOptions<TValue extends Options = Options>
  extends baseRenderProperty {
  value: TValue;
  memberOf: "properties";
}

export interface validationProperty<T extends InputValue = InputValue>
  extends baseRenderProperty<T> {
  memberOf: "validations";
}

interface Options {
  [id: string | number]: {
    value: string;
    label: string;
  };
}

export type TControlPropertiesConfig = {
  [key in ControlTypes]: {
    label: ControlProperty<string>;
    placeholder: ControlProperty<string>;
    description: ControlProperty<string>;
    options?: ControlPropertyWithOptions<Options>;
  };
};

export type TTextPropertiesConfig = TControlPropertiesConfig["Text"];
export type TTextAreaPropertiesConfig = TControlPropertiesConfig["TextArea"];
export type TDropDownPropertiesConfig = TControlPropertiesConfig["DropDown"];
export type TRadioPropertiesConfig = TControlPropertiesConfig["Radio"];
export type TCheckBoxPropertiesConfig = TControlPropertiesConfig["CheckBox"];

export type ValidationConfig = {
  [Type in ControlTypes]: {
    [key in ValidationType]?: validationProperty<InputValue>;
  };
};
