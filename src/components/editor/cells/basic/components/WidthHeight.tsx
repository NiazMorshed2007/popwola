import { usePopupSlice } from "@/hooks/popupSliceHook";
import React from "react";
import CellInput from "../../common/CellInput";
import { removePx } from "@/components/editor/helpers/removePx";
import { useAppDispatch } from "@/hooks/reduxHooks";
import { setStyle } from "@/redux/slices/popupSlice";
import { useSelectedNode } from "@/hooks/selectedNodeHook";

const WidthHeight = () => {
  const { targetedNodeStyle } = usePopupSlice();
  const selectedNode = useSelectedNode();
  const dispatch = useAppDispatch();
  const width = removePx(targetedNodeStyle()?.width! as string);
  const height = removePx(targetedNodeStyle()?.height! as string);
  return (
    <>
      <CellInput
        label="W"
        value={width}
        onChangeFn={(e) => {
          dispatch(
            setStyle({
              node: selectedNode,
              style: { width: e.target.value + "px" },
            })
          );
        }}
      />
      <CellInput
        label="H"
        value={height}
        onChangeFn={(e) => {
          dispatch(
            setStyle({
              node: selectedNode,
              style: { height: e.target.value + "px" },
            })
          );
        }}
      />
    </>
  );
};

export default WidthHeight;
