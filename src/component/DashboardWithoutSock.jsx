import { Client } from "@stomp/stompjs";
import React, { useEffect, useRef, useState } from "react";

const DashboardWithoutSock = () => {
  const [message, setMessage] = useState([]);
  const stompClientRef = useRef(null);

  useEffect(() => {
    const stompClient = new Client({
      brokerURL: "ws://localhost:8080/test",
      reconnectDelay: 0,
      debug: (str) => {
        console.log("Without Sock.JS ", str);
      },
      onConnect: () => {
        console.log("Connected to WebSocket With Sock JS");
        stompClient.subscribe("/topic/greetings", (response) => {
          console.log("Received message:", response.body);
          setMessage(response.body);
        });
      },
      onStompError: (frame) => {
        console.error("Broker reported error: " + frame.headers["message"]);
        console.error("Additional details: " + frame.body);
      },
      onWebSocketClose: () => {
        console.error('WebSocket connection field.');
      },
    });

    stompClient.activate();
    stompClientRef.current = stompClient;

    return () => {
      stompClient.deactivate();
    };
  }, []);

  return (
    <div>
      <h1>STOMP WebSocket Dashboard Without Sock JS</h1>
      <hr />
      <ol>
        {message.map((msg, index) => (
          <li key={index}>{msg}</li>
        ))}
      </ol>
    </div>
  );
};

export default DashboardWithoutSock;
