import RHFInput from "@/components/form/RHFInput";
import RHFSelect from "@/components/form/RHFSelect";
import RHFSelectTags from "@/components/form/RHFSelectTags";
import RHFSwitch from "@/components/form/RHFSwitch";
import { difficultyOptions } from "@/data/mock";
import { Col, Flex, Row, Typography } from "antd";
import { useTranslations } from "next-intl";

const { Title, Text } = Typography;

export default function BasicInfoStep() {
  const t = useTranslations("problem");

  return (
    <Row gutter={[16, 16]}>
      <Col xs={24} md={12}>
        <RHFInput
          name="title"
          label="Problem title"
          placeholder="Enter your problem title"
          required={true}
        />
        <div className="flex flex-row">
          <RHFInput
            type="number"
            name="timeLimit"
            addonAfter="ms"
            label="Time Limit"
            required={true}
          />

          <RHFInput
            type="number"
            name="memoryLimit"
            addonAfter="MB"
            label="Memory Limit"
            required={true}
          />
        </div>
        <RHFSelectTags
          name="tags"
          label="Tags"
          placeholder="Enter a tag then press Enter or comma to add"
          required={true}
        />
      </Col>

      <Col xs={24} md={12}>
        <RHFInput
          name="problemCode"
          label="Problem code"
          placeholder="Enter your problem code"
          required={true}
        />
        <RHFSelect
          name="difficulty"
          label="Difficulty"
          options={difficultyOptions}
          required={true}
        />

        <Flex align="center" gap={3}>
          <RHFSwitch name="visibility" />
          <div>
            <Title level={5}>{t("publish_title")}</Title>
            <Text>{t("publish_description")}</Text>
          </div>
        </Flex>
      </Col>
    </Row>
  );
}
