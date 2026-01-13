import RouteLoading from "@/components/shared/RouteLoading";
import AllProblemForUserTable from "@/components/table/AllProblemForUserTable";
import { useGetListActiveProblem } from "@/hook/problem/useGetListActiveProblem";
import { useClassScore } from "@/hook/score/useScore";
import { formatNumberSpace } from "@/utils/format";
import { Card, Typography } from "antd";
import { useTranslations } from "next-intl";
import "../../../style.scss";

const { Text } = Typography

export default function AssignmentTab({ adminId }: { adminId: string }) {

  const { listActiveProblem, isLoading, handleFilterChange } = useGetListActiveProblem(adminId);
  const { classScore } = useClassScore(adminId);
  const t = useTranslations("allProblemTable");
  const tt = useTranslations("login.message");

  if (isLoading || !listActiveProblem) return <RouteLoading message={tt("loadingProblem")} />;

  return (
    <Card title={<div>
      <Text className="!text-red-500 text-base">
        {t("scoreAchieved")} {formatNumberSpace(classScore || 0)} / {t("scoreMax")}{" "}
        {formatNumberSpace(listActiveProblem?.totalElements * 100)}
      </Text>
    </div>}>
      <AllProblemForUserTable hasButton={true} totalElements={listActiveProblem?.totalElements || 0} data={listActiveProblem?.content || []} basePath="/user/contests/assignment/" handlePageChange={handleFilterChange} />
    </Card>
  );
}
