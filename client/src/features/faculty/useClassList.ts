import { getStudentByCourse } from "@/service/api/student/getStudentByCourse";
import { ClassList } from "@/types/Interface";
import { useQuery } from "@tanstack/react-query";

export function useClassList(sectionID: number) {
  const query = useQuery<ClassList>({
    queryKey: [`${sectionID}-students`],
    queryFn: () => getStudentByCourse(sectionID)
  })

  return {
    ...query,
    isLoading: query.isFetching
  }
}
