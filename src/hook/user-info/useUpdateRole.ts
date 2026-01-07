import { updateRole } from "@/services/rest/user";
import { UpdateRoleRequest } from "@/services/rest/user/type";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useUpdateUserRole() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (payload: UpdateRoleRequest) => {
      const res = await updateRole(payload);
      return res;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["USER_LIST"], exact: false });
      queryClient.invalidateQueries({ queryKey: ["USER_DETAIL"], exact: false });
    },
  });
  return {
    updateRole: mutation.mutate,
    updateRoleAsync: mutation.mutateAsync,
    isLoading: mutation.isPending,
    isError: mutation.isError,
    isSuccess: mutation.isSuccess,
    error: mutation.error,
    data: mutation.data,
  };
}
