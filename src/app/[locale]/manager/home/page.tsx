"use client";
import useLoadingStore from "@/app/store/loadingStore";
import AllProblemTable from "@/components/table/AllProblemTable";
import { mockExercises } from "@/data/mock";
import { Tabs } from "antd";
import { useEffect, useState } from "react";
import AdminManagementMock from "../components/AdminManagement";
import "./style.scss";

export default function ManagerPage() {
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
        <Tabs.TabPane key="1" tab="Admin Management">
          <AdminManagementMock />
        </Tabs.TabPane>
        <Tabs.TabPane key="2" tab="All Problems">
          <AllProblemTable
            data={mockExercises}
            addNewProblemLink="/manager/add-problem"
            basePath="/manager"
          />
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
}
