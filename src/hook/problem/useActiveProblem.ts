import { FilterOptions } from "@/services/rest/constant";
import { getListActiveProblem } from "@/services/rest/problem/get-active-problem";
import { useQuery } from "@tanstack/react-query";

export function useListActiveProblem(filter: FilterOptions, adminId: string) {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["LIST_ACTIVE_PROBLEM", adminId, filter?.pageNumber, filter?.pageSize],
    queryFn: () => getListActiveProblem(filter, adminId),
    staleTime: 2000,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    retry: 1,
  });
  return { listActiveProblem: data, isLoading, isError, error };
}
