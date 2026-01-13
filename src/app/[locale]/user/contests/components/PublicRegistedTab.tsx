import useLoadingStore from "@/app/store/loadingStore";
import CommonTable from "@/components/table/CommonTable";
import useGetListAdmin from "@/hook/admin/useGetListAdmin";
import { useTranslations } from "next-intl";
import { useRouter } from "@/libs/routing";
import { Admin } from "@/services/rest/admin/type";
import { Card } from "antd";
import "../style.scss";

export default function PublicContestTab() {
  const startLoading = useLoadingStore((state) => state.startLoading);
  const router = useRouter();

  const { listAdmin, handleFilterChange } = useGetListAdmin()
  const t = useTranslations("contestTab");



  const AdminTableColumn = [
    {
      title: t("class"),
      dataIndex: "username",
      key: "username",
      render: (text: string, record: Admin) => (
        <span
          className="text-blue-600 hover:underline cursor-pointer"
          onClick={() => {
            startLoading();
            router.push(`/user/contests/detail/${record.userId}`);
          }}
        >
          {t("classOf")} {text.split('@')[0]}
        </span>
      ),
    },
    {
      title: t("status"),
      dataIndex: "",
      key: "status",
      render: () => (
        <span
          className="text-green-500 font-semibold"
        >
          {t("ongoing")}
        </span>
      ),
    },
    {
      title: t("manager"),
      dataIndex: "username",
      key: "username",
      render: (text: string) => (
        <span
          className="font-semibold uppercase"
        >
          {text.split('@')[0]}
        </span>
      ),
    },
  ];

  return (
    <Card>
      <div className="flex flex-col gap-3">
        <CommonTable dataSource={listAdmin?.content || []} columns={AdminTableColumn} totalElements={listAdmin?.totalElements || 0} handlePageChange={handleFilterChange} />
      </div>
    </Card>
  );
}
