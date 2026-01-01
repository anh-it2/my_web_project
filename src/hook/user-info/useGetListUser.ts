import { FilterOptions } from "@/services/rest/constant";
import { useState } from "react";
import { useListUser } from "./useListUser";

export default function useGetListUser() {
    const [filter, setFilter] = useState<FilterOptions>({
        pageNumber: 0,
        pageSize: 10,
    })
    const {data, isLoading, isError, error } = useListUser(filter)

    const handleFilterChange = (newFilter: FilterOptions) => {
        setFilter(newFilter)
    }

    return {listUser: data, isLoading, isError, error, handleFilterChange }
}
