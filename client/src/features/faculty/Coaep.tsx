import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useParams } from "react-router-dom";
import { useCOAEPByCourse } from "./useCOAEPByCourse";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useClassList } from "./useClassList";
import { useState, useEffect } from "react";
import { StudentResponse, Student, Score, COAEP } from "@/types/Interface";
import { Button } from "@/components/ui/button";
import { useQueryClient } from "@tanstack/react-query";
import { useAddPerformanceData } from "./useAddPerformanceData";
import { usePerformanceData } from "./usePerformanceData";
import { toast } from "@/hooks/use-toast";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import Report from "./Report";
import { useCriteria } from "./useCriteria";
import LoadingState from "@/pages/LoadingState";

interface Data {
  coaep: COAEP
}

export default function Coaep() {
  const [students, setStudents] = useState<Student[]>([]);
  const [scoreInput, setScoreInput] = useState<Score | null>(null)
  const [debounceScore, setDebounceScore] = useState<Score | null>(null)
  const [scores, setScores] = useState<Score[]>([])
  const { courseID } = useParams<{ courseID: string }>()
  const { sectionID } = useParams<{ sectionID: string }>()
  const parsedCourseID = parseInt(courseID || "0", 10)
  const parsedSectionID = parseInt(sectionID || "0", 10)
  const { data: coaep, isLoading: fetchingCoaep, error: fetchingCoaepError } = useCOAEPByCourse(parsedCourseID)
  const { data: classlist, isLoading: fetchingClasslist } = useClassList(parsedSectionID)
  const { data: criteria, isLoading: fetchingCriteria, error: fetchingCriteriaError } = useCriteria(parsedSectionID)
  const queryClient = useQueryClient()
  const data = queryClient.getQueryData<Data>([`coaep-${parsedCourseID}`])!
  const coData: COAEP = data?.coaep
  const coDataID = coData?.ID
  const { mutate: addPerformanceData, isCreating } = useAddPerformanceData()
  const { data: performanceData, isLoading: fetchingPerformanceData, refetch: fetchPerformanceData } = usePerformanceData(coDataID, parsedSectionID)
  const [reportModalOpen, setReportModalOpen] = useState(false)


  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounceScore(scoreInput)
    }, 300)
    return () => {
      clearTimeout(handler)
    }
  }, [scoreInput])

  useEffect(() => {
    if (coDataID) {
      fetchPerformanceData()
    }
  }, [coDataID])

  useEffect(() => {
    if (debounceScore && !isCreating) {
      addPerformanceData(debounceScore, {
        onError: () => {
          toast({
            variant: "destructive",
            title: "Error!!",
            description: "Error updating Performance Data",
            duration: 3500
          })
        },
        onSuccess: (newScore) => {
          setScores((prev) =>
            prev.map((score) =>
              score.student_id === newScore.student_id &&
                score.coaep_id === newScore.coaep_id &&
                score.ilo_id === newScore.ilo_id ? { ...score, value: newScore.value } : score
            )
          )
          fetchPerformanceData()
        }
      })
    }
  }, [debounceScore])

  useEffect(() => {
    if (classlist?.classlist && !isCreating) {
      const studentList = classlist.classlist
        ?.map((student: StudentResponse) => {
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

  const handleScoreChange = (
    student_id: string,
    coaep_id: number,
    ilo_id: number,
    section_id: number,
    value: number | null
  ) => {
    setScoreInput({ student_id, coaep_id, ilo_id, section_id, value })
    setScores((prevScores) => prevScores.map((score) =>
      score.student_id === student_id && score.coaep_id === coaep_id && score.ilo_id === ilo_id ? { ...score, value, status: undefined } : score
    ))
  }


  if (fetchingCoaep || fetchingClasslist || fetchingCriteria || fetchingPerformanceData) return <LoadingState />
  if (fetchingCoaepError || fetchingCriteriaError) return <div className="min-w-screen h-[40rem] flex items-center justify-center font-bold text-xl">
    Course Outcome Assessment and Evaluation Plan data not found</div>
  return (
    <>
      <div className="mt-5">
        {
          coaep?.coaep.CourseOutcomes ? (
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
                                  onChange={(e) =>
                                    handleScoreChange(
                                      student.UserID,
                                      coDataID,
                                      ilo.ID,
                                      parsedSectionID,
                                      e.target.value === "" ? null : parseInt(e.target.value, 10) || 0
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
                <Dialog open={reportModalOpen} onOpenChange={setReportModalOpen}>
                  <DialogTrigger asChild>
                    <Button type="button" onClick={() => {
                      fetchPerformanceData()
                      setReportModalOpen(true)
                    }
                    }>Generate Report</Button>
                  </DialogTrigger>
                  <DialogContent className="min-w-[90%] min-h-[85%] max-h-[80%] overflow-y-scroll">
                    <DialogHeader>
                      <DialogTitle className="text-2xl">COAEP Report</DialogTitle>
                      <DialogDescription>Course Outcome Assessment and Evaluation Plan Report for <span className="font-bold">{``}</span></DialogDescription>
                    </DialogHeader>
                    <Report />
                  </DialogContent>
                </Dialog>
              </div>
            </>
          ) : (
            <div>No COAEP Found</div>
          )
        }
      </div >
    </>
  )
}
