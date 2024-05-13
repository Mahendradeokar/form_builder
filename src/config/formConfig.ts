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
      value: "Drop down",
      memberOf: "properties",
    },
    placeholder: {
      type: controlTypes.Text,
      value: "Drop down Placeholder",
      memberOf: "properties",
    },
    description: {
      type: controlTypes.Text,
      value: "Drop down description",
      memberOf: "properties",
    },
    options: {
      type: "OptionsGenerator",
      memberOf: "properties",
      value: {
        1: {
          value: "Options1",
          label: "Please Select options 1",
        },
        2: {
          value: "Options2",
          label: "Please Select options 2",
        },
      },
    },
  },
  Text: {
    label: {
      type: controlTypes.Text,
      value: "Text",
      memberOf: "properties",
    },
    placeholder: {
      type: controlTypes.Text,
      value: "Text Placeholder",
      memberOf: "properties",
    },
    description: {
      type: controlTypes.Text,
      value: "Text description",
      memberOf: "properties",
    },
  },
  TextArea: {
    label: {
      type: controlTypes.Text,
      value: "Text area",
      memberOf: "properties",
    },
    placeholder: {
      type: controlTypes.Text,
      value: "Text area Placeholder",
      memberOf: "properties",
    },
    description: {
      type: controlTypes.Text,
      value: "Text area description",
      memberOf: "properties",
    },
  },

  Radio: {
    label: {
      type: controlTypes.Text,
      value: "Radio",
      memberOf: "properties",
    },
    placeholder: {
      type: controlTypes.Text,
      value: "Radio Placeholder",
      memberOf: "properties",
    },
    description: {
      type: controlTypes.Text,
      value: "Radio description",
      memberOf: "properties",
    },
    options: {
      type: "OptionsGenerator",
      memberOf: "properties",
      value: {
        1: {
          value: "Options1",
          label: "Please Select options 1",
        },
        2: {
          value: "Options2",
          label: "Please Select options 2",
        },
      },
    },
  },
  CheckBox: {
    label: {
      type: controlTypes.Text,
      value: "Radio",
      memberOf: "properties",
    },
    placeholder: {
      type: controlTypes.Text,
      value: "Radio Placeholder",
      memberOf: "properties",
    },
    description: {
      type: controlTypes.Text,
      value: "Radio description",
      memberOf: "properties",
    },
    options: {
      type: "OptionsGenerator",
      memberOf: "properties",
      value: {
        1: {
          value: "Options1",
          label: "Please Select options 1",
        },
        2: {
          value: "Options2",
          label: "Please Select options 2",
        },
      },
    },
  },
  OptionsGenerator: {
    label: {
      type: controlTypes.Text,
      value: "Radio",
      memberOf: "properties",
    },
    placeholder: {
      type: controlTypes.Text,
      value: "Radio Placeholder",
      memberOf: "properties",
    },
    description: {
      type: controlTypes.Text,
      value: "Radio description",
      memberOf: "properties",
    },
    options: {
      type: "OptionsGenerator",
      memberOf: "properties",
      value: {
        1: {
          value: "Options1",
          label: "Please Select options 1",
        },
        2: {
          value: "Options2",
          label: "Please Select options 2",
        },
      },
    },
  },
  Switch: {
    description: {
      type: "Text",
      memberOf: "properties",
      value: "Switch",
    },
    label: {
      type: "Text",
      memberOf: "properties",
      value: "Switch",
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
    maxLength: { type: controlTypes.Text, value: 10, memberOf: "validations" },
    minLength: { type: controlTypes.Text, value: 5, memberOf: "validations" },
    formateBy: {
      type: controlTypes.Text,
      value: "^\\S+@\\S+\\.\\S+$",
      memberOf: "validations",
    },
  },
  TextArea: {
    isRequired: {
      type: controlTypes.Switch,
      value: true,
      memberOf: "validations",
    },
    maxLength: { type: controlTypes.Text, value: 20, memberOf: "validations" },
    minLength: { type: controlTypes.Text, value: 10, memberOf: "validations" },
    formateBy: {
      type: controlTypes.Text,
      value: "^\\S+@\\S+\\.\\S+$",
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
    maxLength: { type: controlTypes.Text, value: 2, memberOf: "validations" },
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
