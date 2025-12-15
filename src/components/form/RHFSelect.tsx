import { Form, Select } from "antd";
import { Controller, useFormContext } from "react-hook-form";

type RHFSelectProps = {
  name: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  options?: { label: string; value: string | number }[];
  searchAble?: boolean;
  multiple?: boolean;
};

export default function RHFSelect({
  name,
  label,
  placeholder,
  options,
  required,
  searchAble,
  multiple = false,
}: RHFSelectProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Form.Item
          label={
            label && (
              <span
                className="font-medium text-sm flex items-center"
                onMouseDown={(e) => e.preventDefault()}
              >
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
          <Select
            {...field}
            placeholder={
              <span className="font-normal text-sm text-[#1A1A1A]">
                {placeholder}
              </span>
            }
            open={undefined} // quan trọng
            defaultOpen={false}
            mode={multiple ? "multiple" : undefined}
            className="text-sm font-normal w-full custom__select"
            options={options}
            value={multiple ? field.value ?? [] : field.value}
            onChange={(value) => field.onChange(value)}
            showSearch={searchAble}
            optionFilterProp="label"
            style={{ height: 40, lineHeight: 38.5 }}
            maxTagCount="responsive"
          />
        </Form.Item>
      )}
    />
  );
}
