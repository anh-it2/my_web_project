import RouteLoading from "@/components/shared/RouteLoading";
import AllProblemForUserTable from "@/components/table/AllProblemForUserTable";
import { useGetListActiveProblem } from "@/hook/problem/useGetListActiveProblem";
import { Card } from "antd";
import "../../../style.scss";

export default function AssignmentTab() {


  const { listActiveProblem, isLoading, isError, error } = useGetListActiveProblem();

  if (isLoading || !listActiveProblem) return <RouteLoading />;

  return (  
    <Card>
        <AllProblemForUserTable totalElements={listActiveProblem?.totalElements || 0} data={listActiveProblem?.content || []} basePath="/user/contests/assignment/"/>
    </Card>
  );
}
