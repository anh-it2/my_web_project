import { getProblemDetail } from "@/services/rest/problem/getProlemDetail";
import { useQuery } from "@tanstack/react-query";

export function useProblemDetail(id: string) {
  const { data } = useQuery({
    queryKey: ["PROBLEM_DETAIL", id],
    queryFn: () => getProblemDetail(id),
  });
  return { problemDetail: data };
}
