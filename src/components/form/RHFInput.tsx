import { Form, Input, InputNumber, Select } from "antd";
import { Controller, useFormContext } from "react-hook-form";
type RHFInputProps = {
  name: string;
  label?: string;
  required?: boolean;
  placeholder?: string;
  type?: string;
  readOnly?: boolean;
  prefix?: string;
  addonAfterOptions?: Array<{ label: string; value: string }>;
  addonAfterName?: string;
  className?: string;
  enableRules?: boolean;
  addonAfter?: string;
};

const inputStyle = {
  height: 40, // hoặc 40 tuỳ size bạn muốn, giống với AntD default
  lineHeight: "38.5px",
  fontSize: "0.875rem", // text-sm
};

export const moneyFormatter = (value?: string | number) => {
  if (value === undefined || value === null) return "";
  const strValue = String(value);
  if (strValue === "") return "";

  return strValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const moneyParser = (value?: string) => {
  if (!value) return "";
  return value.replace(/[^\d]/g, "");
};

export default function RHFInput({
  name,
  label,
  placeholder,
  required,
  type,
  readOnly,
  prefix,
  addonAfterOptions,
  addonAfterName,
  addonAfter,
}: RHFInputProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Form.Item
          label={
            label && (
              <span className="font-medium text-sm flex items-center">
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
          style={{ width: "100%" }}
        >
          {type === "number" ? (
            <InputNumber
              {...field}
              value={field.value}
              onChange={(val) => {
                // AntD có thể trả về string hoặc number — mình normalize luôn
                const parsed = val ? val.toString().replace(/[^\d]/g, "") : "";
                field.onChange(Number(parsed));
              }}
              placeholder={placeholder}
              className="text-sm font-normal !w-full full-width-number"
              formatter={moneyFormatter}
              parser={moneyParser}
              readOnly={readOnly}
              style={{ ...inputStyle, width: "100%" }}
              addonAfter={addonAfter}
            />
          ) : (
            <Input
              {...field}
              placeholder={placeholder}
              type={type}
              className="text-sm font-normal w-full addon__after__input"
              style={{ ...inputStyle, width: "100%" }}
              readOnly={readOnly}
              prefix={prefix}
              addonAfter={
                addonAfterName &&
                addonAfterOptions && (
                  <Controller
                    name={addonAfterName}
                    control={control}
                    render={({ field: unitField }) => (
                      <Select
                        {...unitField}
                        defaultValue={addonAfterOptions[0]}
                        options={addonAfterOptions}
                        dropdownStyle={{ width: "auto" }}
                        style={{ height: 40, lineHeight: 38.5 }}
                      />
                    )}
                  />
                )
              }
            />
          )}
        </Form.Item>
      )}
    />
  );
}
