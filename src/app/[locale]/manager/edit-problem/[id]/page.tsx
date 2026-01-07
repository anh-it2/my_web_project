"use client";

import useLoadingStore from "@/app/store/loadingStore";
import RouteLoading from "@/components/shared/RouteLoading";
import { useProblemDetail } from "@/hook/problem/useProblemDetail";
import useGetListTestCase from "@/hook/test-case/useGetListTestCase";
import { useEffect } from "react";
import EditForm from "./components/EditForm";

export default function EditProblemPage({
  params,
}: {
  params: { id: string };
}) {
  const { problemDetail } = useProblemDetail(params.id);
  const { listTestCase } = useGetListTestCase(params.id);
  const stopLoading = useLoadingStore((state) => state.stopLoading);

  console.log("listTestCase", listTestCase);

  useEffect(() => {
    stopLoading();
  }, [stopLoading]);

  if (!problemDetail) {
    return <RouteLoading />;
  }

  return <EditForm problemDetail={problemDetail} testCases={listTestCase?.content || []} problemId={params.id}/>;
}
