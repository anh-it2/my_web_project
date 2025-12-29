import { Input } from "antd";
import { Controller, useFormContext } from "react-hook-form";

type RHFInputPlainProps = {
  name: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  type?: string;
};

export default function RHFInputPlain({
  name,
  label,
  placeholder,
  required,
  type = "text",
}: RHFInputPlainProps) {
  const { control } = useFormContext();

  return (
    <div className="w-full">
      {label && (
        <label className="mb-1 block text-base font-medium">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <Controller
        name={name}
        control={control}
        render={({ field, fieldState }) => (
          <>
            <Input
              {...field}
              type={type}
              placeholder={placeholder}
              status={fieldState.error ? "error" : ""}
            />
            {fieldState.error && (
              <div className="mt-1 text-sm text-red-500">
                {fieldState.error.message}
              </div>
            )}
          </>
        )}
      />
    </div>
  );
}
