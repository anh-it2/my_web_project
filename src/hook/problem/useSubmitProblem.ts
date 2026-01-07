import { submitProblem } from "@/services/rest/problem/submit-problem/route";
import { SubmitProblemPayload } from "@/services/rest/problem/submit-problem/type";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useSubmitProblem(){
    const queryClient = useQueryClient()
    const mutation = useMutation({
        mutationFn: async ({payload}: {payload: SubmitProblemPayload}) => {
            return await submitProblem(payload)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["LIST_SUBMISSION"],
                exact: false,
            })
        }
    })
    return {
        submitProblem: mutation.mutate,
        submitProblemAsync: mutation.mutateAsync,
        isLoading: mutation.isPending,
        isError: mutation.isError,
        error: mutation.error,
    }
}