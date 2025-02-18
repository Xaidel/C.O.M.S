import { getSectionsByCourseNo } from "@/service/api/curriculum/getSectionsByCourseNo";
import { SectionResponse } from "@/types/Interface";
import { useQuery } from "@tanstack/react-query";

export function useSectionsByCourseNo(currID: string, courseNo: string) {
  const query = useQuery<SectionResponse>({
    queryKey: [`${courseNo}-sections`],
    queryFn: () => getSectionsByCourseNo(currID, courseNo),
    enabled: !!currID && !!courseNo
  })

  return {
    ...query,
    isLoading: query.isLoading,
    error: query.isError
  }
}
