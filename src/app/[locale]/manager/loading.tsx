import RouteLoading from "@/components/shared/RouteLoading";
import { useTranslations } from "next-intl";

export default function Loading() {
  const t = useTranslations("message");

  return <RouteLoading message={t("loading")} />;
}
