import {
  AlignCenter,
  AlignHorizontalSpaceAround,
  AlignLeft,
  AlignRight,
} from "lucide-react";
import React, { ChangeEvent } from "react";
import { useAppDispatch } from "@/hooks/reduxHooks";
import { useSelectedNode } from "@/hooks/selectedNodeHook";
import { setStyle } from "@/redux/slices/popupSlice";
import { usePopupSlice } from "@/hooks/popupSliceHook";
import CellInput from "../../common/CellInput";
import { removePx } from "@/components/editor/helpers/removePx";
import { useSelectedView } from "@/hooks/selectedViewHook";

interface AlignmentOption {
  name: "left" | "right" | "center";
  icon: React.ReactNode;
}

const AlignNSpacing = () => {
  const { targetedNodeStyle } = usePopupSlice();
  const dispatch = useAppDispatch();
  const selectedNode = useSelectedNode();
  const selectedView = useSelectedView();

  const alignVal = targetedNodeStyle()?.textAlign;
  const letterSpacingVal = removePx(
    targetedNodeStyle()?.letterSpacing as string
  );

  const alignments: AlignmentOption[] = [
    { name: "left", icon: <AlignLeft size={13} /> },
    { name: "center", icon: <AlignCenter size={13} /> },
    { name: "right", icon: <AlignRight size={13} /> },
  ];

  const handleAlignmentChange = (alignment: AlignmentOption) => {
    dispatch(
      setStyle({
        node: selectedNode,
        view: selectedView,
        style: { textAlign: alignment.name },
      })
    );
  };

  const handleLetterSpacingChange = (e: ChangeEvent<HTMLInputElement>) => {
    const letterSpacing = e.target.value + "px";
    dispatch(
      setStyle({
        node: selectedNode,
        view: selectedView,
        style: { letterSpacing },
      })
    );
  };

  return (
    <>
      <div className="alignments flex gap-3 items-center">
        <div className="flex items-center">
          {alignments.map((alignment) => (
            <div
              key={alignment.name}
              onClick={() => handleAlignmentChange(alignment)}
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
        onChangeFn={handleLetterSpacingChange}
      />
    </>
  );
};

export default AlignNSpacing;
