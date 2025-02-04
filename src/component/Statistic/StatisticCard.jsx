import { Card, Col, Row, Statistic } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";

function StatisticCard(props) {
  const { value, label, suffix, prefix, urlPath } = props;
  const navigate = useNavigate();
  const handleCardClick = () => {
    navigate(urlPath);
  };
  return (
    <Card
      style={{ marginBottom: "20px", cursor: "pointer", background:'#fcffe6'}}
      hoverable
      onClick={handleCardClick}
    >
      <Row>
        <Col>
          <Statistic
            title={label}
            value={value}
            suffix={suffix}
            prefix={prefix}
          />
        </Col>
      </Row>
    </Card>
  );
}

export default StatisticCard;
