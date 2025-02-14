import { api } from "@/service/api"

export const postCriteria = async (ilo_id: number, criteria: number, section_id: number) => {
  const res = await fetch(`${api}/criteria`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      ilo_id: ilo_id,
      section_id: section_id,
      criteria: criteria
    })
  })

  if (!res.ok) {
    throw new Error(`${res.status} ${res.statusText}`)
  }
  return res.json()
}
