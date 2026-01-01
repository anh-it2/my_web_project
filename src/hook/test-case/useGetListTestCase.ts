import { FilterOptions } from "@/services/rest/constant";
import { useState } from "react";
import { useListTestCase } from "./useListTestCase";

export default function useGetListTestCase(id: string) {
    const [filter, setFilter] = useState<FilterOptions>({
        pageNumber: 0,
        pageSize: 9999,
    })
    const {data, isLoading } = useListTestCase(id, filter)

    const handleFilterChange = (newFilter: FilterOptions) => {
        setFilter(newFilter)
    }

    return {listTestCase: data, isLoading, handleFilterChange }
}
