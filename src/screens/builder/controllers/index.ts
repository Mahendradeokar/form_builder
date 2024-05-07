import Text from "./Text";
import TextArea from "./TextArea";
import DropDown from "./DropDown";
import { ControlTypes } from "@/types";
import Radio from "./Radio";
import Checkbox from "./Checkbox";
import { IControllerProps } from "../types";
export { default as FormElement } from "./FormElement";

type Controller<T extends ControlTypes> = (
  props: IControllerProps<T>
) => JSX.Element;

const Controllers: {
  [K in ControlTypes]: Controller<K>;
} = {
  [ControlTypes.Text]: Text,
  [ControlTypes.TextArea]: TextArea,
  [ControlTypes.DropDown]: DropDown,
  [ControlTypes.Radio]: Radio,
  [ControlTypes.CheckBox]: Checkbox,
};

export default Controllers;
