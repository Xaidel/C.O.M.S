import { api } from "@/service/api"

export const postCurriculum = async (id: string, revision_number: number, effectivity_sem: string, effectivity_sy: string, cmo_reference: string, programID: number) => {
  const res = await fetch(`${api}/curriculums`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      curr_id: id,
      effectivity_sem: effectivity_sem,
      revision_no: revision_number,
      effectivity_sy: effectivity_sy,
      cmo_name: cmo_reference,
      program_id: programID
    })
  })
  if (!res.ok) {
    throw new Error(`${res.status} ${res.statusText}`)
  }
  return res.json()
}
