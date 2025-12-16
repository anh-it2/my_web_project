"use client";

import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  LockOutlined,
  MailOutlined,
} from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Typography } from "antd";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

const { Title } = Typography;

interface RegisterFormData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  agree: boolean;
}

type Props = {
  onBackToLogin: () => void;
};

export default function RegisterForm({ onBackToLogin }: Props) {
  const [form] = Form.useForm();
  const agree = Form.useWatch("agree", form);
  const [loading, setLoading] = useState(false);
  const t = useTranslations("login");
  const router = useRouter();

  const handleSubmit = async (values: RegisterFormData) => {
    setLoading(true);
    console.log(values);
    router.replace("/login");
  };

  return (
    <>
      {/* Header */}
      <div className="admin-login-header">
        <div className="logo">
          <Image
            src="/images/logo1.png"
            alt="logo"
            width={120}
            height={60}
            className="logo-image"
            priority
          />
        </div>

        <Title level={4} className="title">
          {t("title")}
        </Title>
      </div>

      {/* Form */}
      <Form
        form={form}
        name="register"
        className="admin-login-form"
        onFinish={handleSubmit}
        layout="vertical"
        requiredMark={false}
      >
        <Form.Item
          label={t("email")}
          name="email"
          rules={[
            { required: true, message: t("validation.emailRequired") },
            { type: "email", message: t("validation.emailInvalid") },
          ]}
        >
          <Input
            size="large"
            placeholder={t("emailPlaceholder")}
            prefix={<MailOutlined style={{ color: "#999" }} />}
          />
        </Form.Item>

        <Form.Item
          label={t("password")}
          name="password"
          rules={[
            { required: true, message: t("validation.passwordRequired") },
          ]}
        >
          <Input.Password
            size="large"
            placeholder={t("passwordPlaceholder")}
            prefix={<LockOutlined style={{ color: "#999" }} />}
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
          />
        </Form.Item>

        {/* Confirm password */}
        <Form.Item
          label={t("confirmPassword")}
          name="confirmPassword"
          dependencies={["password"]}
          rules={[
            {
              required: true,
              message: t("validation.confirmPasswordRequired"),
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error(t("validation.confirmPasswordMismatch"))
                );
              },
            }),
          ]}
        >
          <Input.Password
            size="large"
            placeholder={t("confirmPasswordPlaceholder")}
            prefix={<LockOutlined style={{ color: "#999" }} />}
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
          />
        </Form.Item>

        {/* Agree */}
        <Form.Item
          name="agree"
          valuePropName="checked"
          rules={[
            {
              validator: (_, value) =>
                value
                  ? Promise.resolve()
                  : Promise.reject(new Error(t("validation.agreeRequired"))),
            },
          ]}
        >
          <Checkbox>{t("agreeTerms")}</Checkbox>
        </Form.Item>

        {/* Submit */}
        <Form.Item>
          <div className="flex flex-col gap-2">
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              loading={loading}
              className="submit-button"
              block
              disabled={!agree}
            >
              {t("registerButton")}
            </Button>
            <Button type="link" onClick={onBackToLogin}>
              {t("forgotPassword.backToLogin")}
            </Button>
          </div>
        </Form.Item>
      </Form>
    </>
  );
}
