import RouteLoading from "@/components/shared/RouteLoading";
import { useListActiveProblem } from "@/hook/problem/useListActiveProblem";
import { ActiveProblem } from "@/services/rest/problem/get-all-active-problem/type";
import { SearchOutlined } from "@ant-design/icons";
import { Card, Input, Table, Tag } from "antd";
import { ColumnsType } from "antd/es/table";
import Link from "next/link";
import { useState } from "react";
import "../../../style.scss";

export default function AssignmentTab() {
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(5);
  const [searchValue, setSearchValue] = useState<string>("");
  // const [currentScore, setCurrentScore] = useState<number>(0);
  // const [maxScore, setMaxScore] = useState<number>(0);

  console.log(pageSize);

  const { activeProblem } = useListActiveProblem();

  const exerciseTableColumns: ColumnsType<ActiveProblem> = [
    {
      title: "Bài tập",
      dataIndex: "problemId",
      key: "problemId",
      align: "center",
      sorter: (a: ActiveProblem, b: ActiveProblem) => a.problemId - b.problemId,
      render: (text: string, record: ActiveProblem) => (
        <Link
          href={`/user/contests/assignment/${record.problemId}`}
          className="text-blue-600 hover:underline"
        >
          {text}
        </Link>
      ),
    },
    {
      title: "Mã bài tập",
      dataIndex: "problemCode",
      key: "problemCode",
      align: "center",
      sorter: (a: ActiveProblem, b: ActiveProblem) =>
        a.problemCode.localeCompare(b.problemCode),
      render: (text: string, record: ActiveProblem) => {
        return (
          <Link
            href={`/user/contests/assignment/${record.problemId}`}
            className="text-blue-600 hover:underline"
          >
            {text}
          </Link>
        );
      },
    },
    {
      title: "Mức độ",
      dataIndex: "difficultyLevel",
      key: "difficultyLevel",
      align: "center",
      sorter: (a: ActiveProblem, b: ActiveProblem) =>
        a.difficultyLevel.localeCompare(b.difficultyLevel),
      render: (level: string) => {
        let color: string;

        switch (level) {
          case "EASY":
            color = "green";
            break;
          case "MEDIUM":
            color = "orange";
            break;
          case "HARD":
            color = "red";
            break;
          default:
            color = "default";
        }

        return (
          <Tag color={color}>
            <span className="text-sm font-medium rounded">{level}</span>
          </Tag>
        );
      },
    },
    {
      title: "Điểm tối đa",
      dataIndex: "maxScore",
      align: "center",
      key: "maxScore",
      sorter: (a: ActiveProblem, b: ActiveProblem) => a.maxScore - b.maxScore,
    },
    {
      title: "Người tạo",
      dataIndex: "createdBy",
      align: "center",
      key: "createdBy",
      sorter: (a: ActiveProblem, b: ActiveProblem) =>
        a.createdBy.localeCompare(b.createdBy),
    },
  ];

  if (!activeProblem) return <RouteLoading />;

  return (
    <Card>
      <div className="flex flex-col gap-3">
        <div></div>
        <div className="flex justify-end">
          <Input
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            prefix={<SearchOutlined className="text-gray-400" />}
            className="text-base w-[220px]"
            placeholder="Tìm kiếm"
          />
        </div>

        <Table
          dataSource={activeProblem}
          columns={exerciseTableColumns}
          className="custom__table"
          pagination={{
            current: page,
            pageSizeOptions: ["5", "10", "20", "50"],
            total: activeProblem.length,
            showSizeChanger: true,
            onChange: (page, pageSize) => {
              setPage(page);
              setPageSize(pageSize);
            },
          }}
        />
      </div>
    </Card>
  );
}
