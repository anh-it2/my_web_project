"use client";
import useLoadingStore from "@/app/store/loadingStore";
import ConfirmModal from "@/components/form/ConfirmModal";
import CustomUploadFile from "@/components/form/CustomUploadFile";
import FormHeader from "@/components/form/FormHeader";
import ProblemStatement from "@/components/ProblemStatement";
import RouteLoading from "@/components/shared/RouteLoading";
import { useProblemDetail } from "@/hook/problem/useProblemDetail";
import { useSubmitProblem } from "@/hook/problem/useSubmitProblem";
import { useRouter } from "@/libs/routing";
import { Card, Divider, Tag, Typography, UploadFile } from "antd";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { CodeEditor } from "./components/CodeEditor";
import SubmissionTable from "./components/SubmissionTable";

const { Title } = Typography;

const CODE_TEMPLATES = {
  cpp: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int n;
    cin >> n;
    vector<int> a(n);
    for (int i = 0; i < n; i++) cin >> a[i];

    // Your code here

    return 0;
}
`,
  js: `const fs = require('fs');

const input = fs.readFileSync(0, 'utf8').trim().split(/\\s+/);
let idx = 0;

const n = Number(input[idx++]);
const a = [];
for (let i = 0; i < n; i++) a.push(Number(input[idx++]));

// Your code here
`,
  python: `import sys

data = list(map(int, sys.stdin.read().split()))
idx = 0
n = data[idx]; idx += 1
a = data[idx:idx+n]

# Your code here
`,
};

export default function AssignmentPage({ params }: { params: { id: string } }) {
  const { id } = params;

  const { problemDetail } = useProblemDetail(id);
  const { submitProblemAsync, isLoading } = useSubmitProblem();

  const t = useTranslations("sidebar");
  const router = useRouter();

  const [language, setLanguage] = useState<string>("cpp");
  const [code, setCode] = useState<string>(CODE_TEMPLATES.cpp);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [confirmModalLink, setConfirmModalLink] = useState<string>("#");
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const stopLoading = useLoadingStore((state) => state.stopLoading);

  useEffect(() => {
    stopLoading();
  }, [stopLoading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      problemId: id,
      language: language,
      code: code,
    };
    await submitProblemAsync({ payload });
  };

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
  ];
  
  if(!problemDetail) return <RouteLoading message="Đang tải dữ liệu..." />;

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4">
        <FormHeader
          setOpenDialog={setOpenDialog}
          title="Assignment"
          breadcrumbs={breadCrumbs}
          setConfirmModalLink={setConfirmModalLink}
          publicButtonTitle="Submit"
        />
        <Card
          className="max-w-4xl mx-auto rounded-2xl shadow-md"
          bodyStyle={{ padding: 24 }}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <Tag color="green" className="px-3 py-1 rounded-full">
              {123}
            </Tag>
          </div>

          {/* Description */}
          <Title level={4}>{problemDetail?.title}</Title>
          <ProblemStatement statement={problemDetail?.description || ""} />

          <Divider />

          {/* Input */}
          <Title level={5}>Input</Title>
          <pre className="bg-gray-100 p-3 rounded text-sm overflow-x-auto">
            {problemDetail.sampleInput}
          </pre>

          {/* Output */}
          <Title level={5} className="mt-4">
            Output
          </Title>
          <pre className="bg-gray-100 p-3 rounded text-sm overflow-x-auto">
            {problemDetail.sampleOutput}
          </pre>

          <Divider />

          {/* Example */}
          <Title level={5}>Example</Title>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-gray-900 text-gray-100 rounded-xl p-4 text-sm">
              <div className="font-semibold mb-2">Input</div>
              <pre>
            {problemDetail.sampleInput}
          </pre>  
            </div>
            <div className="bg-gray-900 text-gray-100 rounded-xl p-4 text-sm">
              <div className="font-semibold mb-2">Output</div>
              <pre>
            {problemDetail.sampleOutput}
          </pre>  
            </div>
          </div>

          <Divider />

          {/* Source code placeholder */}
          <div className="flex flex-col gap-3">
            <CodeEditor
              code={code}
              setCode={setCode}
              language={language}
              setLanguage={setLanguage}
              CODE_TEMPLATES={CODE_TEMPLATES}
              isLoading={isLoading}
            />
            <CustomUploadFile
              fileList={fileList}
              setFileList={setFileList}
              label="Select or drag your file code in here: "
            />
          </div>
          <Divider />
          <SubmissionTable problemId={id} />
        </Card>
      </form>
      <ConfirmModal
        open={openDialog}
        onOk={() => router.replace(confirmModalLink)}
        onCancel={() => setOpenDialog(false)}
      />
    </>
  );
}
