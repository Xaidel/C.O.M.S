import { DataTable } from "@/components/ui/datatable";
import { CourseColumn } from "./CourseColumn";
import { useParams } from "react-router-dom";
import { useCurriculumByID } from "./useCurriculumByID";

export default function CourseTable() {
  const { currID } = useParams<{ currID: string }>();
  const { isLoading, response, error } = useCurriculumByID(currID);
  if (isLoading) return;
  if (error) return;
  const courses = response?.curriculum?.Courses || [];
  return <DataTable resource="Courses" columns={CourseColumn} data={courses} />;
}
