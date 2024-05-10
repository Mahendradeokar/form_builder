import {
  CheckboxIcon,
  CursorTextIcon,
  DropdownMenuIcon,
  RadiobuttonIcon,
  TextIcon,
} from "@radix-ui/react-icons";
import Wrapper from "./wrapper";
import { ControlTypes } from "@/types";

const Text = () => {
  return (
    <Wrapper icon={<CursorTextIcon height={30} width={30} />} name="Text" />
  );
};

const TextArea = () => {
  return (
    <Wrapper icon={<TextIcon height={30} width={30} />} name="Text Area" />
  );
};

const DropDown = () => {
  return (
    <Wrapper
      icon={<DropdownMenuIcon height={30} width={30} />}
      name="Drop Down"
    />
  );
};

const Radio = () => {
  return (
    <Wrapper
      icon={<RadiobuttonIcon height={30} width={30} />}
      name="Radio Button"
    />
  );
};

const CheckBox = () => {
  return (
    <Wrapper icon={<CheckboxIcon height={30} width={30} />} name="Check box" />
  );
};

const FormElementsIcons = {
  Text: Text,
  TextArea: TextArea,
  DropDown: DropDown,
  Radio: Radio,
  CheckBox: CheckBox,
};

export default FormElementsIcons;
