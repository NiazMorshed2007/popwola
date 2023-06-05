import {
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Collapsible } from "@radix-ui/react-collapsible";
import { ChevronDown } from "lucide-react";
import WeightNSize from "./components/WeightNSize";
import AlignNSpacing from "./components/AlignNSpacing";

const TextCell = () => {
  return (
    <>
      <Collapsible defaultOpen className="border-b border-secondary/10">
        <CollapsibleTrigger
          onChange={(e) => {
            console.log(e);
          }}
          className="text-xs flex items-center justify-between w-full px-4 pb-2 text-secondary/70"
        >
          Text Styles
          <ChevronDown size={14} />
        </CollapsibleTrigger>
        <CollapsibleContent className="px-4 pb-3 flex flex-col gap-5 pt-2">
          <div className="flex items-center justify-between">
            <WeightNSize />
          </div>
          <div className="flex items-center justify-between">
            <AlignNSpacing />
          </div>
        </CollapsibleContent>
      </Collapsible>
    </>
  );
};

export default TextCell;
