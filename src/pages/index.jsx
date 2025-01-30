import React from "react";
import TableData from "../component/Table/TableData";
import DashboardWithSock from "../component/DashboardWithSock";
import { useSelector } from "react-redux";
import { Col, Row } from "antd";
import ListData from "../component/List/ListData";

function MainDashboard() {
  const { data } = useSelector((state) => state.websocket);
  return (
    <div>
      <DashboardWithSock />
      <Row
        gutter={{
          xs: 8,
          sm: 16,
          md: 24,
          lg: 32,
        }}
      >
        <Col span={16}>
          <TableData data={data} />
        </Col>
        <Col span={8}>
          <ListData data={data} />
        </Col>
      </Row>
    </div>
  );
}

export default MainDashboard;
