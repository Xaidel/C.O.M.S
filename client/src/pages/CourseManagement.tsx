import AppLabel from "@/components/ui/applabel";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/datatable";
import { Toggle } from "@/components/ui/toggle";
import AddCourse from "@/features/course-management/AddCourse";
import UploadCourse from "@/features/course-management/UploadCourse";
import { ArrowUpDown, CircleArrowLeft } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CourseManagement() {
  const navigate = useNavigate();
  const [sortAscending, setSortAscending] = useState(true);

  return (
    <>
      <div>
        <AppLabel currentPage="Course Management" />
      </div>

      <div className="flex justify-start gap-1 items-center text-3xl font-bold text-[#1F2937] ">
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

      <div className="flex justify-end items-center mb-2 gap-2">
        <span className="text-sm">Sort by:</span>
        <Toggle
          aria-label="Toggle sort direction"
          pressed={sortAscending}
          onPressedChange={setSortAscending}
          className="gap-2 rounded-md border border-[#1F2937] px-3 py-2"
        >
          <ArrowUpDown className="h-4 w-4" />
          Course Name {sortAscending ? "(A-Z)" : "(Z-A)"}
        </Toggle>
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
