import ConfirmModal from "@/components/form/ConfirmModal";
import FormHeader from "@/components/form/FormHeader";
import CancelButton from "@/components/shared/Button/FormHeader/CancelButton";
import PublishButton from "@/components/shared/Button/FormHeader/PublishButton";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, Steps } from "antd";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import z from "zod";
import BasicInfoStep from "./components/BasicInfoStep";
import ReviewStep from "./components/Review";
import StatementStep from "./components/StatementStep";
import TestcaseManager from "./components/Testcases";
import { problemFormSchema } from "./constant";

export default function CreateProblem() {
  const [step, setStep] = useState<number>(0);
  //   const [testcases, setTestcases] = useState<Testcase[]>([]);
  const methods = useForm<z.infer<typeof problemFormSchema>>({
    resolver: zodResolver(problemFormSchema),
    defaultValues: {
      title: "",
      problemCode: "",
      difficulty: "EASY",
      tags: [],
      visibility: true,
      timeLimit: 1000,
      memoryLimit: 256,
      description: "",
      samples: [],
      testCases: [],
    },
  });

  const steps = [
    {
      title: "Basic Info",
      content: <BasicInfoStep />,
    },
    {
      title: "Statement & Samples",
      content: <StatementStep />,
    },
    {
      title: "Testcases",
      content: <TestcaseManager />,
    },
    {
      title: "Review",
      content: <ReviewStep />,
    },
  ];

  const t = useTranslations("sidebar");
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [confirmModalLink, setConfirmModalLink] = useState<string>("#");
  const router = useRouter();

  const breadCrumbs = [
    {
      label: t("home"),
      link: "/admin/home",
    },
    {
      label: "Create new problem",
      link: "#",
    },
  ];

  const { handleSubmit } = methods;

  const onSubmit = (values: z.infer<typeof problemFormSchema>) => {
    const payload = {
      ...values,
      testCases: [
        ...values.testCases,
        ...values.samples.map((sample) => ({
          ...sample,
          orderIndex: sample.orderIndex + values.testCases.length,
        })),
      ],
    };
    console.log(values.samples);
    const {
      problemCode,
      title,
      description,
      constraints,
      difficulty,
      timeLimit,
      memoryLimit,
    } = payload;

    const problemData = {
      problemCode,
      title,
      description,
      constraints,
      difficulty,
      timeLimit,
      memoryLimit,
    };

    const { testCases } = payload;

    const testCaseData = { testCases };

    console.log("problemData: ", problemData);
    console.log("testCaseData: ", testCaseData);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormHeader
          setOpenDialog={setOpenDialog}
          title="Assignment"
          breadcrumbs={breadCrumbs}
          setConfirmModalLink={setConfirmModalLink}
          publicButtonTitle="Save Draft"
        />
        <div className="p-6 max-w-6xl mx-auto">
          <Steps
            current={step}
            items={steps.map((s) => ({ title: s.title }))}
          />

          <Card className="mt-6">{steps[step]?.content}</Card>

          <div className="flex justify-between mt-6">
            <CancelButton
              title="Back"
              disable={step === 0}
              onClick={() => setStep((prev) => prev - 1)}
            />
            {step < steps.length - 1 ? (
              <PublishButton
                title="Next"
                isSubmit={false}
                onClickWithE={(e) => {
                  e.preventDefault();
                  setStep((prev) => prev + 1);
                }}
              />
            ) : (
              <PublishButton title="Save Draft" isSubmit={true} />
            )}
          </div>
        </div>
      </form>

      <ConfirmModal
        open={openDialog}
        onOk={() => router.replace(confirmModalLink)}
        onCancel={() => setOpenDialog(false)}
      />
    </FormProvider>
  );
}
