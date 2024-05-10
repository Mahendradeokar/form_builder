import {
  ControlTypes,
  IFormState,
  TComponentOptions,
  TFormControls,
} from "@/types";
import ControllersIcons from "../controllers/icons";
import Controllers from "../controllers";
import { ComponentProps } from "react";
import {
  FormValues,
  IComponentConfig,
  TFormControllerRenderProps,
} from "../types";
import { objectEntities } from "@/lib/utils";
import { ControlPropertyWithOptions } from "@/config/types";

type TControlType = keyof typeof ControllersIcons & ControlTypes;

export const renderIcon = (type: TControlType) => {
  return ControllersIcons[type]();
};

interface IRenderControllers<T extends ControlTypes> {
  type: T;
  field: TFormControllerRenderProps<T> | any;
  config: TFormControls<T>["properties"];
}

export const renderControllers = <T extends ControlTypes>({
  type,
  ...rest
}: IRenderControllers<T>) => {
  return Controllers[type](rest);
};

export const shouldAppend = (
  field: FormValues["controls"],
  controlConfig: IFormState["controlConfig"]
) => {
  const isNewEntry = controlConfig.every(({ _id: controllerId }) => {
    return field.some(({ _id: fieldId }) => fieldId === controllerId);
  });

  return !isNewEntry;
};

export const convertComponentOptionsIntoArray = (
  obj: ControlPropertyWithOptions["value"]
) => {
  return objectEntities(obj).map(([id, values]) => {
    return { id, ...values };
  });
};
