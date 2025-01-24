import { api } from "@/service/api"

export const postRecommendation = async (comment: string, ilo_id: number, section_id: number) => {
  const res = await fetch(`${api}/recommendations`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      comment: comment,
      ilo_id: ilo_id,
      section_id: section_id
    })
  })
  if (!res.ok) {
    throw new Error(`${res.status} ${res.statusText}`)
  }
  return res.json()
}
