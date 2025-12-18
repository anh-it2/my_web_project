import { getSubmissionDetail } from "@/services/rest/submission/get-submission-detail";
import { useQuery } from "@tanstack/react-query";

export function useSubmissionDetail(id: string) {
  const { data } = useQuery({
    queryKey: ["SUBMISSION_DETAIL", id],
    queryFn: () => getSubmissionDetail(id),
  });
  return { submissionDetail: data };
}
