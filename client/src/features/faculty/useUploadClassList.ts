import { uploadStudent } from "@/service/api/student/uploadStudent"
import { useMutation } from "@tanstack/react-query"

interface uploadClassListParams {
  file: File
  courseID: number
  sectionID: number
}

export function useUploadClassList() {
  return useMutation({
    mutationFn: ({ file, courseID, sectionID }: uploadClassListParams) => uploadStudent(file, courseID, sectionID)
  })
}
