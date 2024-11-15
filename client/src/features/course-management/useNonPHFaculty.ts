import client from "@/service/api";
import { NonPHFaculty } from "@/types/Interface";
import { useQuery } from "@tanstack/react-query";

interface NonPHFacultyResponse {
  faculties?: NonPHFaculty[];
}

export function useNonPHFaculty(id?: number) {
  const {
    isLoading,
    data: response,
    error,
  } = useQuery<NonPHFacultyResponse>({
    queryKey: ["nonPHFaculty"],
    queryFn: async (): Promise<NonPHFacultyResponse> => {
      const res =
        id === undefined
          ? client.Faculty().readNonPH()
          : client.Faculty().readNonPH(id);
      return res;
    },
  });

  return { isLoading, error, response };
}
