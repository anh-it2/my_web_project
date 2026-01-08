import { getListTestCaseResult } from "@/services/rest/submission/get-test-case-result/getTestCaseResult";
import { useQuery } from "@tanstack/react-query";

export function useListTestCaseResult(submissionId: string) {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["LIST_TEST_CASE_RESULT", submissionId],
    queryFn: () => {
      return getListTestCaseResult(submissionId);
    },
    staleTime: 2000,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    retry: 1,
  });
  return { listTestCaseResult: data, isLoading: isLoading, refetch };
}
