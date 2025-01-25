import { postRecommendation } from "@/service/api/coaep/postRecommendation"
import { useMutation } from "@tanstack/react-query"

interface addRecommendationParams {
  comment: string
  ilo_id: number
  section_id: number
}

export function useAddRecommendation(section_id: number) {
  const mutation = useMutation({
    mutationFn: ({ comment, ilo_id, section_id }: addRecommendationParams) => postRecommendation(comment, ilo_id, section_id),
    mutationKey: [`${section_id}-recoms`]
  })
  return {
    ...mutation,
    isCreating: mutation.isPending
  }
}
