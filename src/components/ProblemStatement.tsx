import { Typography } from "antd";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const { Title, Paragraph } = Typography;

type Props = {
  statement: string;
};

export default function ProblemStatement({ statement }: Props) {
  return (
    <Typography className="prose max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h2: ({ children }) => <Title level={3}>{children}</Title>,
          h3: ({ children }) => <Title level={4}>{children}</Title>,
          p: ({ children }) => <Paragraph>{children}</Paragraph>,
          li: ({ children }) => <li className="ml-4 list-disc">{children}</li>,
          code: ({ children }) => (
            <code className="bg-gray-100 px-1 rounded">{children}</code>
          ),
        }}
      >
        {statement}
      </ReactMarkdown>
    </Typography>
  );
}
