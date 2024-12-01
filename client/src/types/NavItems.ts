import { LayoutDashboard, FileSpreadsheet, BookOpenText } from "lucide-react";

export const DEAN_NAV_ITEMS = [
  { path: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  {
    path: "/programs",
    label: "Course Management",
    icon: FileSpreadsheet,
  },
];

export const ASSISTANT_DEAN_NAV_ITEMS = [
  { path: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  {
    path: "/programs",
    label: "Course Management",
    icon: FileSpreadsheet,
  },
];
export const PROGRAM_HEAD_NAV_ITEMS = [
  { path: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  {
    path: "/curriculums",
    subpath: "curriculums/:currID/courses",
    label: "Curriculum Management",
    icon: FileSpreadsheet,
  },
];
export const FACULTY_NAV_ITEMS = [
  { path: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { path: "/assessment-plan", label: "COAEP", icon: BookOpenText },
];
export const STUDENT_NAV_ITEMS = [
  { path: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
];
