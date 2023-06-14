import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type SupportedResponsiveViews = "desktop" | "tablet" | "mobile";

interface ViewInterface {
  view: SupportedResponsiveViews;
}

const initialViewState: ViewInterface = { view: "desktop" };

export const viewSlice = createSlice({
  name: "view",
  initialState: initialViewState,
  reducers: {
    setView: (state, action: PayloadAction<SupportedResponsiveViews>) => {
      state.view = action.payload;
    },
  },
});

export const { setView } = viewSlice.actions;
export const selectSelectedViews = (state: { view: ViewInterface }) =>
  state.view.view;
export default viewSlice.reducer;
