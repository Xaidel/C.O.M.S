import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/datatable";
import {
  CircleArrowLeft,
} from "lucide-react";
import { NavigateFunction } from "react-router-dom";
import { useCOAEPByCourse } from "./useCOAEPByCourse";
import { useAddCOAEP } from "./useAddCOAEP";
import { useQueryClient } from "@tanstack/react-query";
import { CurrentPeriodResponse } from "@/types/Interface";
import { Badge } from "@/components/ui/badge";

interface TabProps {
  courseName: string;
  navigate: NavigateFunction;
}


export default function COTab({ courseName, navigate }: TabProps) {
  const queryClient = useQueryClient()
  const currentPeriod: CurrentPeriodResponse | undefined = queryClient.getQueryData(["current-period"])
  let periodID
  const selectedCourse = sessionStorage.getItem("selectedCourse")
  const course = JSON.parse(selectedCourse || "")
  const parsedCourseID = course.Course.ID
  const { data: coaep, isLoading, error } = useCOAEPByCourse(parsedCourseID)
  const { mutate: addCOAEP, isCreating } = useAddCOAEP()

  const handleGenerate = async () => {
    periodID = currentPeriod?.current_period ? currentPeriod.current_period?.ID : 0
    const courseName = course.Course.Course_Name
    addCOAEP({ courseID: parsedCourseID, periodID, courseName }, {
      onError: (e) => {
        console.log(e)
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [`coaep-${parsedCourseID}`] })
      }
    })
  }

  if (!coaep) return <div className="h-[40rem] w-full flex items-center justify-center">
    <Button onClick={handleGenerate}>
      {(isCreating) ? "Generating COAEP" : "Generate COAEP"}
    </Button>
  </div>
  if (isLoading) return
  if (error) return
  return (
    <>
      <div className="flex justify-between mb-6 items-center">
        <div className="flex justify-start gap-1 items-center text-xl font-bold text-[#1f2937]">
          <Button variant="ghost" onClick={() => navigate("/coaep/course")}>
            <CircleArrowLeft />
          </Button>
          {courseName}
        </div>
      </div>
      <DataTable
        resource="Course Outcomes"
        columns={[{
          header: "No.",
          cell: ({ row }) => (
            <div>{row.index + 1}</div>
          )
        }, {
          header: "Statement",
          cell: ({ row }) => {
            const level = row.original.Level.charAt(0)
            let color;
            switch (level) {
              case "Introductory": {
                color = "#C8D2DA"
                break;
              }
              case "Enabling": {
                color = "#ACB9C3"
                break
              }
              case "Demonstrative": {
                color = "#8E9CA7"
                break
              }
            }
            return (
              <div className="flex gap-2">
                <Badge className="text-white" style={{ backgroundColor: color }}>{level}</Badge>
                <p>{row.original.Statement}</p>
              </div >
            )
          }
        }]}
        data={coaep.coaep.CourseOutcomes}
      />
    </>
  );
}
