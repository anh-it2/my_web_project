// import createMiddleware from 'next-intl/middleware';

// import { routing } from './libs/routing';

// // Create the intl middleware - chỉ xử lý routing đa ngôn ngữ
// const intlMiddleware = createMiddleware(routing);

// export default intlMiddleware;

// export const config = {
//     // Match only internationalized pathnames and exclude static files and API routes
//     matcher: ['/((?!api|_next|.*\\..*).*)'],
// };

import createMiddleware from "next-intl/middleware";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { routing } from "./libs/routing";

// Tạo middleware xử lý đa ngôn ngữ
const intlMiddleware = createMiddleware(routing);

// Các route cần đăng nhập
const protectedRoutes = ["/adminsss"];

export default function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Lấy token từ cookie
  const token = request.cookies.get("token")?.value;

  // Lấy locale từ pathname hoặc sử dụng mặc định
  const localeMatch = pathname.match(/^\/([a-z]{2})(\/|$)/);
  const currentLocale = localeMatch ? localeMatch[1] : "vi"; // default to 'vi'

  // --- 1. Xác định xem path hiện tại có phải route cần bảo vệ không ---
  const needsAuth = protectedRoutes.some((route) => {
    // Check if pathname contains the protected route (with or without locale)
    const localePattern = /^\/[a-z]{2}(\/|$)/; // matches /en/ or /vi/
    const pathWithoutLocale = pathname.replace(localePattern, "/");
    return pathWithoutLocale.startsWith(route) || pathname.includes(route);
  });

  // --- 2. Nếu thuộc route cần bảo vệ mà không có token → redirect login ---
  if (needsAuth && !token) {
    // Tạo URL redirect với base URL đúng
    const baseUrl = `${request.nextUrl.protocol}//${request.nextUrl.host}`;
    const loginUrl = new URL(`/${currentLocale}/login`, baseUrl);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // --- 2.1. Nếu đã đăng nhập mà cố truy cập trang login → redirect dashboard ---
  const isLoginPage = pathname.includes("/login");
  if (isLoginPage && token) {
    const baseUrl = `${request.nextUrl.protocol}//${request.nextUrl.host}`;
    const dashboardUrl = new URL(`/${currentLocale}/user/home`, baseUrl);
    return NextResponse.redirect(dashboardUrl);
  }

  // --- 3. Nếu mọi thứ OK, chạy middleware I18n ---
  return intlMiddleware(request);
}

export const config = {
  matcher: [
    // Match tất cả trừ:
    // - /api
    // - /_next (static)
    // - file tĩnh (jpg|png|svg|css…)
    "/((?!api|_next|.*\\..*).*)",
  ],
};
