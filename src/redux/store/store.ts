import { configureStore } from "@reduxjs/toolkit";
import nodeSlice from "../slices/nodeSlice";
import popupSlice from "../slices/popupSlice";
import responsiveSlice from "../slices/responsiveSlice";

export const store = configureStore({
  reducer: {
    node: nodeSlice,
    popup: popupSlice,
    view: responsiveSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
