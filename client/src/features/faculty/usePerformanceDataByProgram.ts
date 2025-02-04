import { getPerformanceDataByProgram } from "@/service/api/performancedata/getPerformanceDataByProgram"
import { PerformanceData } from "@/types/Interface"
import { useQuery } from "@tanstack/react-query"

export function usePerformanceDataByProgram(coaepID: number, programID: number) {
  const query = useQuery<PerformanceData>({
    queryKey: [`${programID}-performance_data`],
    queryFn: () => getPerformanceDataByProgram(coaepID, programID),
    staleTime: 3000,
  })

  return {
    ...query,
    isLoading: query.isFetching
  }
}
