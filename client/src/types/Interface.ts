import { ReactNode } from "react";

export interface ProtectedRouteProps {
  children: ReactNode;
}

export type LoginCredentials = {
  userID: string;
  password: string;
};

export type User = {
  firstname: string;
  middlename: string;
  lastname: string;
  role: string;
};

export type LoginResponse = {
  user?: User;
};

export type DepartmentData = {
  dept_code: string;
  dept_name: string;
};
