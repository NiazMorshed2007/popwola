"use client";
import { useSelectedNode } from "@/hooks/selectedNodeHook";
import { FileType, Image, Layers } from "lucide-react";
import React from "react";
import ValueCell from "../../../../../components/editor/cells/value/ValueCell";
import BasicCell from "@/components/editor/cells/basic/BasicCell";

const PropertiesSidebar = () => {
  const selectedNode = useSelectedNode();

  const iconRenderer = (): React.ReactNode => {
    switch (selectedNode) {
      case "bg":
        return <Layers size={14} />;
      case "title":
      case "subtitle":
        // case "description":
        return <FileType size={14} />;
      case "image":
        return <Image size={14} />;
      default:
        return null;
    }
  };

  return (
    <aside className="bg-dark rounded-xl w-[300px] h-full border border-secondary/10">
      <h2 className="border-b bg-foreground capitalize text-primary/60 rounded-tl-xl rounded-tr-xl flex items-center gap-2 border-secondary/5 p-4 py-2 text-sm">
        {iconRenderer()} {selectedNode === "bg" ? "Popup Bg" : selectedNode}
      </h2>
      <div className="py-4">
        <ValueCell />
        <BasicCell />
      </div>
    </aside>
  );
};

export default PropertiesSidebar;
