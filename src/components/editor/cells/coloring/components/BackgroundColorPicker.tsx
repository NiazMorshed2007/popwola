import { Input } from "@/components/ui/input";
import { usePopupSlice } from "@/hooks/popupSliceHook";
import { useAppDispatch } from "@/hooks/reduxHooks";
import { useSelectedNode } from "@/hooks/selectedNodeHook";
import { setStyle } from "@/redux/slices/popupSlice";
import React, { useRef } from "react";

const BackgroundColorPicker = () => {
  const backgroundColorInputRef = useRef<any>();
  const dispatch = useAppDispatch();
  const selectedNode = useSelectedNode();
  const { targetedNodeStyle } = usePopupSlice();

  const getBackgroundColorByNode = () => {
    return targetedNodeStyle()?.backgroundColor;
  };

  const handleBackgroundColorChange = () => {
    const color_val = backgroundColorInputRef.current.value;
    dispatch(
      setStyle({
        node: selectedNode,
        style: { backgroundColor: color_val },
      })
    );
  };

  const openColorPicker = () => {
    backgroundColorInputRef.current.click();
  };

  return (
    <>
      <div
        onClick={openColorPicker}
        className="flex w-full p-2 rounded-md items-center gap-7"
      >
        <div className="flex items-center gap-3">
          <p className="text-xs">Bg:</p>
          <div
            className="style-preview cursor-pointer w-[20px] h-[20px] rounded-sm"
            style={{ background: getBackgroundColorByNode()! }}
          ></div>
        </div>
        <div className="w-[100px]">
          <Input
            readOnly
            style={{
              fontSize: "12px",
              padding: "5px 9px",
            }}
            type="text"
            value={getBackgroundColorByNode()!}
          />
        </div>
      </div>

      <input
        type="color"
        ref={backgroundColorInputRef}
        className="asbolute top-0 left-0 -translate-x-[260px]"
        style={{ opacity: "none", width: 0, height: 0, visibility: "hidden" }}
        onChange={handleBackgroundColorChange}
      />
    </>
  );
};

export default BackgroundColorPicker;
