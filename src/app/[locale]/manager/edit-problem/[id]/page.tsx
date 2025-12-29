"use client";

import useLoadingStore from "@/app/store/loadingStore";
import RouteLoading from "@/components/shared/RouteLoading";
import { useProblemDetail } from "@/hook/problem/useProblemDetail";
import { useListTestCase } from "@/hook/test-case/useListTestCase";
import { useEffect } from "react";
import EditForm from "./components/EditForm";

export default function EditProblemPage({
  params,
}: {
  params: { id: string };
}) {
  const { problemDetail } = useProblemDetail(params.id);
  const { listTestCase } = useListTestCase(params.id);
  const stopLoading = useLoadingStore((state) => state.stopLoading);

  useEffect(() => {
    stopLoading();
  }, [stopLoading]);

  if (!problemDetail || !listTestCase) {
    return <RouteLoading />;
  }

  return <EditForm problemDetail={problemDetail} testCases={listTestCase} />;
}
