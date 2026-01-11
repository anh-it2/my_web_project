"use client";

import RouteLoading from "@/components/shared/RouteLoading";
import { useRouter } from "@/libs/routing";
import { useEffect } from "react";

export default function AdminPage() {
  const router = useRouter();
  useEffect(() => {
    router.push("/admin/home");
  }, [router]);
  return <RouteLoading />;
}
