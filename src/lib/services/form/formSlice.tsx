import { generateUniqueId } from "@/lib/utils";
import {
  ControlTypes,
  IDropItemData,
  IFormState,
  TFormControls,
  TFormDetailsSetterAllowedField,
} from "@/types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { getDefaultProps } from "./controllersProperties";
import { getDefaultValidations } from "@/screens/builder/services/validations";

const initialState: IFormState = {
  name: "",
  description: "Edit Description",
  controlConfig: [],
};

const formSlice = createSlice({
  name: "form",
  initialState: initialState,
  reducers: {
    loadForm(state, action: PayloadAction<IFormState>) {
      const { name, description, controlConfig } = action.payload;
      state.name = name;
      state.description = description;
      state.controlConfig = controlConfig;
      return state;
    },
    addComponent(state, action: PayloadAction<IDropItemData>) {
      const id = generateUniqueId();
      const { type } = action.payload;
      const defaultProperties = getDefaultProps(type);
      const defaultValidations = getDefaultValidations(type);

      const props = {
        ...action.payload,
        _id: id,
        properties: defaultProperties,
        validations: defaultValidations,
      };
      state.controlConfig.push(props);
      return state;
    },
    formDetailsSetter(
      state,
      action: PayloadAction<{
        field: TFormDetailsSetterAllowedField;
        value: string;
      }>
    ) {
      const { field, value } = action.payload;
      state[field] = value;
      return state;
    },
    updateControlConfigByIndex(
      state,
      action: PayloadAction<{ idx: number; update: TFormControls }>
    ) {
      const { idx, update } = action.payload;
      state.controlConfig.splice(idx, 1, update);
      return state;
    },
    removeControl(state, action: PayloadAction<number>) {
      const idx = action.payload;
      state.controlConfig.splice(idx, 1);
      return state;
    },
    moveControl(state, action: PayloadAction<{ from: number; to: number }>) {
      const { from, to } = action.payload;
      const controlConfig = state.controlConfig;
      const [removedEle] = controlConfig.splice(from, 1);
      controlConfig.splice(to, 0, removedEle);
      return state;
    },
  },
  selectors: {
    selectForm: (form) => form,
    selectFormControlsConfig: (form) => form.controlConfig,
  },
});

export const {
  loadForm,
  addComponent,
  formDetailsSetter,
  updateControlConfigByIndex,
  removeControl,
  moveControl,
} = formSlice.actions;
export const { selectForm, selectFormControlsConfig } = formSlice.selectors;
export default formSlice;
