import { getEnrolledCourses } from "@/service/api/student/getEnrolledCourses";
import { Section, Student } from "@/types/Interface";
import { useQuery } from "@tanstack/react-query";

interface ResponseData {
  student: Student
  Sections: Section[]
}
interface EnrolledCoursesResponse {
  student: ResponseData
}

export function useEnrolledCourses(studentID: string) {
  const query = useQuery<EnrolledCoursesResponse>({
    queryKey: ["performance-record"],
    queryFn: () => getEnrolledCourses(studentID),
    enabled: !!studentID

  })

  return {
    ...query,
    isLoading: query.isLoading,
    error: query.error
  }
}
