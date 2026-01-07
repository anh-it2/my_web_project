"use client";
import { difficultyConfig } from "@/app/[locale]/constants";
import useLoadingStore from "@/app/store/loadingStore";
import PublishButton from "@/components/shared/Button/FormHeader/PublishButton";
import { useUpdateStateProblem } from "@/hook/problem/useUpdateStateProblem";
// ExerciseTable.tsx
import { useDeleteProblem } from "@/hook/problem/useDeleteProblem";
import { Problem } from "@/services/rest/problem/get-active-problem/type";
import {
  MoreOutlined,
  TrophyOutlined
} from "@ant-design/icons";
import { Dropdown, MenuProps, Switch, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useRouter } from "next/navigation";
import { useState } from "react";
import RouteLoading from "../shared/RouteLoading";
import CommonTable from "./CommonTable";

import { BASE_URL, FilterOptions } from "@/services/rest/constant";

type Props = {
  data: Problem[];
  addNewProblemLink: string;
  basePath?: string;
  totalElements: number;
  handlePageChange?: (filter: FilterOptions) => void;
};

export default function AllProblemTable({
  data,
  addNewProblemLink,
  basePath = "/admin",
  totalElements,
  handlePageChange,
}: Props) {
  const [loading, setLoading] = useState<boolean>(false);


  const { updateStateProblemAsync } = useUpdateStateProblem();
  const { deleteProblemAsync } = useDeleteProblem();

  const router = useRouter();
  const startLoading = useLoadingStore((state) => state.startLoading);
  const columns: ColumnsType<Problem> = [
    {
      title: "Bài tập",
      dataIndex: "title",
      key: "title",
      render: (text, record) => (
        <span
          className="text-blue-600 hover:underline cursor-pointer"
          onClick={() => {
            startLoading();
            router.push(`${basePath}/view-problem-detail/${record.problemId}`);
          }}
        >
          {text}
        </span>
      ),
    },
    {
      title: "Mã bài tập",
      dataIndex: "problemCode",
      key: "problemCode",
      className: "text-gray-600",
    },
    {
      title: "Mức độ",
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
      title: "Public",
      dataIndex: "active",
      key: "active",
      align: "center",
      render: (active, record) => (
        <Switch
          checked={active}
          onChange={async () => {
            setLoading(true)
            await updateStateProblemAsync({ problemId: record.problemId });
            setLoading(false)
          }}
        />
      ),
    },
    {
      title: "Điểm tối đa",
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
      title: "",
      key: "actions",
      align: "center",
      render: (_, record) => {
        const items: MenuProps["items"] = [
          {
            key: "view",
            label: "Xem chi tiết",
            onClick: () => {
              startLoading();
              router.push(
                `${basePath}/view-problem-detail/${record.problemId}`
              );
            },
          },
          {
            key: "edit",
            label: "Chỉnh sửa",
            onClick: () => {
              startLoading();
              router.push(`${basePath}/edit-problem/${record.problemId}`);
            },
          },
          {
            key: "delete",
            label: "Xóa",
            danger: true,
            onClick: () => {
              deleteProblemAsync({ id: record.problemId, link: `${BASE_URL}/problems` })
            },
          },
        ];

        return (
          <Dropdown menu={{ items }} trigger={["click"]}>
            <MoreOutlined className="text-xl cursor-pointer text-gray-500 hover:text-black" />
          </Dropdown>
        );
      },
    },
  ];

  if(loading) return <RouteLoading message="Đang update nội dung, vui lòng đợi..."/>

  return (
    <CommonTable
      columns={columns}
      dataSource={data}
      rowKey="problemId"
      totalElements={totalElements}
      headerActions={
        <PublishButton
          title="Thêm mới"
          onClick={() => {
            startLoading();
            router.push(addNewProblemLink);
          }}
        />
      }
      handlePageChange={handlePageChange}
    />
  );
}
