"use client";
import useLoadingStore from "@/app/store/loadingStore";
import { useTranslations } from "next-intl";
import { useDeleteTestCase } from "@/hook/test-case/useDeleteTestCase";
import { useUpdateTestCase } from "@/hook/test-case/useUpdateTestCase";
import { TestCase } from "@/services/rest/test-case/get-test-case/type";
import { MoreOutlined, SearchOutlined } from "@ant-design/icons";
import { Dropdown, Input, MenuProps, Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import ConfirmDelete from "../modal/delete-modal/ConfirmDelete";
import { MotionRow } from "./MotionRow";
import { tableContainerVariants } from "./motion";

type Props = {
  data: TestCase[];
  visible?: boolean
};

export default function TestCaseTable({ data, visible = true }: Props) {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [draft, setDraft] = useState<{
    input: string;
    expectedOutput: string;
  } | null>(null);

  const startEdit = (record: TestCase) => {
    setEditingId(record.testcaseId);
    setDraft({
      input: record.input,
      expectedOutput: record.expectedOutput,
    });
  };

  const t = useTranslations("submitPage");
  const tt = useTranslations("allProblemTable");
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(5);
  const [searchValue, setSearchValue] = useState<string>("");
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const [selectedTestCase, setSelectedTestCase] = useState<TestCase | null>(null);

  const { updateTestCaseAsync } = useUpdateTestCase();
  const { deleteTestCaseAsync } = useDeleteTestCase();
  const startLoading = useLoadingStore((state) => state.startLoading);
  const stopLoading = useLoadingStore((state) => state.stopLoading);

  const handleDelete = async () => {
    if (!selectedTestCase) return;

    startLoading();
    await deleteTestCaseAsync({
      id: selectedTestCase.testcaseId,
    });
    stopLoading();

    setOpenDeleteModal(false);
    setSelectedTestCase(null);
  };

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
      key: "input",
      render: (_, record) => {
        const isEditing = editingId === record.testcaseId;

        return (
          <Input.TextArea
            autoSize
            readOnly={!isEditing}
            value={isEditing ? draft?.input : record.input}
            className={`text-sm ${isEditing ? "bg-white" : "bg-gray-100 cursor-pointer"
              }`}
            onClick={() => !isEditing && startEdit(record)}
            onChange={(e) =>
              setDraft((prev) =>
                prev ? { ...prev, input: e.target.value } : prev
              )
            }
          />
        );
      },
    },
    {
      title: "Output",
      key: "expectedOutput",
      render: (_, record) => {
        const isEditing = editingId === record.testcaseId;

        return (
          <Input.TextArea
            autoSize
            readOnly={!isEditing}
            value={isEditing ? draft?.expectedOutput : record.expectedOutput}
            className={`text-sm ${isEditing ? "bg-white" : "bg-gray-100 cursor-pointer"
              }`}
            onClick={() => !isEditing && startEdit(record)}
            onChange={(e) =>
              setDraft((prev) =>
                prev ? { ...prev, expectedOutput: e.target.value } : prev
              )
            }
          />
        );
      },
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
        const isEditing = editingId === record.testcaseId;
        const isValid = draft?.input.trim() && draft?.expectedOutput.trim();

        if (isEditing) {
          return (
            <div className="flex justify-center gap-3">
              <button
                disabled={!isValid}
                className={`text-green-600 text-2xl bg-transparent border-none cursor-pointer ${!isValid ? "opacity-40 cursor-not-allowed" : ""
                  }`}
                onClick={async () => {

                  startLoading()
                  await updateTestCaseAsync({
                    payload: {
                      testcaseId: record.testcaseId,
                      input: draft!.input,
                      expectedOutput: draft!.expectedOutput,
                      orderIndex: record.orderIndex,
                      sample: record.sample,
                    },
                  });

                  stopLoading()

                  setEditingId(null);
                  setDraft(null);
                }}
              >
                ✔
              </button>

              {/* ✖ CANCEL */}
              <button
                className="text-red-500 text-2xl bg-transparent border-none cursor-pointer"
                onClick={() => {
                  setEditingId(null);
                  setDraft(null);
                }}
              >
                ✖
              </button>
            </div>
          );
        }

        const items: MenuProps["items"] = [
          {
            key: "edit",
            label: tt("actions.edit"),
            onClick: () => startEdit(record),
          },
          {
            key: "delete",
            label: tt("actions.delete"),
            danger: true,
            onClick: () => {
              setSelectedTestCase(record);
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
    <div className="bg-white p-4 rounded-lg flex flex-col gap-3">
      {visible && <div className="flex justify-end gap-2">
        <Input
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          prefix={<SearchOutlined className="text-gray-400" />}
          className="text-base w-[220px]"
          placeholder={t("find")}
        />
      </div>}

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
      <ConfirmDelete
        open={openDeleteModal}
        onCancel={() => {
          setOpenDeleteModal(false);
          setSelectedTestCase(null);
        }}
        onConfirm={handleDelete}
      />
    </div>
  );
}
