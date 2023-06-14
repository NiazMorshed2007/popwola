import { Input } from "@/components/ui/input";
import { usePopupSlice } from "@/hooks/popupSliceHook";
import { useAppDispatch } from "@/hooks/reduxHooks";
import { useSelectedNode } from "@/hooks/selectedNodeHook";
import { useSelectedView } from "@/hooks/selectedViewHook";
import { setStyle } from "@/redux/slices/popupSlice";
import React, { ChangeEvent, useRef } from "react";

const BackgroundColorPicker = () => {
  const backgroundColorInputRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();
  const selectedNode = useSelectedNode();
  const selectedView = useSelectedView();
  const { targetedNodeStyle } = usePopupSlice();

  const getBackgroundColorByNode = (): string | undefined => {
    return targetedNodeStyle()?.backgroundColor;
  };

  const handleBackgroundColorChange = (e: ChangeEvent<HTMLInputElement>) => {
    const color_val = e.target.value;
    if (color_val) {
      dispatch(
        setStyle({
          node: selectedNode,
          view: selectedView,
          style: { backgroundColor: color_val },
        })
      );
    }
  };

  const openColorPicker = () => {
    backgroundColorInputRef.current?.click();
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
        className="absolute top-0 left-0 -translate-x-[260px]"
        style={{ opacity: 0, width: 0, height: 0, visibility: "hidden" }}
        onChange={handleBackgroundColorChange}
      />
    </>
  );
};

export default BackgroundColorPicker;
