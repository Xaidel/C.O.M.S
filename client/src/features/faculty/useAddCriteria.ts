import { postCriteria } from "@/service/api/coaep/postCriteria";
import { useMutation } from "@tanstack/react-query";

export function useAddCriteria() {
  const mutation = useMutation({
    mutationFn: ({ ilo_id, criteria, section_id }: { ilo_id: number, criteria: number | null, section_id: number }) => postCriteria(ilo_id, criteria ?? 0, section_id)
  })
  return {
    ...mutation,
    isCreating: mutation.isPending
  }
}
