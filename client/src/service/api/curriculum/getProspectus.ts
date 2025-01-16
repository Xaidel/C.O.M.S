import { api } from "@/service/api"

export const getProspectus = async (currID: string) => {
  const res = await fetch(`${api}/prospectus/${currID}`, {
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
