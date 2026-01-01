import { FilterOptions } from "@/services/rest/constant";
import { useState } from "react";
import { useListProblem } from "./useListProblem";

export default function useGetListProblem() {
    const [filter, setFilter] = useState<FilterOptions>({
        pageNumber: 0,
        pageSize: 10,
    })
    const {listProblem, isLoading, isError, error } = useListProblem(filter)

    const handleFilterChange = (newFilter: FilterOptions) => {
        setFilter(newFilter)
    }

    return {listProblem, isLoading, isError, error, handleFilterChange }
}
