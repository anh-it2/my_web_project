import { getListSubmittedProblem } from "@/services/rest/problem/get-all-submitted-problem";
import { useQuery } from "@tanstack/react-query";

export function useListSubmittedProblem() {
  const { data, isLoading } = useQuery({
    queryKey: ["LIST_SUBMITTED_PROBLEM"],
    queryFn: () => {
      return getListSubmittedProblem();
    },
  });
  return { list_problem: data, isLoading: isLoading };
}
