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
import { useRouter } from "next/navigation";
import { useState } from "react";
import AccountList from "./AccountList";

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

interface LoginFormProps {
  onForgotPassword: () => void;
  onRegister: () => void;
}

interface LoginFormData {
  email: string;
  password: string;
  remember: boolean;
}

export default function LoginForm({
  onForgotPassword,
  onRegister,
}: LoginFormProps) {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const t = useTranslations("login");
  const router = useRouter();

  const handleSubmit = async (values: LoginFormData) => {
    setLoading(true);
    console.log(values);
    const res = await axios.post("http://localhost:8080/auth/login", values);
    if (res.status === 200) {
      router.replace("/user/home");
    } else {
      message.error("Login failed");
    }
    // router.replace("/user/home");
  };

  const handleAccountSelect = (email: string, password: string) => {
    form.setFieldsValue({
      email,
      password,
    });
  };

  return (
    <>
      <motion.div
        className="admin-login-header"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div className="logo" variants={itemVariants}>
          <Image
            src="/images/logo1.png"
            alt={"logo"}
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

      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <Form
          form={form}
          name="login"
          className="admin-login-form"
          onFinish={handleSubmit}
          layout="vertical"
          requiredMark={false}
        >
          <motion.div variants={itemVariants}>
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

          <motion.div className="form-options" variants={itemVariants}>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>{t("rememberMe")}</Checkbox>
            </Form.Item>
            <motion.div whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
              <Button
                type="link"
                className="forgot-password-link"
                onClick={onForgotPassword}
              >
                {t("forgotPasswordLink")}
              </Button>
            </motion.div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Form.Item>
              <div className="flex flex-col gap-2">
                <Button
                  type="primary"
                  htmlType="submit"
                  size="large"
                  loading={loading}
                  className="submit-button shadow-none"
                  block
                >
                  {t("loginButton")}
                </Button>
                <motion.div
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                  className="mx-auto"
                >
                  <Button
                    type="link"
                    className="register-link"
                    onClick={onRegister}
                  >
                    {t("registerLink")}
                  </Button>
                </motion.div>
              </div>
            </Form.Item>
          </motion.div>
        </Form>
      </motion.div>

      <AccountList onAccountSelect={handleAccountSelect} />
    </>
  );
}
