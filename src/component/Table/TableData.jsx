import { Card, Table } from "antd";
import "./style.css";
import React, { useState } from "react";

function TableData(props) {
  const { data } = props;

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10); // Tambahkan state untuk pageSize

  const column = [
    {
      title: "No",
      dataIndex: "no",
      width: "70px",
      render: (_, __, index) => (currentPage - 1) * pageSize + index + 1,
    },
    { title: "Nama", dataIndex: "from", key: "from" },
    { title: "Pesan", dataIndex: "text", key: "text" },
  ];

  return (
    <Card title="Dashboard" hoverable>
      <Table
        className="custom-header"
        columns={column}
        dataSource={data}
        pagination={{
          current: currentPage,
          pageSize,
          showSizeChanger: true, // Menampilkan opsi untuk mengubah pageSize
          pageSizeOptions: ["10", "20", "50", "100"], // Opsi jumlah item per halaman
          onShowSizeChange: (_, size) => setPageSize(size), // Update pageSize saat diubah
          onChange: (page) => setCurrentPage(page), // Update halaman saat berubah
        }}
      />
    </Card>
  );
}

export default TableData;
