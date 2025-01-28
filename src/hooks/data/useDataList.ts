import { useQuery } from "@tanstack/react-query"
import { Axios, AxiosInstance } from "axios"
import { useMemo } from "react"
import { IDataResponse } from "@/interface/IDataResponse"
import { get } from "@/utils/lodash"
import { buildParams } from "@/utils/buildParams"


export const useDataList = <T, K>(params: K, apiPath: string, options?: {
  queryKey?: string;
  apiClient?: AxiosInstance;
  getDataPath?: string;
}) => {
  const {
    queryKey,
    apiClient = new Axios(),
    getDataPath
  } = options || {}
  const query = [queryKey, apiPath, params]
  const queryFn = async () => {
    if (params) {
      const finalParams = buildParams(params)
      const response: any = await apiClient.get<IDataResponse<T>>(apiPath, { params: finalParams })
      return getDataPath ? get(response, getDataPath) : response
    }
    return null
  }

  const { data, isLoading, refetch } = useQuery<IDataResponse<T> | null>({
    queryKey: query,
    queryFn,
    enabled: !!params
  })
  const pagination = useMemo(() => ({
    totalCount: data?.result?.totalCount || 0,
    totalPages: data?.result?.totalPages || 1
  }), [data])

  return [{
    isLoading,
    pagination,
    dataList: data?.result?.items || []
  }, {
    refetch
  }]
}
