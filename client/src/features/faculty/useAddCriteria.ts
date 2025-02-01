import { postCriteria } from "@/service/api/coaep/postCriteria";
import { useMutation } from "@tanstack/react-query";

export function useAddCriteria() {
  const mutation = useMutation({
    mutationFn: ({ ilo_id, criteria }: { ilo_id: number, criteria: number | null }) => postCriteria(ilo_id, criteria ?? 0)
  })
  return {
    ...mutation,
    isCreating: mutation.isPending
  }
}
