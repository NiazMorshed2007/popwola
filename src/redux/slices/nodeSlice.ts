import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface NodeInterface {
  id: string;
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
export const selectNode = (state: { node: NodeInterface }) => state.node.id;
export default nodeSlice.reducer;
