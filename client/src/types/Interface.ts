import { ReactNode } from "react";

export interface Program {
  Program_Code: string;
  Program_Name: string;
  Department: Department;
  ProgramHead: ProgramHead;
  ID: number;
}

export interface NonPHFaculty {
  DepartmentID: number;
  UserID: number;
  User: UserInfo;
}

export interface Department {
  Dept_Code: string;
  Dept_Name: string;
  ID: number;
  Programs: Program[];
}

export interface ProgramHead {
  User: UserInfo;
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
