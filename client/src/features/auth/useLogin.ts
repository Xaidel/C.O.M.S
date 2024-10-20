import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { LoginResponse, User, LoginCredentials } from "@/types/Interface";
import toast from "react-hot-toast";
import client from "@/service/api";

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: login, isPending } = useMutation({
    mutationFn: async (
      credentials: LoginCredentials,
    ): Promise<LoginResponse> => {
      const data = await client.login(credentials);
      return data as LoginResponse;
    },
    onError: (error: Error): void => {
      toast.error(error.message);
    },
    onSuccess: (data: LoginResponse): void => {
      const user = data?.user;
      if (user) {
        queryClient.setQueryData<User>(["current-user"], user);
        navigate("/dashboard");
      }
    },
  });
  return { login, isPending };
}
