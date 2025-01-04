import { getPerformanceData } from "@/service/api/performancedata/getPerformanceData";
import { PerformanceData } from "@/types/Interface";
import { useQuery } from "@tanstack/react-query";

export function usePerformanceData(id: number) {
  const query = useQuery<PerformanceData>({
    queryKey: [`${id}-performance_data`],
    queryFn: () => getPerformanceData(id)
  })

  return {
    ...query,
    isLoading: query.isFetching
  }
}
