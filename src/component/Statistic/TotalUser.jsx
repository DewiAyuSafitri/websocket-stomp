import {  Col, Row } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  calculateDataDifference,
  resetDataCount,
  setUser,
} from "../../store/redux/webSocketSlice";
import StatisticCard from "./StatisticCard";
import { UserOutlined } from "@ant-design/icons";

function TotalUser(props) {
  const { data, dataTerhitung } = props;
  const { listDataTerhitung } = useSelector(
    (state) => state.websocket
  );
  const dispatch = useDispatch();
  const [total, setTotal] = useState(0);
  const [uniqueCount, setUniqueCount] = useState(0);
  const [isNaik, setIsNaik] = useState(0);
// console.log("LIST", listUser)
  useEffect(() => {
    const uniqueNames = [...new Set(data.map((item) => item.from))];
    dispatch(setUser(uniqueNames))
    localStorage.setItem('listUser',JSON.stringify(uniqueNames))
    setUniqueCount(uniqueNames.length);
  }, [data]);

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(resetDataCount());
    }, 10000);
    return () => clearInterval(interval);
  }, [dispatch, dataTerhitung]);

  useEffect(() => {
    setTotal(data.length);
    dispatch(calculateDataDifference());
  }, [data.length]);

  useEffect(() => {
    if (listDataTerhitung.length >= 2) {
      const lastValue = Number(listDataTerhitung[listDataTerhitung.length - 1]); // Nilai terakhir
      const secondLastValue = Number(
        listDataTerhitung[listDataTerhitung.length - 2]
      ); // Nilai sebelum terakhir

      if (lastValue > secondLastValue) {
     //    console.log("Nilai terakhir lebih besar");
        setIsNaik(2);
      } else if (lastValue < secondLastValue) {
     //    console.log("Nilai terakhir lebih kecil");
        setIsNaik(1);
      } else {
     //    console.log("Nilai terakhir dan sebelum terakhir sama");
        setIsNaik(0);
      }
    } else {
     //  console.log("Array tidak memiliki cukup elemen untuk dibandingkan.");
    }
  }, [listDataTerhitung]);

//   console.log("Terhitung", dataTerhitung);

  return (
    <Row
      gutter={{
        xs: 8,
        sm: 16,
        md: 24,
        lg: 32,
      }}
    >
      <Col span={8}>
        <StatisticCard label="Total Data" value={total} />
      </Col>
      <Col span={8}>
        <StatisticCard label="Jumlah User" value={uniqueCount} suffix ={<UserOutlined />} urlPath="/detail"/>
      </Col>
      <Col span={8}>
        <StatisticCard label="Update Terbaru" value={dataTerhitung} />
      </Col>
    </Row>
  );
}

export default TotalUser;
