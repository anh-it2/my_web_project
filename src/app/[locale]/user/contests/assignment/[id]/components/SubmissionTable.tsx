import { Submission, submissions } from "@/data/mock";
import { ReloadOutlined } from "@ant-design/icons";
import { Button, Checkbox, Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import Link from "next/link";
import { useState } from "react";
import "../../.././style.scss";

export default function SubmissionTable() {
  const [data, setData] = useState<Submission[]>(submissions);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(5);

  const fetchData = () => {
    setLoading(true);
    // fake fetch
    setTimeout(() => {
      setData(submissions);
      setLoading(false);
    }, 500);
  };

  const columns: ColumnsType<Submission> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: (text: string) => (
        <Link
          href="/user/contests/test-case/1"
          className="text-blue-600 hover:underline"
        >
          {text}
        </Link>
      ),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        if (status === "Hoàn thành") {
          return <Tag color="green">Accepted</Tag>;
        }
        return <Tag color="orange">Partial</Tag>;
      },
    },
    {
      title: "Điểm",
      dataIndex: "score",
      key: "score",
      render: (score) => (score !== null ? score : "--"),
    },
    {
      title: "Đạt",
      key: "passed",
      render: (_, record) =>
        record.score !== null ? (
          <span>{record.passed ? "6 / 6" : "5 / 6"}</span>
        ) : (
          "--"
        ),
    },
    {
      title: "Ngôn ngữ",
      dataIndex: "language",
      key: "language",
    },
    {
      title: "Thời gian tạo",
      dataIndex: "createdAt",
      key: "createdAt",
    },
    {
      title: "Bài nộp cuối",
      key: "last",
      align: "center",
      render: (_, record) => (
        <Checkbox
          checked={record.isFinal}
          onChange={() => {
            setData((prev) =>
              prev.map((item) => ({
                ...item,
                isFinal: item.id === record.id, // ⭐ chỉ 1 cái true
              }))
            );
          }}
        />
      ),
    },
  ];

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 16,
        }}
      >
        <h3 style={{ margin: 0 }}>Bài nộp</h3>
        <Button
          type="primary"
          icon={<ReloadOutlined />}
          onClick={fetchData}
          loading={loading}
          className="!shadow-none"
        >
          Làm mới
        </Button>
      </div>

      <Table
        dataSource={data}
        columns={columns}
        className="custom__table"
        pagination={{
          current: page,
          pageSizeOptions: ["5", "10", "20", "50"],
          total: data.length,
          showSizeChanger: true,
          onChange: (page, pageSize) => {
            setPage(page);
            setPageSize(pageSize);
          },
        }}
      />
    </div>
  );
}
