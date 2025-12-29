"use client";
import { difficultyConfig } from "@/app/[locale]/constants";
import useLoadingStore from "@/app/store/loadingStore";
import PublishButton from "@/components/shared/Button/FormHeader/PublishButton";
import { useUpdateStateProblem } from "@/hook/problem/useUpdateStateProblem";
// ExerciseTable.tsx
import { useDeleteProblem } from "@/hook/problem/useDeleteProblem";
import { MyProblem } from "@/services/rest/problem/get-my-problems/type";
import {
  MoreOutlined,
  SearchOutlined,
  TrophyOutlined,
} from "@ant-design/icons";
import { Dropdown, Input, MenuProps, Switch, Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState } from "react";
import RouteLoading from "../shared/RouteLoading";
import { MotionRow } from "./MotionRow";
import { tableContainerVariants } from "./motion";

type Props = {
  data: MyProblem[];
  addNewProblemLink: string;
  basePath?: string;
};

export default function AllProblemTable({
  data,
  addNewProblemLink,
  basePath = "/admin",
}: Props) {
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(5);
  const [searchValue, setSearchValue] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);


  const { updateStateProblemAsync } = useUpdateStateProblem();
  const { deleteProblemAsync } = useDeleteProblem();

  const router = useRouter();
  const startLoading = useLoadingStore((state) => state.startLoading);
  const columns: ColumnsType<MyProblem> = [
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
              router.push(`${basePath}/edit-problem/1`);
            },
          },
          {
            key: "delete",
            label: "Xóa",
            danger: true,
            onClick: () => {
              deleteProblemAsync({ id: record.problemId, link: 'http://localhost:8080/problems' })
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
    <div className="bg-white p-4 rounded-lg flex flex-col gap-3">
      <div className="flex justify-end gap-2">
        <Input
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          prefix={<SearchOutlined className="text-gray-400" />}
          className="text-base w-[220px]"
          placeholder="Tìm kiếm"
        />
        <PublishButton
          title="Thêm mới"
          onClick={() => {
            startLoading();
            router.push(addNewProblemLink);
          }}
        />
      </div>

      {/* <Table
        columns={columns}
        dataSource={data}
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
      /> */}
      <AnimatePresence mode="wait">
        <motion.div
          variants={tableContainerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          key={`${page}-${pageSize}`}
          className="w-full"
        >
          <Table
            rowKey="problemId"
            columns={columns}
            dataSource={data}
            components={{
              body: {
                row: MotionRow,
              },
            }}
            pagination={{
              current: page,
              pageSizeOptions: ["5", "10", "20", "50"],
              total: data.length,
              showSizeChanger: true,
              onChange: (p, ps) => {
                setPage(p);
                setPageSize(ps);
              },
            }}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
