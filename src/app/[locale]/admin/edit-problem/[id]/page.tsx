"use client";

import useLoadingStore from "@/app/store/loadingStore";
import ConfirmModal from "@/components/form/ConfirmModal";
import FormHeader from "@/components/form/FormHeader";
import RHFInput from "@/components/form/RHFInput";
import RHFSelect from "@/components/form/RHFSelect";
import RHFSelectTags from "@/components/form/RHFSelectTags";
import RHFSwitch from "@/components/form/RHFSwitch";
import RHFTextArea from "@/components/form/RHFTextArea";
import CancelButton from "@/components/shared/Button/FormHeader/CancelButton";
import PublishButton from "@/components/shared/Button/FormHeader/PublishButton";
import { problemSchema } from "@/data/mock";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, Flex, Form, Table, Typography } from "antd";
import { ColumnsType } from "antd/es/table";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";

/* =====================
   Fake API types & data
===================== */

type ProblemDTO = {
  id: string;
  title: string;
  difficulty: "EASY" | "MEDIUM" | "HARD";
  tags: string[];
  visibility: boolean;
  timeLimit: number;
  memoryLimit: number;
  description: string;
  samples: { input: string; output: string }[];
  testCases: { input: string; output: string; score: number }[];
};

const fakeProblemFromApi: ProblemDTO = {
  id: "prob_001",
  title: "Sum of Two Numbers",
  difficulty: "EASY",
  tags: ["math", "array"],
  visibility: true,
  timeLimit: 1000,
  memoryLimit: 256,
  description: "Given two integers, return their sum.",
  samples: [
    { input: "1 2", output: "3" },
    { input: "5 7", output: "12" },
  ],
  testCases: [
    { input: "10 20", output: "30", score: 50 },
    { input: "100 200", output: "300", score: 50 },
  ],
};

type SampleRow = {
  input: string;
  output: string;
};

type TestCaseRow = {
  input: string;
  output: string;
  score: number;
};

const sampleColumns: ColumnsType<SampleRow> = [
  {
    title: "Input",
    dataIndex: "input",
    key: "input",
    align: "center",
    render: (_: unknown, __: SampleRow, index: number) => (
      <RHFInput name={`samples.${index}.input`} />
    ),
  },
  {
    title: "Output",
    dataIndex: "output",
    key: "output",
    align: "center",
    render: (_: unknown, __: SampleRow, index: number) => (
      <RHFInput name={`samples.${index}.output`} />
    ),
  },
];

const testCaseColumns: ColumnsType<TestCaseRow> = [
  {
    title: "Input",
    dataIndex: "input",
    key: "input",
    align: "center",
    render: (_: string, __: TestCaseRow, index: number) => (
      <RHFInput
        name={`testCases.${index}.input`}
        type="text"
        placeholder="Input"
      />
    ),
  },
  {
    title: "Output",
    dataIndex: "output",
    key: "output",
    align: "center",
    render: (_: string, __: TestCaseRow, index: number) => (
      <RHFInput
        name={`testCases.${index}.output`}
        type="text"
        placeholder="Output"
      />
    ),
  },
  {
    title: "Score",
    dataIndex: "score",
    key: "score",
    align: "center",
    width: 120,
    render: (_: number, __: TestCaseRow, index: number) => (
      <RHFInput
        name={`testCases.${index}.score`}
        type="number"
        placeholder="Score"
      />
    ),
  },
];

const { Title, Text } = Typography;

export type EditProblemFormValues = z.infer<typeof problemSchema>;

/* =====================
   Edit Problem Page
===================== */

export default function EditProblemPage() {
  const methods = useForm<EditProblemFormValues>({
    resolver: zodResolver(problemSchema),
    defaultValues: {
      title: "",
      difficulty: "EASY",
      tags: [],
      visibility: true,
      timeLimit: 1000,
      memoryLimit: 256,
      description: "",
    },
  });

  const { reset, handleSubmit } = methods;
  const t = useTranslations("problem");
  const router = useRouter();
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [confirmModalLink, setConfirmModalLink] = useState<string>("#");
  const stopLoading = useLoadingStore((state) => state.stopLoading);
  useEffect(() => {
    stopLoading();
  }, [stopLoading]);
  // simulate fetch API
  useEffect(() => {
    reset({
      title: fakeProblemFromApi.title,
      difficulty: fakeProblemFromApi.difficulty,
      tags: fakeProblemFromApi.tags,
      visibility: fakeProblemFromApi.visibility,
      timeLimit: fakeProblemFromApi.timeLimit,
      memoryLimit: fakeProblemFromApi.memoryLimit,
      description: fakeProblemFromApi.description,
    });
  }, [reset]);

  const onSubmit = (values: EditProblemFormValues) => {
    console.log("Submit payload to API:", values);
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

  return (
    <FormProvider {...methods}>
      <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
        <FormHeader
          setOpenDialog={setOpenDialog}
          title="Assignment"
          breadcrumbs={breadCrumbs}
          setConfirmModalLink={setConfirmModalLink}
          publicButtonTitle="Save Changes"
        />

        <div className="p-6 space-y-6">
          <Card title="Edit Problem" className="rounded-2xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <RHFInput
                name="title"
                label="Problem Title"
                required
                placeholder="Enter problem title"
              />

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

              <RHFSelectTags
                name="tags"
                label="Tags"
                required
                options={[
                  { label: "Math", value: "math" },
                  { label: "Array", value: "array" },
                  { label: "String", value: "string" },
                ]}
              />
              <div className="md:row-span-2">
                <RHFTextArea
                  name="description"
                  label="Description"
                  placeholder="Problem description"
                  rows={6}
                />
              </div>

              <div className="flex flex-row gap-2">
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
              </div>
            </div>

            <Flex align="center" gap={10}>
              <RHFSwitch name="visibility" />
              <div>
                <Title level={5}>{t("publish_title")}</Title>
                <Text>{t("publish_description")}</Text>
              </div>
            </Flex>
          </Card>

          <Card title="Sample Tests" className="rounded-2xl">
            <Table
              dataSource={fakeProblemFromApi.samples}
              columns={sampleColumns}
              pagination={false}
              rowKey={(r) => r.input}
            />
          </Card>

          <Card title="Test Cases" className="rounded-2xl">
            <Table
              dataSource={fakeProblemFromApi.testCases}
              columns={testCaseColumns}
              pagination={false}
              rowKey={(r) => r.input}
            />
          </Card>

          <div className="flex justify-end gap-3">
            <CancelButton
              title="Cancel"
              onClick={() => router.replace("/admin/home")}
            />
            <PublishButton title="Save Changes" isSubmit={true} />
          </div>
        </div>
      </Form>
      <ConfirmModal
        open={openDialog}
        onOk={() => router.replace(confirmModalLink)}
        onCancel={() => setOpenDialog(false)}
      />
    </FormProvider>
  );
}
