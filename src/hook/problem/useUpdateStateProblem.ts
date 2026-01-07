import { updateStateProblem } from "@/services/rest/problem/update-state-problem";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useUpdateStateProblem() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async ({ problemId }: { problemId: number }) => {
      const res = await updateStateProblem(problemId);
      return res;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["LIST_PROBLEM"], exact: false });
      queryClient.invalidateQueries({ queryKey: ["LIST_ACTIVE_PROBLEM"], exact: false });
      queryClient.invalidateQueries({ queryKey: ["PROBLEM_DETAIL"], exact: false });
    },
  });
  return {
    updateStateProblem: mutation.mutate,
    updateStateProblemAsync: mutation.mutateAsync,
    isLoading: mutation.isPending,
    isError: mutation.isError,
    isSuccess: mutation.isSuccess,
    error: mutation.error,
    data: mutation.data,
  };
}
