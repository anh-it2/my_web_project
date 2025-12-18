"use client";
import PublishButton from "@/components/shared/Button/FormHeader/PublishButton";
import { problem } from "@/data/mock";
import { EditOutlined } from "@ant-design/icons";
import { Card, Table, Tag } from "antd";
import { useRouter } from "next/navigation";

export default function ProblemDetailPage({ id }: { id: string }) {
  const sampleColumns = [
    { title: "Input", dataIndex: "input", key: "input" },
    { title: "Output", dataIndex: "output", key: "output" },
  ];

  const testCaseColumns = [
    { title: "Input", dataIndex: "input", key: "input" },
    { title: "Output", dataIndex: "output", key: "output" },
    { title: "Score", dataIndex: "score", key: "score" },
  ];

  const router = useRouter();

  return (
    <>
      <div className="p-6 space-y-6">
        <Card
          extra={
            <PublishButton
              title="Edit button"
              Icon={EditOutlined}
              onClick={() => router.push(`/admin/edit-problem/${id}`)}
            />
          }
          className="p-6 rounded-2xl shadow-sm border"
        >
          <div className="flex flex-row justify-between">
            <h1 className="text-xl font-semibold mb-2 flex">
              <span className="text-2xl font-semibold mb-2">
                Problem Title: {problem.title}
              </span>
            </h1>
          </div>
          <div className="flex items-center gap-4 text-gray-600 mb-4">
            <span className="font-medium">Difficulty:</span>
            <span
              className={
                problem.difficulty === "EASY"
                  ? "text-green-600"
                  : problem.difficulty === "HARD"
                  ? "text-red-600"
                  : "text-orange-500"
              }
            >
              {problem.difficulty}
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="font-medium text-gray-600 mr-2">Tags:</span>
            {problem.tags.map((tag, index) => (
              <Tag key={index} color="blue">
                {tag}
              </Tag>
            ))}
          </div>
          <div className="flex gap-6 mb-4 text-gray-700">
            <div>
              <span className="font-medium">Visibility:</span>{" "}
              {problem.visibility ? "Public" : "Private"}
            </div>
            <div>
              <span className="font-medium">Time Limit: </span>
              {problem.timeLimit} ms
            </div>
            <div>
              <span className="font-medium">Memory Limit: </span>
              {problem.memoryLimit} MB
            </div>
          </div>

          <div className="mt-4">
            <h2 className="text-lg font-semibold mb-2">Description</h2>
            <p className="text-gray-700 whitespace-pre-wrap">
              {problem.description || "(No description)"}
            </p>
          </div>
        </Card>

        {/* Samples */}
        <Card className="p-6 rounded-2xl shadow-sm border">
          <h2 className="text-xl font-semibold mb-4">Sample Tests</h2>
          <Table
            dataSource={problem.samples}
            columns={sampleColumns}
            pagination={false}
          />
        </Card>

        {/* Test Cases */}
        <Card className="p-6 rounded-2xl shadow-sm border">
          <h2 className="text-xl font-semibold mb-4">Test Cases</h2>
          <Table
            dataSource={problem.testCases}
            columns={testCaseColumns}
            pagination={false}
          />
        </Card>
      </div>
    </>
  );
}

// Example usage:
// <ProblemDetailPage problem={DATA_FROM_API} />
