import { configureStore } from "@reduxjs/toolkit";
import nodeSlice from "../slices/nodeSlice";
import popupSlice from "../slices/popupSlice";

export const store = configureStore({
  reducer: {
    node: nodeSlice,
    popup: popupSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
