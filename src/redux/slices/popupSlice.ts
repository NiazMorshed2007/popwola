import { PayloadAction, createSelector, createSlice } from "@reduxjs/toolkit";
import { SupportedNodeTypes } from "./nodeSlice";
import { CSSProperties } from "react";
import { extractTranslateValue } from "@/components/editor/helpers/extractTranslate";

export interface PopupSliceInterface {
  name: string;
  bg: CSSProperties;
  title_value: string;
  title_style: CSSProperties;
  subtitle_value: string;
  subtitle_style: CSSProperties;
  img_url: string;
  image_style: CSSProperties;
}

const transformStyleMap: {
  title: "title_style";
  subtitle: "subtitle_style";
  image: "image_style";
  bg: "bg";
} = {
  title: "title_style",
  subtitle: "subtitle_style",
  image: "image_style",
  bg: "bg",
};

const initialPopupState: PopupSliceInterface = {
  name: "popup",
  bg: {
    background: "#ffffff",
    width: "700px",
    height: "400px",
    overflow: "hidden",
    borderRadius: "10px",
  },
  title_value: "Title",
  title_style: {
    color: "#000000",
    width: "300px",
    height: "50px",
    fontSize: "44px",
    transform: "translate(10px, 10px)",
    fontWeight: "600",
    textAlign: "center",
    letterSpacing: "0px",
  },
  subtitle_value: "Subtitle",
  subtitle_style: {
    color: "#000000",
    width: "300px",
    height: "50px",
    fontSize: "16px",
    transform: "translate(10px, 10px)",
    fontWeight: "300",
    textAlign: "center",
    letterSpacing: "0px",
  },
  img_url: "",
  image_style: {
    width: "100px",
    height: "100px",
    transform: "translate(10px, 10px)",
  },
};

export const popupSlice = createSlice({
  name: "popup",
  initialState: initialPopupState,
  reducers: {
    setPopup: (state, action: PayloadAction<PopupSliceInterface>) => {
      return action.payload;
    },
    setValue: (
      state,
      action: PayloadAction<{
        node: SupportedNodeTypes;
        value: string;
      }>
    ) => {
      const { node, value } = action.payload;
      if (node === "title") {
        state.title_value = value;
      } else if (node === "subtitle") {
        state.subtitle_value = value;
      }
    },

    setXAxis: (
      state,
      action: PayloadAction<{
        node: SupportedNodeTypes;
        x: string;
      }>
    ) => {
      const { node, x } = action.payload;
      const targetStyle = transformStyleMap[node];
      const style = state[targetStyle];
      const y = extractTranslateValue(style.transform!, "y");
      style.transform = `translate(${x}px, ${y}px)`;
    },

    setYAxis: (
      state,
      action: PayloadAction<{
        node: SupportedNodeTypes;
        y: string;
      }>
    ) => {
      const { node, y } = action.payload;
      const targetStyle = transformStyleMap[node];
      const style = state[targetStyle];
      const x = extractTranslateValue(style.transform!, "x");
      style.transform = `translate(${x}px, ${y}px)`;
    },
    setStyle: (
      state,
      action: PayloadAction<{
        node: SupportedNodeTypes;
        style: CSSProperties;
      }>
    ) => {
      const { node, style } = action.payload;
      const targetStyle = transformStyleMap[node];

      const prevStyle = state[targetStyle] as any;
      const styleKey = Object.keys(style)[0];
      const styleVal = Object.values(style)[0];
      prevStyle[styleKey] = styleVal;
    },
  },
});

export const { setPopup, setValue, setYAxis, setXAxis, setStyle } =
  popupSlice.actions;

// selectors
export const selectPopup = (state: { popup: PopupSliceInterface }) =>
  state.popup;

export const selectBg = createSelector([selectPopup], (popup) => popup.bg);

export const selectTitleStyle = createSelector(
  [selectPopup],
  (popup) => popup.title_style
);

export const selectSubtitleStyle = createSelector(
  [selectPopup],
  (popup) => popup.subtitle_style
);

export const selectImageStyle = createSelector(
  [selectPopup],
  (popup) => popup.image_style
);
export default popupSlice.reducer;
