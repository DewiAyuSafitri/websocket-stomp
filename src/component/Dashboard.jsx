import React, { useState, useEffect, useRef } from "react";
import SockJS from 'sockjs-client';
import { Client } from "@stomp/stompjs";

const Dashboard = () => {
  const [message, setMessage] = useState([]);
  const stompClientRef = useRef(null);

  useEffect(() => {
    const socket = new SockJS('http://localhost:8080/ws');
    const stompClient = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,
      debug: (str) => {
        console.log("TEST ", str);
      },
      onConnect: () => {
        console.log("Connected to WebSocket");
        stompClient.subscribe("/topic/greetings", (response) => {
          console.log("Received message:", response.body);
          setMessage(JSON.parse(response.body).content);
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

  return (
    <div>
      <h1>STOMP WebSocket Dashboard </h1>
      <hr />
      <ol>
        {message.map((msg, index) => (
          <li key={index}>{msg}</li>
        ))}
      </ol>
    </div>
  );
};

export default Dashboard;
