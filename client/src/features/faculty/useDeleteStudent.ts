import { deleteStudent } from "@/service/api/student/deleteStudent";
import { useMutation } from "@tanstack/react-query";


interface deleteStudentParams {
  studentID: string,
  courseID: number
}
export function useDeleteStudent() {
  return useMutation({
    mutationFn: ({ studentID, courseID }: deleteStudentParams) => deleteStudent(studentID, courseID)
  })
}
