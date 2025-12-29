import { getListActiveProblem } from "@/services/rest/problem/get-active-problem";
import { useQuery } from "@tanstack/react-query";

export function useListActiveProblem(link: string) {
  const { data } = useQuery({
    queryKey: ["LIST_PROBLEM"],
    queryFn: () => getListActiveProblem(link),
  });
  return { listActiveProblem: data };
}
