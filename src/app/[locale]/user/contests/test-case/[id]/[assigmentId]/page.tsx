"use client";
import useLoadingStore from "@/app/store/loadingStore";
import ConfirmModal from "@/components/form/ConfirmModal";
import FormHeader from "@/components/form/FormHeader";
import RouteLoading from "@/components/shared/RouteLoading";
import { useListTestCaseResult } from "@/hook/submission/useGetTestCaseResult";
import { useSubmissionDetail } from "@/hook/submission/useSubmissionDetail";
import { useRouter } from "@/libs/routing";
import { TestCaseResult } from "@/services/rest/submission/get-list-test-case-result/type";
import { mapLanguage } from "@/utils/map";
import {
  CheckCircleFilled,
  CloseCircleFilled,
  InfoCircleFilled,
} from "@ant-design/icons";
import { Card, Table, Tag, Tooltip } from "antd";
import { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import InfoRow from "./components/InfoRow";
import ResultModal from "./components/ResultModal";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

const codeSectionVariants = {
  hidden: { opacity: 0, height: 0 },
  visible: {
    opacity: 1,
    height: "auto",
    transition: {
      duration: 0.3,
    },
  },
  exit: {
    opacity: 0,
    height: 0,
    transition: {
      duration: 0.3,
    },
  },
};

export default function TestCasePage({
  params,
}: {
  params: { id: string; assigmentId: string };
}) {
  const [showCode, setShowCode] = useState(false);

  const { id, assigmentId } = params;

  const [openModal, setOpenModal] = useState<boolean>(false);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [confirmModalLink, setConfirmModalLink] = useState<string>("#");
  const t = useTranslations("sidebar");
  const router = useRouter();
  const stopLoading = useLoadingStore((state) => state.stopLoading);
  useEffect(() => {
    stopLoading();
  }, [stopLoading]);
  const { submissionDetail } = useSubmissionDetail(id);
  const {listTestCaseResult} = useListTestCaseResult(id)


  if (!submissionDetail) return <RouteLoading />;

  const renderStatusText = (status: string) => {
    switch (status) {
      case "ACCEPTED":
        return <span className="text-green-600 font-semibold">Accepted</span>;

      case "WRONG_ANSWER":
        return <span className="text-red-600 font-semibold">Wrong Answer</span>;

      case "TIME_LIMIT_EXCEEDED":
        return (
          <span className="text-orange-500 font-semibold">
            Time Limit Exceeded
          </span>
        );

      default:
        return <span className="text-gray-500 font-semibold">{status}</span>;
    }
  };

  const columns: ColumnsType<TestCaseResult> = [
    {
      title: "Tính điểm",
      dataIndex: "passed",
      align: "center",
      render: (passed) => {
        return (
          <Tooltip
            title={
              passed
                ? "Test case của bạn được tính điểm"
                : "Test case của bạn không được tính điểm"
            }
            color={
              passed
                ? "#16A34A"
                : "#DC2626"
            }
            overlayInnerStyle={{
              color: "white",
              fontWeight: 500,
              borderRadius: 8,
              fontSize: 14,
            }}
          >
            <motion.span
              className="cursor-pointer hover:scale-110 transition inline-flex"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {passed ? (
                <CheckCircleFilled className="text-green-500 text-2xl" />
              ) : (
                <CloseCircleFilled className="text-red-500 text-2xl" />
              )}
            </motion.span>
          </Tooltip>
        );
      },
    },
    {
      title: "Thông báo",
      dataIndex: "passed",
      align: "center",
      render: (passed) => {
        if (passed) {
          return (
            <Tag color="green" className="font-medium text-base">
              Accepted
            </Tag>
          );
        } else  {
          return (
            <Tag color="red" className="font-medium text-base">
              Wrong Answer
            </Tag>
          );
        }
      },
    },
    {
      title: "Thời gian chạy (ms)",
      dataIndex: "timeTaken",
      align: "center",
    },
    {
      title: "Bộ nhớ (MB)",
      dataIndex: "memoryUsed",
      align: "center",
      render: (v: number) => v.toLocaleString(),
    },
    {
      title: "Thao tác",
      align: "center",
      render: (record: TestCaseResult) => (
        <>
          <motion.span whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
            <InfoCircleFilled className="text-blue-500 text-xl cursor-pointer" onClick={() => setOpenModal(true)}/>
          </motion.span>
          <ResultModal open={openModal} onClose={() => setOpenModal(false)} input={record.input} expectedOutput={record.expectedOutput} output={record.actualOutput}/>
        </>
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
      link: `/user/contests/assignment/${assigmentId}`,
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
      <motion.div
        className="grid grid-cols-12 gap-4 p-4"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div variants={cardVariants} className="col-span-8">
          <Card
            title="Test Case"
            className="rounded-xl transition-all duration-500"
          >
            <Table
              rowKey="testCaseId"
              columns={columns}
              dataSource={listTestCaseResult || []}
              pagination={{ pageSize: 5 }}
            />
            <motion.div
              className="flex items-center gap-2 text-sm font-medium text-gray-800 cursor-pointer select-none mt-3"
              onClick={() => setShowCode((prev) => !prev)}
              whileHover={{ x: 5 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="text-xl font-medium">Mã nguồn</span>
              <motion.span
                className="text-blue-400"
                animate={{ rotate: showCode ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                ▼
              </motion.span>
            </motion.div>

            <AnimatePresence>
              {showCode && (
                <motion.div
                  variants={codeSectionVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="mt-3 bg-[#0f172a] rounded-lg p-4 text-sm text-gray-100 overflow-auto"
                >
                  <pre className="whitespace-pre-wrap">
                    <code>{submissionDetail?.code}</code>
                  </pre>
                </motion.div>
              )}
            </AnimatePresence>
          </Card>
        </motion.div>

        <motion.div
          variants={cardVariants}
          className="col-span-4"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="rounded-xl">
            <motion.div
              className="space-y-3 text-sm"
              initial="hidden"
              animate="visible"
              variants={containerVariants}
            >
              <motion.div variants={cardVariants}>
                <InfoRow label="Trạng thái">
                  {renderStatusText(submissionDetail?.status || "")}
                </InfoRow>
              </motion.div>

              <motion.div variants={cardVariants}>
                <InfoRow label="Đạt">
                  {submissionDetail.passedTestcases}/
                  {submissionDetail.totalTestcases} test cases
                </InfoRow>
              </motion.div>
              <motion.div variants={cardVariants}>
                <InfoRow label="Điểm">
                  {(
                    (submissionDetail.passedTestcases /
                      submissionDetail.totalTestcases) *
                    100
                  ).toFixed(2)}{" "}
                </InfoRow>
              </motion.div>
              <motion.div variants={cardVariants}>
                <InfoRow label="Ngôn ngữ">
                  {mapLanguage(submissionDetail.language)}
                </InfoRow>
              </motion.div>
              <motion.div variants={cardVariants}>
                <InfoRow label="Tổng thời gian chạy">
                  {submissionDetail?.executionTime} ms
                </InfoRow>
              </motion.div>
              <motion.div variants={cardVariants}>
                <InfoRow label="Thời gian tạo">
                  {dayjs(submissionDetail?.judgedAt).format(
                    "DD/MM/YYYY HH:mm:ss"
                  )}
                </InfoRow>
              </motion.div>
            </motion.div>
          </Card>
        </motion.div>
      </motion.div>
      <ConfirmModal
        open={openDialog}
        onOk={() => router.replace(confirmModalLink)}
        onCancel={() => setOpenDialog(false)}
      />
    </>
  );
}
