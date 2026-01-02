import { FilterOptions } from "@/services/rest/constant";
import { getListActiveProblem } from "@/services/rest/problem/get-active-problem";
import { useQuery } from "@tanstack/react-query";

export function useListActiveProblem(filter: FilterOptions) {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["LIST_PROBLEM", filter?.pageNumber, filter?.pageSize],
    queryFn: () => getListActiveProblem(filter),
  });
  return { listActiveProblem: data, isLoading, isError, error };
}
