import { api } from "@/service/api"

export const getPerformanceData = async (coaepID: number, sectionID: number) => {
  const res = await fetch(`${api}/scores/coaep/${coaepID}/section/${sectionID}`, {
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
