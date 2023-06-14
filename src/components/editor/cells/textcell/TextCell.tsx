import {
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Collapsible } from "@radix-ui/react-collapsible";
import AlignNSpacing from "./components/AlignNSpacing";
import WeightNSize from "./components/WeightNSize";

const TextCell = () => {
  return (
    <>
      {/* add collapsible option if too many properties */}
      <Collapsible open className="border-b border-secondary/10">
        <CollapsibleTrigger className="text-xs px-4 pb-2 text-secondary/70">
          Text Styles
        </CollapsibleTrigger>
        <CollapsibleContent className="px-4 pb-3 flex flex-col gap-5 pt-2">
          <div className="flex items-center gap-7 justify-between">
            <WeightNSize />
          </div>
          <div className="flex items-center gap-6 justify-between">
            <AlignNSpacing />
          </div>
        </CollapsibleContent>
      </Collapsible>
    </>
  );
};

export default TextCell;
