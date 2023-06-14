import { removePx } from "@/components/editor/helpers/removePx";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePopupSlice } from "@/hooks/popupSliceHook";
import { useAppDispatch } from "@/hooks/reduxHooks";
import { useSelectedNode } from "@/hooks/selectedNodeHook";
import { setStyle } from "@/redux/slices/popupSlice";
import CellInput from "../../common/CellInput";
import { useSelectedView } from "@/hooks/selectedViewHook";

const WeightNSize = () => {
  const { targetedNodeStyle } = usePopupSlice();
  const selectedNode = useSelectedNode();
  const selectedView = useSelectedView();
  const dispatch = useAppDispatch();
  const fontWeight = targetedNodeStyle()?.fontWeight as string;
  const fontSize = removePx(targetedNodeStyle()?.fontSize?.toString() || "");

  const handleFontWeightChange = (e: string) => {
    dispatch(
      setStyle({
        node: selectedNode,
        view: selectedView,
        style: { fontWeight: e },
      })
    );
  };

  const handleFontSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fontSizeValue = e.target.value + "px";
    dispatch(
      setStyle({
        node: selectedNode,
        view: selectedView,
        style: { fontSize: fontSizeValue },
      })
    );
  };

  return (
    <>
      <Select defaultValue={fontWeight} onValueChange={handleFontWeightChange}>
        <SelectTrigger className="w-[120px]">
          <SelectValue
            style={{
              fontSize: "10px",
            }}
            placeholder={<span className="text-secondary text-xs">Yes/No</span>}
          />
        </SelectTrigger>
        <SelectContent className="text-xs">
          <SelectItem value="100">Thin</SelectItem>
          <SelectItem value="200">Extralight</SelectItem>
          <SelectItem value="300">Light</SelectItem>
          <SelectItem value="400">Medium</SelectItem>
          <SelectItem value="500">Semibold</SelectItem>
          <SelectItem value="600">Bold</SelectItem>
        </SelectContent>
      </Select>
      <CellInput
        label="Size"
        value={fontSize}
        onChangeFn={handleFontSizeChange}
      />
    </>
  );
};

export default WeightNSize;
