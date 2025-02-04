import { api } from "@/service/api"

export const getStudentByProgramAndEnrolledCourses = async (programID: number, coaepID: number) => {
  const res = await fetch(`${api}/students/programs/${programID}/coaep/${coaepID}`, {
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
