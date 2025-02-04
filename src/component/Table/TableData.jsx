import { Card, Table } from "antd";
import "./style.css";
import React, { useEffect, useState } from "react";
import moment from "moment";

function TableData(props) {
  const { data } = props;

  const [currentPage, setCurrentPage] = useState(1);

  const [pageSize, setPageSize] = useState(10);
  const [sortedData, setSortedData] = useState([]);
  const column = [
    {
      title: "No",
      dataIndex: "no",
      width: "70px",
      render: (_, __, index) => (currentPage - 1) * pageSize + index + 1,
    },
    { title: "Nama", dataIndex: "from", key: "from" },
    { title: "Pesan", dataIndex: "text", key: "text" },
    { title: "Waktu", dataIndex: "time", key: "time" },
  ];

  useEffect(() => {
    if (data?.length) {
      const sorted = [...data].sort(
        (a, b) =>
          moment(b.time, "HH:mm:ss").seconds() -
          moment(a.time, "HH:mm:ss").seconds()
      );
      setSortedData(sorted);
    }
  }, [data]);

  return (
    <Card title="Dashboard" hoverable>
      <Table
        className="custom-header"
        columns={column}
        dataSource={sortedData}
        rowKey="name"
        pagination={{
          current: currentPage,
          pageSize,
          showSizeChanger: true,
          pageSizeOptions: ["10", "20", "50", "100"],
          onShowSizeChange: (_, size) => setPageSize(size),
          onChange: (page) => setCurrentPage(page),
        }}
      />
    </Card>
  );
}

export default TableData;
