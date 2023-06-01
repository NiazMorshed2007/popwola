"use client";
import useDragger from "@/hooks/useDraggable";
import React, { useState } from "react";

const Editor = () => {
  const [xAxis, setXAxis] = useState(0);
  const [yAxis, setYAxis] = useState(0);

  useDragger("title");

  return (
    <div className="w-full select-none h-full flex items-center justify-center">
      <div
        id="popup"
        style={{
          width: "700px",
          height: "400px",
        }}
        className="popup bg-white rounded-xl relative"
      >
        <h1 id="title" className="text-black absolute select-none cursor-move">
          Title
        </h1>
      </div>
    </div>
  );
};

export default Editor;
