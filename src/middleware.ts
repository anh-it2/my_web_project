import createMiddleware from "next-intl/middleware";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { routing } from "./libs/routing";

const intlMiddleware = createMiddleware(routing);

type Role = "USER" | "ADMIN" | "MANAGER";

const ROLE_ROUTES: Record<Role, string[]> = {
  USER: ["/user"],
  ADMIN: ["/admin"],
  MANAGER: ["/manager"],
};

const PUBLIC_ROUTES = ["/login"];

type Locale = (typeof routing.locales)[number];

const localeSet = new Set<Locale>(routing.locales);

function getLocaleSegment(pathname: string): Locale | null {
  const segment = pathname.match(/^\/([^/]+)(\/|$)/)?.[1];

  if (segment && localeSet.has(segment as Locale)) {
    return segment as Locale;
  }

  return null;
}

function stripLocale(pathname: string) {
  const locale = getLocaleSegment(pathname);
  if (!locale) return pathname;
  return pathname.replace(new RegExp(`^/${locale}(?=/|$)`), "");
}

function isPublic(pathname: string) {
  const path = stripLocale(pathname);
  return PUBLIC_ROUTES.some((r) => path.startsWith(r));
}

function getRole(req: NextRequest): Role | null {
  const role = req.cookies.get("role")?.value?.toUpperCase();
  return role === "USER" || role === "ADMIN" || role === "MANAGER"
    ? role
    : null;
}

function dashboard(locale: string, role: Role) {
  switch (role) {
    case "ADMIN":
      return `/${locale}/admin/home`;
    case "MANAGER":
      return `/${locale}/manager/home`;
    default:
      return `/${locale}/user/home`;
  }
}

export default function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const jwt = req.cookies.get("jwtToken")?.value;
  const role = getRole(req);

  const locale = getLocaleSegment(pathname) ?? routing.defaultLocale;

  if (isPublic(pathname)) {
    if (jwt && role) {
      return NextResponse.redirect(new URL(dashboard(locale, role), req.url));
    }
    return intlMiddleware(req);
  }

  if (!jwt || !role) {
    const login = new URL(`/${locale}/login`, req.url);
    login.searchParams.set("redirect", pathname);
    return NextResponse.redirect(login);
  }

  const path = stripLocale(pathname);
  const allowed = ROLE_ROUTES[role].some((r) => path.startsWith(r));

  if (!allowed) {
    return NextResponse.redirect(new URL(dashboard(locale, role), req.url));
  }

  return intlMiddleware(req);
}

export const config = {
  matcher: ["/((?!api|_next|favicon.ico|robots.txt|sitemap.xml|.*\\..*).*)"],
};
