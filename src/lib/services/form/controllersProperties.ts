import { controlPropertiesConfig } from "@/config/formConfig";
import { ControlTypes } from "@/types";

export const getDefaultProps = (type: ControlTypes) => {
  return structuredClone(controlPropertiesConfig[type]);
};
