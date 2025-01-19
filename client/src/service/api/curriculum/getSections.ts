import { api } from "@/service/api"
import { UploadErrorResponse } from "@/types/Interface"

export const getSections = async (currID: string) => {
  const res = await fetch(`${api}/sections/${currID}`, {
    method: "GET",
    headers: {
      Accept: "application/json"
    }
  })
  if (!res.ok) {
    const err: UploadErrorResponse = await res.json()
    throw new Error(`${err.error}`)
  }
  return res.json()
}
