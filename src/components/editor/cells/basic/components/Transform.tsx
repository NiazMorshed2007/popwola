import React from "react";
import CellInput from "../../common/CellInput";
import { setXAxis, setYAxis } from "@/redux/slices/popupSlice";
import { extractTranslateValue } from "@/components/editor/helpers/extractTranslate";
import { useSelectedNode } from "@/hooks/selectedNodeHook";
import { useAppDispatch } from "@/hooks/reduxHooks";
import { usePopupSlice } from "@/hooks/popupSliceHook";

const Transform = () => {
  const { targetedNodeStyle } = usePopupSlice();
  const dispatch = useAppDispatch();
  const selectedNode = useSelectedNode();
  const xVal = extractTranslateValue(targetedNodeStyle()?.transform!, "x");
  const yVal = extractTranslateValue(targetedNodeStyle()?.transform!, "y");

  return (
    <>
      <CellInput
        value={xVal!}
        onChangeFn={(e) => {
          dispatch(setXAxis({ node: selectedNode, x: e.target.value }));
        }}
        label="X"
      />
      <CellInput
        value={yVal!}
        label="Y"
        onChangeFn={(e) => {
          dispatch(setYAxis({ node: selectedNode, y: e.target.value }));
        }}
      />
    </>
  );
};

export default Transform;
