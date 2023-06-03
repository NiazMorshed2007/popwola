import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface PopupSliceInterface {
  name: string;
  bg: string;
  title_value: string;
  title_style: string;
  subtitle_value: string;
  subtitle_style: string;
}

const initialPopupState: PopupSliceInterface = {
  name: "popup",
  bg: `{"background":"#ffffff"}`,
  title_value: "Title",
  title_style: `{"color":"#000000","font-size":"44px","font-family":"Arial","font-weight":"bold","text-align":"center"}`,
  subtitle_value: "Subtitle",
  subtitle_style: `{"color":"#000000","font-size":"16px","font-family":"Arial","font-weight":"normal","text-align":"center"}`,
};

export const popupSlice = createSlice({
  name: "popup",
  initialState: initialPopupState,
  reducers: {
    setPopup: (state, action: PayloadAction<PopupSliceInterface>) => {
      state.name = action.payload.name;
      state.bg = action.payload.bg;
      state.title_value = action.payload.title_value;
      state.title_style = action.payload.title_style;
      state.subtitle_value = action.payload.subtitle_value;
      state.subtitle_style = action.payload.subtitle_style;
    },
    setTitleValue: (state, action: PayloadAction<string>) => {
      state.title_value = action.payload;
    },
  },
});

export const { setPopup, setTitleValue } = popupSlice.actions;
export const selectPopup = (state: { popup: PopupSliceInterface }) =>
  state.popup;
export default popupSlice.reducer;
