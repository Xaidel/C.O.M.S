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
  Faculty?: Faculty;
  FacultyID: number;
  Lec_Unit: number;
  Lab_Unit: number;
  Sem: number;
  Year_Level: number;
  ID: number;
}

export interface Coaep {
  CourseOutcomes: CourseOutcome[];
  ID: number;
}

export interface CourseOutcome {
  Statement: string;
  ID: number;
}

export interface Faculty {
  ID: number;
  User?: UserInfo;
  Courses: Course[];
}

export interface FacultyResponse {
  faculty?: Faculty;
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
  Programs: Program[];
  Courses: Course[];
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

export interface Period {
  School_Year: string;
  Semester: number;
  IsCurrent: number;
  ID: number;
}

export interface CurrentPeriodResponse {
  current_period?: Period;
}

export interface StudentResponse {
  Courses: Course[]
  UserID: string
  User: RawUserResponse
}

export interface RawUserResponse {
  Firstname: string,
  Middlename: string,
  Lastname: string
}
export interface ClassList {
  classlist: StudentResponse[]
}

export interface Student {
  UserID: string
  Fullname: string
}

export interface UploadErrorResponse {
  code: number,
  error: string,
  missing: string
}

export interface CourseOutcome {
  Statement: string,
  IntendedLearningOutcomes: IntendedLearningOutcomes[]
  ID: number
}
export interface IntendedLearningOutcomes {
  Statement: string,
  ID: number
}
export interface COAEP {
  ID: number
  CourseOutcomes: CourseOutcome[]
  Period: Period
  Course: Course
}
export interface COAEPResponse {
  coaep: COAEP
}
export interface Score {
  student_id: string
  ilo_id: number
  coaep_id: number
  value: number | null
}
