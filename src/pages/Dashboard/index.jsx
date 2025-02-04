import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, Col, Row } from "antd";
import Container from "../../component/Container";
import TotalUser from "../../component/Statistic/TotalUser";
import TableData from "../../component/Table/TableData";
import LineChart from "../../component/Chart/LineChart";
import ListData from "../../component/List/ListData";

function MainDashboard() {
  const dispatch = useDispatch();
  const { data, dataTerhitung } = useSelector((state) => state.websocket);

  useEffect(() => {
    console.log("Connecting WebSocket");
    dispatch({ type: "websocket/connect" });

    return () => {
      console.log("Disconnecting WebSocket");
      dispatch({ type: "websocket/disconnect" });
    };
  }, []);

  return (
    <Container title="Dashboard" >
      <Card>
        <TotalUser data={data} dataTerhitung={dataTerhitung} />
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
        <Row>
          <Col>
            <LineChart />
          </Col>
        </Row>
      </Card>
    </Container>
  );
}

export default MainDashboard;
