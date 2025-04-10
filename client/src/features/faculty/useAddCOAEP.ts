import { postCOAEP } from "@/service/api/coaep/postCOAEP";
import { useMutation } from "@tanstack/react-query";

export function useAddCOAEP() {
  const mutation = useMutation({
    mutationFn: ({ courseID, periodID, courseName }: { courseID: number, periodID: number, courseName: string }) => postCOAEP(courseID, periodID, courseName),
  })
  return {
    ...mutation,
    isCreating: mutation.isPending
  }
}
