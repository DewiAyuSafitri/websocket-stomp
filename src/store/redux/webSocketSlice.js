import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
};

const websocketSlice = createSlice({
  name: "websocket",
  initialState,
  reducers: {
    addMessage: (state, action) => {
      state.data.push(action.payload);
    },
  },
});

export const { addMessage } = websocketSlice.actions;
export default websocketSlice.reducer;
