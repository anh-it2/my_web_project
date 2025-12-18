"use client";
import ConfirmModal from "@/components/form/ConfirmModal";
import FormHeader from "@/components/form/FormHeader";
import RouteLoading from "@/components/shared/RouteLoading";
import { useSubmissionDetail } from "@/hook/submission/useSubmissionDetail";
import { PerTestResults } from "@/services/rest/submission/type";
import {
  CheckCircleFilled,
  CloseCircleFilled,
  InfoCircleFilled,
} from "@ant-design/icons";
import { Card, Table, Tag, Tooltip } from "antd";
import { ColumnsType } from "antd/es/table";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useState } from "react";
import InfoRow from "./components/InfoRow";

export default function TestCasePage({ params }: { params: { id: string } }) {
  const [showCode, setShowCode] = useState(false);

  const { id } = params;

  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [confirmModalLink, setConfirmModalLink] = useState<string>("#");
  const t = useTranslations("sidebar");
  const router = useRouter();

  const { submissionDetail } = useSubmissionDetail(id);

  console.log(submissionDetail);

  if (!submissionDetail) return <RouteLoading />;

  const renderStatusText = (status: string) => {
    switch (status) {
      case "Accepted":
        return <span className="text-green-600 font-semibold">Accepted</span>;

      case "Wrong Answer":
        return <span className="text-red-600 font-semibold">Wrong Answer</span>;

      case "Partial":
        return (
          <span className="text-orange-500 font-semibold">
            Time Limit Exceeded
          </span>
        );

      default:
        return <span className="text-gray-500 font-semibold">{status}</span>;
    }
  };

  const columns: ColumnsType<PerTestResults> = [
    {
      title: "Tính điểm",
      dataIndex: "status",
      align: "center",
      render: (status) => {
        return (
          <Tooltip
            title={
              status === "Accepted"
                ? "Test case của bạn được tính điểm"
                : "Test case của bạn không được tính điểm"
            }
            color={
              status === "Accepted"
                ? "#16A34A"
                : status === "Time Limit Exceeded"
                ? "#F97316"
                : "#DC2626"
            }
            overlayInnerStyle={{
              color: "white",
              fontWeight: 500,
              borderRadius: 8,
              fontSize: 14,
            }}
          >
            <span className="cursor-pointer hover:scale-110 transition inline-flex">
              {status === "Accepted" ? (
                <CheckCircleFilled className="text-green-500 text-2xl" />
              ) : (
                <CloseCircleFilled className="text-red-500 text-2xl" />
              )}
            </span>
          </Tooltip>
        );
      },
    },
    // {
    //   title: "Điểm",
    //   dataIndex: "score",
    // },
    {
      title: "Thông báo",
      dataIndex: "status",
      align: "center",
      render: (status) => {
        if (status === "Accepted") {
          return (
            <Tag color="green" className="font-medium text-sm">
              Accepted
            </Tag>
          );
        } else if (status === "Wrong Answer") {
          return (
            <Tag color="red" className="font-medium text-sm">
              Wrong Answer
            </Tag>
          );
        }
        return (
          <Tag color="orange" className="font-medium text-sm">
            Time Limit Exceeded
          </Tag>
        );
      },
    },
    {
      title: "Thời gian chạy (ms)",
      dataIndex: "runtime",
      align: "center",
    },
    {
      title: "Bộ nhớ (MB)",
      dataIndex: "memory",
      align: "center",
      render: (v: number) => v.toLocaleString(),
    },
    {
      title: "Thao tác",
      align: "center",
      render: () => (
        <InfoCircleFilled className="text-blue-500 text-xl cursor-pointer" />
      ),
    },
  ];

  const breadCrumbs = [
    {
      label: t("home"),
      link: "/user/home",
    },
    {
      label: t("programmingContests"),
      link: "/user/contests",
    },
    {
      label: "Class",
      link: "/user/contests/detail/1",
    },
    {
      label: "Current Assignment",
      link: "#",
    },
    {
      label: "Test case",
      link: "#",
    },
  ];

  return (
    <>
      <FormHeader
        setOpenDialog={setOpenDialog}
        title={`Test Case for submission ${id}`}
        breadcrumbs={breadCrumbs}
        setConfirmModalLink={setConfirmModalLink}
        has_button={false}
      />
      <div className="grid grid-cols-12 gap-4 p-4">
        <Card
          title="Test Case"
          className="col-span-8 rounded-xl transition-all duration-500"
        >
          <Table
            rowKey="testCaseId"
            columns={columns}
            dataSource={submissionDetail.per_test_results}
            pagination={{ pageSize: 5 }}
          />
          <div
            className="flex items-center gap-2 text-sm font-medium text-gray-800 cursor-pointer select-none mt-3"
            onClick={() => setShowCode((prev) => !prev)}
          >
            <span className="text-xl font-medium">Mã nguồn</span>
            <span
              className={`text-blue-400 transition-transform ${
                showCode ? "rotate-180" : ""
              }`}
            >
              ▼
            </span>
          </div>

          {showCode && (
            <div
              className={`mt-3 bg-[#0f172a] rounded-lg p-4 text-sm text-gray-100 overflow-auto transition-all duration-500 ${
                showCode ? "max-h-96" : "max-h-0"
              }`}
            >
              <pre className="whitespace-pre-wrap">
                <code>{submissionDetail?.code}</code>
              </pre>
            </div>
          )}
        </Card>

        <Card className="col-span-4 rounded-xl">
          <div className="space-y-3 text-sm">
            <InfoRow label="Trạng thái">
              {renderStatusText(submissionDetail?.status || "")}
            </InfoRow>

            <InfoRow label="Đạt">
              {
                submissionDetail?.per_test_results.filter(
                  (item) => item.status === "Accepted"
                ).length
              }{" "}
              / {submissionDetail?.per_test_results.length} test cases
            </InfoRow>
            <InfoRow label="Điểm">{submissionDetail?.score} </InfoRow>
            <InfoRow label="Ngôn ngữ">Java 13 </InfoRow>
            <InfoRow label="Tổng thời gian chạy">
              {submissionDetail?.runtime} ms
            </InfoRow>
            <InfoRow label="Thời gian tạo">
              {submissionDetail?.created_at}
            </InfoRow>
          </div>
        </Card>
      </div>
      <ConfirmModal
        open={openDialog}
        onOk={() => router.replace(confirmModalLink)}
        onCancel={() => setOpenDialog(false)}
      />
    </>
  );
}
