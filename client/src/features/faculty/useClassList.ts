import { getStudentByCourse } from "@/service/api/student/getStudentByCourse";
import { ClassList } from "@/types/Interface";
import { useQuery } from "@tanstack/react-query";

export function useClassList(courseID: number) {
  const query = useQuery<ClassList>({
    queryKey: [`${courseID}-students`],
    queryFn: () => getStudentByCourse(courseID)
  })

  return {
    ...query,
    isLoading: query.isFetching
  }
}
