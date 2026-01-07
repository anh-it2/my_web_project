import { updateProblem } from "@/services/rest/problem/updateProblem";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useUpdateProblem() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async ({ payload, problemId }: { payload: UpdateProblem, problemId: string }) => {
      const res = await updateProblem(payload, problemId);
      return res;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["LIST_PROBLEM"],  exact: false, });
      queryClient.invalidateQueries({ queryKey: ["LIST_ACTIVE_PROBLEM"], exact: false });
      queryClient.invalidateQueries({ queryKey: ["PROBLEM_DETAIL"], exact: false });
    },
  });
  return {
    updateProblem: mutation.mutate,
    updateProblemAsync: mutation.mutateAsync,
    isLoading: mutation.isPending,
    isError: mutation.isError,
    isSuccess: mutation.isSuccess,
    error: mutation.error,
    data: mutation.data,
  };
}
