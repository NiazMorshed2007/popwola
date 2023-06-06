import React from "react";
import { Layers, FileType, Image } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useSelectedNode } from "@/hooks/selectedNodeHook";
import BasicCell from "@/components/editor/cells/basic/BasicCell";
import TextCell from "@/components/editor/cells/textcell/TextCell";
import ColoringCell from "@/components/editor/cells/coloring/ColoringCell";
import ValueCell from "@/components/editor/cells/value/ValueCell";

const PropertiesSidebar = () => {
  const selectedNode = useSelectedNode();

  const iconRenderer = () => {
    switch (selectedNode) {
      case "bg":
        return <Layers size={14} />;
      case "title":
      case "subtitle":
        return <FileType size={14} />;
      case "image":
        return <Image size={14} />;
      default:
        return null;
    }
  };

  const renderTextCell = () => {
    if (
      selectedNode === "title" ||
      selectedNode === "subtitle" ||
      selectedNode === "button"
    ) {
      return <TextCell />;
    }
    return null;
  };

  return (
    <aside
      className="bg-dark rounded-xl w-[300px] overflow-hidden border border-secondary/10"
      style={{ height: "calc(100vh - 110px)" }}
    >
      <h2 className="border-b bg-foreground capitalize text-primary/60 rounded-tl-xl rounded-tr-xl flex items-center gap-2 border-secondary/5 p-4 py-2 text-sm">
        {iconRenderer()} {selectedNode === "bg" ? "Popup Bg" : selectedNode}
      </h2>
      <div className="py-4 h-full pb-7">
        <ScrollArea className="h-full mb-8">
          {selectedNode !== "bg" && (
            <>
              <ValueCell />
              <BasicCell />
            </>
          )}
          {renderTextCell()}
          {selectedNode !== "image" && <ColoringCell />}
        </ScrollArea>
      </div>
    </aside>
  );
};

export default PropertiesSidebar;
