'use client'
import useLoadingStore from "@/app/store/loadingStore";
import UserInfoComponent from "@/components/UserInfo/UserInfoComponent";
import { useEffect } from "react";

export default function UserDetailPage({params}: {params: {id: string, role: string}}) {
     const stopLoading = useLoadingStore((state) => state.stopLoading);
  useEffect(() => {
    stopLoading();
  }, [stopLoading]);

    return <UserInfoComponent userName={decodeURIComponent(params.id)} role={params.role} enableEdit={false} />;
}