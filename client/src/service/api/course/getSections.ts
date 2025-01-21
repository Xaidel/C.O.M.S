import { api } from "@/service/api"

export const getSections = async (facultyID: number) => {
  const res = await fetch(`${api}/sections/faculty/${facultyID}`, {
    method: "GET",
    headers: {
      Accept: "application/json"
    }
  })
  if (!res.ok) {
    throw new Error(`${res.status} ${res.statusText}`)
  }
  return res.json()
}
