import { useQuery } from "@tanstack/react-query";

import client from "@/service/api";

export function useAuthenticate() {
  const {
    isPending,
    data: status,
    error,
  } = useQuery({
    queryKey: ["auth-status"],
    queryFn: async () => {
      const res = await client.validate()
      return res;
    },
  });
  return { isPending, error, status };
}
