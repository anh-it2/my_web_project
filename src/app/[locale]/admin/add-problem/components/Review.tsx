"use client";

import { Card } from "antd";
import { useTranslations } from "next-intl";
import BasicInfoStep from "./BasicInfoStep";
import StatementStep from "./StatementStep";
import TestcaseManager from "./Testcases";

export default function ReviewStep() {
  const t = useTranslations("problem");
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Review Problem</h3>

      {/* ===== Basic Info ===== */}
      <Card title="Basic Information" size="small">
        <BasicInfoStep />
      </Card>

      {/* ===== Description ===== */}
      <Card title="Statement" size="small">
        <StatementStep />
      </Card>

      {/* ===== Testcases ===== */}
      <Card title="Test Cases" size="small">
        <TestcaseManager />
      </Card>
    </div>
  );
}
