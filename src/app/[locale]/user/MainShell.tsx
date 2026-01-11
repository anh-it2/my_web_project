"use client";

import useLoadingStore from "@/app/store/loadingStore";
import Header from "@/components/Header/Header";
import Sidebar from "@/components/shared/Sidebar/Sidebar";
import { useRouter } from "@/libs/routing";
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
  const startLoading = useLoadingStore((state) => state.startLoading);
  const router = useRouter();

  const t = useTranslations("sidebar");

  const userItems: MenuProps["items"] = [
    {
      key: "home",
      icon: <HomeOutlined className="!text-xl" />,
      label: t("home"),
      onClick: () => {
        startLoading();
        router.replace("/user/home");
      },
    },
    {
      key: "programmingContests",
      icon: <AppstoreOutlined className="!text-xl" />,
      label: t("programmingContests"),
      onClick: () => {
        startLoading();
        router.replace("/user/contests");
      },
    },
    {
      key: "learning",
      icon: <ScheduleOutlined className="!text-xl" />,
      label: t("learning"),
      children: [
        {
          key: "classRegistration",
          label: t("classRegistration"),
          onClick: () => {
            startLoading();
            router.replace("/user/learning/registration");
          },
        },
        {
          key: "classes",
          label: t("classes"),
          onClick: () => {
            startLoading();
            router.replace("/user/learning/classes");
          },
        },
        {
          key: "joinQuizTest",
          label: t("joinQuizTest"),
          onClick: () => {
            startLoading();
            router.replace("/user/learning/join-quiz");
          },
        },
        {
          key: "quizTests",
          label: t("quizTests"),
          onClick: () => {
            startLoading();
            router.replace("/user/learning/quiz");
          },
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
      <Header site="user" />
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
