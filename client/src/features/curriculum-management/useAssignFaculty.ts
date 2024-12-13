import { assignFaculty } from "@/service/api/course/assignFaculty";
import { useMutation } from "@tanstack/react-query";

export function useAssignFaculty() {
  const mutation = useMutation({
    mutationFn: ({ id, userID }: { id: number; userID: string }) => assignFaculty(id, userID)
  })
  return {
    ...mutation,
    isCreating: mutation.isPending
  }
}
