import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import ColorPicker from "./components/ColorPicker";
import BackgroundColorPicker from "./components/BackgroundColorPicker";
import { useSelectedNode } from "@/hooks/selectedNodeHook";

const ColoringCell = () => {
  const selectedNode = useSelectedNode();

  const renderBackgroundColorPicker = () => {
    if (selectedNode === "bg" || selectedNode === "button") {
      return <BackgroundColorPicker />;
    }
  };

  return (
    <Collapsible open className="border-b border-secondary/10">
      <CollapsibleTrigger className="text-xs flex items-center justify-between w-full px-4 py-4 text-secondary/70">
        Coloring
      </CollapsibleTrigger>
      <CollapsibleContent className="px-4">
        <div className="relative w-full">
          {selectedNode !== "bg" && <ColorPicker />}
          {renderBackgroundColorPicker()}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default ColoringCell;
