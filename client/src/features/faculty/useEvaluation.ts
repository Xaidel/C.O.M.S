import { getEvaluation } from "@/service/api/coaep/getEvaluation";
import { EvaluationResponse } from "@/types/Interface";
import { useQuery } from "@tanstack/react-query";
import { error } from "console";

export function useEvaluation(coaepID: number) {
  const query = useQuery<EvaluationResponse>({
    queryKey: [`${coaepID}-evaluation`],
    queryFn: () => getEvaluation(coaepID)
  })

  return {
    ...query,
    isLoading: query.isFetching,
    error: query.error
  }
} 
