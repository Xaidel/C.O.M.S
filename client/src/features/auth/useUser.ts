export function useUser() {
  const userInfo = sessionStorage.getItem("user_info");
  const currentUser = userInfo ? JSON.parse(userInfo) : null;

  return { currentUser };
}
