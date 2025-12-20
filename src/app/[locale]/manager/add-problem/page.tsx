"use client";
import useLoadingStore from "@/app/store/loadingStore";
import { useEffect } from "react";
import CreateProblem from "./CreateProblem";

export default function AddProblem() {
  const stopLoading = useLoadingStore((store) => store.stopLoading);
  useEffect(() => {
    stopLoading();
  }, [stopLoading]);
  return <CreateProblem />;
}

