"use client";

import { editProblemFormSchema } from "@/app/[locale]/manager/edit-problem/[id]/constant";
import useLoadingStore from "@/app/store/loadingStore";
import ConfirmModal from "@/components/form/ConfirmModal";
import FormHeader from "@/components/form/FormHeader";
import RHFInput from "@/components/form/RHFInput";
import RHFSelect from "@/components/form/RHFSelect";
import RHFTextArea from "@/components/form/RHFTextArea";
import ListTestCase from "@/components/problem/ListTestCase";
import CancelButton from "@/components/shared/Button/FormHeader/CancelButton";
import PublishButton from "@/components/shared/Button/FormHeader/PublishButton";
import { useUpdateProblem } from "@/hook/problem/useUpdateProblem";
import { ProblemDetail } from "@/services/rest/problem/getProlemDetail/type";
import { TestCase } from "@/services/rest/test-case/get-test-case/type";
import { getErrorMessages } from "@/utils/fetFormError";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, Col, message, Row } from "antd";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";


// Animation variants
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
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.4,
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    scale: 0.95,
    transition: {
      duration: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
    },
  },
};

export type EditProblemFormValues = z.infer<typeof editProblemFormSchema>;

type EditFormProps = {
  problemDetail: ProblemDetail;
  testCases: TestCase[];
  problemId: string;
};

export default function EditForm({ problemDetail, testCases, problemId }: EditFormProps) {
  const methods = useForm<EditProblemFormValues>({
    resolver: zodResolver(editProblemFormSchema),
    defaultValues: {
      title: problemDetail.title,
      problemCode: problemDetail.problemCode,
      difficultyLevel: problemDetail.difficultyLevel,
      timeLimit: problemDetail.timeLimit,
      memoryLimit: problemDetail.memoryLimit,
      description: problemDetail.description,
      constraints: problemDetail.constraints,
      sampleInput: problemDetail.sampleInput || '',
      sampleOutput: problemDetail.sampleOutput || '',
    },
  });

  const { handleSubmit, formState: { errors } } = methods;
  const router = useRouter();
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [confirmModalLink, setConfirmModalLink] = useState<string>("#");
  const { updateProblemAsync } = useUpdateProblem();
  const startLoading = useLoadingStore((state) => state.startLoading)
  const stopLoading = useLoadingStore((state) => state.stopLoading)

  useEffect(() => {
  const messages = getErrorMessages(errors);
  if (messages.length === 0) return;

  const showMessages = async () => {
    for (const msg of messages) {
      message.error(msg);
      await new Promise((r) => setTimeout(r, 1000)); // thời gian hiển thị
    }
  };

  showMessages();
}, [errors]);

  const onSubmit = async (values: EditProblemFormValues) => {
    console.log("Submit payload to API:", values);
    startLoading()
    await updateProblemAsync({payload: values, problemId: problemId});
    router.push("/admin/home");
    stopLoading()
  };

  const breadCrumbs = [
    {
      label: "Home",
      link: "/admin/home",
    },
    {
      label: "Edit problem",
      link: "#",
    },
  ];

  console.log(problemDetail)


  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormHeader
          setOpenDialog={setOpenDialog}
          title="Assignment"
          breadcrumbs={breadCrumbs}
          setConfirmModalLink={setConfirmModalLink}
          publicButtonTitle="Save Changes"
        />

        <motion.div
          className="p-6 space-y-6"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div variants={cardVariants}>
            <Card title="Edit Problem" className="rounded-2xl">
              <Row gutter={[16, 16]}>
                <Col xs={24} md={12}>
                  <motion.div variants={itemVariants}>
                    <RHFInput
                      name="title"
                      label="Problem Title"
                      required
                      placeholder="Enter problem title"
                    />
                  </motion.div>
                  <motion.div variants={itemVariants}>
                    <RHFSelect
                      name="difficultyLevel"
                      label="Difficulty"
                      required
                      options={[
                        { label: "Easy", value: "EASY" },
                        { label: "Medium", value: "MEDIUM" },
                        { label: "Hard", value: "HARD" },
                      ]}
                    />
                  </motion.div>
                </Col>

                <Col xs={24} md={12}>
                  <motion.div variants={itemVariants}>
                    <RHFInput
                      name="problemCode"
                      label="Problem code"
                      placeholder="Enter problem code"
                      readOnly={true}
                      required
                    />
                  </motion.div>
                   <motion.div
                    className="flex flex-row gap-2"
                    variants={itemVariants}
                  >
                    <RHFInput
                      name="timeLimit"
                      label="Time Limit"
                      type="number"
                      addonAfter="ms"
                      required
                    />

                    <RHFInput
                      name="memoryLimit"
                      label="Memory Limit"
                      type="number"
                      addonAfter="MB"
                      required
                    />
                  </motion.div>
                </Col>

                <Col xs={24}>
                  <motion.div variants={itemVariants}>
                    <RHFTextArea
                      name="description"
                      label="Description"
                      placeholder="Problem description"
                      rows={6}
                    />
                  </motion.div>
                </Col>
              </Row>
            </Card>
          </motion.div>

          <motion.div variants={cardVariants}>
            <Card title="Test Cases" className="rounded-2xl">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold">
                  Problem Test Cases & Constraints
                </h3>
              </div>

              <motion.div variants={itemVariants} className="mb-4">
                <RHFInput name="constraints" label="Constraints" required />
              </motion.div>

              <motion.div variants={itemVariants} className="mb-4">
                <div className="flex flex-col sm:flex-row gap-2">
                  <RHFInput name="sampleInput" label="Sample Input" required />
                  <RHFInput name="sampleOutput" label="Sample Output" required />
                </div>
              </motion.div>

              <ListTestCase testcases={testCases} visible={false} />
            </Card>
          </motion.div>

          <motion.div className="flex justify-end gap-3" variants={cardVariants}>
            <CancelButton
              title="Cancel"
              onClick={() => router.replace("/admin/home")}
            />
            <PublishButton title="Save Changes" isSubmit={true} />
          </motion.div>
        </motion.div>
      </form>
      <ConfirmModal
        open={openDialog}
        onOk={() => router.replace(confirmModalLink)}
        onCancel={() => setOpenDialog(false)}
      />
    </FormProvider>
  );
}
