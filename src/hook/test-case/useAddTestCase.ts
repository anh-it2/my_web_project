import { addTestCase } from "@/services/rest/test-case/add-test-case";
import { CreateTestCasePayload } from "@/services/rest/test-case/add-test-case/type";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useAddTestCase() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async ({
      problemId,
      payload,
    }: {
      problemId: number;
      payload: CreateTestCasePayload;
    }) => {
      const res = await addTestCase(problemId, payload);
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
    addTestCase: mutation.mutate,
    addTestCaseAsync: mutation.mutateAsync,
    isLoading: mutation.isPending,
    isError: mutation.isError,
    isSuccess: mutation.isSuccess,
    error: mutation.error,
    data: mutation.data,
  };
}
