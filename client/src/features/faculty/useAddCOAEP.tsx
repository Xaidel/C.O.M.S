import { postCOAEP } from "@/service/api/coaep/postCOAEP";
import { useMutation } from "@tanstack/react-query";

export function useAddCOAEP() {
  const mutation = useMutation({
    mutationFn: ({ courseID, periodID }: { courseID: number, periodID: number }) => postCOAEP(courseID, periodID),
  })
  return {
    ...mutation,
    isCreating: mutation.isPending
  }
}
