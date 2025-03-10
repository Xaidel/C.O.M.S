import { getEvaluation } from "@/service/api/coaep/getEvaluation";
import { EvaluationResponse } from "@/types/Interface";
import { useQuery } from "@tanstack/react-query";

export function useEvaluation(coaepID: number, sectionID: number) {
  const query = useQuery<EvaluationResponse>({
    queryKey: [`${sectionID}-evaluation`],
    queryFn: () => getEvaluation(coaepID, sectionID),
    enabled: !!coaepID && !!sectionID
  })

  return {
    ...query,
    isLoading: query.isFetching,
    error: query.error
  }
} 
