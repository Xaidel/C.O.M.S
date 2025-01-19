import { uploadSections } from "@/service/api/curriculum/uploadSections"
import { useMutation } from "@tanstack/react-query"

interface uploadSectionsParams {
  file: File
  currID: string
}

export function useUploadSections() {
  return useMutation({
    mutationFn: ({ file, currID }: uploadSectionsParams) => uploadSections(file, currID)
  })
}
