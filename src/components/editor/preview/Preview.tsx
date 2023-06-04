"use client";

import { usePopupSlice } from "@/hooks/popupSliceHook";
import React from "react";

const Preview = () => {
  const { titleStyle, subtitleStyle, imageStyle, popupSlice } = usePopupSlice();
  return (
    <div className="elements text-black relative selecto-area">
      <h1
        style={titleStyle}
        id="title"
        className="element text-2xl font-semibold"
      >
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
        // src="https://cdn.dribbble.com/userupload/4160413/file/original-7f17f8eb041c03c556033cf057a648f9.png?compress=1&resize=1024x768"
        alt=""
      />
    </div>
  );
};

export default Preview;
