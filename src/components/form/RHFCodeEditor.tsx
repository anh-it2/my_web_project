"use client";

import Editor from "@monaco-editor/react";
import { Form } from "antd";
import { Controller, useFormContext } from "react-hook-form";

type RHFCodeEditorProps = {
  name: string;
  label?: string;
  language?: string;
  height?: number;
  required?: boolean;
};

export default function RHFCodeEditor({
  name,
  label,
  language = "cpp",
  height = 400,
  required,
}: RHFCodeEditorProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Form.Item
          label={
            label && (
              <span className="font-medium text-sm">
                {label}
                {required && <span className="text-red-500 ml-1">*</span>}
              </span>
            )
          }
          validateStatus={fieldState.error ? "error" : ""}
          help={fieldState.error?.message}
        >
          <Editor
            height={height}
            language={language}
            theme="vs-dark"
            value={field.value ?? ""}
            onChange={(value) => field.onChange(value ?? "")}
            options={{
              minimap: { enabled: false },
              fontSize: 14,
              automaticLayout: true,
              tabSize: 2,
              insertSpaces: true,
              formatOnPaste: true,
              formatOnType: true,
            }}
          />
        </Form.Item>
      )}
    />
  );
}
