import { configureStore } from "@reduxjs/toolkit";
import websocketReducer from "./redux/webSocketSlice";
import webSocketMiddleware from "./middleware/webSocketMiddleware";

const store = configureStore({
  reducer: {
    websocket: websocketReducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(webSocketMiddleware),
});

export default store;
