import { ControlTypes, type TElementConfig } from "@/types";
import { TControlPropertiesConfig, ValidationConfig } from "./types";

// Component types
export const controlTypes = {
  Text: "Text",
  TextArea: "TextArea",
  DropDown: "DropDown",
  Radio: "Radio",
  CheckBox: "CheckBox",
  OptionsGenerator: "OptionsGenerator",
  Switch: "Switch",
} as const;

export const validationsType = {
  isRequired: "isRequired",
  formateBy: "formateBy",
  minLength: "minLength",
  maxLength: "maxLength",
} as const;

export const elementConfig: readonly TElementConfig[] = [
  {
    componentName: "Text",
    componentType: "Text",
    componentId: 1,
  },
  {
    componentName: "Dropdown",
    componentType: "DropDown",
    componentId: 2,
  },
  {
    componentName: "Text Area",
    componentType: "TextArea",
    componentId: 3,
  },
  {
    componentName: "Radio Button",
    componentType: "Radio",
    componentId: 4,
  },
  {
    componentName: "Checkbox",
    componentType: "CheckBox",
    componentId: 5,
  },
  {
    componentName: "Switch",
    componentType: "Switch",
    componentId: 6,
  },
];

export const controlPropertiesConfig: TControlPropertiesConfig = {
  DropDown: {
    label: {
      type: controlTypes.Text,
      value: "Dropdown Field",
      memberOf: "properties",
    },
    placeholder: {
      type: controlTypes.Text,
      value: "Select an option",
      memberOf: "properties",
    },
    description: {
      type: controlTypes.Text,
      value: "Choose from the available options",
      memberOf: "properties",
    },
    options: {
      type: "OptionsGenerator",
      memberOf: "properties",
      value: {
        1: {
          value: "Option1",
          label: "Option 1",
        },
        2: {
          value: "Option2",
          label: "Option 2",
        },
      },
    },
  },
  Text: {
    label: {
      type: controlTypes.Text,
      value: "Text Field",
      memberOf: "properties",
    },
    placeholder: {
      type: controlTypes.Text,
      value: "Enter text",
      memberOf: "properties",
    },
    description: {
      type: controlTypes.Text,
      value: "Enter some text",
      memberOf: "properties",
    },
  },
  TextArea: {
    label: {
      type: controlTypes.Text,
      value: "Text Area",
      memberOf: "properties",
    },
    placeholder: {
      type: controlTypes.Text,
      value: "Enter description",
      memberOf: "properties",
    },
    description: {
      type: controlTypes.Text,
      value: "Provide detailed information",
      memberOf: "properties",
    },
  },

  Radio: {
    label: {
      type: controlTypes.Text,
      value: "Radio Buttons",
      memberOf: "properties",
    },
    placeholder: {
      type: controlTypes.Text,
      value: "Select an option",
      memberOf: "properties",
    },
    description: {
      type: controlTypes.Text,
      value: "Choose one option",
      memberOf: "properties",
    },
    options: {
      type: "OptionsGenerator",
      memberOf: "properties",
      value: {
        1: {
          value: "Option1",
          label: "Option 1",
        },
        2: {
          value: "Option2",
          label: "Option 2",
        },
      },
    },
  },
  CheckBox: {
    label: {
      type: controlTypes.Text,
      value: "Checkboxes",
      memberOf: "properties",
    },
    placeholder: {
      type: controlTypes.Text,
      value: "Select one or more options",
      memberOf: "properties",
    },
    description: {
      type: controlTypes.Text,
      value: "Select multiple options",
      memberOf: "properties",
    },
    options: {
      type: "OptionsGenerator",
      memberOf: "properties",
      value: {
        1: {
          value: "Option1",
          label: "Option 1",
        },
        2: {
          value: "Option2",
          label: "Option 2",
        },
      },
    },
  },
  OptionsGenerator: {
    label: {
      type: controlTypes.Text,
      value: "Options Generator",
      memberOf: "properties",
    },
    placeholder: {
      type: controlTypes.Text,
      value: "Enter option",
      memberOf: "properties",
    },
    description: {
      type: controlTypes.Text,
      value: "Custom options generator",
      memberOf: "properties",
    },
    options: {
      type: "OptionsGenerator",
      memberOf: "properties",
      value: {
        1: {
          value: "Option1",
          label: "Option 1",
        },
        2: {
          value: "Option2",
          label: "Option 2",
        },
      },
    },
  },
  Switch: {
    description: {
      type: "Text",
      memberOf: "properties",
      value: "Toggle Switch",
    },
    label: {
      type: "Text",
      memberOf: "properties",
      value: "Toggle Switch",
    },
    placeholder: {
      type: "Text",
      memberOf: "properties",
      value: "Switch",
    },
  },
};

export const defaultValidations: ValidationConfig = {
  DropDown: {
    isRequired: {
      type: controlTypes.Switch,
      value: true,
      memberOf: "validations",
    },
  },
  Text: {
    isRequired: {
      type: controlTypes.Switch,
      value: true,
      memberOf: "validations",
    },
    maxLength: { type: controlTypes.Text, value: 50, memberOf: "validations" },
    minLength: { type: controlTypes.Text, value: 3, memberOf: "validations" },
    formateBy: {
      type: controlTypes.Text,
      value: "^[a-zA-Z0-9_ ]*$",
      memberOf: "validations",
    },
  },
  TextArea: {
    isRequired: {
      type: controlTypes.Switch,
      value: true,
      memberOf: "validations",
    },
    maxLength: { type: controlTypes.Text, value: 200, memberOf: "validations" },
    minLength: { type: controlTypes.Text, value: 10, memberOf: "validations" },
    formateBy: {
      type: controlTypes.Text,
      value: "^[a-zA-Z0-9_ ]*$",
      memberOf: "validations",
    },
  },
  Radio: {
    isRequired: {
      type: controlTypes.Switch,
      value: true,
      memberOf: "validations",
    },
  },
  CheckBox: {
    isRequired: {
      type: controlTypes.Switch,
      value: true,
      memberOf: "validations",
    },
    maxLength: { type: controlTypes.Text, value: 5, memberOf: "validations" },
    minLength: { type: controlTypes.Text, value: 1, memberOf: "validations" },
  },
  OptionsGenerator: {
    isRequired: {
      type: controlTypes.Switch,
      value: true,
      memberOf: "validations",
    },
  },
  Switch: {
    isRequired: {
      type: controlTypes.Switch,
      value: true,
      memberOf: "validations",
    },
  },
};
