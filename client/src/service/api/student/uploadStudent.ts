import { api } from "@/service/api";

export const uploadStudent = async (csv: File, courseID: number) => {
  try {
    const formData = new FormData()
    formData.append("file", csv)

    const res = await fetch(`${api}/students/${courseID}`, {
      method: "POST",
      body: formData
    })
    if (!res.ok) {
      throw new Error(`${res.status} ${res.statusText}`)
    }
    return res.json()
  } catch (error) {
    console.error(error)
    throw error
  }
}
