"use client";

import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  LockOutlined,
  MailOutlined,
} from "@ant-design/icons";
import { Button, Checkbox, Form, Input, message, Typography } from "antd";
import axios from "axios";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useState } from "react";

const { Title } = Typography;

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

interface RegisterFormData {
  username: string;
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
  // const router = useRouter();

  const handleSubmit = async (values: RegisterFormData) => {
    setLoading(true);
    const { agree, ...payload } = values;

    // const res = await registerAccount(payload);

    const res = await axios.post(
      "http://localhost:8080/auth/register",
      payload
    );
    console.log(res);

    if (!res) {
      message.error("Have an error while registering account");
      setLoading(false);
      return;
    }

    // if (res.status && res.status !== 200) {
    //   message.error(res.backend?.message ?? `Register failed (${res.status})`);
    //   setLoading(false);
    //   return;
    // }

    // success
    message.success("Register success");
    setLoading(false);
    // router.replace("/login");
    // router.replace("/login");
  };

  return (
    <>
      {/* Header */}
      <motion.div
        className="admin-login-header"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div className="logo" variants={itemVariants}>
          <Image
            src="/images/logo1.png"
            alt="logo"
            width={120}
            height={60}
            className="logo-image"
            priority
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <Title level={4} className="title">
            {t("title")}
          </Title>
        </motion.div>
      </motion.div>

      {/* Form */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <Form
          form={form}
          name="register"
          className="admin-login-form"
          onFinish={handleSubmit}
          layout="vertical"
          requiredMark={false}
        >
          <motion.div variants={itemVariants}>
            <Form.Item
              label={t("email")}
              name="username"
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
          </motion.div>

          <motion.div variants={itemVariants}>
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
          </motion.div>

          {/* Confirm password */}
          <motion.div variants={itemVariants}>
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
          </motion.div>

          {/* Agree */}
          <motion.div variants={itemVariants}>
            <Form.Item
              name="agree"
              valuePropName="checked"
              rules={[
                {
                  validator: (_, value) =>
                    value
                      ? Promise.resolve()
                      : Promise.reject(
                          new Error(t("validation.agreeRequired"))
                        ),
                },
              ]}
            >
              <Checkbox>{t("agreeTerms")}</Checkbox>
            </Form.Item>
          </motion.div>

          {/* Submit */}
          <motion.div variants={itemVariants}>
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
                <motion.div
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                  className="mx-auto"
                >
                  <Button type="link" onClick={onBackToLogin}>
                    {t("forgotPassword.backToLogin")}
                  </Button>
                </motion.div>
              </div>
            </Form.Item>
          </motion.div>
        </Form>
      </motion.div>
    </>
  );
}
