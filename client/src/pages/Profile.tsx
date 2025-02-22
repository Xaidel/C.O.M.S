import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useCOAEPByCourse } from "@/features/faculty/useCOAEPByCourse";
import { usePerformanceDataByProgram } from "@/features/faculty/usePerformanceDataByProgram";
import { useStudentByProgramAndEnrolledCourses } from "@/features/faculty/useStudentByProgramAndEnrolledCourses";
import { useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import LoadingState from "./LoadingState";

export default function Profile() {
  const { programID } = useParams<{ programID: string }>()
  const { courseID } = useParams<{ courseID: string }>();
  const parsedCourseID = parseInt(courseID || "0", 10) || 0;
  const parsedProgramID = parseInt(programID || "0", 10) || 0;


  const { data: coaep, isLoading: fetchingCoaep, error: fetchingCoaepError } = useCOAEPByCourse(parsedCourseID);
  const coaepID = coaep?.coaep?.ID || 0
  const { data: classlist, isLoading: fetchingClasslist } = useStudentByProgramAndEnrolledCourses(coaepID, parsedProgramID);
  const { data: performanceData, isLoading: fetchingPerformanceData } = usePerformanceDataByProgram(coaepID, parsedProgramID);

  const students = useMemo(() => {
    if (!classlist?.classlist?.length) return [];
    return classlist.classlist
      .map((student) => ({
        UserID: student.UserID,
        Fullname: `${student.User.Lastname}, ${student.User.Firstname} ${student.User.Middlename || ""}`.trim(),
      }))
      .sort((a, b) => a.Fullname.localeCompare(b.Fullname));
  }, [classlist?.classlist, coaep?.coaep]);

  const scores = useMemo(() => {
    if (!coaep?.coaep || !performanceData?.scores?.length) return [];
    return performanceData.scores.map((score) => ({
      student_id: score.StudentID,
      coaep_id: coaep.coaep.ID,
      ilo_id: score.IntendedLearningOutcomeID,
      value: score.Value || null,
      status: score.Status,
    }));
  }, [coaep?.coaep, performanceData?.scores, classlist?.classlist]);

  useEffect(() => {
    console.log("COAEP:", coaep);
    console.log("Classlist:", classlist);
    console.log("Performance Data:", performanceData);
  }, [coaep, classlist, performanceData]);

  if (fetchingCoaep || fetchingClasslist || fetchingPerformanceData) return <LoadingState />
  if (fetchingCoaepError) return
  return (
    <>


      <Table>
        <TableHeader className="bg-[#CBD2DB] hover:bg-[#CBD2DB]">
          <TableRow>
            <TableHead rowSpan={2} className="border text-black">Student Number</TableHead>
            <TableHead rowSpan={2} className="border text-black">Student Name</TableHead>
            {coaep?.coaep?.CourseOutcomes.map((co, index) => (
              <TableHead key={co.ID} className="text-center border text-black hover:bg-muted/50" colSpan={co.IntendedLearningOutcomes.length}>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <div>{`CO #${index + 1}`}</div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{co.Statement}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </TableHead>
            ))}
          </TableRow>
          <TableRow className="font-bold hover:bg-[#CBD2DB]">
            {coaep?.coaep.CourseOutcomes.map((co) =>
              co.IntendedLearningOutcomes.map((ilo, index) => (
                <TableHead key={`${co.ID}-${index}`} className="text-center border text-black hover:bg-muted/50">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <div>{`ILO #${index + 1}`}</div>
                      </TooltipTrigger>
                      <TooltipContent className="max-w-[50rem]">
                        <p>{ilo.Statement}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </TableHead>
              ))
            )}
          </TableRow>
        </TableHeader>
        <TableBody>
          {students.length ? (
            students.map((student) => (
              <TableRow key={student.UserID}>
                <TableCell className="border">{student.UserID}</TableCell>
                <TableCell className="border">{student.Fullname}</TableCell>
                {coaep?.coaep?.CourseOutcomes.map((co) =>
                  co.IntendedLearningOutcomes.map((ilo) => {
                    const score = scores.find(
                      (s) => s.student_id === student.UserID && s.coaep_id === coaep.coaep.ID && s.ilo_id === ilo.ID
                    );
                    return (
                      <TableCell
                        className={`border p-0 ${score?.status === 1 ? "bg-green-200" : score?.status === 0 ? "bg-red-200" : ""}`}
                        key={ilo.ID}
                      >
                        <div className="h-full w-full text-center">{score?.value}</div>
                      </TableCell>
                    );
                  })
                )}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell className="border h-24 text-center" colSpan={50}>
                No Classlist Found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
}
