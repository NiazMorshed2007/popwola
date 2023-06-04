import {
  SupportedNodeTypes,
  selectSelectedNode,
} from "@/redux/slices/nodeSlice";
import { useAppSelector } from "./reduxHooks";

export const useSelectedNode = () => {
  const selectedNode: SupportedNodeTypes = useAppSelector(selectSelectedNode);
  return selectedNode;
};
