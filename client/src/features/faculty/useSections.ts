import { getSections } from "@/service/api/course/getSections";
import { SectionResponse } from "@/types/Interface";
import { useQuery } from "@tanstack/react-query";

export function useSections(facultyID: number) {
  const query = useQuery<SectionResponse>({
    queryKey: [`${facultyID}-sections`],
    queryFn: () => getSections(facultyID)
  })
  return {
    ...query,
    isLoading: query.isLoading,
    error: query.isError
  }
}
