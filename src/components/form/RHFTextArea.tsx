"use client";

import { Form, Input } from "antd";
import { Controller, useFormContext } from "react-hook-form";

type RHFTextAreaProps = {
  name: string;
  label?: string;
  required?: boolean;
  placeholder?: string;
  rows?: number;
  readOnly?: boolean;
  className?: string;
};

export default function RHFTextArea({
  name,
  label,
  required,
  placeholder,
  rows = 3,
  readOnly,
  className,
}: RHFTextAreaProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Form.Item
          label={
            label && (
              <span className="font-medium text-base flex items-center">
                {label}
                {required && (
                  <span style={{ color: "red", fontSize: 20 }}>*</span>
                )}
              </span>
            )
          }
          validateStatus={fieldState.error ? "error" : ""}
          help={fieldState.error?.message}
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
        >
          <Input.TextArea
            {...field}
            rows={rows}
            placeholder={placeholder}
            readOnly={readOnly}
            className={`text-base font-normal ${className ?? ""}`}
          />
        </Form.Item>
      )}
    />
  );
}
