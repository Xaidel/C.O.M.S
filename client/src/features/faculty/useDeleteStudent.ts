import { deleteStudent } from "@/service/api/student/deleteStudent";
import { useMutation } from "@tanstack/react-query";


interface deleteStudentParams {
  studentID: string,
  sectionID: number
}
export function useDeleteStudent() {
  return useMutation({
    mutationFn: ({ studentID, sectionID }: deleteStudentParams) => deleteStudent(studentID, sectionID)
  })
}
