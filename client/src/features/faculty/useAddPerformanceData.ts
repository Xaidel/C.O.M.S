import { postPerformanceData } from "@/service/api/performancedata/postPerformancecData";
import { useMutation } from "@tanstack/react-query";

export function useAddPerformanceData() {
  const mutation = useMutation({
    mutationFn: ({ student_id, ilo_id, coaep_id, section_id, value }: { student_id: string; ilo_id: number; coaep_id: number, section_id?: number | null, value: number | null }) =>
      postPerformanceData(student_id, ilo_id, coaep_id, section_id || 0, value)
  })
  return {
    ...mutation,
    isCreating: mutation.isPending
  }
}
