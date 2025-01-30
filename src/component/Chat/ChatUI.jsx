import React, { useState } from "react";
import { Input, Button, List, Avatar } from "antd";
import { useSelector } from "react-redux";

const ChatUI = () => {
  const { data } = useSelector((state) => state.websocket);

  const [messages, setMessages] = useState(data || []);
  const [inputValue, setInputValue] = useState("");

  const handleSend = () => {
    if (inputValue.trim()) {
      setMessages([...messages, { text: inputValue, from: "You" }]);
      setInputValue("");
    }
  };

  return (
    <div
      style={{
        maxWidth: 400,
        margin: "auto",
        padding: 20,
        border: "1px solid #ddd",
        borderRadius: 10,
      }}
    >
      <List
        itemLayout="horizontal"
        dataSource={data}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar>{item.from[0]}</Avatar>}
              title={item.from}
              description={item.text}
            />
          </List.Item>
        )}
        style={{ maxHeight: 300, overflowY: "auto" }}
      />
      <div style={{ display: "flex", marginTop: 10 }}>
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Type a message..."
        />
        <Button type="primary" onClick={handleSend} style={{ marginLeft: 10 }}>
          Send
        </Button>
      </div>
    </div>
  );
};

export default ChatUI;
