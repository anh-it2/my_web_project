"use client";
import { difficultyConfig } from "@/app/[locale]/constants";
import useLoadingStore from "@/app/store/loadingStore";
// ExerciseTable.tsx
import { useRouter } from "@/libs/routing";
import { Problem } from "@/services/rest/problem/get-active-problem/type";
import {
  CheckCircleFilled,
  ClockCircleFilled,
  CloseCircleFilled,
  FormOutlined,
  TrophyOutlined,
  WarningFilled,
} from "@ant-design/icons";
import { Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import CommonTable from "./CommonTable";
import { useTranslations } from "use-intl";

type Props = {
  data: Problem[];
  basePath?: string;
  totalElements: number;
  hasButton?: boolean;
};

export default function AllProblemForUserTable({
  data,
  basePath = "/admin",
  totalElements,
  hasButton = false,
}: Props) {
  const t = useTranslations("allProblemTable");
  const router = useRouter();
  const startLoading = useLoadingStore((state) => state.startLoading);
  const columns: ColumnsType<Problem> = [
    {
      title: t("title"),
      dataIndex: "title",
      key: "title",
      render: (text, record) => (
        <span
          className="text-blue-600 hover:underline cursor-pointer"
          onClick={() => {
            startLoading();
            router.push(`/${basePath}/${record.problemId}`);
          }}
        >
          {text}
        </span>
      ),
    },
    {
      title: t("problemCode"),
      dataIndex: "problemCode",
      key: "problemCode",
      className: "text-gray-600",
    },
    {
      title: t("difficultyLevel"),
      dataIndex: "difficultyLevel",
      key: "difficultyLevel",
      render: (difficultyLevel: string) => {
        const config = difficultyConfig[difficultyLevel] ?? {
          color: "default",
          label: difficultyLevel,
        };

        return (
          <Tag color={config.color} className="font-medium px-4 py-1">
            <span className="text-base">{config.label}</span>
          </Tag>
        );
      },
    },
    {
      title: t("bestScore"),
      dataIndex: "bestScore",
      key: "bestScore",
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
      title: t("maxScore"),
      dataIndex: "maxScore",
      key: "maxScore",
      align: "right",
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
    {
      title: t("bestStatus.title"),
      dataIndex: "bestStatus",
      key: "bestStatus",
      render: (status: string) => {
        const map = {
          AC: {
            color: "green",
            icon: <CheckCircleFilled />,
            label: t("bestStatus.ac"),
          },
          WA: {
            color: "red",
            icon: <CloseCircleFilled />,
            label: t("bestStatus.wa"),
          },
          TLE: {
            color: "orange",
            icon: <ClockCircleFilled />,
            label: t("bestStatus.tle"),
          },
          CE: {
            color: "volcano",
            icon: <WarningFilled />,
            label: t("bestStatus.ce"),
          },
        } as const;

        const s = map[status as keyof typeof map];

        if (!s) return null;

        return (
          <Tag
            color={s.color}
            className="font-medium px-4 py-1 flex items-center gap-2"
          >
            {s.icon}
            <span className="text-base">{s.label}</span>
          </Tag>
        );
      },
    },
  ];

  return (
    <CommonTable
      columns={columns}
      dataSource={data}
      rowKey="problemId"
      totalElements={totalElements}
      hasButton={hasButton}
    />
  );
}
