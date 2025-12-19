import { Form, Select } from "antd";
import { Controller, useFormContext } from "react-hook-form";
import "./style.scss";

type RHFSelectTagsProps = {
  name: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  options?: { label: string; value: string | number | undefined }[];
};

export default function RHFSelectTags({
  name,
  label,
  placeholder,
  options,
  required,
}: RHFSelectTagsProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Form.Item
          label={
            <span className="font-medium text-base flex items-center">
              {label}
              {required && (
                <span style={{ color: "red", fontSize: 20 }}>*</span>
              )}
            </span>
          }
          validateStatus={fieldState.error ? "error" : ""}
          help={fieldState.error?.message}
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
        >
          <Select
            {...field}
            mode="tags"
            placeholder={
              <span className="font-normal text-base">{placeholder}</span>
            }
            tokenSeparators={[","]}
            className="text-base font-normal w-full custom__select"
            options={options}
            value={field.value ?? []}
            onChange={(value) => field.onChange(value)}
          />
        </Form.Item>
      )}
    />
  );
}
