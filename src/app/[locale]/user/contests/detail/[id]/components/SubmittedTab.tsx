import { useGetListSubmittedProblem } from "@/hook/problem/useGetListSubmittedProblem";
import { formatNumberSpace } from "@/utils/format";
import { Card, Typography } from "antd";
// ExerciseTable.tsx
import useLoadingStore from "@/app/store/loadingStore";
import CommonTable from "@/components/table/CommonTable";
import { useClassScore } from "@/hook/score/useScore";
import { SubmittedProblem } from "@/services/rest/problem/get-all-submitted-problem/type";
import {
  FormOutlined,
  TrophyOutlined
} from "@ant-design/icons";
import { Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useTranslations } from "next-intl";
const { Text } = Typography

export default function SubmittedTab({ adminId }: { adminId: string }) {


  const { list_submitted_problem, handleFilterChange, isLoading } = useGetListSubmittedProblem(adminId)
  const { classScore } = useClassScore(adminId);
  const t = useTranslations("allProblemTable");
  const startLoading = useLoadingStore((state) => state.startLoading);

  console.log(list_submitted_problem?.totalElements)


  const columns: ColumnsType<SubmittedProblem> = [
    {
      title: t("submissionId"),
      dataIndex: "submissionId",
      key: "submissionId",
      className: "text-gray-600",
      align: "center",
    },
    {
      title: t("title"),
      dataIndex: "problemTitle",
      key: "problemTitle",
      align: "center",
      render: (text) => (
        <span
          className="text-blue-600 hover:underline cursor-pointer"
          onClick={() => {
            startLoading();
          }}
        >
          {text}
        </span>
      ),
    },
    {
      title: t("status.title"),
      dataIndex: "status",
      align: "center",
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
      title: t("language"),
      dataIndex: "language",
      key: "language",
      align: "center",
    },
    {
      title: t("passedTestcases"),
      dataIndex: "passedTestcases",
      key: "passedTestcases",
      align: "center",
      render: (score: number) => (
        <Tag
          color="green"
          icon={<FormOutlined className="text-xl font-semibold" />}
          className="font-semibold px-3 py-1"
        >
          <span className="text-xl font-semibold">{score}</span>
        </Tag>
      ),
    },
    {
      title: t("totalTestcases"),
      dataIndex: "totalTestcases",
      key: "totalTestcases",
      align: "center",
      render: (score: number) => (
        <Tag
          color="yellow"
          icon={<TrophyOutlined className="text-xl font-semibold" />}
          className="font-semibold px-3 py-1"
        >
          <span className="text-xl font-semibold">{score}</span>
        </Tag>
      ),
    },
  ];

  return (
    <Card title={<div>
      <Text className="!text-red-500 text-base">
        {t("scoreAchieved")} {formatNumberSpace(classScore || 0)} / {t("scoreMax")}{" "}
        {formatNumberSpace((list_submitted_problem?.totalElements || 0) * 100)}
      </Text>
    </div>}>
      <CommonTable
        loading={isLoading}
        dataSource={list_submitted_problem?.content || []}
        columns={columns}
        totalElements={list_submitted_problem?.totalElements || 0}
        handlePageChange={handleFilterChange}
      />
    </Card>
  );
}
