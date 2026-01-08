import { FilterOptions } from "@/services/rest/constant";
import { getListSubmission } from "@/services/rest/submission/get-list-submission";
import { useQuery } from "@tanstack/react-query";

export function useListSubmission(filter: FilterOptions, problemId: string) {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["LIST_SUBMISSION", filter, problemId],
    queryFn: () => {
      return getListSubmission(filter, problemId);
    },
    staleTime: 2000,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    retry: 1,
  });
  return { listSubmission: data, isLoading: isLoading, refetch };
}
