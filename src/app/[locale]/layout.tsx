import "@/styles/global.css";
import "react-toastify/dist/ReactToastify.css";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

import { ConfigProvider } from "antd";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { ToastContainer } from "react-toastify";

import GlobalLoading from "@/components/shared/GlobalLoading";
import { routing } from "@/libs/routing";
import Providers from "@/utils/provider";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as "vi" | "en")) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#005993",
            colorPrimaryBorder: "#005993",
          },
          components: {
            Button: {
              paddingInline: 16,
              fontSize: 14,
              fontWeight: 700,
              borderRadius: 8,
            },
            Input: {
              controlHeight: 40,
              borderRadius: 8,
              fontSize: 13,
            },
          },
        }}
      >
        <Providers>
          {children}
          <GlobalLoading />
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </Providers>
      </ConfigProvider>
    </NextIntlClientProvider>
  );
}
