import AppLabel from "@/components/ui/applabel";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/datatable";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useUser } from "@/features/auth/useUser";
import { useEnrolledCourses } from "@/features/student/useEnrolledCourses";
import { BookOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function PerformanceData() {
  const navigate = useNavigate()
  const { currentUser } = useUser()
  const studentID = currentUser?.role_info?.User.UserID
  const { data: courses, isLoading: fetchingCourses } = useEnrolledCourses(studentID)
  const enrolledCourses = courses?.student.Sections || []
  const programID = currentUser?.role_info?.ProgramID
  if (fetchingCourses) return <div>Fetching Courses</div>
  return (
    <>
      <AppLabel currentPage="Performance Data" />
      <div className="flex justify-start gap-1 items-center text-3xl font-bold text-[#1F2937] mb-6">
        Enrolled Courses
      </div>
      <DataTable
        columns={[
          { header: "Code", accessorKey: "SectionCode" },
          {
            header: "Course No",
            cell: ({ row }) => {
              const courseNo = `${row?.original?.Course.Course_No}-${row?.original?.Curriculum?.CurrID}${row?.original?.Section_Name}`
              return (
                <div>{courseNo}</div>
              )
            }
          },
          {
            header: "Description",
            cell: ({ row }) => (
              <div>{row?.original?.Course.Course_Name}</div>
            )
          },
          {
            id: "action",
            cell: ({ row }) => (
              <div>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button onClick={() => {
                      localStorage.setItem("selectedCourse", JSON.stringify(row.original.Course))
                      navigate(`/performance-data/program/${programID}/course/${row?.original?.Course.ID}`)
                    }}>
                      <BookOpen />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>View Record</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            )
          },
        ]}
        data={enrolledCourses}
        resource="Enrolled Courses" />
    </>
  )
}
