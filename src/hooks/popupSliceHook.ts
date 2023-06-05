import { selectSelectedNode } from "@/redux/slices/nodeSlice";
import {
  PopupSliceInterface,
  selectBg,
  selectButtonStyle,
  selectImageStyle,
  selectSubtitleStyle,
  selectTitleStyle,
} from "@/redux/slices/popupSlice";
import { useAppSelector } from "./reduxHooks";

export const usePopupSlice = () => {
  const popupSlice: PopupSliceInterface = useAppSelector(
    (state) => state.popup
  );
  const titleStyle = useAppSelector(selectTitleStyle);
  const subtitleStyle = useAppSelector(selectSubtitleStyle);
  const imageStyle = useAppSelector(selectImageStyle);
  const bgStyle = useAppSelector(selectBg);
  const buttonStyle = useAppSelector(selectButtonStyle);

  const selectedNode = useAppSelector(selectSelectedNode);

  const targetedNodeStyle = () => {
    if (selectedNode === "title") {
      return titleStyle;
    } else if (selectedNode === "subtitle") {
      return subtitleStyle;
    } else if (selectedNode === "image") {
      return imageStyle;
    } else if (selectedNode === "button") {
      return buttonStyle;
    } else if (selectedNode === "bg") {
      return bgStyle;
    }
  };

  return {
    popupSlice,
    titleStyle,
    subtitleStyle,
    imageStyle,
    bgStyle,
    buttonStyle,
    targetedNodeStyle,
  };
};
