import { difficultyOptions } from "@/app/[locale]/constants";
import { useTranslations } from "use-intl";
import RHFInput from "@/components/form/RHFInput";
import RHFSelect from "@/components/form/RHFSelect";
import { Col, Row } from "antd";
import { motion } from "framer-motion";


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
  const t = useTranslations("addProblem.basicInfo");

  return (
    <motion.div initial="hidden" animate="visible" variants={containerVariants}>
      <Row gutter={[16, 16]}>
        <Col xs={24} md={12}>
          <motion.div variants={itemVariants}>
            <RHFInput
              name="title"
              label={t("title")}
              placeholder={t("titlePlaceholder")}
              required={true}
            />
          </motion.div>
          <motion.div className="flex flex-row" variants={itemVariants}>
            <RHFInput
              type="number"
              name="timeLimit"
              addonAfter="ms"
              label={t("timeLimit")}
              required={true}
            />

            <RHFInput
              type="number"
              name="memoryLimit"
              addonAfter="MB"
              label={t("memoryLimit")}
              required={true}
            />
          </motion.div>
        </Col>

        <Col xs={24} md={12}>
          <motion.div variants={itemVariants}>
            <RHFInput
              name="problemCode"
              label={t("problemCode")}
              placeholder={t("problemCodePlaceholder")}
              required={true}
            />
          </motion.div>
          <motion.div variants={itemVariants}>
            <RHFSelect
              name="difficultyLevel"
              label={t("difficulty")}
              options={difficultyOptions}
              required={true}
            />
          </motion.div>
        </Col>
      </Row>
    </motion.div>
  );
}
