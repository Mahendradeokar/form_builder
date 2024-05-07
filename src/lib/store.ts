import { combineSlices, configureStore } from "@reduxjs/toolkit";
import formSlice from "./services/form/formSlice";
import controlSlice from "./services/form/controlState";

const rootReducer = combineSlices(formSlice, controlSlice);

export const makeStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export type TRootState = ReturnType<typeof rootReducer>;
export type TAppStore = ReturnType<typeof makeStore>;
export type TAppDispatch = TAppStore["dispatch"];
