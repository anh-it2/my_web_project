import { FilterOptions } from "@/services/rest/constant";
import { useState } from "react";
import { useListSubmission } from "./useListSubmission";

export default function useGetListSubmission(id: string) {
    const [filter, setFilter] = useState<FilterOptions>({
        pageNumber: 0,
        pageSize: 10,
    })
    const {listSubmission, isLoading, refetch } = useListSubmission(filter, id)

    const handleFilterChange = (newFilter: FilterOptions) => {
        setFilter(newFilter)
    }

    return {listSubmission, isLoading, handleFilterChange, refetch }
}
