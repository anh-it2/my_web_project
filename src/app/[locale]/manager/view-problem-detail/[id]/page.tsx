"use client";
import useLoadingStore from "@/app/store/loadingStore";
import ConfirmModal from "@/components/form/ConfirmModal";
import FormHeader from "@/components/form/FormHeader";
import ListTestCase from "@/components/problem/ListTestCase";
import ProblemDetailPage from "@/components/problem/ProblemDetail";
import RouteLoading from "@/components/shared/RouteLoading";
import { useProblemDetail } from "@/hook/problem/useProblemDetail";
import useGetListTestCase from "@/hook/test-case/useGetListTestCase";
import { Tabs } from "antd";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ContestDetail({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = useState<string>("1");

  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [confirmModalLink, setConfirmModalLink] = useState<string>("#");
  const router = useRouter();
  const t = useTranslations("sidebar");
  const stopLoading = useLoadingStore((state) => state.stopLoading);
  useEffect(() => {
    stopLoading();
  }, [stopLoading]);

  const breadCrumbs = [
    {
      label: t("home"),
      link: "/manager/home",
    },
    {
      label: "Problem Detail",
      link: "#",
    },
  ];

  const { problemDetail } = useProblemDetail(params.id);

  const { listTestCase } = useGetListTestCase(params.id);


  if (!problemDetail) return <RouteLoading />;

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
            <ProblemDetailPage
              data={problemDetail}
              testCases={listTestCase?.content || []}
            />
          </Tabs.TabPane>
          <Tabs.TabPane key="2" tab="List Test Case">
            <ListTestCase testcases={listTestCase?.content || []} />
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
