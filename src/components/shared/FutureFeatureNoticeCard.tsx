import { ToolOutlined } from "@ant-design/icons";
import { Card, Tag, Typography } from "antd";

const { Title, Paragraph, Text } = Typography;

export default function FutureFeatureNoticeCard() {
  return (
      <Card
        className="
          w-full max-w-3xl
          rounded-2xl
          border border-blue-200
          bg-gradient-to-br from-blue-50 via-white to-slate-50
          shadow-sm
        "
      >
        <div className="flex gap-5">
          {/* Icon */}
          <div
            className="
              flex h-14 w-14 shrink-0 items-center justify-center
              rounded-xl
              bg-blue-100 text-blue-600
            "
          >
            <ToolOutlined className="text-2xl" />
          </div>

          {/* Content */}
          <div className="flex-1">
            {/* Header */}
            <div className="flex items-center gap-3 mb-2">
              <Title level={4} className="!mb-0">
                Tính năng đang được phát triển
              </Title>
              <Tag color="blue" className="rounded-full px-3">
                Coming Soon
              </Tag>
            </div>

            {/* Main message */}
            <Paragraph className="text-gray-700 text-base leading-relaxed mb-2">
              Tính năng này <Text strong>chưa được triển khai trong phiên bản hiện tại </Text> 
              của hệ thống.
            </Paragraph>

            {/* Future direction */}
            <Paragraph className="text-gray-600 leading-relaxed mb-0">
              Nhóm chúng em dự kiến sẽ phát triển và hoàn thiện tính năng này trong
              <Text strong> các giai đoạn tiếp theo</Text>, nhằm nâng cao trải nghiệm
              người dùng và mở rộng chức năng của hệ thống.
            </Paragraph>
          </div>
        </div>
      </Card>
  );
}
