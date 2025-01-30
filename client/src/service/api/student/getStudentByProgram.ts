import { api } from "@/service/api"

export const getStudentByProgram = async (id: number) => {
  const res = await fetch(`${api}/students/program/${id}`, {
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
