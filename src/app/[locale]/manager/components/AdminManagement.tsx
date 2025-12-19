import DangerButton from "@/components/shared/Button/FormHeader/DangerButton";
import PublishButton from "@/components/shared/Button/FormHeader/PublishButton";
import { Input, Modal, Select, Table } from "antd";
import { useState } from "react";
import "./style.scss";

type User = {
  id: number;
  name: string;
  email: string;
  role: "user" | "admin";
};

export default function AdminManagementMock() {
  const [grantModalOpen, setGrantModalOpen] = useState<boolean>(false);
  const [revokeModalOpen, setRevokeModalOpen] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [scope, setScope] = useState<string>("global");
  const [tag, setTag] = useState<string | null>(null);
  const [problem, setProblem] = useState<string | null>(null);
  const [reason, setReason] = useState<string>("");

  console.log(tag);
  console.log(problem);
  const data: User[] = [
    { id: 1, name: "Nguyen Van A", email: "a@example.com", role: "user" },
    { id: 2, name: "Tran Thi B", email: "b@example.com", role: "admin" },
  ];

  const columns = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Role", dataIndex: "role", key: "role" },
    {
      title: "Actions",
      key: "actions",
      render: (_: unknown, record: User) => (
        <div className="flex gap-2">
          {record.role !== "admin" ? (
            <PublishButton
              onClick={() => {
                setSelectedUser(record);
                setGrantModalOpen(true);
              }}
              title="Grant Admin"
            />
          ) : (
            <DangerButton
              onClick={() => {
                setSelectedUser(record);
                setRevokeModalOpen(true);
              }}
              title="Revoke Admin"
            />
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="p-6 w-full mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Admin Management</h1>

      <Table<User>
        className="custom__table"
        rowKey="id"
        columns={columns}
        dataSource={data}
        bordered
      />

      {/* Grant Admin Modal */}
      <Modal
        title={`Grant Admin to ${selectedUser?.name ?? ""}`}
        open={grantModalOpen}
        onCancel={() => setGrantModalOpen(false)}
        onOk={() => setGrantModalOpen(false)}
        centered
      >
        <div className="flex flex-col gap-4">
          <div>
            <p className="font-medium mb-1">Scope</p>
            <Select
              className="w-full"
              value={scope}
              onChange={(v) => setScope(v)}
              options={[
                { label: "Toàn hệ thống", value: "global" },
                { label: "Theo Tag", value: "tag" },
                { label: "Theo Problem", value: "problem" },
              ]}
            />
          </div>

          {scope === "tag" && (
            <Select
              placeholder="Chọn tag"
              className="w-full"
              onChange={(v) => setTag(v)}
              options={[
                { label: "DP", value: "dp" },
                { label: "Graph", value: "graph" },
              ]}
            />
          )}

          {scope === "problem" && (
            <Select
              placeholder="Chọn problem"
              className="w-full"
              onChange={(v) => setProblem(v)}
              options={[
                { label: "Problem 101", value: "101" },
                { label: "Problem 202", value: "202" },
              ]}
            />
          )}
        </div>
      </Modal>

      {/* Revoke Admin Modal */}
      <Modal
        title={`Revoke Admin from ${selectedUser?.name ?? ""}`}
        open={revokeModalOpen}
        onCancel={() => setRevokeModalOpen(false)}
        onOk={() => setRevokeModalOpen(false)}
      >
        <p className="font-medium mb-1">Reason</p>
        <Input.TextArea
          rows={3}
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder="Nhập lý do thu hồi quyền"
        />
      </Modal>
    </div>
  );
}
