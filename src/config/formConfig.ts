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
];

export const controlPropertiesConfig: TControlPropertiesConfig = {
  DropDown: {
    label: {
      type: controlTypes.Text,
      value: "Drop down",
      isVisible: true,
    },
    placeholder: {
      type: controlTypes.Text,
      value: "Drop down Placeholder",
      isVisible: true,
    },
    description: {
      type: controlTypes.Text,
      value: "Drop down description",
      isVisible: true,
    },
    options: {
      type: "OptionsGenerator",
      isVisible: true,
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
      isVisible: true,
    },
    placeholder: {
      type: controlTypes.Text,
      value: "Text Placeholder",
      isVisible: true,
    },
    description: {
      type: controlTypes.Text,
      value: "Text description",
      isVisible: true,
    },
  },
  TextArea: {
    label: {
      type: controlTypes.Text,
      value: "Text area",
      isVisible: true,
    },
    placeholder: {
      type: controlTypes.Text,
      value: "Text area Placeholder",
      isVisible: true,
    },
    description: {
      type: controlTypes.Text,
      value: "Text area description",
      isVisible: true,
    },
  },

  Radio: {
    label: {
      type: controlTypes.Text,
      value: "Radio",
      isVisible: true,
    },
    placeholder: {
      type: controlTypes.Text,
      value: "Radio Placeholder",
      isVisible: true,
    },
    description: {
      type: controlTypes.Text,
      value: "Radio description",
      isVisible: true,
    },
    options: {
      type: "OptionsGenerator",
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
      isVisible: true,
    },
  },
  CheckBox: {
    label: {
      type: controlTypes.Text,
      value: "Radio",
      isVisible: true,
    },
    placeholder: {
      type: controlTypes.Text,
      value: "Radio Placeholder",
      isVisible: true,
    },
    description: {
      type: controlTypes.Text,
      value: "Radio description",
      isVisible: true,
    },
    options: {
      type: "OptionsGenerator",
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
      isVisible: true,
    },
  },
  OptionsGenerator: {
    label: {
      type: controlTypes.Text,
      value: "Radio",
      isVisible: true,
    },
    placeholder: {
      type: controlTypes.Text,
      value: "Radio Placeholder",
      isVisible: true,
    },
    description: {
      type: controlTypes.Text,
      value: "Radio description",
      isVisible: true,
    },
    options: {
      type: "OptionsGenerator",
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
      isVisible: true,
    },
  },
};

export const defaultValidations: ValidationConfig = {
  DropDown: { isRequired: true },
  Text: {
    isRequired: true,
    maxLength: 10,
    minLength: 5,
    formateBy: "^\\S+@\\S+\\.\\S+$",
  },
  TextArea: {
    isRequired: true,
    maxLength: 20,
    minLength: 10,
    formateBy: "^\\S+@\\S+\\.\\S+$",
  },
  Radio: { isRequired: true },
  CheckBox: { isRequired: true, minLength: 1, maxLength: 2 },
  OptionsGenerator: { isRequired: true },
};
