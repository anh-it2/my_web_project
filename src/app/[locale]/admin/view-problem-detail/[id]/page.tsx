"use client";
import ConfirmModal from "@/components/form/ConfirmModal";
import FormHeader from "@/components/form/FormHeader";
import { Tabs } from "antd";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useState } from "react";
import "../style.scss";
import ListTestCase from "./components/ListTestCase";
import ProblemDetailPage from "./components/ProblemDetail";

export default function ContestDetail({ params }: { params: { id: string } }) {
  const { id } = params;
  const [activeTab, setActiveTab] = useState<string>("1");

  console.log(id);

  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [confirmModalLink, setConfirmModalLink] = useState<string>("#");
  const router = useRouter();
  const t = useTranslations("sidebar");

  const breadCrumbs = [
    {
      label: t("home"),
      link: "/admin/home",
    },
    {
      label: "Problem Detail",
      link: "#",
    },
  ];

  return (
    <>
      <FormHeader
        setOpenDialog={setOpenDialog}
        title="Assignment"
        breadcrumbs={breadCrumbs}
        setConfirmModalLink={setConfirmModalLink}
        has_button={false}
      />
      <div className="p-4 px-6">
        <Tabs
          activeKey={activeTab}
          onChange={(key) => setActiveTab(key)}
          className="custom__search__tabs"
        >
          <Tabs.TabPane key="1" tab="Product Detail">
            <ProblemDetailPage />
          </Tabs.TabPane>
          <Tabs.TabPane key="2" tab="List Test Case">
            <ListTestCase />
          </Tabs.TabPane>
        </Tabs>
      </div>
      <ConfirmModal
        open={openDialog}
        onOk={() => router.replace(confirmModalLink)}
        onCancel={() => setOpenDialog(false)}
      />
    </>
  );
}
