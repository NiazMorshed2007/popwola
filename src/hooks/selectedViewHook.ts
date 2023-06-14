import {
  SupportedResponsiveViews,
  selectSelectedViews,
} from "@/redux/slices/responsiveSlice";
import { useAppSelector } from "./reduxHooks";

export const useSelectedView = () => {
  const selectedView: SupportedResponsiveViews =
    useAppSelector(selectSelectedViews);
  return selectedView;
};
