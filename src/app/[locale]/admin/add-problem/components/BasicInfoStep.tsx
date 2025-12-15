import RHFInput from "@/components/form/RHFInput";
import RHFSelect from "@/components/form/RHFSelect";
import RHFSelectTags from "@/components/form/RHFSelectTags";
import RHFSwitch from "@/components/form/RHFSwitch";
import { difficultyOptions } from "@/data/mock";
import { Col, Row } from "antd";

export default function BasicInfoStep() {
  return (
    <Row gutter={[16, 16]}>
      <Col xs={24} md={12}>
        <RHFInput
          name="title"
          label="Problem title"
          placeholder="Enter your problem title"
        />
        <RHFInput
          type="number"
          name="timeLimit"
          addonAfter="ms"
          label="Time Limit"
        />

        <RHFInput
          type="number"
          name="memoryLimit"
          addonAfter="MB"
          label="Memory Limit"
        />
      </Col>

      <Col xs={24} md={12}>
        <RHFSwitch name="visibility" label="Visible" />
        <RHFSelect
          name="difficulty"
          label="Difficulty"
          options={difficultyOptions}
        />

        <RHFSelectTags
          name="tags"
          label="Tags"
          placeholder="Enter a tag then press Enter or comma to add"
        />
      </Col>
    </Row>
  );
}
