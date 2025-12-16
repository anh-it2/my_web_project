// 'use client';

// import {
//   BellOutlined,
//   CustomerServiceOutlined,
//   DownOutlined,
//   InfoCircleOutlined,
//   LogoutOutlined,
//   MessageOutlined,
//   SettingOutlined,
// } from '@ant-design/icons';
// import type { MenuProps } from 'antd';
// import { Badge, Dropdown, Space } from 'antd';
// import { useTranslations } from 'next-intl';
// import Image from 'next/image';
// import { useMemo, useState, useEffect } from 'react';

// import { LanguageSwitcher } from '@/components/shared';
// import { useBusinessInfoByKey } from '@/hooks/company/useBusinessInfo';
// import { useRouter } from '@/libs/routing';
// import { logout, getCurrentUser } from '@/utils/auth';
// import { getProxyImageUrl } from '@/utils/imageProxy';

// import './Header.scss';

// interface Header {}

// export default function Header({}: HeaderProps) {
//   const t = useTranslations('header');
//   const router = useRouter();
//   const currentUser = getCurrentUser();

//   // Mock data - có thể thay bằng data thực tế
//   const notificationCount = 2;
//   const messageCount = 2;

//   // Lấy vendor từ authenticated user
//   const vendorKey = useMemo(() => {
//     if (!currentUser.company) return null;
//     return `/marketplace/vendors/${currentUser.company}/`;
//   }, [currentUser.company]);

//   // Lấy thông tin vendor nếu có
//   const { businessInfo } = useBusinessInfoByKey(vendorKey || undefined);

//   // Xác định tên công ty: ưu tiên từ currentUser, sau đó vendor
//   const companyName = useMemo(() => {
//     // Ưu tiên company từ authentication
//     if (currentUser.company) {
//       return currentUser.company.toUpperCase();
//     }

//     if (businessInfo) {
//       // Ưu tiên short_name, nếu không có thì dùng legal_name, cuối cùng là displayName
//       const name =
//         businessInfo.dataAsJson?.short_name ||
//         businessInfo.dataAsJson?.legal_name ||
//         businessInfo.displayName ||
//         'Company';

//       // Giới hạn độ dài tên hiển thị
//       return name.length > 20 ? name.substring(0, 20) + '...' : name;
//     }
//     return 'Company';
//   }, [businessInfo, currentUser.company]);

//   // Lấy logo của vendor và chuyển đổi qua proxy URL
//   const vendorLogo = useMemo(() => {
//     if (!businessInfo?.dataAsJson?.company_logo_str) return null;
//     return getProxyImageUrl(businessInfo.dataAsJson.company_logo_str);
//   }, [businessInfo]);

//   // State để xử lý lỗi khi load ảnh
//   const [logoError, setLogoError] = useState(false);

//   // Reset logoError khi vendorLogo thay đổi
//   useEffect(() => {
//     setLogoError(false);
//   }, [vendorLogo]);

//   const handleUserMenuClick = ({ key }: { key: string }) => {
//     if (key === 'logout') {
//       logout();
//       return;
//     }
//     if (key === 'business-info') {
//       // Không cần vendor param nữa, chỉ navigate đến company page
//       router.push('/admin/company');
//       return;
//     }
//     // Handle other menu items here
//   };

//   // Lấy tên viết tắt từ company name hoặc email
//   const getInitials = () => {
//     if (companyName && companyName !== 'Company') {
//       return companyName.substring(0, 1).toUpperCase();
//     }
//     if (currentUser.email) {
//       return currentUser.email.substring(0, 1).toUpperCase();
//     }
//     return 'C';
//   };

//   const userMenuItems: MenuProps['items'] = [
//     {
//       key: 'header',
//       type: 'group',
//       label: (
//         <div className="flex flex-col items-center py-4 gap-2">
//           {vendorLogo && !logoError ? (
//             // eslint-disable-next-line @next/next/no-img-element
//             <img
//               src={vendorLogo}
//               alt={companyName}
//               className="w-14 h-14 rounded-full object-cover border-2 border-gray-200 mb-2"
//               onError={() => setLogoError(true)}
//             />
//           ) : (
//             <div className="w-14 h-14 rounded-full bg-[#005993] text-white flex items-center justify-center text-2xl font-semibold mb-2">
//               {getInitials()}
//             </div>
//           )}
//           <div className="text-sm font-medium text-black">{companyName}</div>
//           {currentUser.email && <div className="text-xs text-gray-500">{currentUser.email}</div>}
//         </div>
//       ),
//     },
//     {
//       key: 'business-info',
//       icon: <InfoCircleOutlined />,
//       label: t('businessInfo'),
//     },
//     {
//       key: 'shop-setup',
//       icon: <SettingOutlined />,
//       label: t('shopSetup'),
//     },
//     {
//       key: 'support',
//       icon: <CustomerServiceOutlined />,
//       label: t('contactSupport'),
//     },
//     {
//       type: 'divider',
//     },
//     {
//       key: 'logout',
//       icon: <LogoutOutlined />,
//       label: t('logout'),
//       danger: true,
//     },
//   ];

//   return (
//     <header className="bg-[#002140] md:px-6 h-16 flex items-center shadow-[0_2px_8px_rgba(0,0,0,0.15)] px-3 md:h-14">
//       <div className="w-full flex justify-between items-center">
//         {/* Logo bên trái */}
//         <div className="flex items-center gap-3 md:gap-2">
//           <Image
//             src="/images/logo.png"
//             alt="Logo"
//             width={120}
//             height={32}
//             className="w-[120px] h-auto object-contain block md:w-[90px] sm:w-20"
//             priority
//           />
//         </div>

