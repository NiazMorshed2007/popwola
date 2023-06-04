"use client";

import { Textarea } from "@/components/ui/textarea";
import { usePopupSlice } from "@/hooks/popupSliceHook";
import { useAppDispatch } from "@/hooks/reduxHooks";
import { useSelectedNode } from "@/hooks/selectedNodeHook";
import { setValue } from "@/redux/slices/popupSlice";
import React from "react";

const ValueCell = () => {
  const selectedNode = useSelectedNode();
  const { popupSlice } = usePopupSlice();

  const dispatch = useAppDispatch();

  const conditionalValue = (): string => {
    switch (selectedNode) {
      case "title":
        return popupSlice.title_value;
      case "subtitle":
        return popupSlice.subtitle_value;
      default:
        return "";
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch(setValue({ node: selectedNode, value: e.target.value }));
  };

  return (
    <div className="group-wrapper mb-3 px-3 pb-3 border-b border-secondary/10">
      <p className="text-xs mb-2 text-secondary">Value</p>
      <div>
        <Textarea
          value={conditionalValue()}
          onChange={handleChange}
          placeholder="Enter value..."
        />
      </div>
    </div>
  );
};

export default ValueCell;
