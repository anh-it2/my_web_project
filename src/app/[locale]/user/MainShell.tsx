"use client";

import Header from "@/components/Header/Header";
import Sidebar from "@/components/shared/Sidebar/Sidebar";
import { Link } from "@/libs/routing";
import {
  AppstoreOutlined,
  HomeOutlined,
  ScheduleOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Layout } from "antd";
import { useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";

export default function MainShell({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const t = useTranslations("sidebar");

  const userItems: MenuProps["items"] = [
    {
      key: "home",
      icon: <HomeOutlined />,
      label: <Link href="/user/home">{t("home")}</Link>,
    },
    {
      key: "programmingContests",
      icon: <AppstoreOutlined />,
      label: <Link href={"/user/contests"}>{t("programmingContests")}</Link>,
    },
    {
      key: "learning",
      icon: <ScheduleOutlined />,
      label: t("learning"),
      children: [
        {
          key: "classRegistration",
          label: (
            <Link href={"/user/learning/registration"}>
              {t("classRegistration")}
            </Link>
          ),
        },
        {
          key: "classes",
          label: <Link href={"/user/learning/classes"}>{t("classes")}</Link>,
        },
        {
          key: "joinQuizTest",
          label: (
            <Link href={"/user/learning/join-quiz"}>{t("joinQuizTest")}</Link>
          ),
        },
        {
          key: "quizTests",
          label: <Link href={"/user/learning/quiz"}>{t("quizTests")}</Link>,
        },
      ],
    },
  ];

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      // Trên desktop, luôn mở sidebar
      if (!mobile) {
        setCollapsed(false);
      }
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleToggleSider = () => {
    if (isMobile) {
      setMobileOpen((prev) => !prev);
    } else {
      setCollapsed((c) => !c);
    }
  };

  const handleMobileClose = () => {
    setMobileOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f5f8fc]">
      <Header />
      <Layout className="flex-1 flex min-h-0 ">
        <Sidebar
          collapsed={collapsed}
          mobileOpen={mobileOpen}
          onMobileClose={handleMobileClose}
          onToggleSider={handleToggleSider}
          items={userItems}
        />
        <Layout className="w-full bg-[#f5f8fc]">
          <main className=" w-full">{children}</main>
        </Layout>
      </Layout>
    </div>
  );
}
