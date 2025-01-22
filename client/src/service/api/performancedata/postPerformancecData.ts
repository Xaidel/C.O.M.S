import { api } from "../../api"

export const postPerformanceData = async (student_id: string, ilo_id: number, coaep_id: number, section_id: number, value: number | null) => {
  const res = await fetch(`${api}/scores`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      student_id: student_id,
      ilo_id: ilo_id,
      coaep_id: coaep_id,
      section_id: section_id,
      value: value
    })
  })
  if (!res.ok) {
    throw new Error(`${res.status} ${res.statusText}`)
  }
  return res.json()
}

