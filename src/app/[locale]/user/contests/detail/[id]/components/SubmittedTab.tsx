import RouteLoading from "@/components/shared/RouteLoading";
import { useListSubmittedProblem } from "@/hook/problem/useListSubmittedProblem";
import { SubmittedProblem } from "@/services/rest/problem/get-all-submitted-problem/type";
import { formatNumberSpace } from "@/utils/format";
import {
  CheckCircleTwoTone,
  CloseCircleFilled,
  SearchOutlined,
} from "@ant-design/icons";
import { Card, Input, Table, Tag, Tooltip, Typography } from "antd";
import { ColumnsType } from "antd/es/table";
import Link from "next/link";
import { useMemo, useState } from "react";
import "../../../style.scss";

const { Text } = Typography;

export default function AssignmentTab() {
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(5);
  const [searchValue, setSearchValue] = useState<string>("");

  console.log(pageSize);

  const { list_problem } = useListSubmittedProblem();
  console.log(list_problem);

  const exerciseTableColumns: ColumnsType<SubmittedProblem> = [
    {
      title: "Bài tập",
      dataIndex: "problemId",
      key: "problemId",
      align: "center",
      sorter: (a: SubmittedProblem, b: SubmittedProblem) =>
        a.problemId - b.problemId,
      render: (text: string, record: SubmittedProblem) => (
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
      sorter: (a: SubmittedProblem, b: SubmittedProblem) =>
        a.problemCode.localeCompare(b.problemCode),
      render: (text: string, record: SubmittedProblem) => {
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
      sorter: (a: SubmittedProblem, b: SubmittedProblem) =>
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
            <span className="text-xs font-medium rounded">{level}</span>
          </Tag>
        );
      },
    },
    {
      title: "Điểm đạt được",
      dataIndex: "score",
      key: "score",
      align: "center",
      sorter: (a: SubmittedProblem, b: SubmittedProblem) => a.score - b.score,
    },
    {
      title: "Điểm tối đa",
      dataIndex: "maxScore",
      align: "center",
      key: "maxScore",
      sorter: (a: SubmittedProblem, b: SubmittedProblem) =>
        a.maxScore - b.maxScore,
    },
    {
      title: "Hoàn thành",
      key: "completed",
      align: "center",
      sorter: (a: SubmittedProblem, b: SubmittedProblem) =>
        Number(a.score === a.maxScore) - Number(b.score === b.maxScore),
      render: (_: unknown, record: SubmittedProblem) => {
        const completed = record.score === record.maxScore;

        return (
          <Tooltip
            title={
              completed
                ? "Bạn đã pass toàn bộ test case"
                : "Chưa pass hết test case"
            }
            color={completed ? "#ecfeff" : "#fef2f2"}
            overlayInnerStyle={{
              color: completed ? "#155e75" : "#991b1b",
              fontWeight: 500,
              borderRadius: 8,
            }}
          >
            <span className="cursor-pointer hover:scale-110 transition inline-flex">
              {completed ? (
                <CheckCircleTwoTone className="text-green-500 text-2xl" />
              ) : (
                <CloseCircleFilled className="text-red-500 text-2xl" />
              )}
            </span>
          </Tooltip>
        );
      },
    },
  ];

  const { currentScore, maxScore } = useMemo(() => {
    if (!list_problem) return { currentScore: 0, maxScore: 0 };

    const currentScore = list_problem.reduce(
      (sum, item) => sum + item.score,
      0
    );

    const maxScore = list_problem.reduce((sum, item) => sum + item.maxScore, 0);

    return { currentScore, maxScore };
  }, [list_problem]);

  if (!list_problem) return <RouteLoading />;

  return (
    <>
      <Card>
        <div className="flex flex-col gap-3">
          <div>
            <Text className="!text-red-500 text-base">
              Điểm đạt được: {formatNumberSpace(currentScore)} / Điểm tối đa:{" "}
              {formatNumberSpace(maxScore)}
            </Text>
          </div>
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
            dataSource={list_problem}
            columns={exerciseTableColumns}
            className="custom__table"
            pagination={{
              current: page,
              pageSizeOptions: ["5", "10", "20", "50"],
              total: list_problem.length,
              showSizeChanger: true,
              onChange: (page, pageSize) => {
                setPage(page);
                setPageSize(pageSize);
              },
            }}
          />
        </div>
      </Card>
    </>
  );
}
