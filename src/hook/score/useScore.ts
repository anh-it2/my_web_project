import { getClassScore } from "@/services/rest/score";
import { useQuery } from "@tanstack/react-query";

export function useClassScore(adminId: string) {
  const { data } = useQuery({
    queryKey: ["CLASS_SCORE", adminId],
    queryFn: () => getClassScore(adminId),
    enabled: !!adminId,
    staleTime: 2000,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    retry: 1,
  });
  return { classScore: data };
}
