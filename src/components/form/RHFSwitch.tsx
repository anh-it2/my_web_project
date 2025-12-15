import { Form, Switch } from "antd";
import { Controller, useFormContext } from "react-hook-form";

type RHFSwitchProps = {
  name: string;
  label?: string;
  required?: boolean;
};

export default function RHFSwitch({ name, label, required }: RHFSwitchProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Form.Item
          label={
            <span className="font-medium text-sm flex items-center">
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
          <Switch
            checked={!!field.value}
            onChange={(checked) => field.onChange(checked)}
          />
        </Form.Item>
      )}
    />
  );
}
