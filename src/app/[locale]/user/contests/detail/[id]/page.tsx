"use client";
import useLoadingStore from "@/app/store/loadingStore";
import { Tabs } from "antd";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import "../../style.scss";
import AssignmentTab from "./components/AssignmentTab";

const SubmittedTab = dynamic(() => import("./components/SubmittedTab"));

export default function ContestDetail({ params }: { params: { id: string } }) {
  const { id } = params;
  const [activeTab, setActiveTab] = useState<string>("1");
  const stopLoading = useLoadingStore((state) => state.stopLoading);
  useEffect(() => {
    stopLoading();
  }, [stopLoading]);
  const t = useTranslations("allProblemTable");

  return (
    <div className="p-4">
      <Tabs
        activeKey={activeTab}
        onChange={(key) => setActiveTab(key)}
        className="custom__search__tabs"
      >
        <Tabs.TabPane key="1" tab={t("title")}>
          <AssignmentTab adminId={id} />
        </Tabs.TabPane>
        <Tabs.TabPane key="2" tab={t("submission")}>
          <SubmittedTab adminId={id} />
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
}
