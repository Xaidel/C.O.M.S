import client from "@/service/api";
import { CurrentPeriodResponse } from "@/types/Interface";
import { useQuery } from "@tanstack/react-query";

export function useCurrentPeriod() {
  const {
    isLoading,
    data: response,
    error,
  } = useQuery<CurrentPeriodResponse>({
    queryKey: ["current-period"],
    queryFn: async (): Promise<CurrentPeriodResponse> => {
      const res = await client.Period().readCurrent();
      return res;
    },
  });
  return { isLoading, error, response };
}
