import { Breadcrumb, Card } from "antd";
import React from "react";
import Container from "../../component/Container";
import { Link } from "react-router-dom";

function Detail() {
  const list = JSON.parse(localStorage.getItem("listUser"));
  console.log("LIST", list);
  return (
    <Container
      title="Detail"
      breadcrumb={[
        { title: <Link to="/">Dashboard</Link> },
        { title: <Link to="/detail">Detail</Link> },
      ]}
    >
      <ol>
        {list.map((item) => (
          <li>{item}</li>
        ))}
      </ol>
    </Container>
  );
}

export default Detail;
