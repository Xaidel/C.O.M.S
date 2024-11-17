import client from "@/service/api";
import { useQuery } from "@tanstack/react-query";
import { DepartmentResponse } from "@/types/Interface";

export function useDepartments(id?: number) {
  const {
    isLoading,
    data: response,
    error,
  } = useQuery<DepartmentResponse>({
    queryKey: ["department"],
    queryFn: async (): Promise<DepartmentResponse> => {
      const res =
        id === undefined
          ? client.Department().read()
          : client.Department().read(id);
      return res;
    },
  });

  return { isLoading, error, response };
}
