import ConfirmModal from "@/components/form/ConfirmModal";
import FormHeader from "@/components/form/FormHeader";
import CancelButton from "@/components/shared/Button/FormHeader/CancelButton";
import PublishButton from "@/components/shared/Button/FormHeader/PublishButton";
import RouteLoading from "@/components/shared/RouteLoading";
import { useAddProblem } from "@/hook/problem/useAddProblem";
import { useAddTestCase } from "@/hook/test-case/useAddTestCase";
import { useRouter } from "@/libs/routing";
import { getErrorMessages } from "@/utils/fetFormError";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, message, notification, Steps } from "antd";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import z from "zod";
import BasicInfoStep from "./components/BasicInfoStep";
import { problemFormSchema } from "./constant";

const StatementStep = dynamic(() => import('./components/StatementStep'));
const ReviewStep = dynamic(() => import('./components/Review'));
const TestcaseManager = dynamic(() => import('./components/Testcases'));

export default function CreateProblem() {

  const [api, contextHolder] = notification.useNotification();

  const [step, setStep] = useState<number>(0);
  //   const [testcases, setTestcases] = useState<Testcase[]>([]);
  const methods = useForm<z.infer<typeof problemFormSchema>>({
    resolver: zodResolver(problemFormSchema),
    defaultValues: {
      title: "",
      problemCode: "",
      difficultyLevel: "EASY",
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
  const tt = useTranslations("addProblem.createProblem");
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [confirmModalLink, setConfirmModalLink] = useState<string>("#");
  const [loadingMessage, setLoadingMessage] = useState<string>(tt("loadingMessage"));
  const router = useRouter();

  const breadCrumbs = [
    {
      label: t("home"),
      link: "/manager/home",
    },
    {
      label: tt("createBreadCrumb"),
      link: "#",
    },
  ];

  const {
    handleSubmit,
    formState: { isSubmitting, errors },
  } = methods;

  const { addProblemAsync } = useAddProblem();
  const { addTestCaseAsync } = useAddTestCase();

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


  const onSubmit = async (values: z.infer<typeof problemFormSchema>) => {
    const payload = {
      ...values,
      sampleInput: values.samples[0]?.input || '',
      sampleOutput: values.samples[0]?.expectedOutput || '',
    };
    const {
      problemCode,
      title,
      description,
      constraints,
      difficultyLevel,
      timeLimit,
      memoryLimit,
      sampleInput,
      sampleOutput,
    } = payload;

    const problemData = {
      problemCode,
      title,
      description,
      constraints,
      difficultyLevel,
      timeLimit,
      memoryLimit,
      inputFormat: null,
      outputFormat: null,
      sampleInput,
      sampleOutput,
    };


    const res = await addProblemAsync({ payload: problemData });

    if (!res.ok) {
      if (res.status === 409) {
        api.error({
          title: tt("errorProblemExists"),
          description:
            tt("errorProblemExistsDesc"),
        });
        return;
      }

      api.error({
        title: tt("errorUnexpected"),
        description: tt("errorUnexpectedDesc"),
      });
      return;
    }

    setLoadingMessage(tt("problemSuccessMessage"));

    const problemId = res.data.problemId;
    await addTestCaseAsync({
      payload: { testcases: values.testCases },
      problemId,
    });
    setLoadingMessage(tt("testcasesSuccessMessage"));
    router.push("/manager/home");
  };


  if (isSubmitting) return <RouteLoading message={loadingMessage} />;

  return (
    <>
      {contextHolder}
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

            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{
                  opacity: { duration: 0.2 },
                  layout: { duration: 0.3, ease: "easeInOut" },
                }}
              >
                <Card className="mt-6">
                  {steps[step]?.content}
                </Card>
              </motion.div>
            </AnimatePresence>

            {/* BUTTON – layout cố định */}
            <div className="flex justify-between mt-6">
              <CancelButton
                title="Back"
                disable={step === 0}
                onClick={() => setStep((prev) => prev - 1)}
              />

              <AnimatePresence mode="wait">
                {step < steps.length - 1 ? (
                  <motion.div
                    key="next"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.5 }}
                  >
                    <PublishButton
                      title="Next"
                      isSubmit={false}
                      onClickWithE={(e) => {
                        e.preventDefault();
                        setStep((prev) => prev + 1);
                      }}
                    />
                  </motion.div>
                ) : (
                  <motion.div
                    key="save"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.5 }}
                  >
                    <PublishButton title="Save Draft" isSubmit={true} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </form>

        <ConfirmModal
          open={openDialog}
          onOk={() => router.replace(confirmModalLink)}
          onCancel={() => setOpenDialog(false)}
        />
      </FormProvider>
    </>
  );
}
