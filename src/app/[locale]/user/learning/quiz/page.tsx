"use client";

import useLoadingStore from "@/app/store/loadingStore";
import FutureFeatureNoticeCard from "@/components/shared/FutureFeatureNoticeCard";
import { useEffect } from "react";

export default function QuizPage() {
  const stopLoading = useLoadingStore((state) => state.stopLoading);
  useEffect(() => {
    stopLoading();
  }, [stopLoading]);
  return <div className="flex items-center justify-center h-[80vh]">
          <FutureFeatureNoticeCard />
        </div>;
}
