import client from "@/service/api";
import { Curriculum } from "@/types/Interface";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

interface Response {
  curriculum?: Curriculum;
}

export function useCurriculumByID(id?: string) {
  const { currID } = useParams<{ currID: string }>();
  const {
    isLoading,
    data: response,
    error,
  } = useQuery<Response>({
    queryKey: [`curriculum-${currID}`],
    queryFn: async (): Promise<Response> => {
      const res = client.Curriculum().read(id);
      return res;
    },
  });
  return { isLoading, error, response };
}
