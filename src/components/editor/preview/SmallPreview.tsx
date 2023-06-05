import { usePopupSlice } from "@/hooks/popupSliceHook";
import React from "react";

interface Props {
  width?: string;
  height?: string;
}

const SmallPreview: React.FC<Props> = ({ width, height }) => {
  const { titleStyle, subtitleStyle, imageStyle, popupSlice } = usePopupSlice();

  return (
    <div
      style={{
        ...popupSlice.bg,
        height: "100%",
        width: "100%",
        scale: 0.9,
        overflow: "auto",
      }}
    >
      <h1
        style={{
          ...titleStyle,
          //   scale: 0.6,
        }}
        id="title"
        className="element"
      >
        {popupSlice.title_value}
      </h1>
      <p
        style={{
          ...subtitleStyle,
          //   scale: 0.6,
        }}
        className="element"
        id="subtitle"
      >
        {popupSlice.subtitle_value}
      </p>
      <img
        style={{
          ...imageStyle,
          //   scale: 0.2,
        }}
        id="image"
        className="element"
        src={popupSlice.img_url}
        alt=""
      />
    </div>
  );
};

export default SmallPreview;
