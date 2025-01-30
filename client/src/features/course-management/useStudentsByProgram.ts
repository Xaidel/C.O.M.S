import { getStudentByProgram } from "@/service/api/student/getStudentByProgram";
import { ProgramStudentResponse } from "@/types/Interface";
import { useQuery } from "@tanstack/react-query";

export function useStudentsByProgram(id: number) {
  const query = useQuery<ProgramStudentResponse>({
    queryKey: [`${id}-students`],
    queryFn: () => getStudentByProgram(id)
  })

  return {
    ...query,
    isLoading: query.isFetching,
    error: query.isError
  }
}
