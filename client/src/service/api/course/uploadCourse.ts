import { api } from "../../api"

export const uploadCourse = async (csv: File, currID: string) => {
  try {
    const formData = new FormData()
    formData.append("file", csv)

    const res = await fetch(`${api}/courses/${currID}`, {
      method: "POST",
      body: formData
    })
    if (!res.ok) {
      const err = await res.json()
      throw new Error(err.error)
    }
    return res.json()
  } catch (error) {
    console.error(error)
    throw error
  }
}
