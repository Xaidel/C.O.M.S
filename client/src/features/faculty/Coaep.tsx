import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useParams } from "react-router-dom";
import { useCOAEPByCourse } from "./useCOAEPByCourse";
import { Tooltip } from "@radix-ui/react-tooltip";
import { TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useClassList } from "./useClassList";
import { useState, useEffect } from "react";
import { StudentResponse, Student } from "@/types/Interface";

export default function Coaep() {
  const [students, setStudents] = useState<Student[]>([]);
  const { courseID } = useParams<{ courseID: string }>()
  const parsedCourseID = parseInt(courseID || "0", 10)
  const { data: coaep, isLoading: fetchingCoaep } = useCOAEPByCourse(parsedCourseID)
  const { data: classlist, isLoading: fetchingClasslist } = useClassList(parsedCourseID)
  useEffect(() => {
    if (classlist?.classlist) {
      const studentList = classlist.classlist
        ?.map((student: StudentResponse) => {
          return {
            UserID: student.UserID,
            Fullname: `${student.User.Lastname}, ${student.User.Firstname} ${student.User.Middlename || ""}`.trim(),
          };
        })
        .sort((a, b) => a.Fullname.localeCompare(b.Fullname)); // Sort alphabetically by Fullname

      setStudents(studentList);
    }
  }, [classlist]);
  if (fetchingCoaep) return
  if (fetchingClasslist) return
  return (
    <>
      <div className="mt-5">
        {coaep?.coaep.CourseOutcomes ? (
          <Table>
            <TableHeader className="bg-[#CBD2DB] hover:bg-[#CBD2DB]">
              <TableRow className="font-bold hover:bg-[#CBD2DB]">
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
                {coaep?.coaep.CourseOutcomes.map((co) => co.IntendedLearningOutcomes.map((ilo, index) => (
                  <TableHead key={`${co.ID}-${index}`} className="text-center border text-black hover:bg-muted/50">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <div>{`ILO #${index + 1}`}</div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="max-h-20">{ilo.Statement}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </TableHead>
                )))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {students.length ? (
                students.map((student) => (
                  <TableRow key={student.UserID}>
                    <TableCell className="border">{student.UserID}</TableCell>
                    <TableCell className="border">{student.Fullname}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell className="border h-24 text-center" colSpan={50}>No Classlist Found</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        ) : (
          <div>No COAEP Found</div>
        )}
      </div>
    </>
  )
}
