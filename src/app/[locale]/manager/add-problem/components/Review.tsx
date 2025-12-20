"use client";

import { Card } from "antd";
import { motion } from "framer-motion";
import BasicInfoStep from "./BasicInfoStep";
import StatementStep from "./StatementStep";
import TestcaseManager from "./Testcases";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
    },
  },
};

export default function ReviewStep() {
  return (
    <motion.div
      className="space-y-6"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.h3 className="text-lg font-semibold" variants={cardVariants}>
        Review Problem
      </motion.h3>

      {/* ===== Basic Info ===== */}
      <motion.div variants={cardVariants}>
        <Card title="Basic Information" size="small">
          <BasicInfoStep />
        </Card>
      </motion.div>

      {/* ===== Description ===== */}
      <motion.div variants={cardVariants}>
        <Card title="Statement" size="small">
          <StatementStep />
        </Card>
      </motion.div>

      {/* ===== Testcases ===== */}
      <motion.div variants={cardVariants}>
        <Card title="Test Cases" size="small">
          <TestcaseManager />
        </Card>
      </motion.div>
    </motion.div>
  );
}

