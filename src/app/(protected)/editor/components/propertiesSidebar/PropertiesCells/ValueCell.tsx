"use client";

import { Textarea } from "@/components/ui/textarea";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { PopupSliceInterface, setTitleValue } from "@/redux/slices/popupSlice";
import React from "react";

const ValueCell = () => {
  const selectedNode: string = useAppSelector((state) => state.node.id);
  const popupSlice: PopupSliceInterface = useAppSelector(
    (state) => state.popup
  );

  const dispatch = useAppDispatch();

  const conditionalValue = (): string => {
    if (selectedNode === "title") return popupSlice.title_value;
    if (selectedNode === "subtitle") return popupSlice.subtitle_value;
    return "";
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (selectedNode === "title") {
      dispatch(setTitleValue(e.target.value));
    }
  };

  return (
    <div className="group-wrapper mb-3">
      <p className="text-xs px-3 mb-2 text-secondary">Value</p>
      <div className="pl-3">
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
