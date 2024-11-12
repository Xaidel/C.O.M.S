import { ReactNode } from "react";

interface Department {
  Dept_Name: string;
  Dept_Code: string;
  ID: number;
}

interface Program {
  Program_Code: string;
  Program_Name: string;
  Department: Department;
  ID: number;
}

interface RoleInfo {
  Department: Department;
  Program: Program;
  User: UserInfo;
  DepartmentID: number;
  ID: number;
}

interface UserInfo {
  UserID: string;
  Firstname: string;
  Middlename: string;
  Lastname: string;
}

export interface currentUser {
  role: string;
  role_info: RoleInfo;
  user_info: UserInfo;
  UserID: string;
}

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
