import React from "react";
import { Spin } from "antd";

const Index = () => (
  <div
    style={{
      zIndex: 999,
      position: "absolute",
      left: 0,
      top: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(255,255,255,.7)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <Spin />
  </div>
);

export default Index;
