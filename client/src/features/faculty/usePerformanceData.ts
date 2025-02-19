import { getPerformanceData } from "@/service/api/performancedata/getPerformanceData";
import { PerformanceData } from "@/types/Interface";
import { useQuery } from "@tanstack/react-query";

export function usePerformanceData(coaepID: number, sectionID: number) {
  const query = useQuery<PerformanceData>({
    queryKey: [`${sectionID}-performance_data`],
    queryFn: () => getPerformanceData(coaepID, sectionID),
    enabled: !!coaepID && !!sectionID,
    staleTime: 3000,
  })

  return {
    ...query,
    isLoading: query.isFetching
  }
}
