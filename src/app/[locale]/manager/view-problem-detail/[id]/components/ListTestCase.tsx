import TestCaseTable from "@/components/table/TestCaseTable";
import { TestCase } from "@/services/rest/test-case/get-test-case/type";
import { Card, Typography } from "antd";
import "../../style.scss";

const { Title } = Typography;

export default function ListTestCase({ testcases }: { testcases: TestCase[] }) {

  return (
    <Card
      title={
        <div className="flex flex-row justify-between items-center">
          <Title level={4} className="!mb-0">
            Testcases
          </Title>
        </div>
      }
      className="testcase-card"
    >
      <div className="flex flex-col gap-4">
          <TestCaseTable data={testcases} />
      </div>
    </Card>
  );
}
