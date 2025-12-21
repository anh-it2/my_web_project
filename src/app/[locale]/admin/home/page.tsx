"use client";
import useLoadingStore from "@/app/store/loadingStore";
import AllProblemTable from "@/components/table/AllProblemTable";
import { useListProblem } from "@/hook/problem/useListProblem";
import { Tabs } from "antd";
import { useEffect, useState } from "react";
import "./style.scss";

export default function AdminHomePage() {
  const [activeTab, setActiveTab] = useState<string>("1");
  const stopLoading = useLoadingStore((state) => state.stopLoading);
  useEffect(() => {
    stopLoading();
  }, [stopLoading]);

  const { listProblem } = useListProblem();

  const listActiveProblem = listProblem?.filter((item) => item.active === true);

  const listUncctiveProblem = listProblem?.filter(
    (item) => item.active === false
  );

  return (
    <div className="p-4">
      <Tabs
        activeKey={activeTab}
        onChange={(key) => setActiveTab(key)}
        className="custom__search__tabs"
      >
        <Tabs.TabPane key="1" tab="All Problems">
          <AllProblemTable
            data={listProblem || []}
            addNewProblemLink="/admin/add-problem"
          />
        </Tabs.TabPane>
        <Tabs.TabPane key="2" tab="Public Problems">
          <AllProblemTable
            data={listActiveProblem || []}
            addNewProblemLink="/admin/add-problem"
          />
        </Tabs.TabPane>
        <Tabs.TabPane key="3" tab="Draft Problems">
          <AllProblemTable
            data={listUncctiveProblem || []}
            addNewProblemLink="/admin/add-problem"
          />
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
}
