import { uploadCO } from "@/service/api/course/uploadCO";
import { useMutation } from "@tanstack/react-query";

interface uploadCOParams {
  file: File
  periodID: number
}

export function useUploadCO() {
  return useMutation({
    mutationFn: ({ file, periodID }: uploadCOParams) => uploadCO(file, periodID)
  })
}
