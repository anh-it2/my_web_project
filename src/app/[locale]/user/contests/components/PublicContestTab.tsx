import useLoadingStore from "@/app/store/loadingStore";
import { contestTableData } from "@/data/mock";
import { SearchOutlined } from "@ant-design/icons";
import { Card, Input, Table } from "antd";
import { useRouter } from "next/navigation";
import { useState } from "react";
import "../style.scss";

export default function PublicContestTab() {
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(5);
  const [searchValue, setSearchValue] = useState<string>("");
  const startLoading = useLoadingStore((state) => state.startLoading);
  const router = useRouter();

  console.log(pageSize);

  const contestTableColumns = [
    {
      title: "Cuộc thi",
      dataIndex: "name",
      key: "name",
      render: (text: string) => (
        <span
          className="text-blue-600 hover:underline cursor-pointer"
          onClick={() => {
            startLoading();
            router.push("/user/contests/detail/1");
          }}
        >
          {text}
        </span>
      ),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Người quản lý",
      dataIndex: "manager",
      key: "manager",
    },
  ];

  return (
    <Card>
      <div className="flex flex-col gap-3">
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
          dataSource={contestTableData}
          columns={contestTableColumns}
          className="custom__table"
          pagination={{
            current: page,
            pageSizeOptions: ["5", "10", "20", "50"],
            total: contestTableData.length,
            showSizeChanger: true,
            onChange: (page, pageSize) => {
              setPage(page);
              setPageSize(pageSize);
            },
          }}
        />
      </div>
    </Card>
  );
}
