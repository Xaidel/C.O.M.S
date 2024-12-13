import { uploadCourse } from "@/service/api/uploadCourse";
import { useMutation } from "@tanstack/react-query";

interface uploadCourseParams {
  file: File
  currID: string
}

export function useUploadCourse() {
  return useMutation({
    mutationFn: ({ file, currID }: uploadCourseParams) => uploadCourse(file, currID)
  })
}
