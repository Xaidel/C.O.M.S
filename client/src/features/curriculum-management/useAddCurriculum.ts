import { postCurriculum } from "@/service/api/curriculum/postCurriculum";
import { useMutation } from "@tanstack/react-query";

export function useAddCurriculum() {
  const mutation = useMutation({
    mutationFn: ({ id, revision_number, effectivity_sem, effectivity_sy, cmo_reference, programID }:
      { id: string; revision_number: number; effectivity_sem: string; effectivity_sy: string; cmo_reference: string; programID: number }) => postCurriculum(id, revision_number, effectivity_sem, effectivity_sy, cmo_reference, programID)
  })
  return {
    ...mutation,
    isCreating: mutation.isPending
  }
}
