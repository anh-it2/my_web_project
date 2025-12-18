import { getListSubmission } from "@/services/rest/submission/get-list-submission";
import { useQuery } from "@tanstack/react-query";

export function useListSubmission() {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["LIST_SUBMISSION"],
    queryFn: () => {
      return getListSubmission();
    },
  });
  return { listSubmission: data, isLoading: isLoading, refetch };
}
