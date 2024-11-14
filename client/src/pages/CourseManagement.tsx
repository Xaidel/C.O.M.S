import AppLabel from "@/components/ui/applabel";
import { DataTable } from "@/components/ui/datatable";
import { useDepartments } from "@/features/course-management/useDepartment";
import { useQueryClient } from "@tanstack/react-query";
import { currentUser } from "@/types/Interface";
import { ProgramColumn } from "@/features/course-management/ProgramColumn";

export default function CourseManagement() {
  const queryClient = useQueryClient();
  const currentUser = queryClient.getQueryData<currentUser>(["current-user"]);
  const departmentID = currentUser?.role_info?.DepartmentID;
  const { isLoading, response, error } = useDepartments(departmentID);
  if (isLoading) return;
  if (error) return;

  const programs = response?.department?.Programs || [];
  return (
    <>
      <div>
        <AppLabel currentPage="Course Management" />
      </div>
      <h1 className="text-3xl font-bold text-[#1F2937] mb-3">Programs</h1>
      <DataTable resource="Programs" columns={ProgramColumn} data={programs} />
    </>
  );
}
