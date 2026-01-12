/* eslint-disable react-hooks/set-state-in-effect */
import useLoadingStore from "@/app/store/loadingStore";
import CommonTable from "@/components/table/CommonTable";
import useGetListSubmission from "@/hook/submission/useGetListSubmission";
import { useRouter } from "@/libs/routing";
import { Submission } from "@/services/rest/submission/get-list-submission/type";
import { ReloadOutlined } from "@ant-design/icons";
import { Button, Checkbox, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";
import "../../.././style.scss";

export default function SubmissionTable({problemId}: {problemId: string}) {
  const [data, setData] = useState<Submission[]>([]);
  const router = useRouter();
  

  const { listSubmission, refetch, handleFilterChange } = useGetListSubmission(problemId);
  const startLoading = useLoadingStore((state) => state.startLoading)
  const stopLoading = useLoadingStore((state) => state.stopLoading)

  useEffect(() => {
    if (!listSubmission) return;

    setData(listSubmission.content);
  }, [listSubmission]);

  const columns: ColumnsType<Submission> = [
    {
      title: "ID",
      dataIndex: "submissionId",
      key: "submissionId",
      render: (text: string) => (
        <span className="text-blue-600 hover:underline cursor-pointer" onClick={() => router.push(`/user/contests/test-case/${text}/${problemId}`)}>
          {text}
        </span>
      ),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        if (status === "ACCEPTED") {
          return <Tag color="green">{status}</Tag>;
        } else if (status === "WRONG_ANSWER" || status === "RUNTIME_ERROR") {
          return <Tag color="red">{status}</Tag>;
        }
        return <Tag color="orange">{status}</Tag>;
      },
    },
    {
      title: "Số Test case đạt",
      dataIndex: "passedTestcases",
      key: "passedTestcases",
      render: (passedTestcases) => (passedTestcases !== null ? passedTestcases : "--"),
    },
     {
      title: "Tổng Test case",
      dataIndex: "totalTestcases",
      key: "totalTestcases",
      render: (totalTestcases) => (totalTestcases !== null ? totalTestcases : "--"),
    },
    {
      title: "Ngôn ngữ",
      dataIndex: "language",
      key: "language",
      render: (language) => (language ? language : "C++"),
    },
    {
      title: "Thời gian chạy",
      dataIndex: "executionTime",
      key: "executionTime",
      render: (executionTime) => (executionTime !== null ? executionTime.toFixed(2) : "--"),
    },
    {
      title: "Memory sử dụng",
      dataIndex: "memoryUsed",
      key: "memoryUsed",
      render: (memoryUsed) => (memoryUsed !== null ? memoryUsed : "--"),
    },
    {
      title: "Bài nộp cuối",
      key: "last",
      align: "center",
      render: (_, record) => (
        <Checkbox
          checked={record.selected}
          onChange={() => {
            setData((prev) =>
              prev.map((item) => ({
                ...item,
                selected: item.submissionId === record.submissionId, // ⭐ chỉ 1 cái true
              }))
            );
          }}
        />
      ),
    },
  ];

  console.log(listSubmission)

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
          onClick={async () => {
            startLoading()
            await refetch()
            stopLoading()
          }}
          className="!shadow-none"
        >
          Làm mới
        </Button>
      </div>

      <CommonTable dataSource={data} columns={columns} totalElements={listSubmission?.totalElements || 0} handlePageChange={handleFilterChange}/>
    </div>
  );
}
