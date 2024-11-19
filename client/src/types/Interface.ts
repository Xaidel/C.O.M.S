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
  UserID: string;
  User: UserInfo;
}
export interface DepartmentResponse {
  department?: Department;
}

export interface Curriculum {
  CMO_Name: string;
  Effectivity_SY: string;
  CurrID: string;
  Programs?: Program[];
  Courses?: Course[];
  Effectivity_Sem: number;
  IsActive: number;
  Revision_No: number;
}

export interface CurriculumResponse {
  curriculums?: Curriculum[];
}

export interface Course {
  Course_No: string;
  CurrID: string;
  Course_Name: string;
  Curriculum?: Curriculum;
  Lec_Unit: number;
  Lab_Unit: number;
  Sem: number;
  Year_Level: number;
}

export interface CourseResponse {
  course?: Course;
}

export interface Department {
  Dept_Code: string;
  Dept_Name: string;
  ID: number;
  Programs: Program[];
}

export interface ProgramHead {
  UserID: number;
  ProgramID: number;
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
