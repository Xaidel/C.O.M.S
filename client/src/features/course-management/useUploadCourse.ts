import { uploadCourse } from "@/service/api/uploadCourse";
import { useMutation } from "@tanstack/react-query";

export function useUploadCourse() {
  return useMutation({
    mutationFn: (file: File) => uploadCourse(file)
  })
}
