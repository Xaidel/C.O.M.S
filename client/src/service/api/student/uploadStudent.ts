import { api } from "@/service/api";
import { UploadErrorResponse } from "@/types/Interface";

export const uploadStudent = async (csv: File, courseID: number) => {
  try {
    const formData = new FormData()
    formData.append("file", csv)

    const res = await fetch(`${api}/students/${courseID}`, {
      method: "POST",
      body: formData
    })
    if (!res.ok) {
      const errorResponse: UploadErrorResponse = await res.json()
      errorResponse.code = res.status
      throw new Error(JSON.stringify(errorResponse))
    }
    return res.json()
  } catch (error) {
    console.error(error)
    throw error
  }
}
