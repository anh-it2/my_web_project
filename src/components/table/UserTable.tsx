"use client";
import useLoadingStore from "@/app/store/loadingStore";
import DangerButton from "@/components/shared/Button/FormHeader/DangerButton";
import PublishButton from "@/components/shared/Button/FormHeader/PublishButton";
import { useUpdateUserRole } from "@/hook/user-info/useUpdateRole";
import { useRouter } from "@/libs/routing";
import { FilterOptions } from "@/services/rest/constant";
import { User } from "@/services/rest/user/type";
import { Input, Modal, Select } from "antd";
import { useState } from "react";
import CommonTable from "./CommonTable";

type Props = {
  data: User[];
  totalElements: number;
  handlePageChange: (filter: FilterOptions) => void;
};

export default function UserTable({
  data,
  totalElements,
  handlePageChange,
}: Props) {
  const [grantModalOpen, setGrantModalOpen] = useState<boolean>(false);
  const [revokeModalOpen, setRevokeModalOpen] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [scope, setScope] = useState<string>("global");
  const [tag, setTag] = useState<string | null>(null);
  const [problem, setProblem] = useState<string | null>(null);
  const [reason, setReason] = useState<string>("");
  const router = useRouter();

  const startLoading = useLoadingStore((state) => state.startLoading);
  const stopLoading = useLoadingStore((state) => state.stopLoading);

  const { updateRoleAsync } = useUpdateUserRole();

  console.log(tag);
  console.log(problem);

  const columns = [
    { title: "Username", dataIndex: "username", key: "username",render: (_: unknown, record: User) => (
        <span
          className="text-blue-600 hover:underline cursor-pointer"
          onClick={() => {
            startLoading();
            router.push(`/manager/user-detail/${encodeURIComponent(record.username)}/${record.role}`);
          }}
        >
          {record.username}
        </span>
      ), },
    { title: "Role", dataIndex: "role", key: "role" },
    {
      title: "Actions",
      key: "actions",
      render: (_: unknown, record: User) => (
        <div className="flex gap-2">
          {record.role !== "ADMIN" ? (
            <PublishButton
              onClick={() => {
                setSelectedUser(record);
                setGrantModalOpen(true);
              }}
              title="Grant Admin"
              disable={record.role === "MANAGER"}
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
    <>
      <CommonTable
        columns={columns}
        dataSource={data}
        rowKey="username"
        defaultPageSize={10}
        totalElements={totalElements}
        handlePageChange={handlePageChange}
      />

      {/* Grant Admin Modal */}
      <Modal
        title={`Grant Admin to ${selectedUser?.username ?? ""}`}
        open={grantModalOpen}
        onCancel={() => setGrantModalOpen(false)}
        onOk={() => setGrantModalOpen(false)}
        centered
        footer={null}
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
        <div className="flex gap-2 mt-4 justify-end">
          <DangerButton
            title="Cancel"
            onClick={() => {
              setGrantModalOpen(false);
            }}
          />
          <PublishButton
            title="Grant"
            onClick={async () => {
              startLoading();
              await updateRoleAsync({
                username: selectedUser?.username || "",
                role: "ADMIN",
                action: "GRANT",
              });
              stopLoading();
              setGrantModalOpen(false);
            }}
            isSubmit={false}
          />
        </div>
      </Modal>

      {/* Revoke Admin Modal */}
      <Modal
        title={`Revoke Admin from ${selectedUser?.username ?? ""}`}
        open={revokeModalOpen}
        onCancel={() => setRevokeModalOpen(false)}
        onOk={() => setRevokeModalOpen(false)}
        centered
        footer={null}
      >
        <p className="font-medium mb-1">Reason</p>
        <Input.TextArea
          rows={3}
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder="Nhập lý do thu hồi quyền"
        />
        <div className="flex gap-2 mt-4 justify-end">
          <DangerButton
            title="Cancel"
            onClick={() => {
              setRevokeModalOpen(false);
            }}
          />
          <PublishButton
            title="Revoke"
            onClick={async () => {
              startLoading();
              await updateRoleAsync({
                username: selectedUser?.username || "",
                role: "USER",
                action: "REVOKE",
              });
              stopLoading();
              setRevokeModalOpen(false);
            }}
            isSubmit={false}
          />
        </div>
      </Modal>
    </>
  );
}
