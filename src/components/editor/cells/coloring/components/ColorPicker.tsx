import { Input } from "@/components/ui/input";
import { usePopupSlice } from "@/hooks/popupSliceHook";
import { useAppDispatch } from "@/hooks/reduxHooks";
import { useSelectedNode } from "@/hooks/selectedNodeHook";
import { useSelectedView } from "@/hooks/selectedViewHook";
import { setStyle } from "@/redux/slices/popupSlice";
import { useRef } from "react";

const ColorPicker = () => {
  const colorInputRef: any = useRef();
  const dispatch = useAppDispatch();
  const selectedNode = useSelectedNode();
  const selectedView = useSelectedView();
  const { targetedNodeStyle } = usePopupSlice();

  const getColorByNode = () => {
    return targetedNodeStyle()?.color;
  };

  const handleColorChange = () => {
    const color_val = colorInputRef.current.value;
    dispatch(
      setStyle({
        node: selectedNode,
        view: selectedView,
        style: { color: color_val },
      })
    );
  };

  const openColorPicker = () => {
    colorInputRef.current.click();
  };

  return (
    <>
      <div
        onClick={openColorPicker}
        className="flex w-full p-2 rounded-md items-center gap-7"
      >
        <div className="flex items-center gap-3">
          <p className="text-xs">Fill:</p>
          <div
            className="style-preview cursor-pointer w-[20px] h-[20px] rounded-sm"
            style={{ background: getColorByNode()! }}
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
            value={getColorByNode()!}
          />
        </div>
      </div>

      <input
        type="color"
        ref={colorInputRef}
        className="asbolute top-0 left-0 -translate-x-[260px]"
        style={{ opacity: "none", width: 0, height: 0, visibility: "hidden" }}
        onChange={handleColorChange}
      />
    </>
  );
};

export default ColorPicker;
