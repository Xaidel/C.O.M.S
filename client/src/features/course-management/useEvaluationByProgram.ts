import { getEvaluationByProgram } from "@/service/api/coaep/getEvaluationByProgram";
import { EvaluationResponse } from "@/types/Interface";
import { useQuery } from "@tanstack/react-query";

export function useEvaluationByProgram(coaepID: number, programID: number) {
  const query = useQuery<EvaluationResponse>({
    queryKey: [`${programID}-evaluation`],
    queryFn: () => getEvaluationByProgram(coaepID, programID),
    enabled: !!coaepID
  })

  return {
    ...query,
    isLoading: query.isFetching,
    error: query.error
  }
} 
