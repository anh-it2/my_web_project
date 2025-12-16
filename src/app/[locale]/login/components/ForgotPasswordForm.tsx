"use client";

import { MailOutlined } from "@ant-design/icons";
import { Button, Form, Input, Typography } from "antd";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useState } from "react";

const { Title, Text } = Typography;

interface ForgotPasswordFormProps {
  onBackToLogin: () => void;
  onOTPSent: (email: string) => void;
}

interface ForgotPasswordData {
  email: string;
}

export default function ForgotPasswordForm({
  onBackToLogin,
  onOTPSent,
}: ForgotPasswordFormProps) {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const t = useTranslations("login.forgotPassword");

  const handleSubmit = async (values: ForgotPasswordData) => {
    setLoading(true);

    // Simulate API call to send OTP
    setTimeout(() => {
      setLoading(false);
      onOTPSent(values.email);
    }, 1500);
  };

  return (
    <>
      <div className="admin-login-header">
        <div className="logo">
          <Image
            src="/images/logo1.png"
            alt={"logo"}
            width={120}
            height={60}
            className="logo-image"
            priority
          />
        </div>
        <Title level={4} className="title">
          {t("title")}
        </Title>
        <Text className="subtitle">{t("subtitle")}</Text>
      </div>

      <Form
        form={form}
        name="forgot-password"
        className="admin-login-form"
        onFinish={handleSubmit}
        layout="vertical"
        requiredMark={false}
      >
        <Form.Item
          label={t("emailOrPhone")}
          name="email"
          rules={[
            { required: true, message: t("validation.emailOrPhoneRequired") },
            { type: "email", message: t("validation.emailInvalid") },
          ]}
        >
          <Input
            size="large"
            placeholder={t("emailOrPhonePlaceholder")}
            prefix={<MailOutlined style={{ color: "#999" }} />}
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            loading={loading}
            className="submit-button shadow-none border-none"
            block
          >
            {t("sendOtpButton")}
          </Button>
        </Form.Item>

        <div className="back-link">
          <Button type="link" onClick={onBackToLogin}>
            {t("backToLogin")}
          </Button>
        </div>
      </Form>
    </>
  );
}
