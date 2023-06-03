"use client";
import { useAppSelector } from "@/hooks/reduxHooks";
import { Image } from "lucide-react";
import { FileType, Layers } from "lucide-react";
import React from "react";
import ValueCell from "./PropertiesCells/ValueCell";

const PropertiesSidebar = () => {
  const selectedNode: string = useAppSelector((state) => state.node.id);

  const iconRenderer = (): React.ReactNode => {
    if (selectedNode === "bg") return <Layers size={14} />;
    if (
      selectedNode === "title" ||
      selectedNode === "subtitle" ||
      selectedNode === "description"
    )
      return <FileType size={14} />;
    if (selectedNode === "image") return <Image size={14} />;
  };

  return (
    <aside className="bg-dark rounded-xl w-[300px] h-full border border-secondary/10">
      <h2 className="border-b bg-foreground capitalize text-primary/60 rounded-tl-xl rounded-tr-xl flex items-center gap-2 border-secondary/5 p-4 py-2 text-sm">
        {iconRenderer()} {selectedNode === "bg" ? "Popup Bg" : selectedNode}
      </h2>
      <div className="py-4">
        <ValueCell />
      </div>
    </aside>
  );
};

export default PropertiesSidebar;
