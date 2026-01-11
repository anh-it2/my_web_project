"use client";
import { difficultyConfig } from "@/app/[locale]/constants";
import useLoadingStore from "@/app/store/loadingStore";
import PublishButton from "@/components/shared/Button/FormHeader/PublishButton";
import { useUpdateStateProblem } from "@/hook/problem/useUpdateStateProblem";
// ExerciseTable.tsx
import { useDeleteProblem } from "@/hook/problem/useDeleteProblem";
import { Problem } from "@/services/rest/problem/get-active-problem/type";
import { MoreOutlined, TrophyOutlined } from "@ant-design/icons";
import { Dropdown, MenuProps, Switch, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import CommonTable from "./CommonTable";
import { useTranslations } from "use-intl";
import { useRouter } from "@/libs/routing";
import { BASE_URL, FilterOptions } from "@/services/rest/constant";
import { useState } from "react";
import ConfirmDelete from "../modal/delete-modal/ConfirmDelete";

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
  const { updateStateProblemAsync } = useUpdateStateProblem();
  const { deleteProblemAsync } = useDeleteProblem();

  const router = useRouter();
  const startLoading = useLoadingStore((state) => state.startLoading);
  const stopLoading = useLoadingStore((state) => state.stopLoading);
  const t = useTranslations("allProblemTable");

  const handleDelete = async () => {
    if (!selectedProblem) return;

    startLoading();
    await deleteProblemAsync({
      id: selectedProblem.problemId,
      link: `${BASE_URL}/problems`,
    });
    stopLoading();

    setOpenDeleteModal(false);
    setSelectedProblem(null);
  };

  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const [selectedProblem, setSelectedProblem] = useState<Problem | null>(null);

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
            router.push(`/${basePath}/view-problem-detail/${record.problemId}`);
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
      title: "Public",
      dataIndex: "active",
      key: "active",
      align: "center",
      render: (active, record) => (
        <Switch
          checked={active}
          onChange={async () => {
            startLoading();
            await updateStateProblemAsync({ problemId: record.problemId });
            stopLoading();
          }}
        />
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
      title: "",
      key: "actions",
      align: "center",
      render: (_, record) => {
        const items: MenuProps["items"] = [
          {
            key: "view",
            label: t("actions.details"),
            onClick: () => {
              startLoading();
              router.push(
                `/${basePath}/view-problem-detail/${record.problemId}`
              );
            },
          },
          {
            key: "edit",
            label: t("actions.edit"),
            onClick: () => {
              startLoading();
              router.push(`/${basePath}/edit-problem/${record.problemId}`);
            },
          },
          {
            key: "delete",
            label: t("actions.delete"),
            danger: true,
            onClick: () => {
              setSelectedProblem(record);
              setOpenDeleteModal(true);
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

  return (
    <>
      <CommonTable
        columns={columns}
        dataSource={data}
        rowKey="problemId"
        totalElements={totalElements}
        headerActions={
          <PublishButton
            title={t("actions.publishButton")}
            onClick={() => {
              startLoading();
              router.push(addNewProblemLink);
            }}
          />
        }
        handlePageChange={handlePageChange}
      />
      <ConfirmDelete
        open={openDeleteModal}
        onCancel={() => {
          setOpenDeleteModal(false);
          setSelectedProblem(null);
        }}
        onConfirm={handleDelete}
      />
    </>
  );
}
