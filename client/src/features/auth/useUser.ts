import { currentUser } from "@/types/Interface";

export function useUser() {
  const userInfo = sessionStorage.getItem("user_info");
  const currentUser: currentUser = userInfo ? JSON.parse(userInfo) : null;

  return { currentUser };
}
