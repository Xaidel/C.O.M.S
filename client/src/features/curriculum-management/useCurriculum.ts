import client from "@/service/api";
import { CurriculumResponse } from "@/types/Interface";
import { useQuery } from "@tanstack/react-query";

export function useCurriculum(id?: number) {
  const {
    isLoading,
    data: response,
    error,
  } = useQuery<CurriculumResponse>({
    queryKey: ["curriculum"],
    queryFn: async (): Promise<CurriculumResponse> => {
      const res =
        id === undefined
          ? client.Curriculum().read()
          : client.Curriculum().read(id);
      return res;
    },
  });
  return { isLoading, error, response };
}
