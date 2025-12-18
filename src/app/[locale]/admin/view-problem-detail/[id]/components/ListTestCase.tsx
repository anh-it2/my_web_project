import { Testcase } from "@/services/rest/problem/get-problem-test-case/type";
import { SearchOutlined } from "@ant-design/icons";
import { Card, Input, Table, Tag, Typography } from "antd";
import { ColumnsType } from "antd/es/table";
import { useState } from "react";
import "../../style.scss";

const testcases: Testcase[] = [
  {
    testcaseId: 3,
    input: "10 5",
    expectedOutput: "15",
    orderIndex: 1,
    sample: false,
  },
  {
    testcaseId: 4,
    input: "3 7",
    expectedOutput: "10",
    orderIndex: 2,
    sample: true,
  },
];

export default function ListTestCase() {
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(5);
  const [searchValue, setSearchValue] = useState<string>("");

  const { Title, Text } = Typography;

  const filteredTestcases = testcases.filter(
    (tc) =>
      tc.input.toLowerCase().includes(searchValue.toLowerCase()) ||
      tc.expectedOutput.toLowerCase().includes(searchValue.toLowerCase())
  );

  const testcaseColumns: ColumnsType<Testcase> = [
    // ... keep your existing column configs, maybe just tweak labels if you want ...
    {
      title: "ID",
      dataIndex: "testcaseId",
      key: "testcaseId",
      align: "center",
      sorter: (a, b) => a.testcaseId - b.testcaseId,
    },
    {
      title: "Thứ tự",
      dataIndex: "orderIndex",
      key: "orderIndex",
      align: "center",
      sorter: (a, b) => a.orderIndex - b.orderIndex,
    },
    {
      title: "Input",
      dataIndex: "input",
      key: "input",
      render: (text: string) => (
        <pre className="bg-gray-100 px-2 py-1 rounded text-xs">{text}</pre>
      ),
    },
    {
      title: "Output",
      dataIndex: "expectedOutput",
      key: "expectedOutput",
      render: (text: string) => (
        <pre className="bg-gray-100 px-2 py-1 rounded text-xs">{text}</pre>
      ),
    },
    {
      title: "Loại",
      dataIndex: "sample",
      key: "sample",
      align: "center",
      render: (sample: boolean) =>
        sample ? <Tag color="blue">Sample</Tag> : <Tag>Testcase</Tag>,
      filters: [
        { text: "Sample", value: true },
        { text: "Testcase", value: false },
      ],
      onFilter: (value, record) => record.sample === value,
    },
  ];

  //   if (!activeProblem) return <RouteLoading />;

  return (
    <Card
      title={
        <Title level={4} className="!mb-0">
          Testcases
        </Title>
      }
      extra={
        <Text type="secondary">
          Total: <Text strong>{filteredTestcases.length}</Text>
        </Text>
      }
      className="testcase-card"
    >
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center gap-3 flex-wrap">
          <div>
            <Text type="secondary">
              Quản lý testcases &amp; samples của đề bài.
            </Text>
          </div>
          <Input
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            prefix={<SearchOutlined className="text-gray-400" />}
            className="text-base w-[260px]"
            placeholder="Tìm kiếm theo input / output"
            allowClear
          />
        </div>

        <Table<Testcase>
          rowKey="testcaseId"
          dataSource={filteredTestcases}
          columns={testcaseColumns}
          bordered
          size="middle"
          className="custom__table"
          pagination={{
            current: page,
            pageSize,
            pageSizeOptions: ["5", "10", "20", "50"],
            total: filteredTestcases.length,
            showSizeChanger: true,
            showTotal: (total) => `Total ${total} items`,
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
