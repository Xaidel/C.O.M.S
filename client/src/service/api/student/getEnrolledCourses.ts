import { api } from "@/service/api"

export const getEnrolledCourses = async (studentID: string) => {

  const res = await fetch(`${api}/students/enrolledCourses/${studentID}`, {
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
