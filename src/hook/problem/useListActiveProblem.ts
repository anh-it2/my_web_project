import { getActiveProblem } from "@/services/rest/problem/get-all-active-problem";
import { useQuery } from "@tanstack/react-query";

export function useListActiveProblem() {
  const { data } = useQuery({
    queryKey: ["LIST_ACTIVE_PROBLEM"],
    queryFn: () => getActiveProblem(),
  });
  return { activeProblem: data };
}
