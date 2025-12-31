"use client";
import { SearchOutlined } from "@ant-design/icons";
import { Input, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import { MotionRow } from "./MotionRow";
import { tableContainerVariants } from "./motion";

interface CommonTableProps<T> {
  columns: ColumnsType<T>;
  dataSource: T[];
  rowKey?: string | ((record: T) => string);
  loading?: boolean;
  searchPlaceholder?: string;
  onSearchChange?: (value: string) => void;
  headerActions?: React.ReactNode;
  defaultPageSize?: number;
  pageSizeOptions?: string[];
}

export default function CommonTable<T extends object>({
  columns,
  dataSource,
  rowKey = "id", // Default fallback
  loading = false,
  searchPlaceholder = "Tìm kiếm",
  onSearchChange,
  headerActions,
  defaultPageSize = 5,
  pageSizeOptions = ["5", "10", "20", "50"],
}: CommonTableProps<T>) {
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(defaultPageSize);
  const [searchValue, setSearchValue] = useState<string>("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    if (onSearchChange) {
      onSearchChange(value);
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg flex flex-col gap-3">
      <div className="flex justify-end gap-2">
        <Input
          value={searchValue}
          onChange={handleSearchChange}
          prefix={<SearchOutlined className="text-gray-400" />}
          className="text-base w-[220px]"
          placeholder={searchPlaceholder}
        />
        {headerActions}
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
          <Table<T>
            loading={loading}
            rowKey={rowKey}
            columns={columns}
            dataSource={dataSource}
            components={{
              body: {
                row: MotionRow,
              },
            }}
            pagination={{
              current: page,
              pageSizeOptions: pageSizeOptions,
              total: dataSource? dataSource.length: 0,
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
