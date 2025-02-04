import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Line } from "react-chartjs-2";
import { Card } from "antd";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function LineChart() {
  const { dataTerhitung } = useSelector((state) => state.websocket);
  const [dataChart, setDataChart] = useState([]);
  const dataTerhitungRef = useRef(dataTerhitung);

  useEffect(() => {
    dataTerhitungRef.current = dataTerhitung;
  }, [dataTerhitung]);

  useEffect(() => {
    const interval = setInterval(() => {
      setDataChart((prevData) => {
        const newTime = new Date().toLocaleTimeString();
        const newValue = dataTerhitungRef.current;


        const newData = [...prevData, { time: newTime, value: newValue }];
        return newData.slice(-8);
      });
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const chartData = {
    labels: dataChart.map((entry) => entry.time),
    datasets: [],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      tooltip: {
        mode: "index",
        intersect: false,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Waktu",
        },
      },
      y: {
        title: {
          display: true,
          text: "Jumlah Data",
        },
      },
    },
  };

  const handleChartClick = (event) => {
    console.log("Event", event);
  };

  return (
    <Card
      title="Grafik Real-Time Jumlah Data"
      style={{ width: "600px", marginTop: "20px" }}
      hoverable
    >
      <Line
        data={chartData}
        options={chartOptions}
        height={200}
        onClick={handleChartClick}
      />
    </Card>
  );
}

export default LineChart;
