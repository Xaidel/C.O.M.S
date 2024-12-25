import { getStudentByCourse } from "@/service/api/student/getStudentByCourse";
import { useQuery } from "@tanstack/react-query";

export function useClassList(courseID: number) {
  const query = useQuery({
    queryKey: [`${courseID}-students`],
    queryFn: () => getStudentByCourse(courseID)
  })

  return {
    ...query,
    isLoading: query.isFetching
  }
}
