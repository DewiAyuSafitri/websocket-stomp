import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { addMessage, setConnected } from "../redux/webSocketSlice";
import { SUBSCRIBE_PATH, URL_WEBSOCKET } from "../../constant";

let stompClient = null;

const webSocketMiddleware = (store) => (next) => (action) => {
  switch (action.type) {
    case "websocket/connect":
      if (stompClient?.connected) return;

      const socket = new SockJS(URL_WEBSOCKET);
      stompClient = new Client({
        webSocketFactory: () => socket,
        reconnectDelay: 5000,
        onConnect: () => {
          console.log("Connected to WebSocket");
          store.dispatch(setConnected(true));

          stompClient.subscribe(SUBSCRIBE_PATH, (message) => {
            store.dispatch(addMessage(JSON.parse(message.body)));
          });
          
        },
        
      });

      stompClient.activate();
      break;

    case "websocket/disconnect":
      if (stompClient) {
        stompClient.deactivate();
        store.dispatch(setConnected(false));
        stompClient = null;
      }
      break;
    case "websocket/sendMessage":
      if (stompClient?.connected) {
        stompClient.publish({
          destination: "/app/sendMessage",
          body: JSON.stringify(action.payload),
        });
      }
      break;
    default:
      break;
  }
  return next(action);
};

export default webSocketMiddleware;
