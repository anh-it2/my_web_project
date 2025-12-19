import { formatNumberSpace } from "@/utils/format";
import { CodeOutlined } from "@ant-design/icons";
import { Card } from "antd";

type Props = {
  number: number;
  title: string;
};

export default function StatCard({ number, title }: Props) {
  const mapColorToTitle = (title: string, isText: boolean) => {
    switch (title.toLowerCase()) {
      case "problems":
        return isText ? "text-blue-900" : "bg-blue-900";
      case "contests":
        return isText ? "text-blue-600" : "bg-blue-600";
      case "users":
        return isText ? "text-green-900" : "bg-green-600";
      case "submissions":
        return isText ? "text-lime-600" : "bg-lime-600";
      default:
        return isText ? "text-blue-900" : "bg-blue-900";
    }
  };

  return (
    <Card
      className=" w-full rounded-xl shadow-md"
      bodyStyle={{ padding: "20px" }}
    >
      <div className="flex items-center gap-4">
        {/* Icon */}
        <div
          className={`w-12 h-12 rounded-full ${mapColorToTitle(
            title,
            false
          )} flex items-center justify-center`}
        >
          <CodeOutlined className="text-white text-xl" />
        </div>

        {/* Content */}
        <div className="ml-auto text-right">
          <div
            className={`text-2xl font-semibold ${mapColorToTitle(title, true)}`}
          >
            {formatNumberSpace(number)} +
          </div>
          <div className="text-sm tracking-widest text-gray-500">
            {title.toUpperCase()}
          </div>
        </div>
      </div>
    </Card>
  );
}
