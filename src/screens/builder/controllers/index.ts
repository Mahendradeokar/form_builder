import Text from "./Text";
import TextArea from "./TextArea";
import DropDown from "./DropDown";
import { ControlTypes } from "@/types";
import Radio from "./Radio";
import Checkbox from "./Checkbox";
import { IControllerProps } from "../types";
import OptionsGenerator from "./OptionsGenerator";
export { default as FormElement } from "./FormElement";

type Controller<T extends ControlTypes> = (
  props: IControllerProps<T>
) => JSX.Element;

const Controllers: {
  [K in ControlTypes]: Controller<K>;
} = {
  Text: Text,
  TextArea: TextArea,
  DropDown: DropDown,
  Radio: Radio,
  CheckBox: Checkbox,
  OptionsGenerator: OptionsGenerator,
};

export default Controllers;
