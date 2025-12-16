"use client";

import { ArrowLeftOutlined, HomeOutlined } from "@ant-design/icons";
import { Button, Result } from "antd";
import { useRouter } from "next/navigation";

interface NotFoundProps {
  locale?: string;
  showBackButton?: boolean;
  title?: string;
  subTitle?: string;
}

export default function NotFound({
  locale = "vi",
  showBackButton = true,
  title,
  subTitle,
}: NotFoundProps) {
  const router = useRouter();

  const messages = {
    vi: {
      title: "Trang không tồn tại",
      subTitle:
        "Xin lỗi, trang bạn đang tìm kiếm không tồn tại hoặc đã được di chuyển.",
      backHome: "Về trang chủ",
      goBack: "Quay lại",
    },
    en: {
      title: "Page Not Found",
      subTitle:
        "Sorry, the page you are looking for does not exist or has been moved.",
      backHome: "Back to Home",
      goBack: "Go Back",
    },
  };

  const currentMessages =
    messages[locale as keyof typeof messages] || messages.vi;

  const handleBackHome = () => {
    router.push(`/${locale}/user/home`);
  };

  const handleGoBack = () => {
    router.back();
  };

  return (
    <div
      className="not-found-container"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      }}
    >
      <div
        style={{
          background: "white",
          borderRadius: "12px",
          padding: "40px",
          boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
          maxWidth: "600px",
          width: "90%",
          textAlign: "center",
        }}
      >
        <Result
          status="404"
          title={
            <span
              style={{
                fontSize: "2.5rem",
                fontWeight: "bold",
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {title || currentMessages.title}
            </span>
          }
          subTitle={
            <span
              style={{
                fontSize: "1.1rem",
                color: "#666",
                lineHeight: "1.6",
              }}
            >
              {subTitle || currentMessages.subTitle}
            </span>
          }
          extra={
            <div
              style={{
                marginTop: "30px",
                display: "flex",
                gap: "12px",
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              <Button
                type="primary"
                size="large"
                icon={<HomeOutlined />}
                onClick={handleBackHome}
                style={{
                  background:
                    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  border: "none",
                  borderRadius: "8px",
                  height: "44px",
                  paddingLeft: "24px",
                  paddingRight: "24px",
                  fontSize: "16px",
                  fontWeight: "500",
                }}
              >
                {currentMessages.backHome}
              </Button>
              {showBackButton && (
                <Button
                  size="large"
                  icon={<ArrowLeftOutlined />}
                  onClick={handleGoBack}
                  style={{
                    borderRadius: "8px",
                    height: "44px",
                    paddingLeft: "24px",
                    paddingRight: "24px",
                    fontSize: "16px",
                    fontWeight: "500",
                    borderColor: "#667eea",
                    color: "#667eea",
                  }}
                >
                  {currentMessages.goBack}
                </Button>
              )}
            </div>
          }
        />

        {/* Decorative elements */}
        <div
          style={{
            position: "absolute",
            top: "-50px",
            left: "-50px",
            width: "100px",
            height: "100px",
            background: "linear-gradient(135deg, #667eea20, #764ba220)",
            borderRadius: "50%",
            zIndex: -1,
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-30px",
            right: "-30px",
            width: "60px",
            height: "60px",
            background: "linear-gradient(135deg, #764ba220, #667eea20)",
            borderRadius: "50%",
            zIndex: -1,
          }}
        />
      </div>
    </div>
  );
}
