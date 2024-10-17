import { useAuthenticate } from "@/features/auth/useAuthenticate";
import { useEffect } from "react";
import { ProtectedRouteProps } from "@/types/Interface";
import { useNavigate } from "react-router-dom";

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { status, isPending } = useAuthenticate();
  const navigate = useNavigate();
  useEffect(
    function () {
      console.log(status?.message);
      if (!isPending && status?.message === "Token not Found")
        navigate("/login");
    },
    [isPending, status, navigate],
  );
  if (status?.message === "Valid Token") return children;
}
