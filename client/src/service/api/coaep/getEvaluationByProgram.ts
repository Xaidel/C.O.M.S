
import { api } from "@/service/api"

export const getEvaluationByProgram = async (coaepID: number, programID: number) => {
  const res = await fetch(`${api}/scores/eval/coaep/${coaepID}/program/${programID}`, {
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
