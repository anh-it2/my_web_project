import { DatePicker, Form } from 'antd';
import dayjs from 'dayjs';
import { Controller, useFormContext } from 'react-hook-form';

type RHFDatePickerProps = {
  name: string;
  label?: string;
  required?: boolean;
};

export default function RHFDatePicker({
  name,
  label,
  required,
}: RHFDatePickerProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Form.Item
          label={
            <span className="font-medium text-sm flex items-center w-full">
              {label}
              {required && <span style={{ color: 'red', fontSize: 20 }}>*</span>}
            </span>
          }
          validateStatus={fieldState.error ? 'error' : ''}
          help={fieldState.error?.message}
        >
          <DatePicker
            format="DD/MM/YYYY"
            value={field.value ? dayjs(field.value, 'YYYY-MM-DD') : null}
            onChange={(date) => {
              field.onChange(date ? date.format('YYYY-MM-DD') : null);
            }}
            className="w-full"
            style={{ width: '100%', height: 40 }}
          />
        </Form.Item>
      )}
    />
  );
}
