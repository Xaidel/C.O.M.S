import client from "@/service/api";
import { CurriculumResponse } from "@/types/Interface";
import { useQuery } from "@tanstack/react-query";

export function useCurriculumByProgram(programID: number) {
  const {
    isLoading,
    data: response,
    error,
  } = useQuery<CurriculumResponse>({
    queryKey: ["curriculum"],
    queryFn: async (): Promise<CurriculumResponse> => {
      const res = client.Curriculum().readByProgram(programID);
      return res;
    },
  });
  return { isLoading, error, response };
}
