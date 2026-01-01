import { UserProfileFormValues } from "@/hook/user-info/useUserInfoSchema";
import { updateUserInfo } from "@/services/rest/user";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useUpdateUserInfo() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (payload: UserProfileFormValues) => {
      const res = await updateUserInfo(payload);
      return res;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["USER_INFO"] });
    },
  });
  return {
    updateUserInfo: mutation.mutate,
    updateUserInfoAsync: mutation.mutateAsync,
    isLoading: mutation.isPending,
    isError: mutation.isError,
    isSuccess: mutation.isSuccess,
    error: mutation.error,
    data: mutation.data,
  };
}
