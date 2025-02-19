import { useClassList } from "@/features/faculty/useClassList"
import { useCOAEPByCourse } from "@/features/faculty/useCOAEPByCourse"
import { useCriteria } from "@/features/faculty/useCriteria"
import { Score, Section, Student } from "@/types/Interface"
import { useQueryClient } from "@tanstack/react-query"
import { useParams } from "react-router-dom"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useEffect, useState } from "react"
import { usePerformanceData } from "@/features/faculty/usePerformanceData"
interface SectionCache {
  sections: Section[]
}
export default function CourseStudentProfile() {
  const [students, setStudents] = useState<Student[]>([])
  const [scores, setScores] = useState<Score[]>([])
  const queryClient = useQueryClient()
  const { courseCode } = useParams<{ courseCode: string }>()
  const { sectionID } = useParams<{ sectionID: string }>()
  const parsedSectionID = parseInt(sectionID || "")
  const sections = queryClient.getQueryData<SectionCache>([`${courseCode}-sections`])
  const courseID = sections?.sections[0]?.Course.ID || 0
  const { data: coaep, isLoading: fetchingCoaep, error: fetchingCoaepError } = useCOAEPByCourse(courseID)
  const { data: classlist, isLoading: fetchingClasslist, error: fetchingClasslistError } = useClassList(parsedSectionID)
  const { data: criteria, isLoading: fetchingCriteria, error: fetchingCriteriaError } = useCriteria(parsedSectionID)
  const coDataID = coaep?.coaep?.ID || 0
  const { data: performanceData, isLoading: fetchingPerformanceData } = usePerformanceData(coDataID, parsedSectionID)

  useEffect(() => {
    if (classlist?.classlist) {
      const studentList = classlist.classlist
        ?.map((student) => {
          return {
            UserID: student.UserID,
            Fullname: `${student.User.Lastname}, ${student.User.Firstname} ${student.User.Middlename || ""}`.trim(),
          };
        })
        .sort((a, b) => a.Fullname.localeCompare(b.Fullname));

      setStudents(studentList);

      if (classlist.classlist && coaep?.coaep && performanceData?.scores) {
        const initialScores: Score[] = performanceData?.scores.map(score => ({
          student_id: score.StudentID,
          coaep_id: coDataID,
          ilo_id: score.IntendedLearningOutcomeID,
          section_id: parsedSectionID,
          value: score.Value || null,
          status: score.Status
        }))
        setScores(initialScores)
      }
    }
  }, [classlist, performanceData]);

  if (fetchingCoaep || fetchingClasslist || fetchingCriteria || fetchingPerformanceData) return
  if (fetchingCoaepError || fetchingCriteriaError || fetchingClasslistError) return <div>Error..</div>
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
                            <div className="text-sm font-light">
                              {criteria?.criteria.find((crit) => crit.IntendedLearningOutcomeID === ilo.ID)?.Criteria ?? "No"} pts
                            </div>
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
                          s.student_id === student.UserID && s.coaep_id === coDataID && s.ilo_id === ilo.ID
                        )
                        return (
                          <TableCell className={`border p-0 ${score?.status === 1 ? "bg-green-200" : score?.status === 0 ? "bg-red-200" : ""}`} key={ilo.ID}>
                            <div className="h-full w-full" key={ilo.ID}>
                              <input
                                key={ilo.ID}
                                type="number"
                                disabled={!criteria?.criteria.some((crit) => crit.IntendedLearningOutcomeID === ilo.ID)}
                                min="0"
                                max="100"
                                className="bg-transparent focus:outline-none focus:ring-0 border-none w-full h-full text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none "
                                value={score?.value === null ? "" : score?.value}
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
          </>
        ) : (
          <div>No COAEP Found</div>
        )}
      </div >
    </>
  )
}
