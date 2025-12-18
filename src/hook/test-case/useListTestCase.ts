import { getListTestCaseForProblem } from "@/services/rest/test-case/get-test-case";
import { useQuery } from "@tanstack/react-query";

export function useListTestCase(id: string) {
  const { data, isLoading } = useQuery({
    queryKey: ["LIST_TEST_CASE", id],
    queryFn: () => {
      return getListTestCaseForProblem(id);
    },
  });
  return { listTestCase: data, isLoading: isLoading };
}
