import React, { ChangeEvent } from "react";
import CellInput from "../../common/CellInput";
import { removePx } from "@/components/editor/helpers/removePx";
import { useAppDispatch } from "@/hooks/reduxHooks";
import { setStyle } from "@/redux/slices/popupSlice";
import { useSelectedNode } from "@/hooks/selectedNodeHook";
import { usePopupSlice } from "@/hooks/popupSliceHook";
import { useSelectedView } from "@/hooks/selectedViewHook";

const WidthHeight = () => {
  const selectedNode = useSelectedNode();
  const selectedView = useSelectedView();
  const dispatch = useAppDispatch();
  const { targetedNodeStyle } = usePopupSlice();
  const width = removePx(targetedNodeStyle()?.width as string);
  const height = removePx(targetedNodeStyle()?.height as string);

  const handleChangeWidth = (e: ChangeEvent<HTMLInputElement>) => {
    const newWidth = e.target.value + "px";
    dispatch(
      setStyle({
        node: selectedNode,
        view: selectedView,
        style: { width: newWidth },
      })
    );
  };

  const handleChangeHeight = (e: ChangeEvent<HTMLInputElement>) => {
    const newHeight = e.target.value + "px";
    dispatch(
      setStyle({
        node: selectedNode,
        view: selectedView,
        style: { height: newHeight },
      })
    );
  };

  return (
    <div className="flex items-center gap-7 justify-between">
      <CellInput label="W" value={width} onChangeFn={handleChangeWidth} />
      <CellInput label="H" value={height} onChangeFn={handleChangeHeight} />
    </div>
  );
};

export default WidthHeight;
