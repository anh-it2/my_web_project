import RHFInput from "@/components/form/RHFInput";
import RHFTextArea from "@/components/form/RHFTextArea";
import CancelButton from "@/components/shared/Button/FormHeader/CancelButton";
import DangerButton from "@/components/shared/Button/FormHeader/DangerButton";
import { Card, Col, Row } from "antd";
import { motion } from "framer-motion";
import React from "react";
import { useFieldArray } from "react-hook-form";
import { useTranslations } from "use-intl";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.4,
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    scale: 0.95,
    transition: {
      duration: 0.3,
    },
  },
};

export default function TestcaseManager() {
  const { fields, append, remove } = useFieldArray({ name: "testCases" });
  const t = useTranslations("addProblem.testcases");
  return (
    <motion.div
      className="space-y-4"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div
        className="flex justify-between items-center"
        variants={cardVariants}
      >
        <h3 className="font-semibold">{t("title")}</h3>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={(e) => e.stopPropagation()}
        >
          <CancelButton
            title="Add Test cases"
            onClickWithE={(e) => {
              e.preventDefault();
              e.stopPropagation();
              append({
                input: "",
                expectedOutput: "",
                orderIndex: fields.length + 1,
                isSample: false,
              });
            }}
          />
        </motion.div>
      </motion.div>
      <motion.div variants={cardVariants}>
        <RHFInput name="constraints" label={t("constraints")} required />
      </motion.div>

      {fields.map((f, i) => (
        <motion.div
          key={f.id}
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          layout
        >
          <Card size="small" className="space-y-2">
            <Row gutter={[16, 16]}>
              <Col xs={24} md={12}>
                <RHFTextArea
                  name={`testCases.${i}.input`}
                  placeholder={t("testcaseInputPlaceholder")}
                  label={t("testcaseInput")}
                />
              </Col>

              <Col xs={24} md={12}>
                <RHFTextArea
                  name={`testCases.${i}.expectedOutput`}
                  placeholder={t("testcaseOutputPlaceholder")}
                  label={t("testcaseOutput")}
                />
              </Col>
            </Row>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
            >
              <DangerButton
                title="Remove"
                onClickWithE={(e: React.MouseEvent<HTMLElement>) => {
                  e.preventDefault();
                  e.stopPropagation();
                  remove(i);
                }}
              />
            </motion.div>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );
}
