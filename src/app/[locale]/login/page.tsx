"use client";

import { isAuthenticated } from "@/utils/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ForgotPasswordForm from "./components/ForgotPasswordForm";
import LoginForm from "./components/LoginForm";
import NewPasswordForm from "./components/NewPasswordForm";
import OTPVerificationForm from "./components/OTPVerificationForm";
import RegisterForm from "./components/RegisterForm";
import SuccessMessage from "./components/SuccessMessage";
import "./login.scss";

type AuthStep =
  | "login"
  | "forgot-password"
  | "otp-verification"
  | "new-password"
  | "success"
  | "register";

export default function LoginPage() {
  const [currentStep, setCurrentStep] = useState<AuthStep>("login");
  const [userEmail, setUserEmail] = useState("");
  const router = useRouter();

  const getLocaleFromPathname = () => {
    if (typeof window === "undefined") return "vi";
    const match = window.location.pathname.match(/^\/(vi|en)\b/);
    return (match?.[1] as "vi" | "en") || "vi";
  };

  useEffect(() => {
    if (isAuthenticated()) {
      const locale = getLocaleFromPathname();
      router.replace(`/${locale}/user/home`);
    }
  }, [router]);

  const handleStepChange = (step: AuthStep, email?: string) => {
    setCurrentStep(step);
    if (email) {
      setUserEmail(email);
    }
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case "login":
        return (
          <LoginForm
            onForgotPassword={() => handleStepChange("forgot-password")}
            onRegister={() => handleStepChange("register")}
          />
        );
      case "forgot-password":
        return (
          <ForgotPasswordForm
            onBackToLogin={() => handleStepChange("login")}
            onOTPSent={(email) => handleStepChange("otp-verification", email)}
          />
        );
      case "otp-verification":
        return (
          <OTPVerificationForm
            email={userEmail}
            onBackToLogin={() => handleStepChange("login")}
            onOTPVerified={() => handleStepChange("new-password")}
          />
        );
      case "new-password":
        return (
          <NewPasswordForm
            onBackToLogin={() => handleStepChange("login")}
            onPasswordSet={() => handleStepChange("success")}
          />
        );
      case "success":
        return (
          <SuccessMessage onBackToLogin={() => handleStepChange("login")} />
        );
      case "register":
        return <RegisterForm onBackToLogin={() => handleStepChange("login")} />;
      default:
        return (
          <LoginForm
            onForgotPassword={() => handleStepChange("forgot-password")}
            onRegister={() => handleStepChange("register")}
          />
        );
    }
  };

  return (
    <div className="admin-login-container">
      <div className="admin-login-background">
        <div className="admin-login-card">{renderCurrentStep()}</div>
      </div>
    </div>
  );
}
