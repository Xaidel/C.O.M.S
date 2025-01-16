import { getProspectus } from "@/service/api/curriculum/getProspectus";
import { ProspectusResponse } from "@/types/Interface";
import { useQuery } from "@tanstack/react-query";

export function useProspectus(currID: string) {
  const query = useQuery<ProspectusResponse>({
    queryKey: [`${currID}-prospectus`],
    queryFn: () => getProspectus(currID)
  })

  return {
    ...query,
    isLoading: query.isFetching
  }
}
