import RHFInput from "@/components/form/RHFInput";
import RHFSelect from "@/components/form/RHFSelect";
import RHFSelectTags from "@/components/form/RHFSelectTags";
import RHFSwitch from "@/components/form/RHFSwitch";
import { difficultyOptions } from "@/data/mock";
import { Col, Flex, Row, Typography } from "antd";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

const { Title, Text } = Typography;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
    },
  },
};

export default function BasicInfoStep() {
  const t = useTranslations("problem");

  return (
    <motion.div initial="hidden" animate="visible" variants={containerVariants}>
      <Row gutter={[16, 16]}>
        <Col xs={24} md={12}>
          <motion.div variants={itemVariants}>
            <RHFInput
              name="title"
              label="Problem title"
              placeholder="Enter your problem title"
              required={true}
            />
          </motion.div>
          <motion.div className="flex flex-row" variants={itemVariants}>
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
          </motion.div>
          <motion.div variants={itemVariants}>
            <RHFSelectTags
              name="tags"
              label="Tags"
              placeholder="Enter a tag then press Enter or comma to add"
              required={true}
            />
          </motion.div>
        </Col>

        <Col xs={24} md={12}>
          <motion.div variants={itemVariants}>
            <RHFInput
              name="problemCode"
              label="Problem code"
              placeholder="Enter your problem code"
              required={true}
            />
          </motion.div>
          <motion.div variants={itemVariants}>
            <RHFSelect
              name="difficulty"
              label="Difficulty"
              options={difficultyOptions}
              required={true}
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <Flex align="center" gap={3}>
              <RHFSwitch name="visibility" />
              <div>
                <Title level={5}>{t("publish_title")}</Title>
                <Text>{t("publish_description")}</Text>
              </div>
            </Flex>
          </motion.div>
        </Col>
      </Row>
    </motion.div>
  );
}

