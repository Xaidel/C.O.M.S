import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ProtectedRouteProps } from "@/types/Interface";
import { useUser } from "@/features/auth/useUser";

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const navigate = useNavigate();
  const { currentUser } = useUser();

  useEffect(() => {
    if (currentUser === undefined) navigate("/login");
  }, [currentUser, navigate]);
  if (currentUser) return <>{children}</>;
  return null;
}
