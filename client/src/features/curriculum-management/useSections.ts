import { getSections } from "@/service/api/curriculum/getSections";
import { SectionResponse } from "@/types/Interface";
import { useQuery } from "@tanstack/react-query";

export function useSections(currID: string) {
  const query = useQuery<SectionResponse>({
    queryKey: [`${currID}-sections`],
    queryFn: () => getSections(currID)
  })

  return {
    ...query,
    isLoading: query.isLoading,
    error: query.isError
  }
}
