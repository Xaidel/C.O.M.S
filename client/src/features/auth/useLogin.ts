import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { LoginResponse, User, LoginCredentials } from "@/types/Interface";
import client from "@/service/api";
import { useToast } from "@/hooks/use-toast";

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { mutate: login, isPending } = useMutation({
    mutationFn: async (
      credentials: LoginCredentials,
    ): Promise<LoginResponse> => {
      const data = await client.login(credentials);
      return data as LoginResponse;
    },
    onError: (error: Error): void => {
      toast({
        variant: "destructive",
        title: "Login Failed!",
        description: error.message,
        duration: 5000,
      });
    },
    onSuccess: (data: LoginResponse): void => {
      const user = data?.user;
      if (user) {
        queryClient.setQueryData<User>(["current-user"], user);
        sessionStorage.setItem("user_info", JSON.stringify(user));
        sessionStorage.setItem("splashShown", "false")
        navigate("/dashboard");
      }
    },
  });
  return { login, isPending };
}
