import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type SupportedNodeTypes =
  | "title"
  | "subtitle"
  | "image"
  | "bg"
  | "button";

interface NodeInterface {
  id: SupportedNodeTypes;
}

const initialNodeState: NodeInterface = { id: "title" };

export const nodeSlice = createSlice({
  name: "node",
  initialState: initialNodeState,
  reducers: {
    setNode: (state, action: PayloadAction<NodeInterface>) => {
      state.id = action.payload.id;
    },
  },
});

export const { setNode } = nodeSlice.actions;
export const selectSelectedNode = (state: { node: NodeInterface }) =>
  state.node.id;
export default nodeSlice.reducer;
