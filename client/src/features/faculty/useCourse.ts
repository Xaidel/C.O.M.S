import client from "@/service/api";
import { FacultyResponse } from "@/types/Interface";
import { useQuery } from "@tanstack/react-query";

export function useCourse(id?: number) {
  const {
    isLoading,
    data: response,
    error,
  } = useQuery<FacultyResponse>({
    queryKey: ["courses"],
    queryFn: async (): Promise<FacultyResponse> => {
      const res =
        id === undefined ? client.Faculty().readNonPH() : client.Faculty().readNonPH();
      return res;
    },
  });
  return { isLoading, error, response };
}
