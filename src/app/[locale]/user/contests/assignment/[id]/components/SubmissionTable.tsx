/* eslint-disable react-hooks/set-state-in-effect */
import useLoadingStore from "@/app/store/loadingStore";
import useGetListSubmission from "@/hook/submission/useGetListSubmission";
import { Submission } from "@/services/rest/submission/type";
import { ReloadOutlined } from "@ant-design/icons";
import { Button, Checkbox, Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import "../../.././style.scss";

export default function SubmissionTable({problemId}: {problemId: string}) {
  const [data, setData] = useState<Submission[]>([]);
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(5);
  const router = useRouter();
  const startLoading = useLoadingStore((state) => state.startLoading);

  console.log(pageSize);

  const { listSubmission, refetch } = useGetListSubmission(problemId);

  useEffect(() => {
    if (!listSubmission) return;

    setData(listSubmission);
  }, [listSubmission]);

  const columns: ColumnsType<Submission> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: (text: string) => (
        <span className="text-blue-600 hover:underline cursor-pointer">
          {text}
        </span>
      ),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        if (status === "Accepted") {
          return <Tag color="green">Accepted</Tag>;
        } else if (status === "Wrong Answer") {
          return <Tag color="red">Wrong Answer</Tag>;
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
        record.per_test_results !== null ? (
          <span>
            {
              record.per_test_results.filter(
                (item) => item.status === "Accepted"
              ).length
            }{" "}
            / {record.per_test_results.length}
          </span>
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
      dataIndex: "created_at",
      key: "created_at",
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
          onClick={() => refetch()}
          className="!shadow-none"
        >
          Làm mới
        </Button>
      </div>

      <Table
        dataSource={data}
        columns={columns}
        className="custom__table"
        onRow={(record) => ({
          onClick: () => {
            startLoading();
            router.push(`/user/contests/test-case/${record.id}`);
          },
        })}
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
