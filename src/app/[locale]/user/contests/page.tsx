"use client";
import useLoadingStore from "@/app/store/loadingStore";
import { Tabs } from "antd";
import { useEffect, useState } from "react";
import PublicContestTab from "./components/PublicContestTab";
import PublicRegistedTab from "./components/PublicRegistedTab";
import "./style.scss";

export default function ContestPage() {
  const [activeTab, setActiveTab] = useState<string>("1");
  const stopLoading = useLoadingStore((state) => state.stopLoading);
  useEffect(() => {
    stopLoading();
  }, [stopLoading]);

  return (
    <div className="p-4">
      <Tabs
        activeKey={activeTab}
        onChange={(key) => setActiveTab(key)}
        className="custom__search__tabs"
      >
        <Tabs.TabPane key="1" tab="Công khai">
          <PublicContestTab />
        </Tabs.TabPane>
        <Tabs.TabPane key="2" tab="Đã đăng ký">
          <PublicRegistedTab />
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
}
