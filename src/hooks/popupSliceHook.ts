import {
  PopupSliceInterface,
  selectImageStyle,
  selectPopup,
  selectSubtitleStyle,
  selectTitleStyle,
} from "@/redux/slices/popupSlice";
import { useAppSelector } from "./reduxHooks";
import {
  SupportedNodeTypes,
  selectSelectedNode,
} from "@/redux/slices/nodeSlice";

export const usePopupSlice = () => {
  const popupSlice: PopupSliceInterface = useAppSelector(selectPopup);
  const titleStyle = useAppSelector(selectTitleStyle);
  const subtitleStyle = useAppSelector(selectSubtitleStyle);
  const imageStyle = useAppSelector(selectImageStyle);

  const selectedNode = useAppSelector(selectSelectedNode);

  const targetedNodeParsedStyle = () => {
    if (selectedNode === "title") {
      return titleStyle;
    } else if (selectedNode === "subtitle") {
      return subtitleStyle;
    } else if (selectedNode === "image") {
      return imageStyle;
    }
  };

  return {
    popupSlice,
    titleStyle,
    subtitleStyle,
    imageStyle,
    targetedNodeParsedStyle,
  };
};
