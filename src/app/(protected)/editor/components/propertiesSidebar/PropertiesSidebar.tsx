"use client";
import { useSelectedNode } from "@/hooks/selectedNodeHook";
import { FileType, Image, Layers } from "lucide-react";
import React from "react";
import ValueCell from "../../../../../components/editor/cells/value/ValueCell";
import BasicCell from "@/components/editor/cells/basic/BasicCell";
import TextCell from "@/components/editor/cells/textcell/TextCell";
import { ScrollArea } from "@/components/ui/scroll-area";

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
    <aside
      style={{
        height: "calc(100vh - 110px)",
      }}
      className="bg-dark rounded-xl pb-6 w-[300px] overflow-hidden border border-secondary/10"
    >
      <h2 className="border-b bg-foreground capitalize text-primary/60 rounded-tl-xl rounded-tr-xl flex items-center gap-2 border-secondary/5 p-4 py-2 text-sm">
        {iconRenderer()} {selectedNode === "bg" ? "Popup Bg" : selectedNode}
      </h2>
      <div className="py-4 h-full pb-7">
        <ScrollArea className="h-full">
          {selectedNode !== "bg" && (
            <>
              <ValueCell />
              <BasicCell />
            </>
          )}
          {selectedNode === "title" || selectedNode === "subtitle" ? (
            <>
              <TextCell />
            </>
          ) : (
            <></>
          )}
        </ScrollArea>
      </div>
    </aside>
  );
};

export default PropertiesSidebar;
