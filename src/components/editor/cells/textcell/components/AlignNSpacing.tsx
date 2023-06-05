import { usePopupSlice } from "@/hooks/popupSliceHook";
import { useAppDispatch } from "@/hooks/reduxHooks";
import { useSelectedNode } from "@/hooks/selectedNodeHook";
import { setStyle } from "@/redux/slices/popupSlice";
import {
  AlignCenter,
  AlignHorizontalSpaceAround,
  AlignLeft,
  AlignRight,
} from "lucide-react";
import React from "react";
import CellInput from "../../common/CellInput";
import { removePx } from "@/components/editor/helpers/removePx";

const AlignNSpacing = () => {
  const { targetedNodeStyle } = usePopupSlice();
  const dispatch = useAppDispatch();
  const selectedNode = useSelectedNode();

  const alignVal = targetedNodeStyle()?.textAlign;
  const letterSpacingVal = removePx(
    targetedNodeStyle()?.letterSpacing! as string
  );

  const alignments: {
    name: "left" | "right" | "center";
    icon: React.ReactNode;
  }[] = [
    { name: "left", icon: <AlignLeft size={13} /> },
    { name: "center", icon: <AlignCenter size={13} /> },
    { name: "right", icon: <AlignRight size={13} /> },
  ];
  return (
    <>
      <div className="alignments flex gap-3 items-center">
        {/* <p className="text-xs">Align</p> */}
        <div className="flex items-center">
          {alignments.map((alignment) => (
            <div
              onClick={() => {
                dispatch(
                  setStyle({
                    node: selectedNode,
                    style: { textAlign: alignment.name },
                  })
                );
              }}
              key={alignment.name}
              className={`alignment rounded-md ${
                alignVal === alignment.name &&
                "bg-foreground border-secondary/10"
              } hover:bg-foreground border border-transparent hover:border-secondary/10 cursor-pointer flex items-center justify-center w-[30px] h-[30px]`}
            >
              {alignment.icon}
            </div>
          ))}
        </div>
      </div>

      <CellInput
        label={<AlignHorizontalSpaceAround size={14} />}
        value={letterSpacingVal}
        onChangeFn={(e) => {
          dispatch(
            setStyle({
              node: selectedNode,
              style: { letterSpacing: e.target.value + "px" },
            })
          );
        }}
      />
    </>
  );
};

export default AlignNSpacing;
