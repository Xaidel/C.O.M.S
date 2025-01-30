import { getStudentByProgram } from "@/service/api/student/getStudentByProgram";
import { StudentResponse } from "@/types/Interface";
import { useQuery } from "@tanstack/react-query";

export function useStudentsByProgram(id: number) {
  const query = useQuery<StudentResponse>({
    queryKey: [`${id}-students`],
    queryFn: () => getStudentByProgram(id)
  })

  return {
    ...query,
    isLoading: query.isFetching,
    error: query.isError
  }
}
