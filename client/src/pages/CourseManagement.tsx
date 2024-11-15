import AppLabel from "@/components/ui/applabel";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/datatable";
import AddCourse from "@/features/course-management/AddCourse";
import UploadCourse from "@/features/course-management/UploadCourse";
import { CircleArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function CourseManagement() {
  const navigate = useNavigate();

  return (
    <>
      <div>
        <AppLabel currentPage="Course Management" />
      </div>
      <div className="flex gap-1 items-center text-3xl font-bold text-[#1F2937] mb-3">
        <Button
          variant="ghost"
          onClick={() => {
            navigate(-1);
          }}
        >
          <CircleArrowLeft className="text-2xl" />
        </Button>
        Courses
      </div>
        <DataTable
          resource="Courses"
          columns={[
            { header: "Code", accessorKey: "code" },
            { header: "Course Name", accessorKey: "name" },
            { header: "Faculty Assigned", accessorKey: "faculty" },
            { header: "Action", accessorKey: "action" },
          ]}
          data={[]}
        />
         <div className="flex gap-4 mt-4">
          <UploadCourse />
          <AddCourse />
        </div>
    </>
  );
}
