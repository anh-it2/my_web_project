import { FilterOptions } from "@/services/rest/constant";
import { getListProblem } from "@/services/rest/problem/get-my-problems";
import { useQuery } from "@tanstack/react-query";

export function useListProblem(filter: FilterOptions) {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["LIST_PROBLEM", filter?.pageNumber, filter?.pageSize],
    queryFn: () => getListProblem(filter),
  });
  return { listProblem: data, isLoading, isError, error };
}
