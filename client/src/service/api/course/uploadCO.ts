import { api } from "../../api"

export const uploadCO = async (csv: File, periodID: number) => {
  try {
    const formData = new FormData()
    formData.append("file", csv)

    const res = await fetch(`${api}/course-outcomes/upload/${periodID}`, {
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
