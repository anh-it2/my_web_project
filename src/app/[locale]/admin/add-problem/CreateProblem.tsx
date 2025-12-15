import CancelButton from "@/components/shared/Button/FormHeader/CancelButton";
import PublishButton from "@/components/shared/Button/FormHeader/PublishButton";
import { ProblemFormValues } from "@/services/rest/add-problem/type.t";
import { Card, Steps } from "antd";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import BasicInfoStep from "./components/BasicInfoStep";
import ReviewStep from "./components/Review";
import StatementStep from "./components/StatementStep";
import TestcaseManager from "./components/Testcases";

export default function CreateProblem() {
  const [step, setStep] = useState<number>(0);
  //   const [testcases, setTestcases] = useState<Testcase[]>([]);
  const methods = useForm<ProblemFormValues>({
    defaultValues: {
      title: "",
      difficulty: "EASY",
      tags: [],
      visibility: true,
      timeLimit: 1000,
      memoryLimit: 256,
      statement: "",
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

  const { handleSubmit } = methods;
  const onSubmit = () => {
    //do any thing
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
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
                onClick={() => setStep((prev) => prev + 1)}
              />
            ) : (
              <PublishButton title="Save Draft" isSubmit={false} />
            )}
          </div>
        </div>
      </form>
    </FormProvider>
  );
}
