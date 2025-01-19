import { api } from "@/service/api"
import { UploadErrorResponse } from "@/types/Interface"

export const uploadSections = async (csv: File, currID: string) => {
  try {
    const formData = new FormData()
    formData.append("file", csv)
    const res = await fetch(`${api}/sections/prospectus/${currID}`, {
      method: "POST",
      body: formData
    })

    if (!res.ok) {
      const errorResponse: UploadErrorResponse = await res.json()
      errorResponse.code = res.status
      throw new Error(errorResponse.error)
    }
    return res.json()
  } catch (error) {
    console.error(error)
    throw error
  }
}
