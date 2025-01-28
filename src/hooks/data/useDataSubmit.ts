import { useMutation } from "@tanstack/react-query"
import { AxiosResponse } from "axios"

export const useDataSubmit = <T,>(
  createDataService?: (param: T) => Promise<AxiosResponse<any>>,
  successCallback?: () => void
) => {

  const { mutate, isPending, isSuccess, error, data } = useMutation({
    mutationFn: async (params: T) => {
      return await createDataService?.(params)
    },
    onSuccess: () => {
      successCallback?.();
    }
  })
  
  return {
    mutate,
    isPending,
    error,
    data,
    isSuccess
  }
}