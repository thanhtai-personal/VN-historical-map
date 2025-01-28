import { IDataResponse } from "@/interface/IDataResponse";
import { get } from "@/utils/lodash";
import { useQuery } from "@tanstack/react-query"

export const useDataDetail = <T,>(
  id?: string,
  getDetailServiceFunction?: (id: string) => Promise<IDataResponse<any>>,
  options?: {
    queryKey?: string;
    getDataPath?: string;
  }) => {
  const {
    queryKey,
    getDataPath = "result"
  } = options || {}

  const { data, refetch, isLoading } = useQuery({
    queryKey: [queryKey, id],
    queryFn: () => getDetailServiceFunction?.(id!),
    enabled: !!id
  });

  return {
    data: get(data, getDataPath) as T,
    refetch,
    isLoading
  }
}