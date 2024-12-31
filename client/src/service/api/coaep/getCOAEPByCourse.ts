import { api } from "@/service/api"

export const getCOAEPByCourse = async (id: number) => {
  const res = await fetch(`${api}/coaep/course/${id}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  })
  if (!res.ok) {
    throw new Error(`${res.status} ${res.statusText}`)
  }
  return res.json()
}
