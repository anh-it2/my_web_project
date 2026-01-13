import CancelButton from "@/components/shared/Button/FormHeader/CancelButton";
import PublishButton from "@/components/shared/Button/FormHeader/PublishButton";
import { Editor } from "@monaco-editor/react";
import { Typography } from "antd";
import React, { SetStateAction } from "react";
import { useTranslations } from "next-intl";

const { Title } = Typography;

type Props = {
  code: string;
  setCode: React.Dispatch<SetStateAction<string>>;
  language: string;
  setLanguage: React.Dispatch<SetStateAction<string>>;
  CODE_TEMPLATES: {
    cpp: string;
    js: string;
    python: string;
  };
  isLoading?: boolean;
};

export function CodeEditor({
  code,
  setCode,
  language,
  setLanguage,
  CODE_TEMPLATES,
  isLoading = false,
}: Props) {
  const t = useTranslations("submitPage");
  return (
    <>
      <Title level={5}>{t("code")}</Title>

      {/* Language selector */}
      <select
        value={language}
        onChange={(e) => {
          const lang = e.target.value as "cpp" | "js" | "python";
          setLanguage(lang);
          setCode(CODE_TEMPLATES[lang]);
        }}
        className="mb-3 w-48 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="cpp">C++</option>
        <option value="js">JavaScript</option>
        <option value="python">Python</option>
      </select>

      <Editor
        height="400px"
        language="cpp"
        theme="vs-dark"
        value={code}
        onChange={(value) => setCode(value ?? "")}
      />

      <div className="flex flex-row gap-2 items-end">
        <CancelButton title={t("testRun")} disable={isLoading} />
        <PublishButton title={t("submit")} isSubmit={true} isLoading={isLoading} />
      </div>
    </>
  );
}
