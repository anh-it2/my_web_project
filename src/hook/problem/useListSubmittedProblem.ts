import { FilterOptions } from "@/services/rest/constant";
import { getListSubmittedProblem } from "@/services/rest/problem/get-all-submitted-problem";
import { useQuery } from "@tanstack/react-query";

export function useListSubmittedProblem(adminId: string, filter: FilterOptions) {
  const { data, isLoading } = useQuery({
    queryKey: ["LIST_SUBMITTED_PROBLEM", adminId, filter?.pageNumber, filter?.pageSize],
    queryFn: () => getListSubmittedProblem(adminId, filter),
    staleTime: 2000,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    retry: 1,
  });
  return { list_submitted_problem: data, isLoading: isLoading };
}
