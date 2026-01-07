"use client";

import {
  BellOutlined,
  CustomerServiceOutlined,
  DownOutlined,
  InfoCircleOutlined,
  LogoutOutlined,
  MessageOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Badge, Dropdown, message, Space } from "antd";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

import useLoadingStore from "@/app/store/loadingStore";
import { logoutAccount } from "@/services/rest/auth";
import { useRouter } from "next/navigation";
import LanguageSwitcher from "../shared/LanguageSwitcher/LanguageSwitcher";
import "./Header.scss";

type HeaderProps = {
  site: string;
};

export default function Header({ site }: HeaderProps) {

  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    const value = localStorage.getItem("userName");
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setEmail(value);
  }, []);

  const currentUser = {
    email: email,
    currentUserName: email?.split('@')[0]?.toUpperCase(),
    logo: "/images/logo.png", // hoặc URL logo
  };

  const notificationCount = 2;
  const messageCount = 3;

  const currentUserName = useMemo(() => {
    const name = currentUser.currentUserName || "Current User";
    return name.length > 20 ? name.substring(0, 20) + "..." : name;
  }, [currentUser.currentUserName]);

  const startLoading = useLoadingStore((store) => store.startLoading);

  const router = useRouter();

  const getInitials = () => {
    if (currentUserName) return currentUserName.charAt(0).toUpperCase();
    if (currentUser.email) return currentUser.email.charAt(0).toUpperCase();
    return "C";
  };

  const [logoError, setLogoError] = useState(false);

  const handleUserMenuClick = async ({ key }: { key: string }) => {
    switch (key) {
      case "business-info":
        {
          startLoading();
          router.push(`/${site}/${site}-info`);
        }
        break;
      case "shop-setup":
        console.log("Go to /admin/shop-setup");
        break;
      case "support":
        console.log("Contact support");
        break;
      case "logout":
        localStorage.removeItem("userName");
        localStorage.removeItem("role");
        await logoutAccount();
        message.success("Logout successfully");
        router.push("/login");
        break;
      default:
        break;
    }
  };

  const userMenuItems: MenuProps["items"] = [
    {
      key: "header",
      type: "group",
      label: (
        <div className="flex flex-col items-center py-4 gap-2">
          {currentUser.logo && !logoError ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={currentUser.logo}
              alt={currentUserName}
              className="w-14 h-14 rounded-full object-cover border-2 border-gray-200 mb-2"
              onError={() => setLogoError(true)}
            />
          ) : (
            <div className="w-14 h-14 rounded-full bg-[#005993] text-white flex items-center justify-center text-2xl font-semibold mb-2">
              {getInitials()}
            </div>
          )}

          <div className="text-sm font-medium text-black">
            {currentUserName}
          </div>
          <div className="text-xs text-gray-500">{currentUser.email}</div>
        </div>
      ),
    },
    {
      key: "business-info",
      icon: <InfoCircleOutlined />,
      label: "Thông tin cá nhân",
    },
    {
      key: "support",
      icon: <CustomerServiceOutlined />,
      label: "Hỗ trợ",
    },
    { type: "divider" },
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: "Đăng xuất",
      danger: true,
    },
  ];

  return (
    <header className="bg-[#002140] md:px-6 h-16 flex items-center shadow-[0_2px_8px_rgba(0,0,0,0.15)] px-3 md:h-14">
      <div className="w-full flex justify-between items-center">
        {/* LEFT LOGO */}
        <div className="flex items-center gap-3 md:gap-2">
          <Image
            src="/images/hust.jpg"
            alt="Logo"
            width={100}
            height={20}
            className="w-[120px] h-auto object-cover block md:w-[90px] sm:w-20 rounded-full custom__image"
            priority
          />
        </div>

        {/* RIGHT MENU */}
        <div className="flex items-center">
          <Space size="middle">
            <LanguageSwitcher />

            {/* MESSAGES */}
            <Dropdown
              placement="bottomRight"
              menu={{
                items: [
                  { key: "1", label: "Tin nhắn 1" },
                  { key: "2", label: "Tin nhắn 2" },
                ],
              }}
            >
              <div className="cursor-pointer flex items-center justify-center w-8 h-8 rounded hover:bg-white/10">
                <Badge count={messageCount} size="small">
                  <MessageOutlined className="text-white text-lg" />
                </Badge>
              </div>
            </Dropdown>

            {/* NOTIFICATIONS */}
            <Dropdown
              placement="bottomRight"
              menu={{
                items: [
                  { key: "1", label: "Thông báo 1" },
                  { key: "2", label: "Thông báo 2" },
                ],
              }}
            >
              <div className="cursor-pointer flex items-center justify-center w-8 h-8 rounded hover:bg-white/10">
                <Badge count={notificationCount} size="small">
                  <BellOutlined className="text-white text-lg" />
                </Badge>
              </div>
            </Dropdown>

            {/* USER MENU */}
            <Dropdown
              trigger={["click"]}
              placement="bottomRight"
              menu={{
                items: userMenuItems,
                onClick: handleUserMenuClick,
              }}
            >
              <div className="flex items-center gap-2 cursor-pointer py-1.5 px-3 rounded hover:bg-white/10">
                {currentUser.logo && !logoError ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={currentUser.logo}
                    alt={currentUserName}
                    className="w-8 h-8 rounded-full object-cover border border-white/20"
                    onError={() => setLogoError(true)}
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-[#005993] text-white flex items-center justify-center text-sm font-semibold">
                    {getInitials()}
                  </div>
                )}
                <span className="text-white text-sm truncate max-w-[120px]">
                  {currentUserName}
                </span>
                <DownOutlined className="text-white text-xs" />
              </div>
            </Dropdown>
          </Space>
        </div>
      </div>
    </header>
  );
}
