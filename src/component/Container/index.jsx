import { Breadcrumb, Card, Typography } from "antd";
import React from "react";

function index(props) {
  const { children, title, breadcrumb } = props;

  return (
    <div style={{ margin: "15px" }}>
      <Typography.Title level={3} style={{ paddingBottom: "5px" }}>
        {title}
      </Typography.Title>
      <Breadcrumb
        style={{
          margin: "16px 0",
        }}
        items={breadcrumb}
      />
      {children}
    </div>
  );
}

export default index;
