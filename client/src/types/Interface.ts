import { ReactNode } from "react";

export interface ProtectedRouteProps {
  children: ReactNode
}

export type LoginCredentials = {
  userID: string;
  password: string;
};

export interface User {
  acc_type: number;
  id: number;
  name: string;
}

export type LoginResponse = {
  user?: User;
};
