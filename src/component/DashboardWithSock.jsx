import React, { useEffect, useRef } from "react";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import { useDispatch } from "react-redux";
import { addMessage } from "../store/redux/webSocketSlice";

const DashboardWithSock = () => {
  const stompClientRef = useRef(null);

  const dispatch = useDispatch();
  useEffect(() => {
    const socket = new SockJS("http://localhost:61613/collector-websocket");
    const stompClient = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,
      debug: (str) => {
        console.log("TEST Sock.JS ", str);
      },
      onConnect: () => {
        console.log("Connected to WebSocket");
        stompClient.subscribe("/topic/messages", (response) => {
          console.log("Received Message:", response.body);
          const newData = JSON.parse(response.body);
          console.log("New Data", newData);
          dispatch(addMessage(newData));
          // setMessage((prevMessages) => [...prevMessages, newData]);
        });
      },
      onStompError: (frame) => {
        console.error("Broker reported error: " + frame.headers["message"]);
        console.error("Additional details: " + frame.body);
      },
    });

    stompClient.activate();
    stompClientRef.current = stompClient;

    return () => {
      stompClient.deactivate();
    };
  }, []);

  return <></>;
};

export default DashboardWithSock;
