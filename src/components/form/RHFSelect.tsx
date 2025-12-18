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
        <div className="flex flex-col gap-1">
          {label && (
            <label className="font-medium text-sm text-[#1A1A1A] select-none mt-2 mb-2">
              {label}
              {required && <span className="ml-1 text-red-500">*</span>}
            </label>
          )}

          <Form.Item
            validateStatus={fieldState.error ? "error" : ""}
            help={fieldState.error?.message}
            className="mb-6"
          >
            <Select
              {...field}
              placeholder={
                <span className="font-normal text-sm text-[#1A1A1A]">
                  {placeholder}
                </span>
              }
              mode={multiple ? "multiple" : undefined}
              options={options}
              value={multiple ? field.value ?? [] : field.value}
              onChange={(value) => field.onChange(value)}
              showSearch={searchAble}
              optionFilterProp="label"
              className="w-full text-sm"
              style={{ height: 40 }}
              maxTagCount="responsive"
            />
          </Form.Item>
        </div>
      )}
    />
  );
}
