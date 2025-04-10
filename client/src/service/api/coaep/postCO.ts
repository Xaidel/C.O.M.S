import { api } from "@/service/api"

export const postCO = async (statement: string, level: string, planID: number) => {
  const res = await fetch(`${api}/course-outcomes/${planID}`, {
    method: "POST",
    body: JSON.stringify({
      level: level,
      statement: statement
    })
  })
  if (!res.ok) {
    throw new Error(`${res.status} ${res.statusText}`)
  }
  return res.json()
}
