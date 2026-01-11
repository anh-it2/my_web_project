import RHFTextArea from "@/components/form/RHFTextArea";
import CancelButton from "@/components/shared/Button/FormHeader/CancelButton";
import DangerButton from "@/components/shared/Button/FormHeader/DangerButton";
import { Card } from "antd";
import { motion } from "framer-motion";
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

export default function StatementStep() {
  const { fields, append, remove } = useFieldArray({ name: "samples" });
  const t = useTranslations("addProblem.statementStep");

  return (
    <motion.div
      className="space-y-4"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div variants={cardVariants}>
        <RHFTextArea
          name="description"
          rows={8}
          placeholder="Markdown + LaTeX supported"
          label={t("description")}
          required={true}
        />
      </motion.div>

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
            title="Add Sample"
            disable={fields.length >= 1}
            onClickWithE={(e) => {
              e.preventDefault();
              e.stopPropagation();
              append({
                input: "",
                expectedOutput: "",
                orderIndex: fields.length + 1,
                isSample: true,
              });
            }}
          />
        </motion.div>
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
            <RHFTextArea
              name={`samples.${i}.input`}
              rows={3}
              placeholder={t("sampleInputPlaceholder")}
              label={t("sampleInput")}
            />

            <RHFTextArea
              name={`samples.${i}.expectedOutput`}
              rows={3}
              placeholder={t("sampleOutputPlaceholder")}
              label={t("sampleOutput")}
            />
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
            >
              <DangerButton
                title="Remove"
                onClickWithE={(e) => {
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
