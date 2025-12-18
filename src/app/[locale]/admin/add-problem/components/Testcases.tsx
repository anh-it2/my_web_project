import RHFInput from "@/components/form/RHFInput";
import CancelButton from "@/components/shared/Button/FormHeader/CancelButton";
import DangerButton from "@/components/shared/Button/FormHeader/DangerButton";
import { Card, Col, Row } from "antd";
import { useFieldArray } from "react-hook-form";

// type Props = {
//   testcases: Testcase[];
//   setTestcases: React.Dispatch<SetStateAction<Testcase[]>>;
// };

export default function TestcaseManager() {
  const { fields, append, remove } = useFieldArray({ name: "testCases" });
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="font-semibold">Problem Test Cases & constraints</h3>
        <CancelButton
          title="Add Test cases"
          onClick={() =>
            append({
              input: "",
              expectedOutput: "",
              score: 0,
              orderIndex: fields.length + 1,
              isSample: false,
            })
          }
        />
      </div>
      <RHFInput name="constraints" label="Contraints" required />

      {fields.map((f, i) => (
        <Card key={f.id} size="small" className="space-y-2">
          <Row gutter={[16, 16]}>
            <Col xs={24} md={8}>
              <RHFInput
                name={`testCases.${i}.input`}
                placeholder="Enter your test case input"
                label="Test Case Input"
              />
            </Col>

            <Col xs={24} md={8}>
              <RHFInput
                name={`testCases.${i}.expectedOutput`}
                placeholder="Enter your test case output"
                label="Test Case  Output"
              />
            </Col>

            <Col xs={24} md={8}>
              <RHFInput
                name={`testCases.${i}.score`}
                placeholder="Enter score for this test case"
                label="Score"
                type="number"
              />
            </Col>
          </Row>
          <DangerButton title="Remove" onClick={() => remove(i)} />
        </Card>
      ))}
    </div>
  );
}
