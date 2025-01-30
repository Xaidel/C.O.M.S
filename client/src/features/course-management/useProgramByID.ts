import { getProgramByID } from "@/service/api/program/getProgramByID";
import { ProgramResponse } from "@/types/Interface";
import { useQuery } from "@tanstack/react-query";

export function useProgramByID(id: number) {
  const query = useQuery<ProgramResponse>({
    queryKey: [`program`],
    queryFn: () => getProgramByID(id)
  })

  return {
    ...query,
    isLoading: query.isFetching,
    error: query.isError
  }
}
