import { selectSelectedNode } from "@/redux/slices/nodeSlice";
import { PopupSliceInterface } from "@/redux/slices/popupSlice";
import {
  SupportedResponsiveViews,
  selectSelectedViews,
} from "@/redux/slices/responsiveSlice";
import { useAppSelector } from "./reduxHooks";

type SelectedNode = "title" | "subtitle" | "image" | "button" | "bg";

export const usePopupSlice = () => {
  const selectedNode: SelectedNode = useAppSelector(selectSelectedNode);
  const selectedView: SupportedResponsiveViews =
    useAppSelector(selectSelectedViews);

  const popupSlice: PopupSliceInterface = useAppSelector(
    (state) => state.popup
  );
  const titleStyle: any = useAppSelector((state) => {
    return state.popup[
      `title_style${
        selectedView === "desktop" ? "" : "_" + selectedView
      }` as keyof PopupSliceInterface
    ]!;
  });
  const subtitleStyle: any = useAppSelector((state) => {
    return state.popup[
      `subtitle_style${
        selectedView === "desktop" ? "" : "_" + selectedView
      }` as keyof PopupSliceInterface
    ]!;
  });
  const imageStyle: any = useAppSelector((state) => {
    return state.popup[
      `image_style${
        selectedView === "desktop" ? "" : "_" + selectedView
      }` as keyof PopupSliceInterface
    ]!;
  });
  const bgStyle: any = useAppSelector((state) => {
    return state.popup[
      `bg${
        selectedView === "desktop" ? "" : "_" + selectedView
      }` as keyof PopupSliceInterface
    ]!;
  });
  const buttonStyle: any = useAppSelector((state) => {
    return state.popup[
      `button_style${
        selectedView === "desktop" ? "" : "_" + selectedView
      }` as keyof PopupSliceInterface
    ]!;
  });

  const targetedNodeStyle = () => {
    switch (selectedNode) {
      case "title":
        return titleStyle;
      case "subtitle":
        return subtitleStyle;
      case "image":
        return imageStyle;
      case "button":
        return buttonStyle;
      case "bg":
        return bgStyle;
      default:
        return null;
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
