import { api } from "@/service/api"

export const getCriteria = async (sectiondID: number) => {
  const res = await fetch(`${api}/criteria/section/${sectiondID}`, {
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
