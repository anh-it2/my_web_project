import { FilterOptions } from "@/services/rest/constant";
import { getListUser } from "@/services/rest/user";
import { useQuery } from "@tanstack/react-query";

export function useListUser(filter: FilterOptions) {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["USER_LIST", filter.pageNumber, filter.pageSize],
    queryFn: async () => {
      const result = await getListUser(filter); 
      return result;
    },
    enabled: true,
  });
  return { data, isLoading, isError, error };
}
