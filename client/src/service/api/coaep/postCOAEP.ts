import { api } from "@/service/api"

export const postCOAEP = async (courseID: number, periodID: number) => {
  const res = await fetch(`${api}/coaep`, {
    method: "POST",
    body: JSON.stringify({
      course_id: courseID,
      period_id: periodID
    })
  })
  if (!res.ok) {
    throw new Error(`${res.status} ${res.statusText}`)
  }
  return res.json()
}
