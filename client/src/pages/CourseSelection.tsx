import AppLabel from "@/components/ui/applabel";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/datatable";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useUser } from "@/features/auth/useUser";
import { CourseColumn } from "@/features/faculty/CourseColumn";
import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";


export default function CourseSelection() {
  const { currentUser } = useUser()
  const navigate = useNavigate();
  let facultyID;
  if (currentUser?.role_info.Courses.length !== 0) {
    facultyID = currentUser?.role_info?.Courses?.[0]?.FacultyID;
  }
  const courses = currentUser?.role_info?.Courses || [];
  return (
    <>
      <div>
        <AppLabel currentPage="Course Selection" />
      </div>
      <h1 className="text-3xl font-bold text-[#1F2937] mb-3">
        List of Courses
      </h1>
      <DataTable
        resource="Courses Assigned"
        columns={[
          ...CourseColumn,
          {
            id: "action",
            header: "",
            cell: ({ row }) => {
              const courseID = row.original.ID;
              return (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        onClick={() => { navigate(`/courses/${courseID}/assessment-plan`) }}
                      >
                        <ChevronRight />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>CO Assessment and Evaluation Plan</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              );
            },
          },
        ]}
        data={courses}
      ></DataTable>
    </>
  );
}
