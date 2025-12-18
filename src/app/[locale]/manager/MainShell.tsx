"use client";

import Header from "@/components/Header/Header";
import Sidebar from "@/components/shared/Sidebar/Sidebar";
import { Link } from "@/libs/routing";
import { HomeOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Layout } from "antd";
import { useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";

export default function MainShell({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

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

  const t = useTranslations("sidebar");

  const managerItems: MenuProps["items"] = [
    {
      key: "home",
      icon: <HomeOutlined />,
      label: <Link href="/admin/home">{t("home")}</Link>,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#f5f8fc]">
      <Header />
      <Layout className="flex-1 flex min-h-0 ">
        <Sidebar
          collapsed={collapsed}
          mobileOpen={mobileOpen}
          onMobileClose={handleMobileClose}
          onToggleSider={handleToggleSider}
          items={managerItems}
        />
        <Layout className="w-full bg-[#f5f8fc]">
          <main className=" w-full">{children}</main>
        </Layout>
      </Layout>
    </div>
  );
}
