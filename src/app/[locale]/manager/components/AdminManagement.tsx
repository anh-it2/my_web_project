"use client";

import { useTranslations } from "next-intl";
import RouteLoading from "@/components/shared/RouteLoading";
import UserTable from "@/components/table/UserTable";
import useGetListUser from "@/hook/user-info/useGetListUser";
import "./style.scss";

export default function AdminManagementMock() {
  const { listUser, handleFilterChange } = useGetListUser();
  const t = useTranslations("login.message");

  if (!listUser) return <RouteLoading message={t("loadingAdmin")} />

  return (
    <div className="p-6 w-full mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Admin Management</h1>
      <UserTable
        data={listUser?.content || []}
        totalElements={listUser?.totalElements || 0}
        handlePageChange={handleFilterChange}
      />
    </div>
  );
}
