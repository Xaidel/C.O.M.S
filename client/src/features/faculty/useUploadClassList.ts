import { uploadStudent } from "@/service/api/student/uploadStudent"
import { useMutation } from "@tanstack/react-query"

interface uploadClassListParams {
  file: File
  courseID: number
}

export function useUploadClassList() {
  return useMutation({
    mutationFn: ({ file, courseID }: uploadClassListParams) => uploadStudent(file, courseID)
  })
}
