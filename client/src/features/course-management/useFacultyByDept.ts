import client from "@/service/api";
import { NonPHFaculty } from "@/types/Interface";
import { useQuery } from "@tanstack/react-query";

interface FacultyByDeptResponse {
  faculties?: NonPHFaculty[];
}

export function useFacultyByDept(deptID: number) {
  const {
    isLoading,
    data: response,
    error,
  } = useQuery<FacultyByDeptResponse>({
    queryKey: [`faculty-${deptID}`],
    queryFn: async (): Promise<FacultyByDeptResponse> => {
      const res = client.Faculty().readFacultyByDept(deptID);
      return res;
    },
  });
  return { isLoading, response, error };
}
