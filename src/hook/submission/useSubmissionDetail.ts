import { getSubmissionDetail } from "@/services/rest/submission/get-submission-detail";
import { useQuery } from "@tanstack/react-query";

export function useSubmissionDetail(id: string) {
  const { data } = useQuery({
    queryKey: ["SUBMISSION_DETAIL", id],
    queryFn: () => getSubmissionDetail(id),
    staleTime: 2000,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    retry: 1,
  });
  return { submissionDetail: data };
}
