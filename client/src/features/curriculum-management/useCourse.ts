import client from "@/service/api";
import { CourseResponse } from "@/types/Interface";
import { useQuery } from "@tanstack/react-query";

export function useCourse(id?: number) {
  const {
    isLoading,
    data: response,
    error,
  } = useQuery<CourseResponse>({
    queryKey: ["course"],
    queryFn: async (): Promise<CourseResponse> => {
      const res =
        id === undefined ? client.Course().read() : client.Course().read(id);
      return res;
    },
  });
  return { isLoading, response, error };
}
