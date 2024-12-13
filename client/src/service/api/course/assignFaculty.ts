import { api } from "../../api"

export const assignFaculty = async (id: number, userID: string) => {
  const res = await fetch(`${api}/courses/faculty/${id}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      userID: userID
    })
  })
  if (!res.ok) {
    throw new Error(`${res.status} ${res.statusText}`)
  }
  return res.json()
}
