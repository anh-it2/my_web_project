"use client";

import UserTable from "@/components/table/UserTable";
import useGetListUser from "@/hook/user-info/useGetListUser";
import "./style.scss";

export default function AdminManagementMock() {
  const { listUser, isLoading, isError, error, handleFilterChange } = useGetListUser();

  console.log(listUser)

  console.log("AdminManagement - listUser:", listUser);
  console.log("AdminManagement - isLoading:", isLoading);
  if (isError) {
    console.error("AdminManagement - error:", error);
  }

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
