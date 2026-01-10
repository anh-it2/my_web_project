import RouteLoading from "@/components/shared/RouteLoading";
import AllProblemForUserTable from "@/components/table/AllProblemForUserTable";
import { useGetListActiveProblem } from "@/hook/problem/useGetListActiveProblem";
import { useClassScore } from "@/hook/score/useScore";
import { formatNumberSpace } from "@/utils/format";
import { Card, Typography } from "antd";
import "../../../style.scss";

const {Text} = Typography

export default function AssignmentTab({ adminId }: { adminId: string }) {

  const { listActiveProblem, isLoading } = useGetListActiveProblem(adminId);
  const { classScore } = useClassScore(adminId);

  if (isLoading || !listActiveProblem) return <RouteLoading message="Đang tải bài tập..."/>;

  return (  
    <Card title={<div>
                <Text className="!text-red-500 text-base">
                  Điểm đạt được: {formatNumberSpace(classScore || 0)} / Điểm tối đa:{" "}
                  {formatNumberSpace(listActiveProblem?.totalElements*100)}
                </Text>
              </div>}>
        <AllProblemForUserTable hasButton={true} totalElements={listActiveProblem?.totalElements || 0} data={listActiveProblem?.content || []} basePath="/user/contests/assignment/"/>
    </Card>
  );
}
