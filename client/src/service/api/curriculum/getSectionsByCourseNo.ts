import { api } from "@/service/api"
import { UploadErrorResponse } from "@/types/Interface"

export const getSectionsByCourseNo = async (currID: string, courseNo: string) => {
  const res = await fetch(`${api}/sections/${currID}/course/${courseNo}`, {
    method: "GET",
    headers: {
      Accept: "application/json"
    }
  })
  if (!res.ok) {
    const err: UploadErrorResponse = await res.json()
    throw new Error(err.error)
  }
  return res.json()
}
