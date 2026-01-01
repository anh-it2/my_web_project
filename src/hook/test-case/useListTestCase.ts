import { FilterOptions } from "@/services/rest/constant";
import { getListTestCaseForProblem } from "@/services/rest/test-case/get-test-case";
import { useQuery } from "@tanstack/react-query";

export function useListTestCase(id: string, filter: FilterOptions) {
  const { data, isLoading } = useQuery({
    queryKey: ["LIST_TEST_CASE", id, filter.pageNumber, filter.pageSize],
    queryFn: () => {
      return getListTestCaseForProblem(id, filter);
    },
    enabled: !!id,
  });
  return { data, isLoading };
}
