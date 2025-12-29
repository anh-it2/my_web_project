"use client";
import { TestCase } from "@/services/rest/test-case/get-test-case/type";
import {
    MoreOutlined,
    SearchOutlined,
} from "@ant-design/icons";
import { Dropdown, Input, MenuProps, Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { MotionRow } from "./MotionRow";
import { tableContainerVariants } from "./motion";

type Props = {
  data: TestCase[];
};

export default function TestCaseTable({
  data,
}: Props) {
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(5);
  const [searchValue, setSearchValue] = useState<string>("");
    const testcaseColumns: ColumnsType<TestCase> = [
    // ... keep your existing column configs, maybe just tweak labels if you want ...
    {
      title: "ID",
      dataIndex: "testcaseId",
      key: "testcaseId",
      align: "center",
      sorter: (a: TestCase, b: TestCase) => a.testcaseId - b.testcaseId,
    },

    {
      title: "Input",
      dataIndex: "input",
      key: "input",
      render: (text: string) => (
        <pre className="bg-gray-100 px-2 py-1 rounded text-sm">{text}</pre>
      ),
    },
    {
      title: "Output",
      dataIndex: "expectedOutput",
      key: "expectedOutput",
      render: (text: string) => (
        <pre className="bg-gray-100 px-2 py-1 rounded text-sm">{text}</pre>
      ),
    },
    {
      title: "Classify",
      dataIndex: "sample",
      key: "sample",
      width: 150,
      render: (sample: boolean) => (
        <Tag color={sample ? "green" : "blue"} className="font-medium text-sm">
          {sample ? "Sample" : "Test Case"}
        </Tag>
      ),
    },
    {
      title: "",
      key: "actions",
      align: "center",
      width: 100,
      render: (_, record) => {
        const items: MenuProps["items"] = [
            {
              key: "edit",
              label: "Chỉnh sửa",
              onClick: () => {
                console.log("Edit test case", record.testcaseId);
              },
            },
          {
            key: "delete",
            label: "Xóa",
            danger: true,
            onClick: () => {
              console.log("Delete test case", record.testcaseId);
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

  console.log(data)

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
      </div>

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
            rowKey="id"
            columns={testcaseColumns}
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
