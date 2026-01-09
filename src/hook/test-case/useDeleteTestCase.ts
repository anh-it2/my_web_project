import { deleteTestCase } from "@/services/rest/test-case/delete-test-case";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDeleteTestCase() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async ({ id }: { id: number }) => {
      const res = await deleteTestCase(id);
      return res;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["LIST_TEST_CASE"],
        exact: false,
      });
    },
  });
  return {
    deleteTestCase: mutation.mutate,
    deleteTestCaseAsync: mutation.mutateAsync,
    isLoading: mutation.isPending,
    isError: mutation.isError,
    isSuccess: mutation.isSuccess,
    error: mutation.error,
    data: mutation.data,
  };
}
