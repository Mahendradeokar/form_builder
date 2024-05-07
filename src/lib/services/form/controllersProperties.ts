import { controlPropertiesConfig } from "@/config/formElements.config";
import { ControlTypes } from "@/types";

export const getDefaultProps = (type: ControlTypes) => {
  return structuredClone(controlPropertiesConfig[type]);
};
