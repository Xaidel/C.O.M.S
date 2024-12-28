import { api } from "@/service/api";

export const deleteStudent = async (studentID: string, courseID: number) => {
  const res = await fetch(`${api}/students/${studentID}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      userID: studentID,
      course_id: courseID
    })
  })
  if (!res.ok) {
    throw new Error(`${res.status} ${res.statusText}`)
  }
  return res.json()
}
