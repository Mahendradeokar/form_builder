import { ControlTypes, type TElementConfig } from "@/types";

export const elementConfig: readonly TElementConfig[] = [
  {
    componentName: "Text",
    componentType: ControlTypes.Text,
    componentId: 1,
  },
  {
    componentName: "Dropdown",
    componentType: ControlTypes.DropDown,
    componentId: 2,
  },
  {
    componentName: "Text Area",
    componentType: ControlTypes.TextArea,
    componentId: 3,
  },
  {
    componentName: "Radio Button",
    componentType: ControlTypes.Radio,
    componentId: 4,
  },
  {
    componentName: "Checkbox",
    componentType: ControlTypes.CheckBox,
    componentId: 5,
  },
];

export const controlPropertiesConfig = {
  [ControlTypes.Text]: {
    label: "Text",
    placeholder: "Text Placeholder",
    description: "Text description",
  },
  [ControlTypes.TextArea]: {
    label: "Text area",
    placeholder: "Text area Placeholder",
    description: "Text area description",
  },
  [ControlTypes.DropDown]: {
    label: "Drop down",
    placeHolder: "Select Options",
    description: "Dropdown description",
    options: [
      {
        id: 1,
        value: "Options1",
        label: "Please Select options 1",
      },
      {
        id: 2,
        value: "Options2",
        label: "Please Select options 2",
      },
    ],
  },
  [ControlTypes.Radio]: {
    label: "Select One Options",
    description: "Radio description",
    defaultValue: "Options1",
    options: [
      {
        id: 1,
        value: "Options1",
        label: "Please Select options 1",
      },
      {
        id: 2,
        value: "Options2",
        label: "Please Select options 2",
      },
    ],
  },
  [ControlTypes.CheckBox]: {
    label: "Check checkbox",
    description: "checkbox description description",
    options: [
      {
        id: 1,
        value: "Options1",
        label: "Please check options 1",
      },
      {
        id: 2,
        value: "Options2",
        label: "Please check options 2",
      },
    ],
  },
};
