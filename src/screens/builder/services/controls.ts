import { ControlTypes, TComponentOptions, TFormControls } from "@/types";
import ControllersIcons from "../controllers/icons";
import Controllers from "../controllers";
import { ComponentProps } from "react";
import { IComponentConfig, TFormControllerRenderProps } from "../types";

type TControlType = keyof typeof ControllersIcons & ControlTypes;

export const renderIcon = (type: TControlType) => {
  return ControllersIcons[type]();
};

interface IRenderControllers<T extends ControlTypes> {
  type: T;
  field: TFormControllerRenderProps;
  config: TFormControls<T>;
}

export const renderControllers = <T extends ControlTypes>({
  type,
  ...rest
}: IRenderControllers<T>) => {
  return Controllers[type](rest);
};
