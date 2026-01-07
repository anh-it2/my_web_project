import { deleteProblem } from "@/services/rest/problem/delete-problem";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDeleteProblem() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async ({ id, link }: { id: number, link: string }) => {
      const res = await deleteProblem(id, link);
      return res;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["LIST_PROBLEM"], exact: false });
      queryClient.invalidateQueries({ queryKey: ["LIST_ACTIVE_PROBLEM"], exact: false });
    },
  });
  return {
    deleteProblem: mutation.mutate,
    deleteProblemAsync: mutation.mutateAsync,
    isLoading: mutation.isPending,
    isError: mutation.isError,
    isSuccess: mutation.isSuccess,
    error: mutation.error,
    data: mutation.data,
  };
}
