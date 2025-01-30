import { configureStore } from "@reduxjs/toolkit";
import websocketReducer from "./redux/webSocketSlice";

const store = configureStore({
  reducer: {
    websocket: websocketReducer,
  },
});

export default store;
