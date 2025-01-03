import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useParams } from "react-router-dom";
import { useCOAEPByCourse } from "./useCOAEPByCourse";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useClassList } from "./useClassList";
import { useState, useEffect } from "react";
import { StudentResponse, Student, Score, COAEP } from "@/types/Interface";
import { Button } from "@/components/ui/button";
import { useQueryClient } from "@tanstack/react-query";

export default function Coaep() {
  const [students, setStudents] = useState<Student[]>([]);
  const [scores, setScores] = useState<Score[]>([])
  const { courseID } = useParams<{ courseID: string }>()
  const parsedCourseID = parseInt(courseID || "0", 10)
  const { data: coaep, isLoading: fetchingCoaep } = useCOAEPByCourse(parsedCourseID)
  const { data: classlist, isLoading: fetchingClasslist } = useClassList(parsedCourseID)
  const queryClient = useQueryClient()
  const coaepData = queryClient.getQueryData<COAEP>([`coaep-${parsedCourseID}`])
  const coaepID = coaepData ? coaepData.ID : 0
  useEffect(() => {
    if (classlist?.classlist) {
      const studentList = classlist.classlist
        ?.map((student: StudentResponse) => {
          return {
            UserID: student.UserID,
            Fullname: `${student.User.Lastname}, ${student.User.Firstname} ${student.User.Middlename || ""}`.trim(),
          };
        })
        .sort((a, b) => a.Fullname.localeCompare(b.Fullname));

      setStudents(studentList);

      if (classlist.classlist && coaep?.coaep) {
        const initialScores: Score[] = []
        classlist.classlist.forEach((student) => {
          coaep.coaep.CourseOutcomes.forEach((co) => {
            co.IntendedLearningOutcomes.forEach((ilo) => {
              initialScores.push({
                student_id: student.UserID,
                coaep_id: coaepID,
                ilo_id: ilo.ID,
                value: null
              })
            })
          })
        })
        setScores(initialScores)
      }
    }
  }, [classlist]);

  const handleScoreChange = (
    student_id: string,
    coaep_id: number,
    ilo_id: number,
    value: number | null
  ) => {
    setScores((prevScores) => prevScores.map((score) =>
      score.student_id === student_id && score.coaep_id === coaep_id && score.ilo_id === ilo_id ? { ...score, value } : score
    ))

    console.log(scores)
  }

  const handleSubmit = () => {
    console.log(scores)
  }

  if (fetchingCoaep) return
  if (fetchingClasslist) return
  return (
    <>
      <div className="mt-5">
        {coaep?.coaep.CourseOutcomes ? (
          <>
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
                          <TooltipContent className="max-w-[50rem]">
                            <p >{ilo.Statement}</p>
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
                      {coaep.coaep?.CourseOutcomes.map((co) => co.IntendedLearningOutcomes.map((ilo) => {
                        const score = scores.find((s) =>
                          s.student_id === student.UserID && s.coaep_id === coaepID && s.ilo_id === ilo.ID
                        )
                        return (
                          <TableCell className="border p-0 " key={ilo.ID}>
                            <div className="h-full w-full">
                              <input
                                type="number"
                                min="0"
                                max="100"
                                className="bg-transparent focus:outline-none focus:ring-0 border-none w-full h-full text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none "
                                value={score?.value === null ? "" : score?.value}
                                onChange={(e) =>
                                  handleScoreChange(
                                    student.UserID,
                                    coaepID,
                                    ilo.ID,
                                    e.target.value === "" ? null : parseInt(e.target.value, 10) || null
                                  )
                                }
                              />
                            </div>
                          </TableCell>
                        )
                      }))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell className="border h-24 text-center" colSpan={50}>No Classlist Found</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>

            <div className="mt-5 min-w-100 flex justify-end">
              <Button type="submit" onClick={handleSubmit}>Generate Report</Button>
            </div>
          </>
        ) : (
          <div>No COAEP Found</div>
        )}
      </div >
    </>
  )
}
