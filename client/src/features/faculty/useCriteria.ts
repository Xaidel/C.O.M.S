import { getCriteria } from "@/service/api/coaep/getCriteria";
import { CriteriaResponse } from "@/types/Interface";
import { useQuery } from "@tanstack/react-query";

export function useCriteria(sectionID: number) {
  const query = useQuery<CriteriaResponse>({
    queryKey: [`criteria-${sectionID}`],
    queryFn: () => getCriteria(sectionID)
  })
  return {
    ...query,
    isLoading: query.isLoading,
    error: query.isError
  }
} 
