import { api } from "@/service/api"

export const getStudent = async (id?: number) => {
  const realURL = id === undefined ? `${api}/students` : `${api}/students/${id}`
  const res = await fetch(realURL, {
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
