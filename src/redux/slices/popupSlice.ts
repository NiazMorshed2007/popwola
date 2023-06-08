import { PayloadAction, createSelector, createSlice } from "@reduxjs/toolkit";
import { SupportedNodeTypes } from "./nodeSlice";
import { CSSProperties } from "react";
import { extractTranslateValue } from "@/components/editor/helpers/extractTranslate";
import { URL } from "url";

export interface PopupSliceInterface {
  id: string;
  campaign_id: string;
  name: string;
  bg: CSSProperties;
  title_value: string;
  title_style: CSSProperties;
  subtitle_value: string;
  subtitle_style: CSSProperties;
  img_url: string;
  image_style: CSSProperties;
  button_value: string;
  button_url: string;
  button_style: CSSProperties;
}

const transformStyleMap: {
  title: "title_style";
  subtitle: "subtitle_style";
  image: "image_style";
  bg: "bg";
  button: "button_style";
} = {
  title: "title_style",
  subtitle: "subtitle_style",
  image: "image_style",
  bg: "bg",
  button: "button_style",
};

const initialPopupState: PopupSliceInterface = {
  name: "popup",
  id: "1",
  campaign_id: "",
  bg: {
    backgroundColor: "#ffffff",
    width: "700px",
    height: "400px",
    overflow: "hidden",
    position: "relative",
    borderRadius: "10px",
  },
  title_value: "Don't miss this amazing opportuity",
  title_style: {
    color: "#21a373",
    fontSize: "35px",
    fontWeight: "600",
    height: "50px",
    letterSpacing: "0px",
    position: "absolute",
    textAlign: "left",
    transform: "translate(57px, 31px)",
    width: "602px",
  },
  subtitle_value: "Limited offer!! Claim your deal now!!",
  subtitle_style: {
    color: "#3d3d3d",
    fontSize: "19px",
    fontWeight: "400",
    height: "30px",
    letterSpacing: "0px",
    position: "absolute",
    textAlign: "center",
    transform: "translate(73px, 95px)",
    width: "540px",
  },
  img_url:
    "https://cloud.appwrite.io/v1/storage/buckets/647d8d9393004459fd6d/files/647e11389c8d1b90f91c/view?project=6475ca5453bd7b131cd8&mode=admin",
  // "https://cloud.appwrite.io/v1/storage/buckets/647d8d9393004459fd6d/files/647dbb4eed24a753d3be/view?project=6475ca5453bd7b131cd8&mode=admin",
  image_style: {
    height: "222px",
    position: "absolute",
    transform: "translate(191px, 209px)",
    width: "286px",
  },
  button_value: "Click here",
  button_url: "https://www.google.com",
  button_style: {
    background: "#000000",
    backgroundColor: "#f42841",
    borderRadius: "10px",
    color: "#ffffff",
    fontSize: "16px",
    fontWeight: "400",
    height: "39px",
    letterSpacing: "0px",
    position: "absolute",
    textAlign: "center",
    transform: "translate(256px, 150px)",
    width: "165px",
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
      } else if (node === "image") {
        state.img_url = value;
      } else if (node === "button") {
        state.button_value = value;
      }
    },

    setUrl: (
      state,
      action: PayloadAction<{
        node: SupportedNodeTypes;
        url: string;
      }>
    ) => {
      const { node, url } = action.payload;
      if (node === "button") {
        state.button_url = url;
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

export const { setPopup, setValue, setYAxis, setXAxis, setStyle, setUrl } =
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

export const selectButtonStyle = createSelector(
  [selectPopup],
  (popup) => popup.button_style
);
export default popupSlice.reducer;
