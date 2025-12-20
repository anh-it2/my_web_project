"use client";

import useLoadingStore from "@/app/store/loadingStore";
import { useEffect } from "react";

export default function JoinQuizPage() {
  const stopLoading = useLoadingStore((state) => state.stopLoading);
  useEffect(() => {
    stopLoading();
  }, [stopLoading]);
  return <div>join quiz</div>;
}
