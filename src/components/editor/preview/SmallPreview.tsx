import { usePopupSlice } from "@/hooks/popupSliceHook";
import React from "react";
import Preview from "./Preview";

interface Props {
  width?: string;
  height?: string;
}

const SmallPreview: React.FC<Props> = ({ width, height }) => {
  const { popupSlice } = usePopupSlice();
  return (
    <div
      style={{
        ...popupSlice.bg,
        width: width || "100%",
        height: height || "45%",
      }}
      className={""}
    >
      <div className="scale-90">
        <Preview />
      </div>
    </div>
  );
};

export default SmallPreview;
