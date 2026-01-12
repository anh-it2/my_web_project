import { FilterOptions } from "@/services/rest/constant";
import { useState } from "react";
import { useListSubmittedProblem } from "./useListSubmittedProblem";

export function useGetListSubmittedProblem(adminId: string) {
  const [filter, setFilter] = useState<FilterOptions>({
    pageNumber: 0,
    pageSize: 10,
  });
  const { list_submitted_problem, isLoading } =
    useListSubmittedProblem(adminId, filter);

  const handleFilterChange = (newFilter: FilterOptions) => {
    setFilter(newFilter);
  };

  return { list_submitted_problem, isLoading, handleFilterChange };
}
