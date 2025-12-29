"use client";

import ConfirmModal from "@/components/form/ConfirmModal";
import FormHeader from "@/components/form/FormHeader";
import RHFInput from "@/components/form/RHFInput";
import RHFSelect from "@/components/form/RHFSelect";
import RHFSwitch from "@/components/form/RHFSwitch";
import RHFTextArea from "@/components/form/RHFTextArea";
import CancelButton from "@/components/shared/Button/FormHeader/CancelButton";
import DangerButton from "@/components/shared/Button/FormHeader/DangerButton";
import PublishButton from "@/components/shared/Button/FormHeader/PublishButton";
import { ProblemDetail } from "@/services/rest/problem/getProlemDetail/type";
import { TestCase } from "@/services/rest/test-case/get-test-case/type";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, Col, Flex, Row, Typography } from "antd";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { editProblemFormSchema } from "../constant";

const { Title, Text } = Typography;

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
};

export default function EditForm({ problemDetail, testCases }: EditFormProps) {
  const methods = useForm<EditProblemFormValues>({
    resolver: zodResolver(editProblemFormSchema),
    defaultValues: {
      title: problemDetail.title,
      problemCode: problemDetail.problemCode,
      difficultyLevel: problemDetail.difficultyLevel,
      active: problemDetail.active,
      timeLimit: problemDetail.timeLimit,
      memoryLimit: problemDetail.memoryLimit,
      description: problemDetail.description,
      constraints: problemDetail.constraints,
      testCases: testCases || [],
    },
  });

  const { control, handleSubmit } = methods;
  const t = useTranslations("problem");
  const router = useRouter();
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [confirmModalLink, setConfirmModalLink] = useState<string>("#");

  const onSubmit = (values: EditProblemFormValues) => {
    console.log("Submit payload to API:", values);
  };

  const { fields, append, remove } = useFieldArray({
    control,
    name: "testCases",
    keyName: "fieldId",
    shouldUnregister: true,
  });

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

  const handleRemove = (index: number) => {
    remove(index);
  };

  console.log(fields)

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

                <Col xs={24} md={12}>
                  <motion.div variants={itemVariants}>
                    <RHFSelect
                      name="difficulty"
                      label="Difficulty"
                      required
                      options={[
                        { label: "Easy", value: "EASY" },
                        { label: "Medium", value: "MEDIUM" },
                        { label: "Hard", value: "HARD" },
                      ]}
                    />
                  </motion.div>
                  <motion.div variants={itemVariants}>
                    <Flex align="center" gap={3}>
                      <RHFSwitch name="active" />
                      <div>
                        <Title level={5}>{t("publish_title")}</Title>
                        <Text>{t("publish_description")}</Text>
                      </div>
                    </Flex>
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
                <CancelButton
                  title="Add Test cases"
                  onClickWithE={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    append({
                      input: "",
                      expectedOutput: "",
                      orderIndex: fields.length + 1,
                      isSample: false,
                    });
                  }}
                />
              </div>

              <motion.div variants={itemVariants} className="mb-4">
                <RHFInput name="constraints" label="Constraints" required />
              </motion.div>

                {fields.map((f: any, i) => (
                  <motion.div
                    key={f.fieldId}
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="mb-4"
                  >
                    <Card size="small" className="space-y-2">
                      <Row gutter={[16, 16]}>
                        <Col xs={24} md={10}>
                          <RHFInput
                            name={`testCases.${i}.input`}
                            placeholder="Enter your test case input"
                            label="Test Case Input"
                          />
                        </Col>

                        <Col xs={24} md={10}>
                          <RHFInput
                            name={`testCases.${i}.expectedOutput`}
                            placeholder="Enter your test case output"
                            label="Test Case Output"
                          />
                        </Col>

                        <Col xs={24} md={4}>
                          <div className="flex items-center gap-2">
                            <RHFSwitch name={`testCases.${i}.isSample`} />
                            <span className="text-sm font-medium">
                              Is Sample
                            </span>
                          </div>
                        </Col>
                      </Row>

                      <DangerButton
                        title="Remove"
                        onClickWithE={(e: React.MouseEvent<HTMLElement>) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleRemove(i);
                        }}
                      />
                    </Card>
                  </motion.div>
                ))}
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
