import { api } from "@/service/api"

export const getPerformanceData = async (id: number) => {
  const res = await fetch(`${api}/scores/${id}`, {
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
