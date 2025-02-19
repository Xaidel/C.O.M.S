import { getCOAEPByCourse } from "@/service/api/coaep/getCOAEPByCourse"
import { COAEPResponse } from "@/types/Interface"
import { useQuery } from "@tanstack/react-query"

export function useCOAEPByCourse(courseID: number) {
  const query = useQuery<COAEPResponse>({
    queryKey: [`coaep-${courseID}`],
    queryFn: () => getCOAEPByCourse(courseID),
    enabled: !!courseID

  })
  return {
    ...query,
    isLoading: query.isFetching,
    error: query.isError,
  }
}
