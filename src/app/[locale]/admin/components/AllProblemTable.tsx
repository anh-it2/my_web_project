"use client";
import PublishButton from "@/components/shared/Button/FormHeader/PublishButton";
// ExerciseTable.tsx
import { Problem } from "@/data/mock";
import { useListSubmittedProblem } from "@/hook/problem/useListSubmittedProblem";
import { MoreOutlined, SearchOutlined } from "@ant-design/icons";
import { Dropdown, Input, MenuProps, Switch, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Props = {
  data: Problem[];
};

export default function AllProblemTable({ data }: Props) {
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(5);
  const [searchValue, setSearchValue] = useState<string>("");
  console.log(pageSize);

  const { list_problem } = useListSubmittedProblem();

  const router = useRouter();

  const columns: ColumnsType<Problem> = [
    {
      title: "Bài tập",
      dataIndex: "title",
      key: "title",
      render: (text) => (
        <Link href={"/admin/view-problem-detail/1"}>
          <span className="text-blue-600 hover:underline cursor-pointer">
            {text}
          </span>
        </Link>
      ),
    },
    {
      title: "Mã bài tập",
      dataIndex: "code",
      key: "code",
      className: "text-gray-600",
    },
    {
      title: "Mức độ",
      dataIndex: "level",
      key: "level",
      render: (level) => {
        const color =
          level === "Dễ"
            ? "text-green-600"
            : level === "Khó"
            ? "text-red-600"
            : "text-orange-500";

        return <span className={color}>{level}</span>;
      },
    },
    {
      title: "Public",
      dataIndex: "isPublic",
      key: "isPublic",
      align: "center",
      render: (isPublic, record) => (
        <Switch
          checked={isPublic}
          onChange={(checked) => {
            console.log("Toggle public:", record.key, checked);
          }}
        />
      ),
    },
    {
      title: "Điểm tối đa",
      dataIndex: "maxScore",
      key: "maxScore",
      align: "right",
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
              router.push("/admin/view-problem-detail/1");
            },
          },
          {
            key: "edit",
            label: "Chỉnh sửa",
            onClick: () => {
              router.push("/admin/edit-problem/1");
            },
          },
          {
            key: "delete",
            label: "Xóa",
            danger: true,
            onClick: () => console.log("Delete", record.key),
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
          onClick={() => router.push("/admin/add-problem")}
        />
      </div>

      <Table
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
      />
    </div>
  );
}