//         {/* Menu bên phải */}
//         <div className="flex items-center">
//           <Space size="middle">
//             {/* Language Switcher */}
//             <LanguageSwitcher />

//             {/* Messages */}
//             <Dropdown
//               menu={{
//                 items: [
//                   {
//                     key: '1',
//                     label: t('message1'),
//                   },
//                   {
//                     key: '2',
//                     label: t('message2'),
//                   },
//                 ],
//               }}
//               placement="bottomRight"
//             >
//               <div className="cursor-pointer flex items-center justify-center w-8 h-8 rounded transition-colors hover:bg-white/10 md:w-7 md:h-7">
//                 <Badge count={messageCount} size="small">
//                   <MessageOutlined className="text-white text-lg md:text-base" />
//                 </Badge>
//               </div>
//             </Dropdown>

//             {/* Notifications */}
//             <Dropdown
//               menu={{
//                 items: [
//                   {
//                     key: '1',
//                     label: t('notification1'),
//                   },
//                   {
//                     key: '2',
//                     label: t('notification2'),
//                   },
//                 ],
//               }}
//               placement="bottomRight"
//             >
//               <div className="cursor-pointer flex items-center justify-center w-8 h-8 rounded transition-colors hover:bg-white/10 md:w-7 md:h-7">
//                 <Badge count={notificationCount} size="small">
//                   <BellOutlined className="text-white text-lg md:text-base" />
//                 </Badge>
//               </div>
//             </Dropdown>

//             {/* User Profile Section */}
//             <Dropdown
//               menu={{
//                 items: userMenuItems,
//                 onClick: handleUserMenuClick,
//               }}
//               placement="bottomRight"
//               trigger={['click']}
//               dropdownRender={(menu) => (
//                 <div>
//                   {menu}
//                   {/* <div className="user-menu-footer">
//                                         <div className="user-menu-plus-icon">
//                                             <PlusOutlined />
//                                         </div>
//                                     </div> */}
//                 </div>
//               )}
//             >
//               <div className="flex items-center gap-2 cursor-pointer py-1.5 px-3 rounded transition-colors hover:bg-white/10 md:py-1 md:px-2 md:gap-1">
//                 {vendorLogo && !logoError ? (
//                   // eslint-disable-next-line @next/next/no-img-element
//                   <img
//                     src={vendorLogo}
//                     alt={companyName}
//                     className="w-8 h-8 rounded-full object-cover border border-white/20 md:w-7 md:h-7"
//                     onError={() => setLogoError(true)}
//                   />
//                 ) : (
//                   <div className="w-8 h-8 rounded-full bg-[#005993] text-white flex items-center justify-center text-sm font-semibold md:w-7 md:h-7 md:text-xs">
//                     {getInitials()}
//                   </div>
//                 )}
//                 <span className="text-white text-sm font-normal max-w-[120px] truncate md:max-w-[80px] md:text-xs">
//                   {companyName}
//                 </span>
//                 <DownOutlined className="text-white text-xs md:text-[10px]" />
//               </div>
//             </Dropdown>
//           </Space>
//         </div>
//       </div>
//     </header>
//   );
// }
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
import { Badge, Dropdown, Space } from "antd";
import Image from "next/image";
import { useMemo, useState } from "react";

import { useRouter } from "next/navigation";
import LanguageSwitcher from "../shared/LanguageSwitcher/LanguageSwitcher";
import "./Header.scss";

export default function Header() {
  /* =====================
   * FAKE DATA (tạm thời)
   * ===================== */

  const currentUser = {
    email: "admin@student.com",
    companyName: "Demo Student",
    logo: "/images/logo.png", // hoặc URL logo
  };

  const notificationCount = 2;
  const messageCount = 3;

  /* =====================
   * COMPUTED UI DATA
   * ===================== */

  const companyName = useMemo(() => {
    const name = currentUser.companyName || "Company";
    return name.length > 20 ? name.substring(0, 20) + "..." : name;
  }, [currentUser.companyName]);

  const router = useRouter();

  const getInitials = () => {
    if (companyName) return companyName.charAt(0).toUpperCase();
    if (currentUser.email) return currentUser.email.charAt(0).toUpperCase();
    return "C";
  };

  const [logoError, setLogoError] = useState(false);

  /* =====================
   * MENU HANDLERS (FAKE)
   * ===================== */

  const handleUserMenuClick = ({ key }: { key: string }) => {
    switch (key) {
      case "business-info":
        router.push("/user/user-info");
        break;
      case "shop-setup":
        console.log("Go to /admin/shop-setup");
        break;
      case "support":
        console.log("Contact support");
        break;
      case "logout":
        console.log("Logout");
        break;
      default:
        break;
    }
  };

  /* =====================
   * MENU CONFIG
   * ===================== */

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
              alt={companyName}
              className="w-14 h-14 rounded-full object-cover border-2 border-gray-200 mb-2"
              onError={() => setLogoError(true)}
            />
          ) : (
            <div className="w-14 h-14 rounded-full bg-[#005993] text-white flex items-center justify-center text-2xl font-semibold mb-2">
              {getInitials()}
            </div>
          )}

          <div className="text-sm font-medium text-black">{companyName}</div>
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

  /* =====================
   * RENDER
   * ===================== */

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
                    alt={companyName}
                    className="w-8 h-8 rounded-full object-cover border border-white/20"
                    onError={() => setLogoError(true)}
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-[#005993] text-white flex items-center justify-center text-sm font-semibold">
                    {getInitials()}
                  </div>
                )}
                <span className="text-white text-sm truncate max-w-[120px]">
                  {companyName}
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
