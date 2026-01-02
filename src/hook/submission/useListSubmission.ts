import { FilterOptions } from "@/services/rest/constant";
import { getListSubmission } from "@/services/rest/submission/get-list-submission";
import { useQuery } from "@tanstack/react-query";

export function useListSubmission(filter: FilterOptions, problemId: string) {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["LIST_SUBMISSION"],
    queryFn: () => {
      return getListSubmission(filter, problemId);
    },
  });
  return { listSubmission: data, isLoading: isLoading, refetch };
}
