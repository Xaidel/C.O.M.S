import { getStudentByProgramAndEnrolledCourses } from "@/service/api/student/getStudentByProgramAndEnrolledCourses"
import { ClassList } from "@/types/Interface"
import { useQuery } from "@tanstack/react-query"

export function useStudentByProgramAndEnrolledCourses(coaepID: number, programID: number) {
  const query = useQuery<ClassList>({
    queryKey: [`${programID}-students`],
    queryFn: () => getStudentByProgramAndEnrolledCourses(programID, coaepID),
    staleTime: 3000,
    enabled: !!coaepID
  })

  return {
    ...query,
    isLoading: query.isFetching
  }
}
