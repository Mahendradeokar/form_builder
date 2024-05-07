import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface IControlSlice {
  currentActive: string | number | null;
}

const initialState: IControlSlice = {
  currentActive: null,
};

const controlSlice = createSlice({
  name: "controls",
  initialState: initialState,
  reducers: {
    setActive(state, action: PayloadAction<string | number>) {
      state.currentActive = action.payload;
      return state;
    },
  },
  selectors: {
    getActive: (controlState) => controlState.currentActive,
  },
});

export const { setActive } = controlSlice.actions;
export const { getActive } = controlSlice.selectors;
export default controlSlice;
