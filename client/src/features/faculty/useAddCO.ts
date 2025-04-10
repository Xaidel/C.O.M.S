import { postCO } from "@/service/api/coaep/postCO";
import { useMutation } from "@tanstack/react-query";

export function useAddCO() {
  const mutation = useMutation({
    mutationFn: ({ level, statement, planID }: { level: string, statement: string, planID: number }) => postCO(statement, level, planID)
  })
  return {
    ...mutation,
    isCreating: mutation.isPending
  }
}
