import AppLabel from "@/components/ui/applabel";
import { Button } from "@/components/ui/button";
import { useUser } from "@/features/auth/useUser";
import { useCOAEPByCourse } from "@/features/faculty/useCOAEPByCourse";
import { usePerformanceDataByProgram } from "@/features/faculty/usePerformanceDataByProgram";
import { useStudentByProgramAndEnrolledCourses } from "@/features/faculty/useStudentByProgramAndEnrolledCourses";
import { CircleArrowLeft } from "lucide-react";
import { Fragment, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export default function StudentPerformance() {
  const navigate = useNavigate()
  const { currentUser } = useUser()
  const studentID = currentUser?.role_info?.UserID
  const { courseID } = useParams<{ courseID: string }>()
  const parsedCourseID = parseInt(courseID || "")
  const { programID } = useParams<{ programID: string }>()
  const parsedProgramID = parseInt(programID || "")
  const { data: coaep, isLoading: fetchingCoaep, error: fetchingCoaepError } = useCOAEPByCourse(parsedCourseID)
  const coaepID = coaep?.coaep?.ID || 0
  const { data: classlist, isLoading: fetchingClasslist } = useStudentByProgramAndEnrolledCourses(coaepID, parsedProgramID);
  const { data: performanceData, isLoading: fetchingPerformanceData } = usePerformanceDataByProgram(coaepID, parsedProgramID);
  const selectedCourse = localStorage.getItem("selectedCourse")
  const parsedSelectedCourse = JSON.parse(selectedCourse || "")

  const student = useMemo(() => {
    if (!classlist?.classlist.length) return null

    const s = classlist?.classlist.find((stud) => (
      stud.UserID === studentID
    ))

    return ({
      UserID: s?.UserID,
      Fullname: `${s?.User?.Lastname} ${s?.User?.Firstname} ${s?.User?.Middlename.charAt(0) || ""}.`.trim()
    })
  }, [classlist?.classlist])

  const scores = useMemo(() => {
    if (!coaep?.coaep || !performanceData?.scores?.length) return [];
    return performanceData.scores
      .filter((sc) => sc.StudentID === student?.UserID)
      .map((s) => ({
        student_id: s.StudentID,
        coaep_id: coaepID,
        ilo_id: s.IntendedLearningOutcomeID,
        value: s.Value,
        status: s.Status
      }));
  }, [coaep?.coaep, performanceData?.scores, classlist?.classlist, student?.UserID]);

  if (fetchingCoaep || fetchingPerformanceData || fetchingClasslist) return
  if (fetchingCoaepError) return
  console.log(parsedSelectedCourse)
  return (
    <>
      <AppLabel currentPage="Performance Data" />
      <div className="mb-6 flex flex-col">
        <div className="flex justify-start gap-1 items-center text-3xl font-bold text-[#1F2937] ">
          <Button variant="ghost" onClick={() => navigate(-1)}>
            <CircleArrowLeft className="text-2xl" />
          </Button>
          Student Performance Data
        </div>
        <p className="ml-[3.7rem] text-md">{`${parsedSelectedCourse.Course_No}-${parsedSelectedCourse.Course_Name}`}</p>
      </div>
      <Table >
        <TableHeader className="bg-[#CBD2DB] hover:bg-[#CBD2DB]">
          <TableRow className="font-bold hover:bg-[CBD2DB] text-md">
            <TableHead className="text-[#1F2937]">Course Outcome</TableHead>
            <TableHead className="text-[#1F2937]">Weight</TableHead>
            <TableHead className="text-[#1F2937]">Grade</TableHead>
            <TableHead className="text-[#1F2937]">ILO</TableHead>
            <TableHead className="text-[#1F2937]">Weight</TableHead>
            <TableHead className="text-[#1F2937]">P.PER</TableHead>
            <TableHead className="text-[#1F2937]">T.SCORE</TableHead>
            <TableHead className="text-[#1F2937]">SCORE</TableHead>
            <TableHead className="text-[#1F2937]">CO GRADE</TableHead>
            <TableHead className="text-[#1F2937]">ILO GRADE</TableHead>
            <TableHead className="text-[#1F2937]">Weighted</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {coaep?.coaep.CourseOutcomes.map((co) => (
            <Fragment key={co.ID}>
              {co.IntendedLearningOutcomes.map((ilo, index) => (
                <TableRow key={`${co.ID}-${ilo.ID}`}>
                  {index === 0 && (
                    <>
                      <TableCell rowSpan={co.IntendedLearningOutcomes.length} className="align-middle max-w-7">
                        {co.Statement}
                      </TableCell>
                      <TableCell rowSpan={co.IntendedLearningOutcomes.length} className="align-middle ">
                        70%
                      </TableCell>
                      <TableCell rowSpan={co.IntendedLearningOutcomes.length} className="align-middle ">
                        120
                      </TableCell>
                    </>
                  )}
                  <TableCell className="">ILO {index + 1}</TableCell>
                  <TableCell className="">Test</TableCell>
                  <TableCell className="">Test</TableCell>
                  <TableCell className="">Test</TableCell>
                  <TableCell className="">Test</TableCell>
                  <TableCell className="">Test</TableCell>
                  <TableCell className="">Test</TableCell>
                  <TableCell className="">Test</TableCell>
                </TableRow>
              ))}
            </Fragment>
          ))}
          <TableRow>
            <TableCell colSpan={2} className="text-right font-medium">
              Final Grade:
            </TableCell>
            <TableCell className="text-center font-medium">Grade</TableCell>
            <TableCell colSpan={8}></TableCell>
          </TableRow>
        </TableBody>
      </Table >
    </>
  )
}
