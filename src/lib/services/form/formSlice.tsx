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

const initialState: IFormState = {
  name: "Edit Title",
  description: "Edit Description",
  controlConfig: [],
};

const formSlice = createSlice({
  name: "form",
  initialState: initialState,
  reducers: {
    addComponent(state, action: PayloadAction<IDropItemData>) {
      const id = generateUniqueId();
      const { type } = action.payload;
      const defaultProperties = getDefaultProps(type);

      const props = {
        ...action.payload,
        _id: id,
        properties: defaultProperties,
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
      debugger;
      const { idx, update } = action.payload;
      state.controlConfig.splice(idx, 1, update);
      return state;
    },
  },
  selectors: {
    selectForm: (form) => form,
    selectFormControlsConfig: (form) => form.controlConfig,
  },
});

export const { addComponent, formDetailsSetter, updateControlConfigByIndex } =
  formSlice.actions;
export const { selectForm, selectFormControlsConfig } = formSlice.selectors;
export default formSlice;
