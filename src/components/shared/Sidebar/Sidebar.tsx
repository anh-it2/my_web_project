"use client";

import { usePathname } from "@/libs/routing";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Drawer, Layout, Menu } from "antd";
import { useEffect, useState } from "react";
import "./Sidebar.scss";

const { Sider } = Layout;

interface SidebarProps {
  collapsed?: boolean;
  mobileOpen?: boolean;
  onMobileClose?: () => void;
  onToggleSider?: () => void;
  items: MenuProps["items"];
}

export default function Sidebar({
  collapsed,
  mobileOpen,
  onMobileClose,
  onToggleSider,
  items,
}: SidebarProps) {
  const pathname = usePathname();
  const [isMobile, setIsMobile] = useState(false);
  const [openKeys, setOpenKeys] = useState<string[]>([]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const resolveAdminSection = () => {
    const parts = pathname.split("/").filter(Boolean);
    const possibleLocales = ["vi", "en"];
    const hasLocale = possibleLocales.includes(parts[0] || "");
    let index = hasLocale ? 1 : 0;

    if (parts[index] === "user") {
      index += 1;
    }

    const section = parts[index] ?? "home";
    const subSection = parts[index + 1] ?? "";

    return { section, subSection };
  };

  // Update openKeys based on current pathname
  useEffect(() => {
    const { section } = resolveAdminSection();
    const keys: string[] = [];

    if (section === "learning") {
      keys.push("learning");
    }

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setOpenKeys(keys);
  }, [pathname]);

  // Derive selected key by resolving current admin section
  const matchKey = () => {
    const { section, subSection } = resolveAdminSection();

    if (pathname.includes("/user/home") || section === "home") {
      return "home";
    }

    if (pathname.includes("/user/contests") || section === "contests") {
      return "programmingContests";
    }

    if (section === "learning" || pathname.includes("/user/learning")) {
      if (
        subSection === "registration" ||
        subSection?.startsWith("registration")
      )
        return "classRegistration";

      if (subSection === "classes" || subSection?.startsWith("classes"))
        return "classes";

      if (subSection === "join-quiz" || subSection?.startsWith("join-quiz"))
        return "joinQuizTest";

      if (subSection === "quiz" || subSection?.startsWith("quiz"))
        return "quizTests";
      return "classRegistration";
    }

    return section;
  };

  const hasToggleButton = !isMobile && onToggleSider;

  const menuContent = (
    <div
      className="sidebar-menu-wrapper"
      style={{
        position: "relative",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Menu
        mode="inline"
        selectedKeys={[matchKey()]}
        openKeys={openKeys}
        items={items}
        className="sidebar-menu"
        style={{
          flex: 1,
          borderRight: 0,
          paddingBottom: hasToggleButton ? "48px" : 0,
        }}
        onOpenChange={setOpenKeys}
        onClick={() => {
          if (isMobile && onMobileClose) {
            onMobileClose();
          }
        }}
      />
      {hasToggleButton && (
        <div className="absolute bottom-0 left-0 right-0 border-t border-gray-200 p-2 flex items-center justify-center bg-white">
          <span
            className="cursor-pointer text-lg text-gray-700 flex items-center justify-center w-8 h-8 transition-colors hover:bg-gray-100"
            onClick={onToggleSider}
            aria-label={collapsed ? "Mở sidebar" : "Đóng sidebar"}
          >
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </span>
        </div>
      )}
    </div>
  );

  // Trên mobile: sử dụng Drawer
  if (isMobile) {
    return (
      <Drawer
        title={null}
        placement="left"
        onClose={onMobileClose}
        open={mobileOpen}
        bodyStyle={{ padding: 0 }}
        style={{ zIndex: 1000 }}
      >
        {menuContent}
      </Drawer>
    );
  }

  // Trên desktop: sử dụng Sider
  return (
    <Sider
      collapsible
      collapsed={Boolean(collapsed)}
      trigger={null}
      className="sidebar-sider"
      style={{ position: "relative", width: "17%", minWidth: "100px" }}
      width="17%"
    >
      {menuContent}
    </Sider>
  );
}
