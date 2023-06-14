import React, { ChangeEvent } from "react";
import CellInput from "../../common/CellInput";
import { setXAxis, setYAxis } from "@/redux/slices/popupSlice";
import { extractTranslateValue } from "@/components/editor/helpers/extractTranslate";
import { usePopupSlice } from "@/hooks/popupSliceHook";
import { useAppDispatch } from "@/hooks/reduxHooks";
import { useSelectedNode } from "@/hooks/selectedNodeHook";
import { useSelectedView } from "@/hooks/selectedViewHook";

const Transform = () => {
  const { targetedNodeStyle } = usePopupSlice();
  const dispatch = useAppDispatch();
  const selectedNode = useSelectedNode();
  const selectedView = useSelectedView();
  const xVal = extractTranslateValue(targetedNodeStyle()?.transform!, "x");
  const yVal = extractTranslateValue(targetedNodeStyle()?.transform!, "y");

  const handleChangeX = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(
      setXAxis({ node: selectedNode, view: selectedView, x: e.target.value })
    );
  };

  const handleChangeY = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(
      setYAxis({ node: selectedNode, view: selectedView, y: e.target.value })
    );
  };

  return (
    <div className="flex items-center gap-7 justify-between">
      <CellInput value={xVal!} onChangeFn={handleChangeX} label="X" />
      <CellInput value={yVal!} onChangeFn={handleChangeY} label="Y" />
    </div>
  );
};

export default Transform;
