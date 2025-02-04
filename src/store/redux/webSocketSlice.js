import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  connected: false,
  data: [],
  dataTerhitung: 0,
  dataBefore: 0,
  jumlahData: 0,
  listDataTerhitung: [],
  listUser:[],
};

const websocketSlice = createSlice({
  name: "websocket",
  initialState,
  reducers: {
    setConnected: (state, action) => {
      if (state.connected === action.payload) return state;
      return { ...state, connected: action.payload };
    },
    addMessage: (state, action) => {
      state.data.push(action.payload);
    },
    addNewData: (state, action) => {
      state.dataTerhitung.push(action.payload);
    },
    setDataTerhitung: (state, action) => {
      state.jumlahData = action.payload;
    },
    setDataBefore: (state, action) => {
      state.dataBefore = action.payload;
    },
    calculateDataDifference: (state) => {
      const difference = state.data.length - state.dataBefore;
      if (difference > 0) {
        state.dataTerhitung = difference;
      }
    },
    resetDataCount: (state) => {
      state.listDataTerhitung.push(state.dataTerhitung);
      state.dataBefore = state.data.length;
      state.dataTerhitung = 0;
    },
    setUser: (state, action) =>{
      state.listUser=(action.payload)
    }
  },
});

export const {
  setConnected,
  addMessage,
  addNewData,
  setDataTerhitung,
  setDataBefore,
  calculateDataDifference,
  resetDataCount, setUser
} = websocketSlice.actions;
export default websocketSlice.reducer;
