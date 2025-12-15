"use client";
import { testCases } from "@/data/mock";
import { CheckCircleTwoTone, InfoCircleFilled } from "@ant-design/icons";
import { Card, Table, Tag } from "antd";
import InfoRow from "./components/InfoRow";

export default function TestCasePage() {
  const columns = [
    {
      title: "Tính điểm",
      dataIndex: "status",
      render: () => <CheckCircleTwoTone twoToneColor="#52c41a" />,
    },
    {
      title: "Điểm",
      dataIndex: "score",
    },
    {
      title: "Thông báo",
      dataIndex: "status",
      render: (v: string) => <Tag color="green">{v}</Tag>,
    },
    {
      title: "Thời gian chạy (ms)",
      dataIndex: "time",
    },
    {
      title: "Bộ nhớ (MB)",
      dataIndex: "memory",
      render: (v: number) => v.toLocaleString(),
    },
    {
      title: "Thao tác",
      render: () => (
        <InfoCircleFilled className="text-blue-500 text-lg cursor-pointer" />
      ),
    },
  ];

  return (
    <div className="grid grid-cols-12 gap-4 p-4">
      <Card title="Test Case" className="col-span-8 rounded-xl">
        <Table
          rowKey="id"
          columns={columns}
          dataSource={testCases}
          pagination={{ pageSize: 5 }}
        />
      </Card>

      <Card className="col-span-4 rounded-xl">
        <div className="space-y-3 text-sm">
          <InfoRow label="Trạng thái">
            <span className="text-green-600 font-semibold">Accepted</span>
          </InfoRow>

          <InfoRow label="Đạt">6 / 6 test case </InfoRow>
          <InfoRow label="Điểm">120 </InfoRow>
          <InfoRow label="Ngôn ngữ">Java 13 </InfoRow>
          <InfoRow label="Tổng thời gian chạy">1,033 (s)</InfoRow>
          <InfoRow label="Thời gian tạo">07/12/2025 15:32:03 </InfoRow>

          <InfoRow label="Bài tập">
            <a className="text-blue-500">Replace ? To Find Real Expression </a>
          </InfoRow>

          <InfoRow label="Cuộc thi">
            <a className="text-blue-500">BTVN-IT3100-Ky20251-T9-2025 </a>
          </InfoRow>
        </div>
      </Card>
    </div>
  );
}
