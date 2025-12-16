"use client";

import Header from "@/components/Header/Header";
import Sidebar from "@/components/shared/Sidebar/Sidebar";
import { Layout } from "antd";
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

  return (
    <div className="min-h-screen flex flex-col bg-[#f5f8fc]">
      <Header />
      <Layout className="flex-1 flex min-h-0 ">
        <Sidebar
          collapsed={collapsed}
          mobileOpen={mobileOpen}
          onMobileClose={handleMobileClose}
          onToggleSider={handleToggleSider}
        />
        <Layout className="w-full bg-[#f5f8fc]">
          <main className=" w-full">{children}</main>
        </Layout>
      </Layout>
    </div>
  );
}
