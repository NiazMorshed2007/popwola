"use client";

import { usePopupSlice } from "@/hooks/popupSliceHook";
import React from "react";

const Preview = () => {
  const { titleStyle, subtitleStyle, imageStyle, popupSlice } = usePopupSlice();
  return (
    <div className="elements text-black relative selecto-area">
      <h1 style={titleStyle} id="title" className="element">
        {popupSlice.title_value}
      </h1>
      <p style={subtitleStyle} className="element" id="subtitle">
        {popupSlice.subtitle_value}
      </p>
      <img
        style={imageStyle}
        id="image"
        className="element"
        src="/demo.png"
        alt=""
      />
    </div>
  );
};

export default Preview;
