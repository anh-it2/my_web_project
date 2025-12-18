import { CopyOutlined } from "@ant-design/icons";
import { Button } from "antd";

export default function CodeBlock({ value }: { value: string }) {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };
  return (
    <div className="relative bg-[#1f2937] text-white rounded-lg p-3 text-sm overflow-x-auto">
      <pre className="whitespace-pre-wrap break-words">{value}</pre>

      <Button
        type="text"
        icon={<CopyOutlined />}
        onClick={() => copyToClipboard(value)}
        className="!absolute top-2 right-2 text-white"
      />
    </div>
  );
}
