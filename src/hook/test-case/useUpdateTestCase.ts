import { TestCase } from "@/services/rest/test-case/get-test-case/type";
import { updateTestCase } from "@/services/rest/test-case/update-test-case";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useUpdateTestCase() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async ({
      payload,
    }: {
      payload: TestCase;
    }) => {
      const res = await updateTestCase(payload);
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
    updateTestCase: mutation.mutate,
    updateTestCaseAsync: mutation.mutateAsync,
    isLoading: mutation.isPending,
    isError: mutation.isError,
    isSuccess: mutation.isSuccess,
    error: mutation.error,
    data: mutation.data,
  };
}
