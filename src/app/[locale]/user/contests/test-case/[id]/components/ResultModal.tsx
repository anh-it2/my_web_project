"use client";

import { Modal, Typography } from "antd";
import CodeBlock from "./CodeBlock";

const { Text } = Typography;

type ResultModalProps = {
  open: boolean;
  onClose: () => void;
  input: string;
  output: string;
  expectedOutput: string;
};

export default function ResultModal({
  open,
  onClose,
  input,
  output,
  expectedOutput,
}: ResultModalProps) {
  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      width={900}
      title={<span className="text-lg font-semibold">Xem chi tiết</span>}
    >
      <div className="space-y-4">
        {/* Outputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Text strong>Đầu ra đúng</Text>
            <CodeBlock value={expectedOutput} />
          </div>

          <div>
            <Text strong>Đầu ra chương trình</Text>
            <CodeBlock value={output} />
          </div>
        </div>

        {/* Input */}
        <div>
          <Text strong>Đầu vào</Text>
          <CodeBlock value={input} />
        </div>
      </div>
    </Modal>
  );
}
